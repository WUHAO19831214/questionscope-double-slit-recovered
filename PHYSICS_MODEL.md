# 【物理模型与科学计算规范】双缝干涉数字化交互实验
# Physical Model & Theoretical Foundation Specification

---

## 一、 实验几何与光路构型

双缝干涉测量光波长实验装置沿同轴方向自左向右依次包括：
1. **白炽灯光源（含聚光罩）**：提供发散连续复色光（色温 $T \approx 3000\text{ K}$）；
2. **凸透镜（焦距 $f \approx 10\text{ cm}$）**：将灯丝发出的光会聚在单缝位置；
3. **滤光片（红光 $\lambda \approx 656\text{ nm}$，绿光 $\lambda \approx 532\text{ nm}$）**：获得准单色光；
4. **单缝屏（缝宽 $s \approx 0.08\text{ mm}$，高度 $h \approx 6\text{ mm}$）**：形成相干线光源；
5. **双缝片（间距 $d = 0.200\text{ mm}$，单缝宽度 $b = 0.030\text{ mm}$）**：将同一波面分成两束相干光波；
6. **遮光筒（长度 $L = 700\text{ mm}$）**：消除杂散光并保持暗室环境；
7. **观察屏 / 测量头**：置于筒后端，包含十字分划板、螺旋测微手轮与放大目镜。

---

## 二、 光程差与近轴远场近似推导

设双缝 $S_1, S_2$ 对称分布在光轴两侧，间距为 $d$；双缝到观察屏垂直距离为 $L$。观察屏上任意考察点 $P$ 的坐标记为 $x$（以中央主轴交点为原点）。

### 1. 严格几何光程差
两光线到达点 $P$ 的几何路程分别为：
$$r_1 = \sqrt{L^2 + \left(x - \frac{d}{2}\right)^2} = L \sqrt{1 + \frac{(x - d/2)^2}{L^2}}$$
$$r_2 = \sqrt{L^2 + \left(x + \frac{d}{2}\right)^2} = L \sqrt{1 + \frac{(x + d/2)^2}{L^2}}$$

### 2. 近轴近场展开与适用条件
在高中物理实验常规条件下：
- **远场条件**：$L = 700\text{ mm} \gg d = 0.2\text{ mm}$，即 $d/L \approx 2.86 \times 10^{-4} \ll 1$；
- **近轴条件**：目镜视场半径 $|x| \le 12.5\text{ mm} \ll L$，即 $x/L \le 0.018 \ll 1$。

利用一阶泰勒展开 $\sqrt{1 + \epsilon} \approx 1 + \frac{1}{2}\epsilon$：
$$r_1 \approx L \left[1 + \frac{1}{2}\frac{(x - d/2)^2}{L^2}\right] = L + \frac{(x - d/2)^2}{2L}$$
$$r_2 \approx L \left[1 + \frac{1}{2}\frac{(x + d/2)^2}{L^2}\right] = L + \frac{(x + d/2)^2}{2L}$$

两束光到达点 $P$ 的光程差（在折射率为 $n_{\text{med}}$ 的介质中）：
$$\delta = n_{\text{med}}(r_2 - r_1) \approx n_{\text{med}} \cdot \frac{(x + d/2)^2 - (x - d/2)^2}{2L} = n_{\text{med}} \cdot \frac{2xd}{2L} = n_{\text{med}} \frac{dx}{L}$$

空气中 $n_{\text{med}} = 1.0$，因此：
$$\delta = d\sin\theta \approx d\tan\theta = \frac{dx}{L}$$

---

## 三、 干涉极值条件与条纹间距

设两缝处光波的初始振动相位严格相同。

### 1. 明纹条件（相长干涉）
当两列波到达观察点的光程差是波长 $\lambda$ 的整数倍时，振幅叠加达到最大：
$$\delta = k\lambda \implies \frac{dx_k}{L} = k\lambda \implies x_k = k \frac{L}{d}\lambda \quad (k = 0, \pm 1, \pm 2, \dots)$$
- $k = 0$ 对应**中央零级明条纹**（$x_0 = 0$）；
- $k = \pm 1$ 对应第一级明条纹，依次类推。

