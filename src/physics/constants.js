/**
 * 光学常数与光谱参数定义
 * Optical Constants & Spectral Parameters
 */

// 单位换算因子：纳米 (nm) 到 毫米 (mm)
export const NM_TO_MM = 1e-6;

// 滤光片物理与视觉配置
export const FILTERS = {
  none: {
    id: 'none',
    name: '不加滤光片',
    short: '白光',
    centerWavelength: 0,
    halfWidth: 0,
    peakTransmittance: 1.0,
    color: '#f6efe2',
    nominal: 0
  },
  red: {
    id: 'red',
    name: '红色滤光片',
    short: '红光',
    centerWavelength: 656, // 656 nm (巴耳末 H-alpha)
    halfWidth: 8,
    peakTransmittance: 0.82,
    color: '#e3392f',
    nominal: 656
  },
  green: {
    id: 'green',
    name: '绿色滤光片',
    short: '绿光',
    centerWavelength: 532, // 532 nm (常见半导体绿激光/滤波峰)
    halfWidth: 8,
    peakTransmittance: 0.78,
    color: '#2fbf5a',
    nominal: 532
  },
  violet: {
    id: 'violet',
    name: '紫色滤光片',
    short: '紫光',
    centerWavelength: 436, // 436 nm (汞灯紫线)
    halfWidth: 7,
    peakTransmittance: 0.70,
    color: '#7d5cff',
    nominal: 436
  }
};

// 默认光具座几何与物理基准参数
export const DEFAULT_OPTICS_PARAMS = {
  d: 0.200,      // 双缝中心间距 d (mm)
  b: 0.030,      // 单缝宽度 b (mm)
  L: 700.0,      // 双缝到观察屏距离 L (mm)
  D: 70.0,       // 单缝到双缝距离 D (mm)
  s: 0.080,      // 单缝有效相干发光宽度 s (mm)
  h: 6.0,        // 狭缝长度/高度 h (mm)
  alpha: 0.0,    // 单缝与双缝倾斜夹角 alpha (弧度)
  ys: 0.0,       // 单缝上下平移偏移量 ys (mm)
  plate: 0.0,    // 缝前插入薄介质片附加光程差 (mm)
  medium: 1.0,   // 周围介质折射率 (空气为 1.0，水为 1.333)
  single: false, // 是否挡住一条缝 (单缝衍射模式)
  lampT: 3000    // 白炽灯光源色温 (开尔文 K)
};
