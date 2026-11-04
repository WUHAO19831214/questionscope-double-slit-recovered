/**
 * 双缝干涉与单缝衍射物理计算引擎
 * Double-Slit & Single-Slit Wave Optics Engine
 */

import { NM_TO_MM, FILTERS, DEFAULT_OPTICS_PARAMS } from './constants.js';

/**
 * 归一化 sinc 函数: sinc(x) = sin(x)/x
 */
export function sinc(x) {
  if (Math.abs(x) < 1e-7) return 1.0;
  return Math.sin(x) / x;
}

/**
 * 空间相干度计算 (范西特-策尼克定理 Van Cittert-Zernike Theorem)
 * 考虑有限单缝宽度 s 与缝倾斜角 alpha 对双缝照明相干度的衰减
 */
export function calcCoherence(params = DEFAULT_OPTICS_PARAMS, wavelength = 656) {
  const k = Math.PI * params.d / (wavelength * NM_TO_MM * params.D);
  const slitWidthFactor = sinc(k * params.s);
  const slitTiltFactor = sinc(k * params.h * Math.abs(Math.sin(params.alpha)));
  return slitWidthFactor * slitTiltFactor;
}

/**
 * 单色光在观察屏位置 x 处的光强计算 I(x)
 * 包含：
 * 1. 单缝衍射包络调制：sinc^2(pi * b * x / (lambda' * L))
 * 2. 双缝干涉细条纹：1 + gamma * cos(2*pi*d*x / (lambda'*L) + Delta_phi)
 * 3. 单缝偏置 ys 与薄片光程 plate 引起的中央主极大平移
 */
export function calcIntensity(params = DEFAULT_OPTICS_PARAMS, wavelength = 656, x = 0) {
  const lambdaInMedium = (wavelength * NM_TO_MM) / (params.medium || 1.0);
  
  // 单缝衍射包络振幅与光强因子
  const diffAngle = (Math.PI * params.b * x) / (lambdaInMedium * params.L);
  const diffAmp = sinc(diffAngle);
  const envelope = diffAmp * diffAmp;

  // 若挡住其中一条缝，退化为纯单缝衍射
  if (params.single) {
    return envelope;
  }

  // 空间相干对比度
  const gamma = calcCoherence(params, wavelength);

  // 初始相位差 (单缝偏置 + 插入介质片)
  const initialPhase = 
    (2 * Math.PI * params.d * params.ys) / (wavelength * NM_TO_MM * params.D) - 
    (2 * Math.PI * (params.plate || 0)) / (wavelength * NM_TO_MM);

  // 干涉因子
  const phaseDiff = (2 * Math.PI * params.d * x) / (lambdaInMedium * params.L) + initialPhase;
  const interference = 1.0 + gamma * Math.cos(phaseDiff);

  return envelope * interference;
}

/**
 * 计算条纹间距 Delta x = (lambda / medium) * (L / d)
 */
export function calcFringeWidth(params = DEFAULT_OPTICS_PARAMS, wavelength = 656) {
  const lambdaInMedium = (wavelength * NM_TO_MM) / (params.medium || 1.0);
  return lambdaInMedium * (params.L / params.d);
}

/**
 * 计算中央明纹 P_0 在屏上的偏移位置
 */
export function calcCentralFringePosition(params = DEFAULT_OPTICS_PARAMS, wavelength = 656) {
  const lambdaInMedium = (wavelength * NM_TO_MM) / (params.medium || 1.0);
  const initialPhase = 
    (2 * Math.PI * params.d * params.ys) / (wavelength * NM_TO_MM * params.D) - 
    (2 * Math.PI * (params.plate || 0)) / (wavelength * NM_TO_MM);
  
  return -initialPhase * lambdaInMedium * params.L / (2 * Math.PI * params.d);
}

/**
 * 由实验测得的间距 Delta x 倒推入射光波长 lambda = (d / L) * Delta x
 */
export function calcWavelengthFromMeasurement(deltaX, L = 700.0, d = 0.200, medium = 1.0) {
  const lambda_mm = (d / L) * deltaX * medium;
  return lambda_mm / NM_TO_MM; // 转换为 nm
}
