import { defineConfig } from 'vitepress'

const koSidebar = [
  {
    text: '시작하기',
    items: [
      { text: '프로젝트 소개', link: '/' },
      { text: '학습 가이드', link: '/guide/' },
      { text: '로드맵', link: '/roadmap' },
      { text: '용어집', link: '/glossary' }
    ]
  },
  {
    text: '기초 트랙',
    items: [
      { text: '수학 기초 개요', link: '/math/' },
      { text: '함수, 로그, 지수', link: '/math/functions-growth' },
      { text: '벡터와 행렬', link: '/math/vectors-matrices' },
      { text: '미분과 gradient', link: '/math/gradients' },
      { text: '확률과 softmax', link: '/math/probability' },
      { text: '수학 최종 점검', link: '/math/final-checkpoint' },
      { text: 'Python과 PyTorch', link: '/python-pytorch/' },
      { text: '딥러닝 기본기', link: '/deep-learning/' }
    ]
  },
  {
    text: '수학 심화 트랙 (선택 심화)',
    items: [
      { text: '수학 심화 개요', link: '/math-advanced/' },
      { text: '삼각함수와 주기성', link: '/math-advanced/trigonometry-periodicity' },
      { text: '고급 선형대수', link: '/math-advanced/advanced-linear-algebra' },
      { text: '고유값, 고유벡터, SVD', link: '/math-advanced/eigendecomposition-svd' },
      { text: '다변수 미적분', link: '/math-advanced/multivariable-calculus' },
      { text: '통계와 추정', link: '/math-advanced/statistics-estimation' },
      { text: '최적화와 수치 안정성', link: '/math-advanced/optimization-numerical-stability' },
      { text: '정보 이론', link: '/math-advanced/information-theory' },
      { text: '푸리에와 위치 신호', link: '/math-advanced/fourier-positional-signals' },
      { text: '수학 심화 최종 점검', link: '/math-advanced/final-checkpoint' }
    ]
  },
  {
    text: '모델 트랙',
    items: [
      { text: 'NLP와 Transformer 이전 배경', link: '/nlp/' },
      { text: 'Transformer', link: '/transformers/' },
      { text: 'LLM과 GPT-3', link: '/llms/' },
      { text: 'LLM 실전 기본기', link: '/llm-basics/' },
      { text: '강화학습과 RLHF', link: '/rl/' }
    ]
  },
  {
    text: '엔지니어링 트랙',
    items: [
      { text: 'AI Engineering', link: '/ai-engineering/' },
      { text: '프로젝트', link: '/projects/' }
    ]
  }
]

const enSidebar = [
  {
    text: 'Start Here',
    items: [
      { text: 'Overview', link: '/en/' },
      { text: 'Learning Guide', link: '/en/guide/' },
      { text: 'Roadmap', link: '/en/roadmap' },
      { text: 'Glossary', link: '/en/glossary' }
    ]
  },
  {
    text: 'Foundations',
    items: [
      { text: 'Math Foundations Overview', link: '/en/math/' },
      { text: 'Functions, Logs, and Exponentials', link: '/en/math/functions-growth' },
      { text: 'Vectors and Matrices', link: '/en/math/vectors-matrices' },
      { text: 'Derivatives and Gradients', link: '/en/math/gradients' },
      { text: 'Probability and Softmax', link: '/en/math/probability' },
      { text: 'Math Final Checkpoint', link: '/en/math/final-checkpoint' },
      { text: 'Python and PyTorch', link: '/en/python-pytorch/' },
      { text: 'Deep Learning Basics', link: '/en/deep-learning/' }
    ]
  },
  {
    text: 'Math Expansion Track (Optional Deep Dive)',
    items: [
      { text: 'Advanced Math Overview', link: '/en/math-advanced/' },
      { text: 'Trigonometry and Periodicity', link: '/en/math-advanced/trigonometry-periodicity' },
      { text: 'Advanced Linear Algebra', link: '/en/math-advanced/advanced-linear-algebra' },
      { text: 'Eigendecomposition and SVD', link: '/en/math-advanced/eigendecomposition-svd' },
      { text: 'Multivariable Calculus', link: '/en/math-advanced/multivariable-calculus' },
      { text: 'Statistics and Estimation', link: '/en/math-advanced/statistics-estimation' },
      { text: 'Optimization and Numerical Stability', link: '/en/math-advanced/optimization-numerical-stability' },
      { text: 'Information Theory', link: '/en/math-advanced/information-theory' },
      { text: 'Fourier and Positional Signals', link: '/en/math-advanced/fourier-positional-signals' },
      { text: 'Advanced Math Final Checkpoint', link: '/en/math-advanced/final-checkpoint' }
    ]
  },
  {
    text: 'Models',
    items: [
      { text: 'NLP Before Transformers', link: '/en/nlp/' },
      { text: 'Transformers', link: '/en/transformers/' },
      { text: 'LLMs and GPT-3', link: '/en/llms/' },
      { text: 'Practical LLM Basics', link: '/en/llm-basics/' },
      { text: 'Reinforcement Learning', link: '/en/rl/' }
    ]
  },
  {
    text: 'Engineering',
    items: [
      { text: 'AI Engineering', link: '/en/ai-engineering/' },
      { text: 'Projects', link: '/en/projects/' }
    ]
  }
]

export default defineConfig({
  base: '/llm-fundamentals/',
  cleanUrls: true,
  title: 'LLM Fundamentals',
  description: 'From high school math to GPT-3, PyTorch, RL, and practical AI engineering.',
  head: [
    ['link', { rel: 'icon', href: '/llm-mark.svg' }],
    ['meta', { name: 'theme-color', content: '#0f3d3e' }]
  ],
  themeConfig: {
    logo: '/llm-mark.svg',
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jaeyoung0509/llm-fundamentals' }
    ],
    footer: {
      message: 'Built with VitePress, Mermaid, and PyTorch-focused learning paths.',
      copyright: 'Copyright 2026 LLM Fundamentals'
    }
  },
  locales: {
    root: {
      label: '한국어',
      lang: 'ko-KR',
      title: 'LLM Fundamentals',
      description: '고등학교 수학부터 GPT-3, PyTorch, RL, AI 엔지니어링까지 이어지는 이중 언어 ebook.',
      themeConfig: {
        nav: [
          { text: '학습 가이드', link: '/guide/' },
          { text: '로드맵', link: '/roadmap' },
          { text: '영어', link: '/en/' }
        ],
        sidebar: koSidebar,
        outline: {
          label: '이 페이지에서'
        },
        docFooter: {
          prev: '이전',
          next: '다음'
        },
        sidebarMenuLabel: '메뉴',
        returnToTopLabel: '맨 위로',
        darkModeSwitchLabel: '테마',
        lightModeSwitchTitle: '라이트 모드',
        darkModeSwitchTitle: '다크 모드',
        langMenuLabel: '언어'
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'LLM Fundamentals',
      description: 'A bilingual ebook path from math foundations to GPT-3, PyTorch, RL, and AI engineering.',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Roadmap', link: '/en/roadmap' },
          { text: '한국어', link: '/' }
        ],
        sidebar: enSidebar,
        outline: {
          label: 'On this page'
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Back to top',
        darkModeSwitchLabel: 'Theme',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        langMenuLabel: 'Languages'
      }
    }
  }
})