### 2. 暗纹条件（相消干涉）
当光程差是半波长的奇数倍时，振动完全相反，相互抵消形成暗纹：
$$\delta = \left(k + \frac{1}{2}\right)\lambda \implies x'_k = \left(k + \frac{1}{2}\right) \frac{L}{d}\lambda \quad (k = 0, \pm 1, \pm 2, \dots)$$

### 3. 相邻条纹间距
任意两相邻同级明条纹（或暗条纹）之间的中心距离：
$$\Delta x = x_{k+1} - x_k = \frac{\lambda L}{d}$$

由此导出用双缝干涉测量光波长的基本物理公式：
$$\lambda = \frac{d}{L}\Delta x$$

---

## 四、 考虑有限缝宽的单缝衍射包络与光强分布

实际双缝具有有限宽度 $b$（实验仪中 $b \approx 0.03\text{ mm}$）。屏上的光场分布并非纯粹的双缝干涉，而是受单缝夫琅禾费衍射调制的综合强度场。

### 1. 单缝衍射因子
单缝夫琅禾费衍射的光强分布为：
$$I_{\text{diff}}(x) = I_0 \cdot \mathrm{sinc}^2\left(\frac{\pi b x}{\lambda L}\right) = I_0 \left[\frac{\sin\left(\frac{\pi b x}{\lambda L}\right)}{\frac{\pi b x}{\lambda L}}\right]^2$$
- 衍射第一极小值位置：$\sin\theta_1 = \frac{\lambda}{b} \implies X_{\text{envelope}} = \pm \frac{\lambda L}{b}$；
- 中央衍射主极大半角宽为 $\frac{\lambda}{b}$，空间宽度为 $\frac{2\lambda L}{b}$。

### 2. 双缝干涉综合光强公式
结合空间相干度 $\gamma$ 与初始相位差 $\Delta\phi$：
$$I(x) = I_0 \cdot \mathrm{sinc}^2\left(\frac{\pi b x}{\lambda L}\right) \cdot \left[1 + \gamma \cos\left(\frac{2\pi d x}{\lambda L} + \Delta\phi\right)\right]$$

### 3. 缺级现象（Missing Order）
若干涉极大值位置与单缝衍射零点重合，即：
$$\frac{d}{\lambda L}x = k \quad \text{且} \quad \frac{b}{\lambda L}x = m \quad (m \ne 0)$$
两式相比可得：
$$\frac{k}{m} = \frac{d}{b}$$
在本实验装置中，若 $d = 0.200\text{ mm}, b = 0.030\text{ mm}$，则 $\frac{d}{b} = \frac{0.2}{0.03} \approx 6.67$。在 $x \approx 15.3\text{ mm}$（第一衍射零点）附近的干涉条纹振幅被单缝衍射包络强烈压制，严格符合物理规律。

---

## 五、 空间相干性与单缝对准理论（范西特-策尼克定理）

为什么实验必须设置单缝？为什么单缝与双缝必须平行？

### 1. 有限光源尺度的空间相干度
根据波动光学 **范西特-策尼克定理（van Cittert-Zernike Theorem）**，非相干面光源经单缝发出的光，在相距 $D$ 的双缝平面上的复相干度为单缝孔径函数的傅里叶变换：
$$\gamma = \mathrm{sinc}\left(\frac{\pi d s}{\lambda D}\right)$$
- 若单缝宽度 $s$ 过宽，或单缝离双缝过近（$D$ 过小），使得 $\frac{\pi d s}{\lambda D} \ge \pi$（即 $s \ge \frac{\lambda D}{d}$），则 $\gamma \to 0$，干涉条纹对比度消失；
- 装置设计 $D \approx 70\text{ mm}, s \approx 0.08\text{ mm}$ 时，$\gamma \approx 0.81$，保证了极佳的对比度与足够的光通量。

