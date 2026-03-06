# 수학 기초

## 왜 중요한가

LLM 문서를 읽다가 막히는 지점은 보통 복잡한 이론이 아니라 기본 수학 언어를 잊어버린 데서 나온다. `XW`, `softmax(z)`, `-log p(y)`, `grad_theta L` 같은 표기를 다시 자연스럽게 읽지 못하면 이후 장도 전부 암기 과목처럼 느껴진다.

이 장의 목표는 학교 수학을 처음부터 다시 배우는 것이 아니다. 모델과 논문을 읽는 데 필요한 최소 수학을 다시 세워서, 수식이 나오면 겁먹는 대신 "이게 데이터인지, 가중치인지, 분포인지, 업데이트 신호인지"를 바로 구분하게 만드는 것이다.

## 한 문장 핵심

수학은 별도 과목이 아니라, 모델의 입력·표현·손실·업데이트를 읽는 언어다.

## 표기법 리부트

수학 장에서 먼저 복구해야 할 표기 감각은 아래 다섯 가지다.

| 표기 | 먼저 떠올릴 역할 | 모델에서의 예 |
| --- | --- | --- |
| `x`, `X` | 데이터 | 토큰 ID, 임베딩 입력, 배치 |
| `W`, `theta` | 파라미터 | 선형층 가중치, 전체 모델 파라미터 |
| `h`, `Q`, `K`, `V` | 중간 표현 | hidden state, attention 입력 |
| `p(.)` | 확률 분포 | 다음 토큰 분포, 클래스 분포 |
| `L` | 최소화 대상 | cross-entropy, NLL, policy loss |

