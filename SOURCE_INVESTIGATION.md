# 【技术调查报告】QuestionScope 双缝干涉实验溯源与架构解构
# Source Investigation & Technical Architecture Report

> [!IMPORTANT]
> **原版出处与版权归属声明**
> - **原版设计者与创意作者**：**莞高物理邱老师**（**邱光旭 · 广东省东莞高级中学**）
> - **平台名称**：[动境物理 / 题景 QuestionScope](https://questionscope.cn/)（备案号：`粤ICP备2026058219号-1`）
> - **原版网页地址**：`https://questionscope.cn/experiments/double-slit`
> - **原版运行时接口**：`https://questionscope.cn/api/experiments/double-slit/runtime`
> - **调查与复刻性质**：本项目为**高中物理数字化教学研讨与工程离线存档**，旨在保证在不依赖外部网络连接及登录鉴权的情况下，于 Mac Safari 本地环境中安全、稳定、高保真运行，致敬邱光旭老师在微观物理具象化教学领域的杰出创意与高超工程水准。

---

## 一、 网页整体结构与部署形式调查

通过网络抓包与 HTTP 分析，目标页面采用前后端混合架构：
1. **外层宿主页面** (`https://questionscope.cn/experiments/double-slit`)：
   - 采用轻量级响应式外壳，以全屏 `<iframe>` 形式内嵌真正的实验运行时；
   - `iframe` 指向地址：`/api/experiments/double-slit/runtime`。
2. **内层运行时交付机制** (`/api/experiments/double-slit/runtime`)：
   - 服务端返回动态包裹脚本；
   - 包含动态签名水印（如 `qs:anon|double-slit|...`）；
   - 内置租约检查与防脱机保护逻辑（Lease Heartbeat）：
     ```javascript
     var url = "/api/experiments/double-slit/lease";
     function stop() {
       document.open();
       document.write("...登录状态已失效，请回到题景重新打开这个演示。...");
       document.close();
     }
     if (!/^https?:$/.test(location.protocol)) { stop(); return; }
     ```
   - 每隔 30 秒向 `/api/experiments/double-slit/lease` 轮询心跳。若连续两次失败，或页面运行在 `file://` 等非 HTTP(S) 协议下，立即调用 `document.write` 抹除页面内容，阻断离线使用。

---

## 二、 前端框架与渲染架构分析

### 1. 核心技术栈
- **3D 场景与空间渲染**：基于深度定制的 **Three.js**（程序化几何体构建，无需外部 glTF/OBJ 文件请求）。
- **Shader 与后期渲染管线**：
  - 自定义 GLSL 着色器实现高保真景深（Depth of Field, DoF）与散景（Bokeh）；
  - 泛光（Bloom）、暗角（Vignette）与胶片噪点（Film Grain）后处理；
  - 丁达尔效应模拟（室内暗室关灯后灯丝穿透空气的粒子散射锥体光束）；
  - 毛玻璃屏散斑与十字刻线渲染 Shader（结合了泊松采样与伪随机噪声）。
- **2D 交互视场与图表**：
  - 目镜中干涉条纹的物理波长颜色映射（CIE 1931 XYZ 到 sRGB 矩阵转换，结合普朗克黑体辐射谱）；
  - 展开式测微螺杆游标读数可视化（SVG + Canvas）；
  - 动态光强分布曲线与条纹间距联动。
- **排版与公式排版**：内嵌 **KaTeX** 数学渲染库，支持实时 LaTeX 物理公式渲染。
- **音频系统**：基于 **Web Audio API** 的原生代码程序化合成（点击、旋钮旋转、滑动、插拔插头、环境声），无需外部 MP3/WAV 资源。
- **字体与视觉样式**：CSS 内联嵌入了 base64 编码的 WOFF2 字体（`QS Sans`, `QS Serif`），实现离线脱机全平台一致的优质排版。

---

## 三、 公开源码溯源与版权调查

1. **开源仓库检索**：
   - 在 GitHub、Gitee 等公开平台上对“动境物理”、“QuestionScope”、“双缝干涉”、“莞高物理邱老师”、“邱光旭”进行检索；
   - 结果表明，动境物理系列交互实验为其团队独立研发的数字化教学成果，未在公共代码仓库公开发布源码；
   - 项目中使用的第三方基础开源库包括：Three.js (MIT 协议)、KaTeX (MIT 协议)。
2. **工程实现特征**：
   - 生产环境采用现代打包工具（如 Vite / Rollup / ESBuild）进行模块整合与代码压缩；
   - 原始打包中包含了 Top-level await 与 ES Module preload 结构，因而在脱机直接使用普通浏览器本地双击时会触发沙箱限制；
   - 本项目严格依据合法公开访问到的页面内容，解耦核心物理计算与数学推导，去除所有鉴权租约与协议阻断代码，重构为完全合规、自主可控的离线工程。
