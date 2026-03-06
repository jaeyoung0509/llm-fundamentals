# 함수, 로그, 지수

## 이 페이지의 목표

- 함수가 입력과 출력을 연결하는 규칙이라는 점을 모델 관점으로 이해한다.
- 지수와 로그가 왜 loss, 확률, scale과 자주 연결되는지 본다.
- 비선형성이 왜 필요한지 감각을 만든다.

## 왜 중요한가

신경망은 단순한 직선 하나로 세상을 설명하지 못한다. 값이 빠르게 커지거나 작아지고, 확률처럼 정규화되고, 손실이 로그 스케일로 다뤄지는 순간마다 함수와 로그, 지수가 등장한다.

## 한눈에 보는 흐름

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;입력 x&quot;] --> B[&quot;선형 변환&quot;]
  B --> C[&quot;비선형 함수&quot;]
  C --> D[&quot;로짓&quot;]
  D --> E[&quot;지수&quot;]
  E --> F[&quot;softmax 확률&quot;]
  F --> G[&quot;log loss&quot;]`"
/>

## 핵심 개념

### 함수

함수는 "입력을 받아 출력을 만든다"는 규칙이다. 모델은 결국 아주 많은 함수를 겹겹이 쌓아 만든 시스템이다.

실전에서 가장 자주 보는 함수는 아래 셋이다.

- 입력을 다른 공간으로 보내는 선형 함수
- 표현력을 만드는 비선형 활성화 함수
- 모델이 잘했는지 판단하는 손실 함수

### 지수

지수는 작은 차이를 빠르게 벌린다. softmax에서 로짓 차이가 지수 함수를 거치며 확률 차이로 더 선명하게 드러나는 이유가 여기에 있다.

### 로그

로그는 곱셈 구조를 덧셈으로 바꾸고, 매우 큰 수나 작은 수를 다루기 쉽게 만든다. cross-entropy에서 로그가 등장하는 것도 이 때문이다.

## 논문에서 자주 보이는 표기

| 표기 | 직관 |
| --- | --- |
| `f(x)` | 입력 `x`를 다른 값으로 보내는 함수 |
| `exp(z)` | 점수 차이를 더 크게 벌리는 연산 |
| `log p(y|x)` | 입력 `x`에서 정답 `y`가 나올 확률의 로그 |
| `-log p(y|x)` | 정답 확률이 낮을수록 커지는 손실 |
| `sigma(x)` | 값을 0과 1 사이로 누르는 함수의 대표 예 |

## 함수 합성 감각

신경망은 보통 함수 하나가 아니라 함수 합성이다.

```text
x -> linear -> activation -> logits -> softmax -> loss
```

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input x&quot;] --> B[&quot;f1: linear&quot;]
  B --> C[&quot;f2: non-linearity&quot;]
  C --> D[&quot;f3: logits&quot;]
  D --> E[&quot;f4: probability / loss&quot;]`"
/>

## 왜 비선형성이 필요한가

선형층만 여러 개 쌓으면 결국 하나의 큰 선형층과 크게 다르지 않다. 깊은 모델이 의미를 갖기 시작하는 지점은 ReLU, GELU 같은 비선형 함수가 들어갈 때다.

| 경우 | 결과 |
| --- | --- |
| 선형 + 선형 + 선형 | 여전히 선형 변환에 가깝다 |
| 선형 + 비선형 + 선형 | 더 복잡한 경계를 표현할 수 있다 |

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;linear&quot;] --> B[&quot;linear&quot;]
  B --> C[&quot;still mostly linear&quot;]
  D[&quot;linear&quot;] --> E[&quot;non-linearity&quot;]
  E --> F[&quot;richer decision boundary&quot;]`"
/>

## 그래프로 보는 선형과 지수

<MermaidDiagram
  :code="`xychart
    title &quot;Linear vs Exponential Growth&quot;
    x-axis &quot;x&quot; [-2, -1, 0, 1, 2]
    y-axis &quot;value&quot; -2 --> 8
    line [-2, -1, 0, 1, 2]
    line [0.14, 0.37, 1.0, 2.72, 7.39]`"
/>

## 모델 예시

### softmax

```text
prob_i = exp(logit_i) / sum_j exp(logit_j)
```

이 식에서 지수는 점수 차이를 확률 차이로 키우고, 분모는 전체를 0과 1 사이의 분포로 정규화한다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;exp on each score&quot;]
  B --> C[&quot;positive values&quot;]
  C --> D[&quot;divide by total sum&quot;]
  D --> E[&quot;probability distribution&quot;]`"
