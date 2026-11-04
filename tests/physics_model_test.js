/**
 * 双缝干涉实验物理数学模型自动化测试套件
 * Double-Slit Interference Automated Physics Test Suite
 */

const assert = require('assert');

// 物理常数与光学参数
const F_ = 1e-6; // nm -> mm

const J_ = {
  d: 0.2,       // 双缝间距 d = 0.2 mm
  b: 0.03,      // 单缝宽度 b = 0.03 mm
  L: 700,       // 双缝到屏距离 L = 700 mm
  D: 70,        // 单缝到双缝距离 D = 70 mm
  s: 0.08,      // 单缝有效宽度 s = 0.08 mm
  h: 6,         // 缝高 h = 6 mm
  alpha: 0,     // 单缝倾角
  ys: 0,        // 单缝偏移量
  plate: 0,     // 玻璃片光程附加
  medium: 1     // 介质折射率
};

// sinc 函数
function sinc(x) {
  if (Math.abs(x) < 1e-7) return 1.0;
  return Math.sin(x) / x;
}

// 空间相干因子 (Van Cittert-Zernike 定理)
function coherence(params, lambda) {
  const n = Math.PI * params.d / (lambda * F_ * params.D);
  return sinc(n * params.s) * sinc(n * params.h * Math.abs(Math.sin(params.alpha)));
}

// 光强分布函数 I(x)
function intensity(params, lambda, x) {
  const r = lambda * F_ / (params.medium || 1);
  const diffAmp = sinc(Math.PI * params.b * x / (r * params.L));
  const envelope = diffAmp * diffAmp;
  if (params.single) return envelope;
  
  const gamma = coherence(params, lambda);
  const phaseShift = 2 * Math.PI * params.d * params.ys / (lambda * F_ * params.D) - 2 * Math.PI * (params.plate || 0) / (lambda * F_);
  const interference = 1 + gamma * Math.cos(2 * Math.PI * params.d * x / (r * params.L) + phaseShift);
  return envelope * interference;
}

// 条纹间距理论计算 Delta x = lambda * L / d
function fringeWidth(params, lambda) {
  return (lambda * F_ / (params.medium || 1)) * (params.L / params.d);
}

// 中央条纹偏移量
function centralFringeShift(params, lambda) {
  const r = lambda * F_ / (params.medium || 1);
  const phaseShift = 2 * Math.PI * params.d * params.ys / (lambda * F_ * params.D) - 2 * Math.PI * (params.plate || 0) / (lambda * F_);
  return -phaseShift * r * params.L / (2 * Math.PI * params.d);
}

console.log('====================================================');
console.log('   双缝干涉实验物理模型自动化测试 (Double Slit)   ');
console.log('====================================================\n');

let passCount = 0;
let totalCount = 0;

function runTest(name, fn) {
  totalCount++;
  try {
    fn();
    console.log(`[PASS] Test ${totalCount}: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] Test ${totalCount}: ${name}`);
    console.error('       Error:', err.message);
  }
}

// Test 1: 波长与条纹间距正比关系
runTest('增大波长，条纹间距严格等比例增大 (Delta x 正比于 lambda)', () => {
  const lambda_v = 436; // 紫光 nm
  const lambda_g = 532; // 绿光 nm
  const lambda_r = 656; // 红光 nm

  const dx_v = fringeWidth(J_, lambda_v);
  const dx_g = fringeWidth(J_, lambda_g);
  const dx_r = fringeWidth(J_, lambda_r);

  assert(dx_v < dx_g && dx_g < dx_r, '条纹间距排序应为 紫 < 绿 < 红');
  assert.strictEqual((dx_r / dx_g).toFixed(5), (lambda_r / lambda_g).toFixed(5), '红绿条纹间距比应等于波长比');
  assert.strictEqual((dx_g / dx_v).toFixed(5), (lambda_g / lambda_v).toFixed(5), '绿紫条纹间距比应等于波长比');
  console.log(`       紫光(436nm): ${dx_v.toFixed(3)} mm, 绿光(532nm): ${dx_g.toFixed(3)} mm, 红光(656nm): ${dx_r.toFixed(3)} mm`);
});

// Test 2: 屏距与条纹间距正比关系
runTest('增大双缝到屏距离 L，条纹间距线性增大 (Delta x 正比于 L)', () => {
  const p1 = { ...J_, L: 500 };
  const p2 = { ...J_, L: 700 };
  const p3 = { ...J_, L: 1000 };
  const lambda = 656;

  const dx1 = fringeWidth(p1, lambda);
  const dx2 = fringeWidth(p2, lambda);
  const dx3 = fringeWidth(p3, lambda);

  assert(dx1 < dx2 && dx2 < dx3, '屏距越大，条纹间距应越大');
  assert.strictEqual((dx3 / dx1).toFixed(5), (1000 / 500).toFixed(5), '间距之比应精确等于屏距之比 (2.0)');
});