### 2. 单缝倾斜角 $\alpha$ 的影响
当单缝与双缝存在夹角 $\alpha$ 时，沿缝高 $h$ 方向产生的相位差梯度使得全长积分衰减：
$$\gamma_{\text{tilt}} = \mathrm{sinc}\left(\frac{\pi d h \sin\alpha}{\lambda D}\right)$$
- 缝高 $h = 6\text{ mm}$ 远大于缝宽；
- 只要单缝偏转哪怕 $2^\circ \sim 5^\circ$，$\gamma_{\text{tilt}}$ 便剧烈跌落至 0，条纹瞬间模糊消退；
- 这在物理上完美解释了实验中为什么必须转动单缝架拨杆、微调至严格平行的教学操作。

---

## 六、 零级明条纹移动理论（单缝位移与介质片）

### 1. 单缝垂直光轴平移 $y_s$
若单缝 $S$ 向上移动 $y_s$，则 $S$ 到下缝 $S_2$ 的路程变长，到上缝 $S_1$ 的路程变短：
$$\Delta r_{\text{slit}} = S S_2 - S S_1 \approx \frac{d y_s}{D}$$
屏上任一点 $P$ 的总光程差为：
$$\delta_{\text{total}} = (S S_2 + r_2) - (S S_1 + r_1) = \frac{d y_s}{D} + \frac{d x}{L}$$
令总光程差为零解出中央零级明纹位置：
$$x_0 = -\frac{L}{D}y_s$$
- **规律**：单缝向上移，中央亮纹反向**向下移**；条纹间距 $\Delta x = \frac{\lambda L}{d}$ **完全不变**。

### 2. 在一条缝前插入折射率为 $n_g$、厚度为 $h$ 的透明薄片
光在介质薄片中走过的光程为 $n_g h$，在空气中原光程为 $h$，附加光程差为 $(n_g - 1)h$。
若薄片放在上缝 $S_1$ 前，零级明纹位置移动满足：
$$\frac{d x_0}{L} - (n_g - 1)h = 0 \implies x_0 = \frac{L}{d}(n_g - 1)h$$
- **规律**：中央亮纹向**放置薄片的一侧（向上）平移**；条纹间距 $\Delta x$ **完全不变**。

---

## 七、 螺旋测微器读数与误差传递模型

### 1. 读数原理
- 固定刻度：整毫米刻线（上排）与半毫米刻线（下排）；
- 可动刻度：微分筒圆周共 50 格，每转一圈螺距位移 $0.5\text{ mm}$，分度值为 $0.01\text{ mm}$，估读至 $0.001\text{ mm}$；
- 读数公式：
  $$x = \text{整毫米数} + \text{半毫米数}(0 \text{ 或 } 0.5) + \text{可动格数} \times 0.01\text{ mm}$$

### 2. 测量误差分析
1. **错除以 $n$**：
   从第 1 条数到第 $n$ 条，实际只有 $n - 1$ 个条纹间距。若除以 $n$，则：
   $$\Delta x_{\text{calc}} = \frac{x_n - x_1}{n} = \frac{n-1}{n} \Delta x_{\text{true}} < \Delta x_{\text{true}} \implies \lambda_{\text{calc}} \text{ 偏小}$$
2. **测量头刻线与条纹倾斜夹角 $\theta$**：
   分划板仅能沿垂直自身刻线方向位移。若刻线倾斜 $\theta$，位移方向与条纹法线成 $\theta$ 夹角，实际测得间距为：
   $$\Delta x_{\text{meas}} = \frac{\Delta x}{\cos\theta} > \Delta x \implies \lambda_{\text{meas}} = \frac{\lambda}{\cos\theta} \text{ 偏大}$$
3. **屏距 $L$ 选错起点**：
   若将单缝到屏的距离 $(L + D)$ 误记录为 $L$，则分母偏大，导致计算所得的 $\lambda$ 偏小。
