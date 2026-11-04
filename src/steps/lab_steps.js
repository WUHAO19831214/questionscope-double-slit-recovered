/**
 * 实验步骤流与状态判定
 * Laboratory Procedural Steps & Validation Logic
 */

export const LAB_STEPS = [
  {
    stepIndex: 1,
    id: 'mount_bench',
    title: '把光源、透镜、遮光筒装上光具座',
    chapter: '光路搭建',
    view: 'bench',
    instruction: '按光路的顺序，从左到右把光源、凸透镜、遮光筒依次放到光具座上。遮光筒后端已经装着毛玻璃屏。',
    tip: '点托盘里的器材，移到导轨上方放下。光源放最左端，透镜离灯约 8~12 cm，遮光筒放在透镜右侧且预留 15 cm 空间插单缝。',
    checks: [
      { text: '光源放在光具座最左端', key: 'lamp_left' },
      { text: '凸透镜放在光源右边 8~12 cm 处', key: 'lens_pos' },
      { text: '遮光筒放在透镜右边 15 cm 以上处', key: 'tube_pos' }
    ]
  },
  {
    stepIndex: 2,
    id: 'power_connection',
    title: '连接学生电源并开启',
    chapter: '电路接通',
    view: 'bench',
    instruction: '把光源的插头插到学生电源的“交流输出”接线柱上，电压旋钮调至灯泡额定工作电压 12 V，并打开电源开关。',
    tip: '点击桌面上的电源插头完成插入；滚轮旋转电压旋钮至 12V 档位；点击红色船型开关通电。'
  },
  {
    stepIndex: 3,
    id: 'darken_room',
    title: '关掉教室的灯（拉上窗帘）',
    chapter: '暗室环境',
    view: 'bench',
    instruction: '干涉条纹属于微弱光信号，在明亮环境下人眼对比度不足。关掉教室日光灯，让视觉在暗适应下观察透镜出射的平行光束。',
    tip: '点击顶栏右上角的“电灯”图标或按键盘快捷键 L 关灯。'
  },
  {
    stepIndex: 4,
    id: 'coaxial_alignment',
    title: '调共轴：让光沿遮光筒的轴线射到屏上',
    chapter: '共轴调节',
    view: 'bench',
    instruction: '调节光源的高低前后旋钮以及透镜的升降旋钮，使白炽灯丝发出的光斑准确落在遮光筒前端中心，并沿筒轴线射到毛玻璃屏正中央。',
    tip: '观察毛玻璃屏上的光斑位置，若偏上则下调灯箱或上调透镜，直至光斑完全居中。'
  },
  {
    stepIndex: 5,
    id: 'install_slits',
    title: '装上单缝和双缝',
    chapter: '狭缝安装',
    view: 'bench',
    instruction: '双缝插进遮光筒前端插槽；单缝安放在透镜与双缝之间，保持单缝与双缝间距在 5~10 cm 之间。',
    tip: '点击托盘双缝自动卡入筒口；托盘单缝拖到导轨上，间距过小条纹模糊，间距过大条纹过暗。'
  },
  {
    stepIndex: 6,
    id: 'align_parallel',
    title: '转动单缝拨杆，使单缝与双缝严格平行',
    chapter: '平行对准',
    view: 'screen',
    instruction: '左右扳动单缝架上的拨杆转动单缝。当单缝与双缝完全平行时，两缝的相干对比度达到最大值，屏上展现最清晰明亮的干涉条纹。',
    tip: '观察屏上条纹的反差度，微调拨杆直到黑白明暗对比达到最锐利状态。'
  },
  {
    stepIndex: 7,
    id: 'insert_red_filter',
    title: '在单缝前插入红色滤光片',
    chapter: '单色光干涉',
    view: 'screen',
    instruction: '将红色滤光片插在单缝前方的滤光片插槽内。白光干涉条纹随即转化为清晰的纯红色单色光干涉条纹。',
    tip: '点击托盘中的红色滤光片自动插入单缝前端插槽。'
  },
  {
    stepIndex: 8,
    id: 'install_head_focus',
    title: '换装测量头，调节目镜调焦环',
    chapter: '目镜观察',
    view: 'head',
    instruction: '取下毛玻璃屏，装上测量头。转动目镜调焦轮，直到看清分划板上的十字刻线及清晰的干涉条纹；转动测量头使竖直刻线与条纹严格平行。',
    tip: '按 3 进入目镜视角，按 [ 或 ] 调焦，按 Q 或 E 转动测量头对齐刻线。'
  },
  {
    stepIndex: 9,
    id: 'record_x1',
    title: '对准第 1 条亮纹中心，读出 x₁',
    chapter: '数据测量',
    view: 'head',
    instruction: '旋转手轮，使分划板竖直中心刻线精确对准选定的第 1 条亮纹中心。看手轮的主尺与微分筒刻度读数，记为 x₁。',
    tip: '按 ← 或 → 转动手轮（按住 Shift 慢调），点击“读手轮”在记录本中完成精确读数输入。'
  },
  {
    stepIndex: 10,
    id: 'record_xn_and_calc',
    title: '同方向转动手轮对准第 n 条亮纹，读出 xₙ 并计算波长',
    chapter: '波长计算',
    view: 'head',
    instruction: '同方向继续旋转手轮数过若干条亮纹（如数至第 6 条），对准亮纹中心读出 xₙ。计算条纹间距 $\\Delta x = |x_n - x_1| / (n - 1)$，并由 $\\lambda = \\dfrac{d}{L}\\Delta x$ 计算红光波长。',
    tip: '必须向同一方向转动避免螺杆反向间隙空程误差；除以 n-1 而不是 n。'
  },
  {
    stepIndex: 11,
    id: 'repeat_green_filter',
    title: '换用绿色滤光片重复测量，对比两色光波长',
    chapter: '对比实验',
    view: 'head',
    instruction: '拔出红光滤光片，插入绿色滤光片，观察条纹间距变窄的现象，重复测量 x₁ 和 xₙ，得出绿光波长并与红光进行定量对比。',
    tip: '绿光波长约为 532 nm 左右，红光约为 656 nm 左右，定量验证波长越短条纹间距越密。'
  }
];
