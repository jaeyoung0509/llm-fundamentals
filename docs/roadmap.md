# 로드맵

## 최종 목표

이 책의 중간 목표는 GPT-3까지의 구조와 의미를 이해하는 것이다. 최종 목표는 평가, 배포, 운영까지 감당할 수 있는 AI 엔지니어가 되는 것이다.

## 현재 상태

이제 저장소는 1차 패스를 넘어서 2차 심화 단계에 들어갔다. 수학, PyTorch, 딥러닝 기본기, Transformer, GPT-3, AI Engineering은 이미 중간 이상 밀도로 올라왔고, 남은 작업은 약한 장을 균형 있게 채우고 운영 문서를 실제 상태와 맞추는 것이다.

## 현재 학습 사다리

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;수학 기초&quot;] --> B[&quot;Python과 PyTorch&quot;]
  B --> C[&quot;딥러닝 기본기&quot;]
  C --> D[&quot;NLP 이전 배경&quot;]
  D --> E[&quot;Transformer&quot;]
  E --> F[&quot;LLM과 GPT-3&quot;]
  F --> G[&quot;LLM 실전 기본기&quot;]
  G --> H[&quot;RLHF&quot;]
  H --> I[&quot;AI Engineering&quot;]
  I --> J[&quot;Projects&quot;]`"
/>

## 단계별 마일스톤

| 단계 | 질문 | 완료 기준 |
| --- | --- | --- |
| 1 | 모델을 이해하는 데 필요한 수학은 무엇인가 | 벡터, 미분, 확률을 신경망과 논문 식 관점으로 설명할 수 있다 |
| 2 | PyTorch로 학습 루프를 직접 만들 수 있는가 | 텐서, autograd, dataloader, optimizer, debugging을 설명할 수 있다 |
| 3 | Transformer가 왜 등장했는가 | attention, masking, positional encoding, decoder-only 구조를 설명할 수 있다 |
| 4 | GPT-3는 무엇을 바꿨는가 | scale, next-token prediction, in-context learning, 한계를 설명할 수 있다 |
| 5 | RLHF와 최신 실무는 어떻게 이어지는가 | reward model, PPO, 평가, RAG, 배포, 운영 리스크를 개괄할 수 있다 |

## 남은 우선순위

1. 약한 장을 `solid intermediate` 수준까지 끌어올린다.
2. 한국어 원본과 영어 미러의 구조를 계속 맞춘다.
3. TODO와 로드맵을 실제 문서 상태와 동기화한다.
4. 프로젝트 장을 포트폴리오 수준의 스펙으로 고도화한다.

## 완료 판정 기준

- 모든 핵심 한국어 장이 outline 수준을 벗어난다.
- 영어 대응 문서가 같은 학습 사다리를 유지한다.
- 핵심 장마다 다이어그램, 논문 읽기 신호, 연습, 다음 장 연결이 있다.
- `npm test`가 통과한다.

## 추천 시작점

- 수학이 약하면 [수학 기초](/math/)
- 구현 감각부터 잡고 싶으면 [Python과 PyTorch](/python-pytorch/)
- 모델 구조를 먼저 보고 싶으면 [Transformer](/transformers/)
- 제품 감각까지 빨리 보고 싶으면 [AI Engineering](/ai-engineering/)
