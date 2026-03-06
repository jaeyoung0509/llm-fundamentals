# 미분과 gradient

## 왜 중요한가

딥러닝에서 미분은 교과서적인 기울기 계산보다 훨씬 실용적인 의미를 가진다. 손실을 줄이려면 파라미터를 어느 방향으로 얼마나 움직여야 하는지 알려주는 신호가 바로 gradient다.

이 장이 약하면 `loss.backward()`는 쓰지만 실제로 무슨 정보가 흘러가는지 설명하지 못하고, 논문에 gradient 식이 나오면 수학이 갑자기 어려워진 것처럼 느껴진다. 반대로 이 장이 잡히면 optimization 관련 문장을 훨씬 빠르게 읽게 된다.

## 한 문장 핵심

gradient는 "조금 바꿨을 때 손실이 어떻게 움직이는가"를 요약한 업데이트 신호다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `dL/dw` | 파라미터 `w`를 조금 바꿀 때 손실 변화량 | 스칼라 파라미터 |
| `partial L / partial w_i` | 여러 변수 중 하나에 대한 변화량 | 부분 미분 |
| `grad_theta L` | 전체 파라미터 방향 벡터 | optimizer 입력 |
| `theta <- theta - lr * grad` | gradient 반대 방향 업데이트 | gradient descent |
| `chain rule` | 중간 연산을 거친 변화가 앞단까지 전달됨 | backpropagation |

미분은 "공식 암기"보다 "어떤 연산이 앞단에 어떤 영향 신호를 보내는가"로 이해하면 훨씬 실용적이다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;forward: input -> model&quot;] --> B[&quot;loss L&quot;]
  B --> C[&quot;backward: gradients&quot;]
  C --> D[&quot;optimizer step&quot;]
  D --> E[&quot;updated parameters&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;scalar derivative&quot;] --> B[&quot;partial derivatives&quot;]
  B --> C[&quot;gradient vector&quot;]
  C --> D[&quot;chain rule&quot;]
  D --> E[&quot;backpropagation&quot;]
  E --> F[&quot;parameter update&quot;]`"
/>

## 직관과 한 가지 예시

가장 작은 예시는 선형 회귀 한 개다.

```text
y_hat = wx
L = (y_hat - y)^2
```

여기서 `dL/dw`는 "가중치 `w`를 조금 올렸을 때 loss가 커지는가, 작아지는가"를 알려준다. 값이 양수면 `w`를 줄이고, 음수면 `w`를 늘리면 된다.

이 관점을 여러 파라미터로 확장하면 gradient 벡터가 된다. 즉, gradient는 "현재 loss 지형에서 내려가는 방향 화살표 묶음"이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;prediction error&quot;] --> B[&quot;loss&quot;]
  B --> C[&quot;dL/dw&quot;]
  C --> D[&quot;update w&quot;]
  D --> E[&quot;new prediction&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Stable vs Unstable Loss Curves&quot;
    x-axis &quot;step&quot; [1, 2, 3, 4, 5, 6]
    y-axis &quot;loss&quot; 0 --> 7
    line [6.0, 4.8, 3.7, 2.9, 2.2, 1.8]
    line [6.0, 5.7, 5.9, 5.1, 5.8, 4.9]`"
/>

## 논문에서는 이렇게 보인다

대표 식은 아래다.

```text
theta <- theta - eta * grad_theta L
```

### 줄 단위로 읽는 gradient 식

| 조각 | 읽는 법 | 실제 의미 |
| --- | --- | --- |
| `theta` | 현재 파라미터 | 모델이 가진 모든 가중치 |
| `grad_theta L` | 파라미터별 손실 증가 방향 | 그대로 가면 손실이 커짐 |
| `eta` | learning rate | 얼마나 크게 움직일지 |
| `-` | gradient 반대 방향 | 손실을 줄이려는 이동 |

좀 더 압축된 논문 식으로는 아래도 자주 본다.

