# 학습 가이드

## 이 책의 핵심 전략

이 커리큘럼은 아래 3가지를 동시에 잡는다.

- 수학을 최소한으로 줄이지 않고, 모델과 연결해서 설명한다.
- PyTorch 구현을 너무 뒤로 미루지 않는다.
- 최신 유행 용어보다 오래 가는 실무 축을 먼저 잡는다.

## 추천 학습 순서

<MermaidDiagram>
flowchart LR
  A["기초 수학 감각"] --> B["텐서와 PyTorch"]
  B --> C["딥러닝 기본기"]
  C --> D["Attention과 Transformer"]
  D --> E["GPT-1부터 GPT-3까지"]
  E --> F["RL과 RLHF"]
  F --> G["평가, RAG, 배포, 운영"]
  G --> H["프로젝트와 포트폴리오"]
</MermaidDiagram>

## 12주 러닝 스프린트

| 기간 | 집중 주제 | 산출물 |
| --- | --- | --- |
| 1-2주 | 수학 기초 | 벡터, 미분, 확률 정리 노트 |
| 3-4주 | Python과 PyTorch | 직접 만든 training loop |
| 5주 | 딥러닝 기본기 | MLP 분류 실험 리포트 |
| 6-7주 | Transformer | self-attention 구현 |
| 8주 | GPT-3 이해 | GPT 계열 요약 문서 |
| 9주 | LLM 실전 기초 | 프롬프트/평가 체크리스트 |
| 10주 | RL과 RLHF | PPO/RLHF 개념 맵 |
| 11-12주 | AI Engineering 프로젝트 | 미니 RAG 또는 문서 QA 데모 |

## 독자별 시작점

### 수학이 불안한 사람

- [수학 기초](/math/)부터 시작한다.
- 수식을 외우기보다 손실 함수와 gradient의 의미를 잡는다.
- 2장으로 넘어갈 때는 벡터, 미분, 기대값의 직관만 챙겨도 충분하다.

### 코드는 되는데 이론이 약한 사람

- [Transformer](/transformers/)와 [LLM과 GPT-3](/llms/)를 먼저 훑는다.
- 이후 [수학 기초](/math/)와 [딥러닝 기본기](/deep-learning/)로 돌아와 구멍을 메운다.

### 실무 감각까지 빠르게 얻고 싶은 사람

- [Python과 PyTorch](/python-pytorch/) -> [Transformer](/transformers/) -> [AI Engineering](/ai-engineering/) 순으로 간다.
- 프로젝트를 빨리 만들고, 그 뒤에 수학과 RLHF를 보강한다.

## 집필 원칙

- 한 개념은 정의로 끝내지 않고 그림, 수식, 코드 셋으로 설명한다.
- 모든 장은 "왜 필요한가"에서 시작한다.
- 모든 장 끝에는 연습 문제와 다음 장 연결 포인트를 둔다.

