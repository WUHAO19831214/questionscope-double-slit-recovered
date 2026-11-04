/**
 * 第三部分：误差分析章节配置与交互分析
 * Error Analysis Chapter Topics & Quizzes
 */

export const ERROR_ANALYSIS_TOPICS = [
  {
    id: 'divide_by_n_error',
    title: '数 n 条亮纹，错除以 n',
    kicker: '常见失误',
    lead: '把“第 1 条到第 n 条”的距离错除以 n：每个间距都被算小了，$\\Delta x$ 偏小，计算波长 $\\lambda = \\dfrac{d}{L}\\Delta x$ 也<b>偏小</b>。',
    quizzes: [
      {
        question: '在用双缝干涉测波长实验中，若误将第 1 条亮纹到第 6 条亮纹的距离除以 6 得到条纹间距，则波长测定值比真实值：',
        options: [
          '偏大',
          '(Recommended) 偏小',
          '相等',
          '无法确定'
        ],
        answerIndex: 1,
        explain: '第 1 条到第 6 条之间只有 5 个间距，错除以 6 使得算得的 $\\Delta x$ 变为真实值的 $5/6$，故求得的波长 $\\lambda$ 偏小。'
      }
    ]
  },
  {
    id: 'tilted_reticle_error',
    title: '测量头刻线没调正，与条纹成夹角 θ',
    kicker: '系统误差',
    lead: '测量头没转正，分划板竖直刻线和亮条纹之间有夹角 $\\theta$。手轮只能带动分划板沿<b>垂直于自身刻线</b>的方向移动。从一条亮纹中心走到下一条，分划板沿移动方向移动的距离为 $\\dfrac{\\Delta x}{\\cos\\theta} > \\Delta x$。因此测出的间距偏大，计算出的波长 $\\lambda$ <b>偏大</b>。这是系统误差，测量再多次也无法被平均掉，必须在测量前转动测量头调至严格平行。',
    quizzes: [
      {
        question: '若测量头分划板刻线未调竖直，与干涉条纹夹角为 $\\theta$，则测得的波长与实际波长的关系为：',
        options: [
          '$\\lambda_{\\text{测}} = \\lambda \\cos\\theta$（偏小）',
          '(Recommended) $\\lambda_{\\text{测}} = \\dfrac{\\lambda}{\\cos\\theta}$（偏大）',
          '$\\lambda_{\\text{测}} = \\lambda \\sin\\theta$（偏小）',
          '$\\lambda_{\\text{测}} = \\lambda$（无影响）'
        ],
        answerIndex: 1,
        explain: '分划板移动方向与条纹法线方向夹角为 $\\theta$，实际移动位移 $\\Delta x\' = \\Delta x / \\cos\\theta > \\Delta x$，代入公式使得算得的波长偏大。'
      }
    ]
  },
  {
    id: 'distance_L_error',
    title: '屏距 L 的起点选错：从单缝算到屏',
    kicker: '操作概念失误',
    lead: '双缝干涉公式 $\\lambda = \\dfrac{d}{L}\\Delta x$ 中的 $L$ 是<b>双缝到观察屏（毛玻璃）</b>的距离。如果粗心把单缝到屏的距离当成了 $L$，由于单缝在双缝的前方，测得的 $L$ 偏大，由反比关系可知算得的波长 $\\lambda$ <b>偏小</b>。',
    quizzes: [
      {
        question: '某同学测量时，误把“单缝到光屏的距离”记录为公式中的 $L$ 并进行计算，则测得的波长：',
        options: [
          '偏大',
          '(Recommended) 偏小',
          '不变',
          '与单缝和双缝间距无关'
        ],
        answerIndex: 1,
        explain: '单缝到屏的距离 $L\' = L + D > L$。由 $\\lambda = \\dfrac{d}{L}\\Delta x$ 可知，分母 $L$ 偏大，计算出的波长 $\\lambda$ 必然偏小。'
      }
    ]
  },
  {
    id: 'alignment_edge_vs_center',
    title: '对准中心与对准边缘',
    kicker: '操作规范',
    lead: '标准的做法是每次都让分划板竖直刻线对准亮纹的<b>正中心</b>。如果两次都对准亮纹的<b>同一侧边缘</b>（如都对准左边缘），由于每条亮纹宽度一致，边缘偏差在两读数相减时被严格抵消，间距结果依然准确；但如果一次对中心、一次对边缘，或者一次左边缘、一次右边缘，间距就会多走或少走半个亮纹宽度，产生较大偶然误差。',
    quizzes: [
      {
        question: '某同学在测 $x_1$ 时对准亮纹左边缘，在测 $x_n$ 时也对准亮纹左边缘，所得的 $\\Delta x$：',
        options: [
          '偏大',
          '偏小',
          '(Recommended) 无系统偏差',
          '无法用于计算波长'
        ],
        answerIndex: 2,
        explain: '同一侧边缘的位移与中心之间的位移完全一致：$(x_n + \\Delta) - (x_1 + \\Delta) = x_n - x_1$，系统误差互相抵消。'
      }
    ]
  }
];
