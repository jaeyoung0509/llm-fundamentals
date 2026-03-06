# 미분과 gradient

## 이 페이지의 목표

- 미분을 변화율이 아니라 손실 감소 신호로 이해한다.
- gradient descent의 핵심 문장을 이해한다.
- chain rule이 backpropagation과 연결된다는 점을 잡는다.

## 핵심 문장

파라미터를 조금 바꿨을 때 손실이 얼마나 달라지는지 알려주는 값이 gradient다.

```text
parameter = parameter - learning_rate * gradient
```

## 학습이 일어나는 흐름

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;입력 x&quot;] --> B[&quot;모델 예측 y_hat&quot;]
  B --> C[&quot;손실 계산&quot;]
  C --> D[&quot;gradient 계산&quot;]
  D --> E[&quot;파라미터 업데이트&quot;]
  E --> B`"
/>

## 왜 chain rule이 중요한가

신경망은 함수 여러 개가 이어진 구조다. backpropagation은 마지막 손실에서 시작해 앞단 파라미터들까지 영향도를 전파해야 하므로 chain rule이 필요하다.

## 계산 그래프로 읽기

```text
x -> linear -> activation -> logits -> loss
```

forward에서는 왼쪽에서 오른쪽으로 값을 계산하고, backward에서는 오른쪽에서 왼쪽으로 영향도를 돌려보낸다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;forward&quot;] --> B[&quot;representation&quot;]
  B --> C[&quot;logits&quot;]
  C --> D[&quot;loss&quot;]
  D --> E[&quot;backward&quot;]
  E --> F[&quot;gradients on parameters&quot;]`"
/>

## 아주 작은 chain rule 예시

`z = wx + b`, `L = z^2`라고 하자.

1. `w`가 `z`를 바꾼다.
2. `z`가 `L`을 바꾼다.

즉, 앞 변수의 변화가 중간 변수를 거쳐 마지막 loss까지 어떻게 전달되는가를 곱해서 읽는 것이 chain rule의 핵심이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;w changes&quot;] --> B[&quot;z changes&quot;]
  B --> C[&quot;L changes&quot;]
  C --> D[&quot;combine local effects&quot;]`"
/>

## 손실 함수 관점에서 미분 보기

| gradient 부호 | 의미 |
| --- | --- |
| 양수 | 값을 줄이는 쪽이 loss 감소에 유리 |
| 음수 | 값을 키우는 쪽이 loss 감소에 유리 |
| 0 근처 | 변화가 작거나 정체 구간일 수 있음 |

## 논문에서 자주 보이는 표기

| 표기 | 읽는 법 |
| --- | --- |
| `grad_theta L` | 파라미터 `theta`에 대한 loss의 기울기 |
| `partial L / partial w` | 특정 파라미터를 조금 바꿨을 때의 민감도 |
| `theta <- theta - eta g` | gradient 반대 방향 업데이트 |
| `E[L]` | 평균 loss |

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;loss L&quot;] --> B[&quot;partial L / partial w&quot;]
  B --> C[&quot;direction signal&quot;]
  C --> D[&quot;optimizer update&quot;]`"
/>

## learning rate는 왜 중요한가

- 너무 작으면 거의 움직이지 않는다
- 너무 크면 지나쳐서 흔들린다
- 적당하면 안정적으로 loss를 줄인다

optimizer는 결국 이 gradient 신호를 얼마나, 어떤 방식으로 반영할지 정하는 규칙이다.

## 그래프로 보는 학습 안정성

<MermaidDiagram
  :code="`xychart
    title &quot;Stable vs Unstable Loss Curves&quot;
    x-axis &quot;step&quot; [1, 2, 3, 4, 5, 6]
    y-axis &quot;loss&quot; 0 --> 3.5
    line [3.0, 2.2, 1.6, 1.1, 0.8, 0.6]
    line [3.0, 2.4, 2.9, 1.7, 2.5, 1.4]`"
/>

## gradient가 사라지거나 커지는 문제

- 너무 작아지면 앞단 층이 거의 안 배운다
- 너무 커지면 업데이트가 불안정해진다

그래서 activation, initialization, normalization이 같이 중요해진다.

<MermaidDiagram
  :code="`xychart
    title &quot;Gradient Scale Across Layers&quot;
    x-axis &quot;layer&quot; [1, 2, 3, 4, 5]
    y-axis &quot;|gradient|&quot; 0 --> 1.2
    line [1.0, 0.55, 0.24, 0.08, 0.02]
    line [0.10, 0.22, 0.45, 0.82, 1.10]`"
/>

## 논문에서 이렇게 읽는다

```text
We optimize the parameters theta by minimizing cross-entropy with Adam.
```

- 목표: cross-entropy를 줄인다
- 대상: 파라미터 `theta`
- 신호: gradient
- 방법: Adam optimizer가 업데이트 크기와 방향을 조절한다

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;current parameters&quot;] --> B[&quot;compute loss&quot;]
  B --> C[&quot;compute gradients&quot;]
  C --> D[&quot;optimizer rule&quot;]
  D --> E[&quot;new parameters&quot;]`"
/>

## 코드 연결

- `loss.backward()`는 계산 그래프를 거꾸로 따라가며 gradient를 누적한다
- `parameter.grad`에는 각 파라미터의 기울기가 저장된다
- `optimizer.step()`은 그 gradient를 이용해 파라미터를 갱신한다

## 작은 실험으로 확인하기

- [gradient_chain_rule.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/gradient_chain_rule.py)를 보면 chain rule과 PyTorch autograd 결과를 같이 확인할 수 있다.

## 연습

### 기초 확인

1. gradient가 양수라는 말이 파라미터 업데이트에 어떤 의미인지 설명해본다.
2. learning rate가 너무 큰 경우 어떤 학습 곡선이 나올지 상상해본다.
3. chain rule이 왜 깊은 네트워크에서 필수인지 적어본다.

### 논문 읽기 훈련

1. `theta <- theta - eta grad_theta L`에서 `theta`, `eta`, `grad_theta L`이 각각 무엇을 뜻하는지 적어본다.
2. 어떤 논문이 "training became unstable"라고 했을 때, learning rate와 gradient scale 관점에서 어떤 문제를 의심할 수 있는지 적어본다.
3. `E[L]`가 loss 식에 나오면 왜 "샘플 전체 평균"을 먼저 떠올려야 하는지 설명해본다.

### 코드 연결 훈련

1. `loss.backward()`와 `optimizer.step()`의 차이를 코드와 수식 양쪽으로 설명해본다.
2. `gradient_chain_rule.py`에서 `dL/dw`가 왜 그 값이 되는지 손으로 먼저 계산해본다.

## 생각해볼 질문

1. gradient가 0에 가까우면 학습은 어떻게 될까
2. learning rate가 너무 크면 어떤 일이 생길까
3. backpropagation을 chain rule 없이 설명할 수 있을까
4. optimizer를 바꾸는 것과 loss를 바꾸는 것은 왜 완전히 다른 결정일까

다음: [확률과 softmax](/math/probability)
