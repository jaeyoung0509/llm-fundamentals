# 수학 최종 점검

## 왜 중요한가

수학 장을 각각 읽는 것과, 실제 논문 한 페이지를 술술 읽는 것은 다르다. 최종 점검 장의 목적은 함수·행렬·gradient·확률을 다시 하나의 학습 루프로 묶는 것이다.

여기서 막히는 부분이 있다면 아직 이해가 부족한 것이 아니라 연결이 약한 것이다. 필요한 페이지로 다시 돌아가서 특정 고리를 보강하면 된다.

## 한 문장 핵심

LLM 수식은 함수 변환, 표현 이동, 확률 분포, 손실 계산, gradient 업데이트가 이어진 한 루프다.

## 표기법 리부트

| 범주 | 자주 보는 기호 | 읽는 포인트 |
| --- | --- | --- |
| 데이터 | `x`, `X`, `y_t`, `tokens` | 입력과 정답 |
| 파라미터 | `W`, `theta`, `W_Q` | 학습으로 바뀌는 것 |
| 표현 | `h`, `XW`, `Q`, `K`, `V` | 중간 상태 |
| 확률 | `p_theta(.)`, `softmax(z)` | 분포와 불확실성 |
| 손실/업데이트 | `L`, `-log`, `grad`, `eta` | 벌점과 수정 신호 |

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input tokens&quot;] --> B[&quot;embedding / projection&quot;]
  B --> C[&quot;contextual representation&quot;]
  C --> D[&quot;logits&quot;]
  D --> E[&quot;probability distribution&quot;]
  E --> F[&quot;loss&quot;]
  F --> G[&quot;gradient update&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;논문 식&quot;] --> B[&quot;역할 분해&quot;]
  B --> C[&quot;shape 상상&quot;]
  C --> D[&quot;모델 의미 해석&quot;]
  D --> E[&quot;PyTorch 연산 대응&quot;]
  E --> F[&quot;디버깅 포인트 확인&quot;]`"
/>

## 직관과 한 가지 예시

아래 식 하나를 처음부터 끝까지 읽어보자.

```text
L = -sum_t log softmax(XW)_y_t
```

이 식은 아래 순서로 읽으면 된다.

1. `XW`: 입력 표현을 새 점수 공간으로 투영
2. `softmax(...)`: 점수를 확률 분포로 정규화
3. `_y_t`: 정답 토큰 위치의 확률을 집어냄
4. `log`: 매우 작은 확률을 다루기 쉬운 스케일로 변환
5. `-sum_t`: 시퀀스 전체 벌점을 모아 손실로 만듦

즉, 함수 변환과 확률, 손실이 한 줄로 연결된 형태다.

## 논문에서는 이렇게 보인다

### 자주 보는 LLM 수식 5개

| 식 | 빠른 해석 |
| --- | --- |
| `XW` | 표현 투영 |
| `QK^T / sqrt(d_k)` | 토큰 관계 점수 계산과 scale 조절 |
| `softmax(z)` | 점수를 분포로 정규화 |
| `L = -log p(y)` | 정답 확률 기반 손실 |
| `theta <- theta - eta * grad_theta L` | gradient 기반 업데이트 |

### 자주 걸리는 함정

- `QK^T`를 값 변환으로 읽고 score table 의미를 놓친다.
- `softmax` 이후 값과 logits를 혼동한다.
- `L`을 그냥 숫자로 보고 어떤 확률이 벌점을 만든 것인지 놓친다.
- `grad_theta L`을 별도 마법처럼 보고 chain rule 흐름을 잊는다.
- 배치 차원이 생략된 식을 실제 코드 shape와 연결하지 못한다.

## PyTorch와 코드로 연결하기

### 수식을 PyTorch 연산으로 번역하기

| 수식 | PyTorch 대응 |
| --- | --- |
| `XW` | `x @ W` 또는 `nn.Linear` |
| `softmax(z)` | `torch.softmax(logits, dim=-1)` |
| `-log p(y)` | `F.nll_loss(...)` 또는 `CrossEntropyLoss` |
| `grad_theta L` | `loss.backward()` 후 `param.grad` |
| `theta <- theta - eta * grad` | `optimizer.step()` |

실전에서는 아래 세 질문을 반복하면 된다.

1. 이 텐서는 데이터인가, 파라미터인가, 중간 표현인가
2. shape는 무엇이고 축마다 의미가 무엇인가
3. 이 연산은 투영인가, 정규화인가, 손실 계산인가, 업데이트인가

## 자주 틀리는 지점

- 수식 한 줄에서 연산이 세 개 이상 겹치면 순서대로 쪼개지 않고 한꺼번에 읽으려 한다.
- 코드에서 자동으로 처리되는 `log-softmax`, broadcasting, 배치 차원을 수식에 직접 보이지 않는다는 이유로 무시한다.
- 벡터와 확률을 같은 감각으로 읽어서 "분포"와 "표현"을 구분하지 못한다.
- 수학 개념을 각 장별로만 기억하고 학습 루프로 묶지 못한다.

## 연습

### 기초 확인

1. `XW -> softmax -> -log p(y)`가 각각 무슨 역할인지 한 문장씩 적어본다.
2. `grad_theta L`가 왜 optimizer 입력이라고 볼 수 있는지 적어본다.
3. `QK^T`와 `softmax(QK^T)`의 차이를 설명해본다.

### 논문 읽기 훈련

1. 임의의 Transformer 식 하나를 골라 데이터, 파라미터, 표현, 확률, 손실로 색칠하듯 분류해본다.
2. 어떤 논문 문단에서 "the model is overconfident"라고 하면 entropy, calibration, loss 중 무엇과 연결해서 읽을지 적어본다.
3. residual connection이 optimization 안정성에 중요하다는 문장을 gradient 언어로 바꿔 적어본다.

### 코드 연결 훈련

1. `self_attention.py`에서 `QK^T`에 해당하는 텐서 연산을 찾아 적어본다.
2. `softmax_sampling.py`에서 분포와 sampling 단계가 각각 어디인지 적어본다.
3. `linear_regression.py`에서 forward, loss, backward, update 단계를 나눠 적어본다.

## 다음 장으로 연결

수학 최종 점검까지 통과했다면 이제 수식이 코드와 자연스럽게 이어질 준비가 된 상태다. 다음 장에서는 이 감각을 실제 텐서와 autograd로 옮긴다.

다음 장: [Python과 PyTorch](/python-pytorch/)
