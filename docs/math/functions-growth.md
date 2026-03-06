# 함수, 로그, 지수

## 왜 중요한가

LLM에서 함수, 로그, 지수는 장식이 아니다. 로짓을 확률로 바꾸는 `softmax`, 정답 확률을 벌점으로 바꾸는 `-log`, 모델 혼란도를 읽는 `perplexity`가 전부 이 장에 기대고 있다.

이 장에서 놓치면 생기는 문제도 명확하다. `softmax`는 외웠지만 왜 temperature가 분포를 바꾸는지 설명하지 못하고, cross-entropy는 쓰지만 왜 로그가 붙는지 감이 없고, 논문에 `NLL`이 나오면 새 개념처럼 느껴진다.

## 한 문장 핵심

함수는 값을 변환하고, 지수는 차이를 벌리며, 로그는 확률과 손실을 읽기 쉬운 스케일로 바꾼다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `f(x)` | 입력을 출력으로 바꾸는 규칙 | 선형층, 활성화 함수 |
| `exp(z)` | 점수 차이를 더 강하게 벌림 | softmax 분자 |
| `log p(y|x)` | 정답 확률의 로그 | likelihood |
| `-log p(y|x)` | 정답 확률이 낮을수록 커지는 벌점 | NLL, cross-entropy |
| `softmax(z)` | 점수 벡터를 분포로 정규화 | next-token probabilities |

