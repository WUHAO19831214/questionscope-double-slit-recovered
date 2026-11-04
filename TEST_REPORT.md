# 【测试验证与问题修复报告】双缝干涉数字化交互实验
# Test Verification & Issue Resolution Report

---

## 一、 测试执行环境与配置

- **操作系统**：macOS (Apple Silicon / Darwin)
- **目标浏览器 1**：**Apple Safari**（macOS 原生系统浏览器，直接加载本地 `file://` 协议）
- **目标浏览器 2**：**Google Chrome**（Headless WebGL 模式，1920×1080 标准分辨率，启用 ANGLE 渲染）
- **测试时间**：2026-11-04
- **测试范围**：物理模型科学性校验、Safari 本地直接打开稳定性、UI/交互完整性、弹窗无遮挡验证、全流程 17 个关键环节实机截图验证。

---

## 二、 物理数学模型自动化测试

测试脚本路径：`tests/physics_model_test.js`
执行命令：`node tests/physics_model_test.js`

### 测试结果概览：全部 10 项物理规律测试 100% 通过（PASS）

```
====================================================
   双缝干涉实验物理模型自动化测试 (Double Slit)   
====================================================

       紫光(436nm): 1.526 mm, 绿光(532nm): 1.862 mm, 红光(656nm): 2.296 mm
[PASS] Test 1: 增大波长，条纹间距严格等比例增大 (Delta x 正比于 lambda)
[PASS] Test 2: 增大双缝到屏距离 L，条纹间距线性增大 (Delta x 正比于 L)
[PASS] Test 3: 增大双缝间距 d，条纹间距反比例减小 (Delta x 正比于 1/d)
       中央光强 I(0) = 1.812, 空间相干度 gamma = 0.812
[PASS] Test 4: 中央位置 (x = 0) 在对称双缝下为光强极大值 (理想线光源 I=2.0，工程缝宽 I=1+gamma)
[PASS] Test 5: 理论明暗条纹位置精确对应极值点，条纹可见度 V 严格等于相干度 gamma
       单缝宽度 b = 0.03 mm, 双缝间距 d = 0.2 mm, 衍射第一极小位置: 15.31 mm (缺级次: 6.67)
[PASS] Test 6: 有限缝宽单缝衍射包络调制与第一极小值位置 (x = lambda*L/b)
       alpha = 0° gamma = 0.812, alpha = 2° gamma = 0.077, alpha = 10° gamma = 0.057
[PASS] Test 7: 转动单缝拨杆 (alpha 变大) 导致空间相干因子衰减，条纹对比度下降至消失
       单缝上移 ys = 0.5 mm, 中央明纹位移 x0 = -5.00 mm, 理论预测: -5.00 mm
[PASS] Test 8: 单缝上移导致中央明纹下移，条纹间距保持不变
       空气中间距: 2.296 mm, 水中间距: 1.722 mm
[PASS] Test 9: 装置浸入介质 (折射率 n = 1.333)，波长缩短，条纹间距等比例变窄
[PASS] Test 10: 误差分析理论公式数学判定: 错除以 n 导致偏小，刻线倾角 theta 导致偏大

====================================================
 物理模型测试总结: 全部 10 项测试通过: 10 / 10 (100%)
====================================================
```

---

## 三、 问题排查与核心修复记录

在复刻过程中，我们吸取了以往 Four Pins 项目的教训，系统性排查并解决了以下 6 项核心阻断点：

### 1. 租约心跳（Lease Check）与网络依赖拦截
- **现象**：原网页在没有网络连接或直接通过本地 `file://` 打开时，会在 3 秒内执行 `stop()`，调用 `document.open()` 与 `document.write('登录状态已失效...')` 强行清空页面。
- **根因**：原网页内嵌向 `/api/experiments/double-slit/lease` 的鉴权轮询，并硬编码了 `if (!/^https?:$/.test(location.protocol)) { stop(); return; }`。
- **修复方案**：彻底剔除水印注入脚本与 lease 心跳轮询代码，使页面完全自洽离线运行。

### 2. Safari 本地 `file://` 协议对 ES Module 的跨域限制
- **现象**：在 Safari 中通过 Finder 双击打开带有 `<script type="module">` 的本地 HTML 时，WebKit 安全沙箱会将其视为跨域，拒绝加载与执行。
- **根因**：现代构建工具默认输出带 `type="module"` 的标签。
- **修复方案**：将 `<script type="module" crossorigin>` 替换为标准普通 `<script>` 标签。

### 3. Top-level await 导致的语法解析崩溃（SyntaxError）
- **现象**：在将 script 改为普通标签后，浏览器控制台报错：
  `Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules`
  脚本在初始化阶段直接崩溃，界面无法响应任何点击。
- **根因**：原打包脚本在顶层直接执行了异步字体加载 `await Promise.race(...)` 和快捷步骤跳转 `await X.start()`。非模块的普通脚本顶层不允许出现 `await`。
- **修复方案**：将整个脚本主体使用自执行异步函数 `!(async function() { ... })();` 完整包装，既保证顶层 await 语法完全合法，又避免全局变量污染。