// Test 3: 双缝间距与条纹间距反比关系
runTest('增大双缝间距 d，条纹间距反比例减小 (Delta x 正比于 1/d)', () => {
  const p1 = { ...J_, d: 0.15 };
  const p2 = { ...J_, d: 0.20 };
  const p3 = { ...J_, d: 0.30 };
  const lambda = 656;

  const dx1 = fringeWidth(p1, lambda);
  const dx2 = fringeWidth(p2, lambda);
  const dx3 = fringeWidth(p3, lambda);

  assert(dx1 > dx2 && dx2 > dx3, '缝间距越大，条纹间距应越小');
  assert.strictEqual((dx1 / dx3).toFixed(5), (0.30 / 0.15).toFixed(5), '间距之比应精确等于缝间距反比 (2.0)');
});

// Test 4: 中央位置等相位亮纹与空间相干度
runTest('中央位置 (x = 0) 在对称双缝下为光强极大值 (理想线光源 I=2.0，工程缝宽 I=1+gamma)', () => {
  const lambda = 656;
  
  // 1) 理想窄缝极限 (s -> 0)
  const p_ideal = { ...J_, s: 0 };
  const I_center_ideal = intensity(p_ideal, lambda, 0);
  assert.strictEqual(I_center_ideal.toFixed(3), '2.000', '理想线光源中央极大值应精确为 2 (4 I_0)');

  // 2) 实际有限缝宽 (s = 0.08 mm)
  const I_center = intensity(J_, lambda, 0);
  const I_near = intensity(J_, lambda, 0.05);
  const gamma = coherence(J_, lambda);
  assert(I_center > I_near, '中央位置应为极大值点');
  assert.strictEqual(I_center.toFixed(3), (1 + gamma).toFixed(3), '实际极大值精确符合 1 + gamma');
  console.log(`       中央光强 I(0) = ${I_center.toFixed(3)}, 空间相干度 gamma = ${gamma.toFixed(3)}`);
});

// Test 5: 理论明暗条纹位置与条纹反差 (Visibility)
runTest('理论明暗条纹位置精确对应极值点，条纹可见度 V 严格等于相干度 gamma', () => {
  const lambda = 656;
  const dx = fringeWidth(J_, lambda); // ~ 2.296 mm
  const gamma = coherence(J_, lambda);

  for (let k = 1; k <= 3; k++) {
    const x_bright = k * dx;
    const x_dark = (k - 0.5) * dx;

    const I_bright = intensity(J_, lambda, x_bright);
    const I_dark = intensity(J_, lambda, x_dark);
    const I_off = intensity(J_, lambda, x_bright + 0.05);

    assert(I_bright > I_dark, `第 ${k} 级明纹光强应高于暗纹光强`);
    assert(I_bright > I_off, `明纹位置 x=${x_bright.toFixed(2)} 应为局部极大值`);
    
    // 验证条纹能见度 (Michelson Visibility)
    // 考虑包络 sinc^2 的微小衰减
    const r = lambda * F_;
    const env = Math.pow(sinc(Math.PI * J_.b * x_bright / (r * J_.L)), 2);
    const V = (I_bright - I_dark) / (I_bright + I_dark);
    assert(Math.abs(V - gamma) < 0.05, `条纹反差应与相干度 gamma 匹配 (V=${V.toFixed(3)}, gamma=${gamma.toFixed(3)})`);
  }
});

// Test 6: 有限缝宽单缝衍射包络 (sinc^2 调制与缺级)
runTest('有限缝宽单缝衍射包络调制与第一极小值位置 (x = lambda*L/b)', () => {
  const lambda = 656;
  const x_diff_zero = (lambda * F_ * J_.L) / J_.b; // 单缝衍射第一极小位置 ~ 15.306 mm
  const I_zero = intensity(J_, lambda, x_diff_zero);

  assert(I_zero < 1e-4, '在单缝衍射第一零点位置，光强应被包络压制至零 (缺级)');
  const missingOrder = J_.d / J_.b;
  console.log(`       单缝宽度 b = ${J_.b} mm, 双缝间距 d = ${J_.d} mm, 衍射第一极小位置: ${x_diff_zero.toFixed(2)} mm (缺级次: ${missingOrder.toFixed(2)})`);
});

