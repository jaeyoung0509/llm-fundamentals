import { defineConfig } from 'vitepress'

const koSidebar = [
  {
    text: '시작하기',
    items: [
      { text: '프로젝트 소개', link: '/' },
      { text: '학습 가이드', link: '/guide/' },
      { text: '로드맵', link: '/roadmap' }
    ]
  },
  {
    text: '기초 트랙',
    items: [
      { text: '수학 기초', link: '/math/' },
      { text: 'Python과 PyTorch', link: '/python-pytorch/' },
      { text: '딥러닝 기본기', link: '/deep-learning/' }
    ]
  },
  {
    text: '모델 트랙',
    items: [
      { text: 'Transformer', link: '/transformers/' },
      { text: 'LLM과 GPT-3', link: '/llms/' },
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
      { text: 'Roadmap', link: '/en/roadmap' }
    ]
  },
  {
    text: 'Foundations',
    items: [
      { text: 'Math Foundations', link: '/en/math/' },
      { text: 'Python and PyTorch', link: '/en/python-pytorch/' },
      { text: 'Deep Learning Basics', link: '/en/deep-learning/' }
    ]
  },
  {
    text: 'Models',
    items: [
      { text: 'Transformers', link: '/en/transformers/' },
      { text: 'LLMs and GPT-3', link: '/en/llms/' },
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