/>

### cross-entropy

```text
loss = -log(p_correct)
```

이 식은 정답 토큰의 확률이 낮을수록 손실을 크게 만든다.

## loss를 읽는 습관

논문에서 loss 식을 보면 먼저 아래 순서로 읽는다.

1. 무엇을 맞히려는지 본다.
2. 정답 확률이 어디에 들어가는지 본다.
3. `log`가 왜 붙는지 본다.
4. 여러 토큰이나 샘플에 대해 합인지 평균인지 본다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;model outputs p(correct)&quot;] --> B{&quot;is p high?&quot;}
  B -->|&quot;yes&quot;| C[&quot;small loss&quot;]
  B -->|&quot;no&quot;| D[&quot;large loss&quot;]`"
/>

## 그래프로 보는 log loss

<MermaidDiagram
  :code="`xychart
    title &quot;Negative Log Loss Curve&quot;
    x-axis &quot;p(correct)&quot; [0.1, 0.3, 0.5, 0.7, 0.9]
    y-axis &quot;-log(p)&quot; 0 --> 2.5
    line [2.30, 1.20, 0.69, 0.36, 0.10]`"
/>

## scale 감각

- 지수는 작은 점수 차이를 더 눈에 띄게 만든다.
- 로그는 너무 큰 수와 너무 작은 수를 읽기 쉬운 범위로 바꾼다.
- 논문 그래프에서 loss가 천천히 줄어들어도 perplexity나 확률 관점에서는 의미 있는 차이일 수 있다.

## perplexity를 어떻게 연결할까

- cross-entropy가 내려가면 perplexity도 같이 내려간다
- perplexity는 "모델이 다음 토큰을 얼마나 덜 헷갈려 하는가"를 보는 지표처럼 읽을 수 있다

## 코드 연결

- `torch.softmax(logits, dim=-1)`는 로짓을 확률 분포처럼 읽게 만든다
- `torch.log(prob)`는 확률을 로그 스케일로 옮긴다
- `CrossEntropyLoss`는 로짓과 정답을 비교해 손실을 만든다

## 논문에서 이렇게 읽는다

```text
L = -sum_t log p_theta(y_t | x, y_<t)
```

- `p_theta(...)`: 파라미터 `theta`를 가진 모델의 확률 분포
- `y_t`: 현재 시점의 정답 토큰
- `y_<t`: 이전까지의 토큰 문맥
- `log`: 정답 확률을 손실로 읽기 쉽게 바꾸는 장치
- `-sum_t`: 모든 시점에서 틀린 정도를 모아 벌점으로 만든 것

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;find p_theta(y_t | context)&quot;] --> B[&quot;take log&quot;]
  B --> C[&quot;negate it&quot;]
  C --> D[&quot;sum over tokens&quot;]
  D --> E[&quot;training loss&quot;]`"
/>

## 작은 실험으로 확인하기

- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)를 보면 같은 로짓에서 temperature가 분포를 어떻게 바꾸는지 확인할 수 있다.

## 연습

1. 로짓이 `[2, 1, 0]`일 때 가장 큰 로짓이 왜 softmax 후 더 두드러지는지 말로 설명해본다.
2. `loss = -log(p_correct)`에서 `p_correct = 0.9`와 `0.1`의 차이를 직관적으로 설명해본다.
3. 활성화 함수가 없는 MLP가 왜 표현력이 약해지는지 적어본다.

## 생각해볼 질문

1. softmax에 지수가 없다면 어떤 문제가 생길까
2. 왜 확률이 1에 가까울수록 log loss는 작아질까
3. 비선형성이 없다면 여러 층을 쌓는 의미가 얼마나 줄어들까

다음: [벡터와 행렬](/math/vectors-matrices)
