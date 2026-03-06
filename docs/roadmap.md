# 로드맵

## 최종 목표

이 책의 중간 목표는 GPT-3까지의 구조와 의미를 이해하는 것이다. 최종 목표는 평가, 배포, 운영까지 감당할 수 있는 AI 엔지니어가 되는 것이다.

## 현재 상태

이제 저장소는 1차 패스를 넘어서 2차 심화 단계에 들어갔다. 수학 기초 트랙은 재작성과 [수학 최종 점검](/math/final-checkpoint) 추가까지 마쳤고, 여기에 더해 논문 읽기 심화를 위한 [수학 심화 개요](/math-advanced/) 분기 트랙도 들어간 상태다.

## 현재 학습 사다리

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;수학 기초&quot;] --> B[&quot;수학 최종 점검&quot;]
  B --> C[&quot;핵심 경로: Python과 PyTorch&quot;]
  B --> D[&quot;선택 심화: 수학 심화 트랙&quot;]
  C --> E[&quot;딥러닝 기본기&quot;]
  D --> F[&quot;논문 읽기 심화&quot;]
  E --> G[&quot;Transformer&quot;]
  F --> G
  G --> H[&quot;LLM과 GPT-3&quot;]
  H --> I[&quot;RLHF&quot;]
  I --> J[&quot;AI Engineering&quot;]
  J --> K[&quot;Projects&quot;]`"
/>

## 단계별 마일스톤

| 단계 | 질문 | 완료 기준 |
| --- | --- | --- |
| 1 | 모델을 이해하는 데 필요한 수학은 무엇인가 | 벡터, 미분, 확률을 신경망과 논문 식 관점으로 설명할 수 있다 |
| 2 | PyTorch로 학습 루프를 직접 만들 수 있는가 | 텐서, autograd, dataloader, optimizer, debugging을 설명할 수 있다 |
| 3 | Transformer가 왜 등장했는가 | attention, masking, positional encoding, decoder-only 구조를 설명할 수 있다 |
| 4 | GPT-3는 무엇을 바꿨는가 | scale, next-token prediction, in-context learning, 한계를 설명할 수 있다 |
| 5 | RLHF와 최신 실무는 어떻게 이어지는가 | reward model, PPO, 평가, RAG, 배포, 운영 리스크를 개괄할 수 있다 |

## 두 가지 수학 경로

| 경로 | 목적 | 언제 타면 좋은가 |
| --- | --- | --- |
| 기초 수학 경로 | 구현과 모델 이해에 필요한 최소 수학 복구 | 처음 책을 시작할 때 |
| 수학 심화 경로 | 삼각함수, 고급 선형대수, 정보 이론, 최적화로 논문 읽기 심화 | Transformer, RLHF, 고급 논문 수식이 막힐 때 |

## 남은 우선순위

1. 수학 트랙에서 만든 논문 읽기/코드 연결 밀도를 다른 핵심 장에도 맞춘다.
2. 한국어 원본과 영어 미러의 구조를 계속 같은 파동에서 맞춘다.
3. 프로젝트 장을 포트폴리오 수준의 스펙으로 고도화한다.
4. TODO와 로드맵을 실제 문서 상태와 계속 동기화한다.

## 완료 판정 기준

- 모든 핵심 한국어 장이 outline 수준을 벗어난다.
- 영어 대응 문서가 같은 학습 사다리를 유지한다.
- 핵심 장마다 다이어그램, 논문 읽기 신호, 연습, 다음 장 연결이 있다.
- 수학 장 마지막에 최종 점검 장으로 전체 연결을 복습할 수 있다.
- 수학 심화 트랙이 논문 읽기용 선택 심화 경로로 작동한다.
- `npm test`가 통과한다.

## 추천 시작점

- 수학이 약하면 [수학 기초](/math/)
- 한 번에 수학 전체를 점검하고 싶으면 [수학 최종 점검](/math/final-checkpoint)
- 논문 읽기 심화를 원하면 [수학 심화 개요](/math-advanced/)
- 구현 감각부터 잡고 싶으면 [Python과 PyTorch](/python-pytorch/)
- 모델 구조를 먼저 보고 싶으면 [Transformer](/transformers/)
- 제품 감각까지 빨리 보고 싶으면 [AI Engineering](/ai-engineering/)
