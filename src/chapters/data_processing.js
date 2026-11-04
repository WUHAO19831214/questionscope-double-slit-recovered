/**
 * 第二部分：处理数据章节配置与题库
 * Data Processing Chapter Topics & Quizzes
 */

export const DATA_PROCESSING_TOPICS = [
  {
    id: 'handwheel_reading',
    title: '读手轮：和螺旋测微器一个读法',
    kicker: '读数技能',
    lead: '测量头的手轮就是一个<b>螺旋测微器</b>：手轮转一圈，分划板移动 0.5 mm；手轮上一圈 50 格，每格 0.01 mm。读数 = 固定刻度（注意看<b>半毫米刻线</b>露没露出来）+ 可动刻度格数（估读一位）× 0.01 mm。',
    quizzes: [
      {
        question: '手轮上固定刻度露出的整毫米刻线是 7，半毫米刻线也已露出，可动刻度上与基线对齐的是第 23.6 格。读数是：',
        options: [
          '7.236 mm',
          '(Recommended) 7.736 mm',
          '7.0236 mm',
          '7.5236 mm'
        ],
        answerIndex: 1,
        explain: '$7\\ \\text{mm} + 0.5\\ \\text{mm} + 23.6 \\times 0.01\\ \\text{mm} = 7.736\\ \\text{mm}$。半毫米刻线露出来了，必须加上 0.5 mm；可动刻度每格为 0.01 mm。'
      }
    ]
  },
  {
    id: 'why_n_minus_one',
    title: '为什么要测 n 条？为什么除以 n − 1？',
    kicker: '最常考考点',
    lead: '一个条纹间距只有 2 mm 左右，每次判断亮纹中心（对准）都会有约 0.03 mm 的误差，比手轮的读数误差大得多；直接测一个间距，相对误差较大。从第 1 条测到第 n 条，再平均，误差就分摊了。注意：第 1 条到第 n 条之间只有 <b>n − 1 个</b>间距。',
    quizzes: [
      {
        question: '分划板中心刻线对准第 1 条亮纹时读数 $x_1$，对准第 7 条亮纹时读数 $x_7$。相邻亮纹的间距是：',
        options: [
          '$\\dfrac{x_7 - x_1}{7}$',
          '(Recommended) $\\dfrac{x_7 - x_1}{6}$',
          '$\\dfrac{x_7 + x_1}{6}$',
          '$\\dfrac{x_7 - x_1}{8}$'
        ],
        answerIndex: 1,
        explain: '第 1 条到第 7 条之间共有 $7 - 1 = 6$ 个间距，因此相邻亮纹间距为 $\\Delta x = \\dfrac{x_7 - x_1}{6}$。'
      }
    ]
  },
  {
    id: 'formula_derivation',
    title: '$\\Delta x = \\dfrac{L}{d}\\lambda$ 是怎么来的',
    kicker: '核心原理',
    lead: '观察屏上任一点 P 到两条缝的光程差为 $\\delta = r_2 - r_1$。在远场近轴条件下（$L \\gg d$ 且 $x \\ll L$），$\\delta \\approx d\\sin\\theta \\approx d\\tan\\theta = d\\dfrac{x}{L}$。当路程差是波长的整数倍时发生相长干涉形成明纹：$d\\dfrac{x}{L} = k\\lambda \\implies x_k = k\\dfrac{L}{d}\\lambda$。相邻明纹间距即为 $\\Delta x = \\dfrac{L}{d}\\lambda$。',
    quizzes: [
      {
        question: '双缝干涉实验中，若想增大观察屏上的条纹间距 $\\Delta x$，可以采取的方法是：',
        options: [
          '减小双缝到屏的距离 $L$',
          '增大两缝之间的间距 $d$',
          '(Recommended) 改用波长更长的单色光',
          '增大单缝到双缝的距离 $D$'
        ],
        answerIndex: 2,
        explain: '根据 $\\Delta x = \\dfrac{L}{d}\\lambda$，条纹间距与波长 $\\lambda$、屏距 $L$ 成正比，与双缝间距 $d$ 成反比，与单缝到双缝的距离 $D$ 无关。改用波长更长的红光可显著增大条纹间距。'
      }
    ]
  }
];
