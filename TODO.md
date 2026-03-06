# LLM Fundamentals Ebook TODO

## 프로젝트 목표

- 고등학교 기본 수학을 배운 학습자가 AI 엔지니어로 성장할 수 있도록 학습 경로를 설계한다.
- 단순 개념 설명이 아니라 "수학 이해 -> PyTorch 구현 -> 모델 해석 -> 실무 패턴 적용"까지 연결한다.
- 한국어와 영어를 모두 지원하는 VitePress 기반 ebook/문서 사이트를 만든다.
- GPT-3까지의 핵심 발전사를 이해시키고, 이후 강화학습과 최신 실무 패턴까지 확장한다.

## 대표 독자 페르소나

- 파이썬은 잘하는 중학생
- 이제 고등학교에 올라가며 수학과 모델링을 본격적으로 연결해 배우려는 학습자
- LLM을 단순히 사용하는 수준이 아니라 이해하고 구현하고 평가하고 싶은 사람

## 전략: 전체 1차 패스를 먼저 완성

- [ ] 모든 핵심 장에 최소한의 1차 본문을 먼저 채운다.
- [ ] 수학 섹션은 가장 중요한 기반 축으로 유지하되, 다른 장도 비워두지 않는다.
- [ ] 각 장마다 "이 장에서 꼭 가져갈 한 문장"을 넣는다.
- [ ] 각 장마다 "다음 장으로 어떻게 연결되는가"를 넣는다.
- [ ] 1차 패스 완료 후, 수학/Transformer/AI Engineering 순으로 2차 심화를 진행한다.

## 핵심 독자

- AI를 처음 체계적으로 배우려는 입문자
- 수학이 약하지만 구현 중심으로 배우고 싶은 개발자
- LLM, RL, MLOps, 평가, 배포까지 실무 감각을 갖추고 싶은 예비 AI 엔지니어

## MVP 정의

MVP는 아래 조건을 만족하면 된다.

- 학습자가 한국어 또는 영어로 같은 커리큘럼을 따라갈 수 있다.
- 최소 10개 내외의 핵심 장에서 수학, 딥러닝, Transformer, GPT-3, PyTorch 실습을 다룬다.
- 각 장마다 설명, Mermaid 다이어그램, 수식, 예제 코드, 연습 문제를 포함한다.
- 최소 3개의 실전 프로젝트를 제공한다.
- 문서 사이트는 VitePress로 빌드되고, 로컬에서 바로 실행 가능하다.

## 제안 정보 구조

```text
docs/
  .vitepress/
    config.ts
    theme/
  ko/
    index.md
    math/
    python-pytorch/
    deep-learning/
    transformers/
    llms/
    rl/
    ai-engineering/
    projects/
  en/
    index.md
    math/
    python-pytorch/
    deep-learning/
    transformers/
    llms/
    rl/
    ai-engineering/
    projects/
```

## 콘텐츠 로드맵

### 0. 프롤로그와 학습 가이드

- [ ] 책의 목표, 독자, 선수 지식, 학습 순서를 정의한다.
- [ ] "왜 이 순서로 배우는가"를 설명하는 로드맵 다이어그램을 만든다.
- [ ] 개발 환경 가이드를 작성한다: Python, uv 또는 pip, PyTorch, Jupyter, VS Code.

### 1. 수학 기초

- [ ] 함수, 그래프, 로그, 지수의 직관을 설명한다.
- [ ] 벡터와 행렬의 기본 연산을 시각적으로 설명한다.
- [ ] 미분과 gradient의 의미를 손실 함수 관점에서 설명한다.
- [ ] 확률, 조건부확률, 기대값, 분산을 모델링 관점으로 설명한다.
- [ ] 선형대수와 미적분이 신경망에서 어떻게 쓰이는지 연결한다.

#### 수학 섹션 우선 TODO

- [ ] 함수/로그/지수 페이지를 `softmax`, `cross-entropy`, `scale`과 직접 연결한다.
- [ ] 벡터/행렬 페이지를 `embedding`, `linear layer`, `attention score` 사례와 연결한다.
- [ ] 미분/gradient 페이지에 chain rule과 backpropagation 다이어그램을 추가한다.
- [ ] 확률 페이지에 분포, 기대값, 분산, softmax, sampling의 연결을 추가한다.
- [ ] 수학 하위 페이지마다 연습 문제와 "다음 장 연결" 섹션을 넣는다.
- [ ] 영어 번역은 한국어 수학 원문이 안정화된 직후 동기화한다.

### 2. Python과 PyTorch 입문

- [ ] Python 기초 문법보다 "텐서 사고 방식"에 초점을 둔 장을 만든다.
- [ ] NumPy와 PyTorch tensor 연산 차이를 설명한다.
- [ ] autograd, dataset, dataloader, training loop를 직접 구현한다.
- [ ] 작은 회귀/분류 예제를 통해 학습 루프를 완성한다.

### 3. 딥러닝 기본기

- [ ] 퍼셉트론, MLP, 활성화 함수, 손실 함수를 설명한다.
- [ ] backpropagation을 계산 그래프와 함께 설명한다.
- [ ] regularization, normalization, optimization의 역할을 정리한다.
- [ ] CNN과 RNN은 역사적 맥락과 한계 중심으로 짧게 정리한다.

### 4. NLP와 Transformer 이전 배경

- [ ] 토큰화, one-hot, embedding의 진화를 설명한다.
- [ ] n-gram, word2vec, seq2seq, attention의 필요성을 소개한다.
- [ ] 기존 NLP 접근의 병목을 Transformer로 연결한다.

### 5. Transformer 핵심

