# 용어집

## 왜 필요한가

이 책은 수학, 딥러닝, Transformer, RLHF, AI Engineering을 한 흐름으로 잇기 때문에 같은 기호와 용어가 계속 다시 나온다. 이 페이지는 자주 나오는 표현을 빠르게 다시 확인하기 위한 참조용 페이지다.

## 핵심 기호

| 기호 | 의미 |
| --- | --- |
| `x`, `X` | 입력 스칼라, 벡터, 또는 행렬 |
| `y` | 정답 또는 출력 |
| `W`, `b` | 가중치와 bias |
| `h` | hidden representation |
| `Q`, `K`, `V` | attention의 query, key, value |
| `p(y|x)` | 입력 `x`가 주어졌을 때 출력 `y`의 확률 |
| `L` | loss |
| `theta` | 모델 전체 파라미터 |
| `grad` | 기울기, 업데이트 방향 신호 |

## 자주 나오는 모델 용어

| 용어 | 짧은 설명 |
| --- | --- |
| embedding | 토큰이나 항목을 dense vector로 바꾼 표현 |
| logits | softmax 직전의 점수 |
| softmax | 점수를 확률 분포처럼 바꾸는 함수 |
| attention | 어떤 토큰이 다른 토큰을 얼마나 참고할지 계산 |
| residual connection | 입력을 블록 출력에 더해 정보 손실을 줄이는 연결 |
| layer norm | 표현을 안정화하는 정규화 |

## 실전 LLM 용어

| 용어 | 짧은 설명 |
| --- | --- |
| context window | 모델이 한 번에 볼 수 있는 총 문맥 길이 |
| temperature | 샘플링 분포를 더 날카롭게 또는 평평하게 만드는 계수 |
| top-k | 상위 `k`개 후보만 남기는 샘플링 규칙 |
| top-p | 누적 확률 기준으로 후보를 남기는 샘플링 규칙 |
| hallucination | 근거 없이 그럴듯한 출력을 만드는 실패 |
| eval set | 품질 비교용 고정 테스트셋 |

## 엔지니어링 용어

| 용어 | 짧은 설명 |
| --- | --- |
| RAG | 검색 결과를 문맥에 넣어 답변을 보강하는 패턴 |
| tool calling | 모델이 외부 도구나 API를 호출하게 하는 방식 |
| agent workflow | 여러 단계의 계획과 실행을 묶은 흐름 |
| rollback | 문제 발생 시 이전 설정으로 되돌리는 절차 |
| observability | 품질, latency, 비용, 실패를 관측하는 능력 |

다음: [수학 기초](/math/)
