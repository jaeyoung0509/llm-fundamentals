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

간단히 말해 "뒤쪽 결과가 바뀌면 앞쪽 변수에 어떤 영향이 돌아오는가"를 단계적으로 계산하는 법이 chain rule이다.

## 계산 그래프로 읽기

깊은 모델의 식은 길어 보여도 보통 아래처럼 읽을 수 있다.

```text
x -> linear -> activation -> logits -> loss
```

forward에서는 왼쪽에서 오른쪽으로 값을 계산하고, backward에서는 오른쪽에서 왼쪽으로 영향도를 돌려보낸다.

이 관점이 잡히면 `grad_theta L`은 갑자기 등장한 신비한 기호가 아니라, 계산 그래프를 거슬러 올라가며 모은 민감도라는 뜻이 된다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;forward&quot;] --> B[&quot;representation&quot;]
  B --> C[&quot;logits&quot;]
  C --> D[&quot;loss&quot;]
  D --> E[&quot;backward&quot;]
  E --> F[&quot;gradients on parameters&quot;]`"
/>

## 아주 작은 chain rule 예시

`z = wx + b`, `L = z^2`라고 하자. 그러면 `w`가 loss에 미치는 영향은 두 단계로 나뉜다.

1. `w`가 `z`를 바꾼다.
2. `z`가 `L`을 바꾼다.

즉, "앞 변수의 변화가 중간 변수를 거쳐 마지막 loss까지 어떻게 전달되는가"를 곱해서 읽는 것이 chain rule의 핵심이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;w changes&quot;] --> B[&quot;z changes&quot;]
  B --> C[&quot;L changes&quot;]
  C --> D[&quot;combine local effects&quot;]`"
/>

## 손실 함수 관점에서 미분 보기

수학 시간에는 미분을 변화율로 배웠을 수 있다. 딥러닝에서는 더 실용적으로, "이 파라미터를 조금 바꾸면 loss가 좋아지나 나빠지나"를 알려주는 신호로 이해하면 된다.

| gradient 부호 | 의미 |
| --- | --- |
| 양수 | 값을 줄이는 쪽이 loss 감소에 유리 |
| 음수 | 값을 키우는 쪽이 loss 감소에 유리 |
| 0 근처 | 현재 지점에서 변화가 작거나 정체 구간일 수 있음 |

## 논문에서 자주 보이는 표기

| 표기 | 읽는 법 |
| --- | --- |
| `grad_theta L` | 파라미터 `theta`에 대한 loss의 기울기 |
| `partial L / partial w` | 특정 파라미터 `w`를 조금 바꿨을 때 loss가 얼마나 바뀌는가 |
| `theta <- theta - eta g` | gradient `g`의 반대 방향으로 업데이트 |
| `E[L]` | 평균 loss 또는 기대 loss |

`partial`이 보이면 "이 변수 하나만 바꿔보는 민감도"라고 읽으면 된다.

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;loss L&quot;] --> B[&quot;partial L / partial w&quot;]
  B --> C[&quot;direction signal&quot;]
  C --> D[&quot;optimizer update&quot;]`"
/>

## 모델 연결

| 수학 개념 | 모델 예시 |
| --- | --- |
| 미분 | 손실이 파라미터에 얼마나 민감한가 |
| gradient | 업데이트 방향 신호 |
| chain rule | 역전파 |

## learning rate는 왜 중요한가

- 너무 작으면: 방향은 맞아도 거의 움직이지 않는다
- 너무 크면: 좋은 방향을 알아도 지나쳐서 흔들린다
- 적당하면: 안정적으로 loss를 줄인다

optimizer는 결국 이 gradient 신호를 얼마나, 어떤 방식으로 반영할지 정하는 규칙이다. 그래서 gradient 의미를 모르면 Adam, SGD 같은 이름만 외우게 된다.

## 논문에서 이렇게 읽는다

예를 들어 아래 같은 문장을 만나면:

```text
We optimize the parameters theta by minimizing cross-entropy with Adam.
```

이렇게 해석한다.

- 목표: cross-entropy를 줄인다
- 대상: 파라미터 `theta`
- 신호: gradient
- 방법: Adam optimizer가 업데이트 크기와 방향을 조절한다

핵심은 optimizer 이름보다 "loss를 줄이기 위한 반복 업데이트"라는 구조다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;current parameters&quot;] --> B[&quot;compute loss&quot;]
  B --> C[&quot;compute gradients&quot;]
  C --> D[&quot;optimizer rule&quot;]
  D --> E[&quot;new parameters&quot;]`"
/>

## 자주 생기는 오해

- gradient가 크면 무조건 좋은 것이라고 생각하기
- loss가 줄지 않으면 모델 구조만 탓하기
- backpropagation을 "마법"처럼 여기고 chain rule과 끊어 생각하기

## 연습

1. gradient가 양수라는 말이 파라미터 업데이트에 어떤 의미인지 설명해본다.
2. learning rate가 너무 큰 경우 어떤 학습 곡선이 나올지 상상해본다.
3. chain rule이 왜 깊은 네트워크에서 필수인지 적어본다.

## 생각해볼 질문

1. gradient가 0에 가까우면 학습은 어떻게 될까
2. learning rate가 너무 크면 어떤 일이 생길까
3. backpropagation을 chain rule 없이 설명할 수 있을까

다음: [확률과 softmax](/math/probability)
