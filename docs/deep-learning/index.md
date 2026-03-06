# 딥러닝 기본기

## 이 장에서 다룰 것

- 퍼셉트론과 MLP
- 활성화 함수와 표현력
- 손실 함수와 최적화
- backpropagation의 계산 그래프
- regularization과 normalization의 목적

## 기억할 문장

딥러닝은 "표현을 만들고, 손실을 정의하고, gradient로 표현을 조정하는 과정"이다.

## 1차 패스 핵심

- 선형층과 비선형층이 왜 같이 필요한지 이해한다.
- 손실 함수와 optimizer가 어떤 역할 분담을 하는지 잡는다.
- backpropagation을 완벽히 증명하지 않아도, gradient가 어떻게 흘러가는지는 이해한다.

## 퍼셉트론에서 MLP로

퍼셉트론 하나는 입력을 받아 선형 결합 후 출력을 만든다. 하지만 현실 문제는 보통 하나의 직선이나 평면으로 나뉘지 않는다. 그래서 선형층 여러 개 사이에 비선형 활성화를 넣은 MLP가 필요해진다.

| 구조 | 의미 |
| --- | --- |
| 선형 하나 | 단순한 결정 경계 |
| 선형 + 활성화 + 선형 | 더 복잡한 패턴 표현 |
| 깊은 MLP | 여러 단계 표현 학습 |

## activation이 왜 필요한가

활성화 함수가 없으면 층을 여러 개 쌓아도 결국 큰 선형 변환 하나와 크게 다르지 않다. ReLU, GELU 같은 비선형 함수가 들어가야 깊이가 표현력으로 바뀐다.

논문에서 activation 이름이 짧게 지나가도, 실제로는 모델 표현력과 학습 안정성에 직접 영향을 준다.

## loss와 optimizer의 역할 분담

이 둘은 자주 같이 언급되지만 역할은 다르다.

| 구성요소 | 질문 |
| --- | --- |
| loss function | 무엇을 잘못했다고 벌줄 것인가 |
| optimizer | 그 벌점 신호를 받아 파라미터를 어떻게 움직일 것인가 |

예를 들어 cross-entropy는 "정답 확률이 낮으면 벌점"을 정의하고, Adam은 그 벌점을 줄이는 방향으로 실제 업데이트를 수행한다.

## 계산 그래프 관점

딥러닝 모델은 결국 계산 그래프다.

```text
input -> linear -> activation -> linear -> logits -> loss
```

forward에서는 값을 만들고, backward에서는 loss가 각 파라미터에 미친 영향을 거꾸로 전파한다. 이 관점이 잡혀야 backpropagation, residual connection, normalization도 덜 추상적으로 보인다.

## regularization과 normalization을 왜 보는가

실무에서는 모델 구조만큼 학습 안정성도 중요하다.

- regularization: 과적합을 줄이기 위한 장치
- normalization: 학습을 더 안정적으로 만들기 위한 장치
- dropout: 일부 연결을 무작위로 끄며 과적합 완화
- weight decay: 파라미터가 과도하게 커지는 것을 억제

즉, 좋은 모델은 구조뿐 아니라 학습되는 방식까지 함께 설계된다.

## 논문에서 자주 보이는 표현

| 표현 | 읽는 법 |
| --- | --- |
| `MLP(x)` | 여러 선형층과 활성화를 거친 표현 변환 |
| `L_cls`, `L_ce` | 분류용 loss, 대개 cross-entropy |
| `dropout(p=0.1)` | 학습 중 일부 표현을 무작위로 끔 |
| `optimizer = AdamW(...)` | gradient를 실제 업데이트 규칙으로 바꾸는 도구 |
| `generalization` | 학습 데이터 밖에서도 잘 작동하는가 |

## 논문을 읽을 때 먼저 확인할 것

1. 모델이 어떤 표현을 만들고 있는가
2. loss가 무엇을 최소화하는가
3. optimizer와 scheduler가 무엇인가
4. regularization이 들어갔는가
5. 평가 지표가 loss와 같은가 다른가

## 학습 산출물

- MLP로 분류 문제 하나를 풀어보기
- 과적합과 일반화의 차이를 그래프로 설명해보기
- SGD와 Adam의 차이를 정리해보기
- train loss와 validation loss를 같이 기록해 과적합 시점을 찾아보기

## 체크리스트

- 퍼셉트론과 MLP의 차이를 설명할 수 있는가
- activation이 왜 필요한지 말할 수 있는가
- overfitting과 generalization의 차이를 설명할 수 있는가

## 다음 장으로 어떻게 연결되는가

딥러닝 기본기가 잡히면, 이제 NLP에서 왜 attention과 Transformer가 필요했는지 볼 수 있다.

다음 장: [NLP와 Transformer 이전 배경](/nlp/)