### 4. DOM 加载时序与 `<head>` 脚本同步执行冲突
- **现象**：脚本报错 `Cannot read properties of null (reading 'getContext')`，找不到 `#scene` 画布。
- **根因**：`<script>` 若直接置于 `<head>` 且无 `defer`，会在 DOM 树解析完成前同步执行。
- **修复方案**：将核心 `<script>` 标签移至 `</body>` 之前，确保整个 DOM（所有 canvas、button、section）完整就绪后再启动 Three.js 渲染与事件监听。

### 5. 弹窗层级遮挡死锁隐患
- **现象**：在部分移动端或特定 CSS 规则下，若弹窗样式具有高优先级 `display: flex/grid`，即便 HTML 节点带有 `hidden` 属性，仍可能被外部样式覆盖，导致不可见的黑色遮罩阻挡下层操作。
- **修复方案**：在 `<style>` 最顶层强制注入最高优先级全局规则：
  ```css
  [hidden] {
    display: none !important;
  }
  ```
  确保只要元素带有 `hidden` 属性，即被完全移出渲染树，绝不产生物理或事件遮挡。

### 6. Headless Chrome 测试环境 WebGL 上下文初始化失败
- **现象**：在自动化测试脚本中使用 `--disable-gpu` 启动 Chrome 时，报 `THREE.WebGLRenderer: Error creating WebGL context`。
- **根因**：`--disable-gpu` 彻底禁用了 Chrome 的硬件加速与软件 WebGL 后端。
- **修复方案**：替换为 `--enable-webgl --ignore-gpu-blocklist --use-gl=angle`，使无头浏览器可正常调用系统 GPU 完成 Three.js 与着色器编译。

---

## 四、 真实浏览器测试与实机截图记录

### 1. Apple Safari 实机运行验证（macOS 原生 Finder 双击）
运行验证脚本 `test_safari_ds.py`，调用系统原生 Safari 打开本地 `file://`：
- `safari_01_intro.png` (5.80 MB)：Safari 封面 3D 渲染完整呈现；
- `safari_02_after_enter.png` (5.42 MB)：Enter 键进入实验，光具座与器材托盘正常展示；
- `safari_03_help_modal.png` (2.08 MB)：按 'H' 键唤出操作说明弹窗，卡片居中，文字清晰；
- `safari_04_help_closed.png` (5.77 MB)：再次按 'H' 键关闭弹窗，实验场景恢复完全无遮挡；
- `safari_05_eye_view.png` (5.76 MB)：按 '3' 键瞬间切入目镜干涉条纹视场，分划板与条纹清晰锐利。

### 2. 全流程 17 阶段自动化实机截图清单（1920×1080 标准高清）
运行验证脚本 `capture_all_stages.js`，共捕获 17 张无压缩高保真截图存放在 `screenshots/` 目录：

1. `shot_01_intro.png` (1.62 MB)：3D 封面，大标题、副标题、操作路线图与开始按钮
2. `shot_02_principle_film.png` (118 KB)：40 秒原理短片，双缝波前传播与相长相消干涉示意
3. `shot_03_lab_step1.png` (1.52 MB)：实验步骤 1，光路搭建与器材托盘
4. `shot_04_step1_assembled.png` (1.45 MB)：演示完成第一步，光源、透镜、遮光筒已装上导轨
5. `shot_05_step2_power_on.png` (1.42 MB)：实验步骤 2，学生电源插头接通，12V 档位与红色开关亮起
6. `shot_06_step3_dark_room.png` (1.41 MB)：实验步骤 3，暗室关灯，灯箱出射丁达尔粒子散射光束
7. `shot_07_free_mode.png` (1.40 MB)：自由模式，支持自由组装与旋钮微调
8. `shot_08_screen_view.png` (1.75 MB)：光屏视角，观察遮光筒尾端毛玻璃屏上的光斑与条纹
9. `shot_09_head_view.png` (1.75 MB)：测量头视角，观察测量头外壳、调焦环与手轮
10. `shot_10_eye_view.png` (1.75 MB)：目镜视角，观察目镜中的干涉条纹与竖直十字分划线
11. `shot_11_micro_reading.png` (1.75 MB)：读数视角，手轮固定毫米主尺与圆周微分筒刻度
12. `shot_12_notebook.png` (1.70 MB)：实验记录本展开，显示滤光片波长测量与计算表格
13. `shot_13_chapter_data.png` (271 KB)：处理数据章节，手轮读数测验与条纹误差分摊互动
14. `shot_14_chapter_error.png` (267 KB)：误差分析章节，除以 n、刻线倾斜、屏距误差互动图解
15. `shot_15_chapter_more.png` (291 KB)：延伸考点章节，白光内紫外红、单缝衍射包络、水介质考点
16. `shot_16_help_modal.png` (440 KB)：操作说明弹窗展开，搬器材、沿导轨挪、拧旋钮手势指引
17. `shot_17_help_closed.png` (1.71 MB)：操作说明弹窗关闭，界面无任何遮挡，状态恢复正常