여기서 중요한 것은 정의 암기가 아니라 역할이다. `exp`는 차이를 증폭하고, `log`는 곱 구조를 더하기 쉬운 형태로 바꾸며, `softmax`는 점수 표를 확률 분포로 만든다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;입력 표현&quot;] --> B[&quot;linear layer&quot;]
  B --> C[&quot;logits&quot;]
  C --> D[&quot;exp&quot;]
  D --> E[&quot;softmax probabilities&quot;]
  E --> F[&quot;-log p(correct)&quot;]
  F --> G[&quot;training loss&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;score gap is small&quot;] --> B[&quot;exp magnifies gap&quot;]
  B --> C[&quot;top token stands out more&quot;]
  C --> D[&quot;softmax becomes sharper&quot;]
  D --> E[&quot;loss depends on correct token probability&quot;]`"
/>

## 직관과 한 가지 예시

같은 로짓이라도 함수 적용 순서에 따라 해석이 달라진다.

```text
logits = [2.0, 1.0, 0.0]
```

이 벡터는 아직 확률이 아니다. 단지 "모델이 각 후보를 얼마나 선호하는지"를 나타내는 점수다. 여기에 `exp`를 적용하면 큰 점수와 작은 점수의 차이가 더 벌어진다. 그리고 그 합으로 다시 나누면 확률처럼 읽을 수 있는 분포가 된다.

<MermaidDiagram
  :code="`xychart
    title &quot;Linear vs Exponential Response&quot;
    x-axis &quot;score gap&quot; [0, 1, 2, 3, 4]
    y-axis &quot;effect&quot; 0 --> 55
    line [0, 1, 2, 3, 4]
    line [1, 2.72, 7.39, 20.09, 54.60]`"
/>

정답 토큰 확률이 `0.9`면 `-log(0.9)`는 작고, `0.1`이면 `-log(0.1)`은 크다. 즉, loss는 "정답을 자신 있게 맞히는가"를 아주 민감하게 본다.

<MermaidDiagram
  :code="`xychart
    title &quot;Negative Log Loss&quot;
    x-axis &quot;p(correct)&quot; [0.1, 0.3, 0.5, 0.7, 0.9]
    y-axis &quot;-log(p)&quot; 0 --> 2.5
    line [2.30, 1.20, 0.69, 0.36, 0.10]`"
/>

## 논문에서는 이렇게 보인다

이 장의 대표 식은 아래 한 줄이다.

```text
L = -sum_t log p_theta(y_t | x, y_<t)
```

### Paper Formula Autopsy: Negative Log-Likelihood

| 조각 | 읽는 법 | 모델에서 실제로 하는 일 |
| --- | --- | --- |
| `p_theta(...)` | 파라미터 `theta`를 가진 모델의 확률 | 문맥을 보고 다음 토큰 분포를 출력 |
| `y_t` | 현재 시점의 정답 토큰 | 맞혀야 하는 target |
| `x, y_<t` | 입력과 이전 문맥 | 조건부 정보 |
| `log` | 확률을 더하기 쉬운 스케일로 변환 | 매우 작은 확률을 안정적으로 다룸 |
| `-` | 높은 확률일수록 손실이 작아지도록 뒤집음 | 최적화 방향을 만듦 |
| `sum_t` | 모든 위치의 손실을 모음 | 시퀀스 전체 학습 |

이 식을 짧게 말하면 "문맥을 보고 정답 토큰 확률을 높이도록 학습한다"다.

perplexity는 여기서 한 걸음 더 나간다. cross-entropy가 줄어들면 perplexity도 줄고, 이는 모델이 다음 토큰에서 덜 헷갈린다는 뜻으로 읽을 수 있다.

## PyTorch와 코드로 연결하기

- `logits = model(x)`는 아직 점수 벡터다.
- `torch.softmax(logits, dim=-1)`는 분포 확인용이며, 학습에서는 보통 직접 호출하지 않아도 된다.
- `nn.CrossEntropyLoss()`는 내부적으로 `log-softmax + NLL` 구조를 처리한다.
- temperature sampling은 `logits / T` 뒤에 `softmax`를 적용하는 것과 같다.

바로 연결해서 볼 수 있는 예제는 아래다.

- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)
- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py)

## 자주 틀리는 지점

- `softmax`를 "확률 만들기"로만 기억하고, score gap 확대 효과를 놓친다.
- cross-entropy를 외워도 `-log p(correct)` 직관이 없어서 loss 숫자 해석이 약하다.
- perplexity를 별도 개념으로 외우고 cross-entropy와 연결하지 못한다.
- inference에서도 무조건 `softmax`를 먼저 계산해야 한다고 생각하고, logits 기반 비교를 잊는다.
- temperature를 확률에 나누는 것이 아니라 logits에 적용한다는 점을 놓친다.

### 엔지니어가 여기서 자주 오해하는 것

- 큰 로짓이 "확률 1에 가깝다"는 뜻은 아니다. softmax 전에는 확률이 아니다.
- loss가 `0.2`에서 `0.1`로 줄어든 것이 작아 보여도, 확률과 perplexity 관점에서는 의미 있는 차이일 수 있다.
- `exp`는 계산상 위험할 수 있어서 실제 구현은 log-sum-exp 같은 안정화 트릭을 쓴다.

## 연습

### 기초 확인

1. 로짓 `[2, 1, 0]`이 왜 그대로는 확률이 아닌지 설명해본다.
2. `-log(0.9)`와 `-log(0.1)`이 왜 크게 차이 나는지 직관적으로 적어본다.
3. `softmax(logits / T)`에서 `T`가 커질수록 분포가 왜 평평해지는지 설명해본다.

### 논문 읽기 훈련

1. `L = -sum_t log p_theta(y_t | x, y_<t)`에서 각 항의 역할을 한 문장씩 적어본다.
2. 논문에서 `negative log-likelihood`가 나오면 왜 cross-entropy와 거의 같은 학습 언어로 읽어도 되는지 정리해본다.
3. 어떤 실험에서 perplexity가 내려갔는데 생성 품질 체감이 작다면 그 이유를 두 가지 적어본다.

### 코드 연결 훈련

1. `softmax_sampling.py`에서 temperature를 `0.5`, `1.0`, `2.0`으로 바꿨을 때 분포가 어떻게 바뀔지 먼저 예측해본다.
2. PyTorch에서 `CrossEntropyLoss`가 logits를 직접 받는 이유를 적어본다.
3. 모델 출력 logits를 바로 `argmax`할 때와 sampling할 때의 차이를 적어본다.

## 다음 장으로 연결

함수·로그·지수 감각이 잡히면 이제 벡터와 행렬을 "숫자 배열"이 아니라 "표현을 담고 옮기는 구조"로 읽을 차례다. 이 감각이 있어야 `XW`, 임베딩 테이블, `QK^T`가 한 줄로 이어진다.

다음 장: [벡터와 행렬](/math/vectors-matrices)