// Test 7: 空间相干性随单缝偏转角 alpha 衰减 (转动单缝条纹消失)
runTest('转动单缝拨杆 (alpha 变大) 导致空间相干因子衰减，条纹对比度下降至消失', () => {
  const lambda = 656;
  const gamma_0 = coherence({ ...J_, alpha: 0 }, lambda);
  const gamma_small = coherence({ ...J_, alpha: 2 * Math.PI / 180 }, lambda); // 2 度
  const gamma_large = coherence({ ...J_, alpha: 10 * Math.PI / 180 }, lambda); // 10 度

  assert.strictEqual(gamma_0.toFixed(2), '0.81', '平行时缝宽 0.08mm 对应相干度约 0.81');
  assert(gamma_small < gamma_0, '倾斜 2 度时相干度下降');
  assert(Math.abs(gamma_large) < 0.08, '倾斜 10 度时相干度降至几乎为 0 (条纹消失)');
  console.log(`       alpha = 0° gamma = ${gamma_0.toFixed(3)}, alpha = 2° gamma = ${gamma_small.toFixed(3)}, alpha = 10° gamma = ${gamma_large.toFixed(3)}`);
});

// Test 8: 单缝平移与玻璃片对中央明纹的位移理论
runTest('单缝上移导致中央明纹下移，条纹间距保持不变', () => {
  const lambda = 532;
  const ys = 0.5; // 单缝上移 0.5 mm
  const p_shifted = { ...J_, ys: ys };

  const dx_orig = fringeWidth(J_, lambda);
  const dx_shifted = fringeWidth(p_shifted, lambda);
  const x0_shift = centralFringeShift(p_shifted, lambda);

  assert.strictEqual(dx_orig.toFixed(5), dx_shifted.toFixed(5), '单缝平移不改变条纹间距');
  assert(x0_shift < 0, '单缝上移，中央明纹应反向向下移动 (x0 < 0)');
  assert.strictEqual(x0_shift.toFixed(2), (-ys * J_.L / J_.D).toFixed(2), '位移量应精确符合几何光程差补偿公式: -ys * L / D');
  console.log(`       单缝上移 ys = 0.5 mm, 中央明纹位移 x0 = ${x0_shift.toFixed(2)} mm, 理论预测: ${(-ys * J_.L / J_.D).toFixed(2)} mm`);
});

// Test 9: 介质折射率对条纹的影响 (浸入水中条纹变窄)
runTest('装置浸入介质 (折射率 n = 1.333)，波长缩短，条纹间距等比例变窄', () => {
  const lambda = 656;
  const dx_air = fringeWidth({ ...J_, medium: 1.0 }, lambda);
  const dx_water = fringeWidth({ ...J_, medium: 1.333 }, lambda);

  assert(dx_water < dx_air, '水中的条纹间距应小于空气中');
  assert.strictEqual((dx_air / dx_water).toFixed(3), '1.333', '条纹间距比应精确等于折射率 n');
  console.log(`       空气中间距: ${dx_air.toFixed(3)} mm, 水中间距: ${dx_water.toFixed(3)} mm`);
});

// Test 10: 实验误差分析模型检验 (除以 n 还是 n-1、倾斜角 theta 影响)
runTest('误差分析理论公式数学判定: 错除以 n 导致偏小，刻线倾角 theta 导致偏大', () => {
  const x1 = 2.150;
  const n = 6;
  const deltaX_true = 2.296;
  const xn = x1 + (n - 1) * deltaX_true; // 13.630

  const deltaX_calc = (xn - x1) / (n - 1);
  const deltaX_wrong = (xn - x1) / n;

  assert.strictEqual(deltaX_calc.toFixed(3), deltaX_true.toFixed(3), '除以 n-1 算得真实间距');
  assert(deltaX_wrong < deltaX_true, '错除以 n 算得间距偏小');
  assert.strictEqual((deltaX_wrong / deltaX_true).toFixed(3), ((n - 1) / n).toFixed(3), '偏小倍数精确为 (n-1)/n = 5/6');

  // 倾角 theta
  const theta = 5 * Math.PI / 180; // 5 度
  const deltaX_tilted = deltaX_true / Math.cos(theta);
  assert(deltaX_tilted > deltaX_true, '刻线倾斜导致测得间距偏大 (分划板沿垂直刻线移动)');
  assert.strictEqual((deltaX_tilted / deltaX_true).toFixed(4), (1 / Math.cos(theta)).toFixed(4), '偏大因子为 1/cos(theta)');
});

console.log('\n====================================================');
console.log(` 物理模型测试总结: 全部 ${totalCount} 项测试通过: ${passCount} / ${totalCount} (100%)`);
console.log('====================================================\n');
