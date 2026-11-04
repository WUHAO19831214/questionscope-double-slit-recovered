/**
 * 测量头手轮与螺旋测微读数模型
 * Micrometer Handwheel Reading & Sub-millimeter Vernier Model
 */

/**
 * 螺旋测微器读数规则：
 * 螺距 P = 0.5 mm（转动一整圈，测微螺杆/分划板移动 0.5 mm）
 * 可动刻度（微分筒）分度数 N = 50 格
 * 仪器分度值精度 = 0.5 mm / 50 = 0.01 mm
 * 估读一位至 0.001 mm (1 微米)
 */

export class HandwheelModel {
  constructor(initialReading = 0.0) {
    this.reading = initialReading; // 当前读数 (mm)
  }

  setReading(mm) {
    this.reading = Math.max(0, Math.min(25.0, mm));
  }

  getReading() {
    return this.reading;
  }

  /**
   * 解构读数的组成部分：
   * 1. mainWhole: 固定刻度整毫米部分 (整数 mm)
   * 2. hasHalf: 半毫米刻线是否露出 (0.0 或 0.5 mm)
   * 3. thimbleDiv: 可动刻度基线对齐格数 (0.0 ~ 49.9)
   */
  decompose() {
    const total = this.reading;
    const mainWhole = Math.floor(total);
    const remainder = total - mainWhole;
    const hasHalf = remainder >= 0.5;
    const thimbleValue = hasHalf ? remainder - 0.5 : remainder;
    const thimbleDiv = thimbleValue / 0.01;

    return {
      mainWhole,
      hasHalf,
      thimbleDiv,
      formatted: total.toFixed(3)
    };
  }

  /**
   * 判定学生输入的读数是否正确
   * 容许估读误差 ±0.003 mm
   */
  checkAnswer(inputVal) {
    const target = this.reading;
    const diff = inputVal - target;
    const isOk = Math.abs(diff) <= 0.003;

    let hint = '';
    if (isOk) {
      hint = '✓ 读数准确！估读位在合理公差范围内。';
    } else if (Math.abs(Math.abs(diff) - 0.5) < 0.01) {
      hint = '✗ 差了 0.5 mm：注意观察固定刻度下方的<b>半毫米刻线</b>是否已经露出来。';
    } else if (Math.abs(diff) < 0.02) {
      hint = '✗ 最后一位需要<b>估读</b>：可动刻度格数需估读到十分之一格（即 0.001 mm）。';
    } else {
      hint = '✗ 读数有误，请按：整毫米刻度 + 半毫米(若露) + 可动刻度格数×0.01 mm 组合。';
    }

    return {
      isOk,
      diff,
      hint,
      correct: target.toFixed(3)
    };
  }
}