```text
partial L / partial W = partial L / partial h * partial h / partial W
```

이 식은 chain rule의 핵심을 보여준다. 중간 표현 `h`가 loss에 미친 영향과, 가중치 `W`가 `h`에 미친 영향을 곱해서 최종적으로 `W`가 loss에 미친 영향을 계산한다.

Transformer 쪽으로 가면 residual connection과 layer norm이 gradient 흐름을 덜 불안정하게 만드는 문맥에서 다시 등장한다. 즉, gradient scale 문제는 수학 장에서 끝나는 이야기가 아니라 모델 구조 선택으로 이어진다.

## PyTorch와 코드로 연결하기

- `loss.backward()`가 chain rule을 따라 gradient를 자동 계산한다.
- `param.grad`에는 각 파라미터의 gradient가 들어간다.
- `optimizer.step()`은 `theta <- theta - lr * grad`를 구현한다.
- `optimizer.zero_grad()`를 빼먹으면 이전 gradient가 누적된다.

바로 연결해서 볼 예제:

- [gradient_chain_rule.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/gradient_chain_rule.py)
- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py)

## 자주 틀리는 지점

- 미분을 변화율 정의로만 기억하고 업데이트 신호 관점을 놓친다.
- `gradient가 크다`를 항상 좋은 것으로 오해한다.
- learning rate와 gradient scale을 분리해서 생각하지 못한다.
- `loss.backward()`가 loss만 미분한다고 생각하고 계산 그래프 전체를 통한 전파를 놓친다.
- residual, normalization 같은 구조가 왜 optimization 안정성에 중요한지 연결하지 못한다.

### gradient scale pathology를 왜 미리 알아야 하나

- gradient가 너무 작으면 앞단 레이어가 거의 학습되지 않는다.
- gradient가 너무 크면 업데이트가 튀어서 loss가 흔들린다.
- 깊은 네트워크일수록 이 문제가 커져서 residual connection, normalization, initialization이 중요해진다.

<MermaidDiagram
  :code="`xychart
    title &quot;Gradient Scale Across Layers&quot;
    x-axis &quot;layer depth&quot; [1, 2, 3, 4, 5]
    y-axis &quot;gradient magnitude&quot; 0 --> 5
    line [1.8, 1.3, 0.9, 0.5, 0.2]
    line [0.9, 1.2, 1.8, 2.9, 4.4]`"
/>

## 연습

### 기초 확인

1. `dL/dw`를 "가중치 `w`를 조금 바꾸면 무엇이 달라지는가" 관점으로 설명해본다.
2. learning rate가 너무 크면 어떤 문제가 생기는지 적어본다.
3. chain rule이 왜 필요한지 한 문장으로 적어본다.

### 논문 읽기 훈련

1. `theta <- theta - eta * grad_theta L`에서 각 항의 역할을 적어본다.
2. `partial L / partial W = partial L / partial h * partial h / partial W`를 말로 풀어본다.
3. 어떤 논문이 optimization instability를 줄이기 위해 residual과 norm을 강조한다면, 그게 gradient와 어떻게 연결되는지 적어본다.

### 코드 연결 훈련

1. `gradient_chain_rule.py`에서 어떤 값이 forward 결과이고 어떤 값이 backward 신호인지 구분해본다.
2. `linear_regression.py`에서 `loss.backward()`와 `optimizer.step()`가 수식의 어느 부분과 연결되는지 적어본다.
3. gradient accumulation이 의도치 않게 발생하면 어떤 현상이 보일지 설명해본다.

## 다음 장으로 연결

이제 손실을 줄이는 업데이트 신호가 어떻게 생기는지는 알게 됐다. 다음은 모델 출력이 왜 확률 분포로 읽히는지, 그리고 sampling과 평가가 왜 확률 언어 위에 서 있는지 보는 차례다.

다음 장: [확률과 softmax](/math/probability)