논문 식을 볼 때는 이름보다 역할을 먼저 읽는다. `W`를 보면 "학습으로 바뀌는 것", `p`를 보면 "불확실성을 담는 것", `L`을 보면 "줄여야 하는 것"이 떠올라야 한다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;데이터 x, X&quot;] --> B[&quot;표현 h, XW&quot;]
  B --> C[&quot;점수 logits&quot;]
  C --> D[&quot;확률 p(y|x)&quot;]
  D --> E[&quot;손실 L&quot;]
  E --> F[&quot;gradient update&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;수식에서 기호를 본다&quot;] --> B[&quot;데이터 vs 파라미터 구분&quot;]
  B --> C[&quot;shape 상상&quot;]
  C --> D[&quot;연산 역할 해석&quot;]
  D --> E[&quot;코드 텐서 연산 대응&quot;]
  E --> F[&quot;학습 또는 생성 의미 해석&quot;]`"
/>

## 직관과 한 가지 예시

수학 감각을 다시 세우는 가장 쉬운 방법은 "현재 내가 어디에서 자주 막히는지"를 진단하는 것이다.

### 빠른 진단 체크

- `QK^T`를 보면 값 계산보다 shape가 먼저 떠오르는가
- `softmax(logits)`를 보면 확률 분포 변환으로 읽히는가
- `L = -log p(y)`를 보면 정답 확률이 낮을수록 벌점이 커진다고 설명할 수 있는가
- `theta = theta - lr * grad`를 보면 업데이트 방향을 바로 말할 수 있는가
- `p_theta(y_t | context)`를 보면 생성 모델의 다음 토큰 분포라고 읽을 수 있는가

세 개 이상이 막히면 수학 실력이 약한 것이 아니라, 모델 수학 문법이 잠시 녹슬어 있는 상태라고 보면 된다.

한 가지 예시로 아래 식을 보자.

```text
L = -log p_theta(y_t | x, y_<t)
```

이 식은 한 번에 세 가지를 말한다.

- `p_theta(...)`: 모델이 문맥을 보고 정답 토큰에 주는 확률
- `log`: 매우 작은 확률을 안정적으로 읽고 더하기 쉽게 만드는 장치
- `-`: 정답 확률이 높을수록 손실이 작아지게 뒤집는 장치

즉, 이 한 줄 안에 확률, 로그, 손실, 학습 방향이 같이 들어 있다.

## 논문에서는 이렇게 보인다

논문 식을 읽을 때는 아래 루브릭으로 고정하면 된다.

| 질문 | 확인할 것 | 예시 |
| --- | --- | --- |
| 이 항은 무엇인가 | 데이터 / 파라미터 / 표현 / 확률 / 손실 | `X`, `W`, `h`, `p`, `L` |
| shape는 무엇인가 | 벡터 / 행렬 / 배치 / 시퀀스 | `X in R^(n x d)` |
| 연산 역할은 무엇인가 | 투영 / 점수 계산 / 정규화 / 벌점 계산 | `XW`, `QK^T`, `softmax`, `-log` |
| 결과 해석은 무엇인가 | 생성 / 분류 / 업데이트 | next-token prediction, gradient step |

자주 만나는 표기 다섯 개를 말로 풀면 아래와 같다.

| 표현 | 빠른 해석 |
| --- | --- |
| `XW` | 입력 표현을 새 공간으로 투영한다 |
| `QK^T` | 토큰 간 관련도 점수 표를 만든다 |
| `softmax(z)` | 점수를 확률 분포처럼 읽게 만든다 |
| `L = -log p(y)` | 정답 확률이 낮을수록 손실이 커진다 |
| `grad_theta L` | 파라미터를 어떻게 움직일지 알려주는 신호다 |

## PyTorch와 코드로 연결하기

수학 장은 결국 코드로 이어져야 완성된다.

- `XW`는 보통 `x @ W` 또는 `nn.Linear(...)`
- `softmax(z)`는 `torch.softmax(logits, dim=-1)`
- `-log p(y)`는 `CrossEntropyLoss` 또는 `F.nll_loss`
- `grad_theta L`은 `loss.backward()` 후 `param.grad`

바로 연결해서 볼 예제는 아래 셋이면 충분하다.

- [gradient_chain_rule.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/gradient_chain_rule.py)
- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)
- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py)

## 자주 틀리는 지점

- 기호 이름만 보고 역할을 놓친다.
- shape를 상상하지 않고 식을 스칼라처럼 읽는다.
- `softmax`를 "그냥 확률 만드는 함수"로만 외우고 logits 차이 확대를 놓친다.
- `gradient`를 변화율 정의로만 기억하고 업데이트 신호라는 관점을 놓친다.
- 수학 식과 PyTorch 연산 사이를 연결하지 못해 논문 이해와 구현이 분리된다.

## 연습

### 기초 확인

1. `X`, `W`, `p(.)`, `L`이 각각 데이터, 파라미터, 확률, 손실 중 무엇인지 적어본다.
2. `softmax(z)`와 `-log p(y)`가 각각 무슨 역할인지 한 문장씩 적어본다.
3. `QK^T`를 보면 왜 `(n, n)` 관계 표를 먼저 떠올려야 하는지 설명해본다.

### 논문 읽기 훈련

1. `L = -log p_theta(y_t | x, y_<t)`를 데이터, 확률, 손실 항으로 나눠서 읽어본다.
2. `XW`가 나왔을 때 왜 "곱셈"보다 "투영"을 먼저 떠올려야 하는지 적어본다.
3. 논문 한 장을 골라 자주 나오는 기호를 다섯 개 적고 각각 역할을 붙여본다.

### 코드 연결 훈련

1. `loss.backward()`가 수식의 어떤 부분과 대응되는지 적어본다.
2. `torch.softmax(logits, dim=-1)`가 논문 표기 `softmax(z)`와 어떻게 연결되는지 설명해본다.
3. 예제 세 개 중 하나를 열고 등장하는 텐서를 데이터, 파라미터, 표현, 손실로 분류해본다.

## 다음 장으로 연결

이제 무엇을 다시 배워야 하는지 감이 잡혔다면, 가장 먼저 함수·로그·지수부터 복구하면 된다. 그 장을 통과하면 loss, softmax, perplexity를 읽는 감각이 한 번에 열린다.

중간 점검이 필요할 때는 [수학 최종 점검](/math/final-checkpoint)으로 돌아와 전체 사다리를 다시 확인하면 된다.

다음 장: [함수, 로그, 지수](/math/functions-growth)