- [ ] self-attention, multi-head attention, positional encoding을 설명한다.
- [ ] encoder/decoder 구조와 autoregressive generation 차이를 설명한다.
- [ ] Mermaid로 attention 흐름도를 시각화한다.
- [ ] 작은 Transformer 블록을 PyTorch로 구현한다.

### 6. GPT-1 -> GPT-3 이해

- [ ] GPT 계열의 공통 구조와 학습 목표를 설명한다.
- [ ] scale, data, compute가 성능에 미친 영향을 정리한다.
- [ ] few-shot, zero-shot, in-context learning을 설명한다.
- [ ] GPT-3의 의미와 한계를 오늘 시점의 관점에서 정리한다.

### 7. LLM 실전 기본기

- [ ] 토큰 길이, 컨텍스트 윈도우, 샘플링 파라미터를 설명한다.
- [ ] 프롬프트 설계의 기본 패턴을 정리한다.
- [ ] 평가의 기본 단위: accuracy, BLEU/ROUGE류, human eval, task eval을 비교한다.
- [ ] hallucination, bias, safety, 비용 문제를 다룬다.

### 8. 강화학습과 RLHF 입문

- [ ] bandit, MDP, value, policy 개념을 직관적으로 설명한다.
- [ ] Q-learning과 policy gradient를 비교한다.
- [ ] PPO를 고수준에서 설명하고 RLHF와 연결한다.
- [ ] "LLM 이후의 강화학습"이 어디에 쓰이는지 사례 중심으로 정리한다.

### 9. 최신 AI 엔지니어링 실무 패턴

- [ ] 데이터 파이프라인, 실험 추적, 모델 버전 관리의 기본을 정리한다.
- [ ] 평가 중심 개발(eval-driven development) 흐름을 설명한다.
- [ ] RAG, tool calling, agent workflow를 실무 관점에서 구분한다.
- [ ] 배포, 모니터링, observability, 비용 최적화를 다룬다.
- [ ] 보안, 프라이버시, 프롬프트 인젝션 같은 운영 리스크를 다룬다.

### 10. 프로젝트 기반 학습

- [ ] PyTorch로 작은 언어 모델 또는 문자 단위 모델을 구현한다.
- [ ] 문서 QA 또는 미니 RAG 프로젝트를 만든다.
- [ ] 간단한 RL 또는 bandit 실험 프로젝트를 만든다.
- [ ] 각 프로젝트마다 목표, 데이터, 구현, 실험, 회고 템플릿을 제공한다.

## 플랫폼/문서 작업 TODO

- [x] VitePress 초기화
- [x] 한영 다국어 라우팅 구조 설계
- [x] Mermaid, 수식(MathJax/KaTeX), 코드 하이라이트 정책 정리
- [x] 공통 frontmatter/문서 템플릿 정의
- [ ] 장별 목차 자동화 규칙 정리
- [x] 검색, 네비게이션, 사이드바 구조 설계
- [x] 예제 코드 저장 위치 결정: `examples/` 또는 `notebooks/`
- [ ] 이미지/다이어그램 자산 규칙 정의
- [x] CI에서 문서 빌드 검증 추가
- [ ] 배포 대상 결정: GitHub Pages 또는 Vercel

## 집필 원칙

- [ ] 수식은 "정의 -> 직관 -> 예시 -> 코드 연결" 순서로 설명한다.
- [ ] 모든 핵심 개념은 최소 1개의 그림 또는 Mermaid 다이어그램과 함께 설명한다.
- [ ] 모든 구현 장에는 PyTorch 예제를 넣는다.
- [ ] 수학 설명은 필요한 만큼만 하고, 바로 모델/코드와 연결한다.
- [ ] 한국어 원문 작성 후 영어 번역을 붙이거나, 장 단위 동시 작성 전략을 결정한다.
- [ ] 장 끝에는 체크리스트, 연습 문제, 다음 장 연결을 둔다.

## 운영 백로그

- [x] 이슈 템플릿 정의: chapter, exercise, translation, diagram, project
- [x] PR 템플릿 정의: 목적, 변경 내용, 스크린샷, 검증
- [x] 기여 가이드 작성
- [ ] 용어집(glossary) 작성
- [ ] "학습 경로별 추천 순서" 페이지 작성
- [ ] 외부 참고 자료와 원전 논문 링크 정책 정리

## 첫 번째 실행 순서

1. [x] VitePress 프로젝트 초기화
2. [x] 한국어/영어 문서 디렉터리 뼈대 생성
3. [x] 책 전체 목차와 각 장의 학습 목표 확정
4. [x] 1장 수학 기초 초안 작성
5. [x] 2장 PyTorch 입문 초안 작성
6. [x] 5장 Transformer 핵심 초안 작성
7. [x] 예제 코드 저장 구조 확정
8. [x] GitHub 이슈 템플릿과 라벨 전략 정리

## GitHub Epic 이슈 완료 기준

- [x] 저장소 시작 문서가 존재한다.
- [x] 초반 8개 작업이 백로그로 분해된다.
- [x] 이후 구현은 `feature/<issue>-<slug>` 브랜치 규칙으로 진행한다.
- [x] PR 기본 대상 브랜치는 `develop`으로 둔다.

## 메모

- GPT-3까지의 이해를 분명한 중간 목표로 두되, 책의 최종 도착점은 "AI Engineer로 일할 수 있는 사고 체계"에 둔다.
- 최신 주제는 유행을 나열하지 말고, 평가/배포/관측성/운영 리스크처럼 오래 가는 실무 축으로 정리하는 편이 좋다.
- VitePress 기본 사이트, KO/EN 구조, Mermaid 컴포넌트, 예제 코드, CI, 협업 템플릿은 2026-03-06 기준 초안이 추가되었다.
- 현재 핵심 페르소나는 "파이썬 잘하는 중학생이 고등학교에 올라가며 LLM을 마스터하는 경로"다.
