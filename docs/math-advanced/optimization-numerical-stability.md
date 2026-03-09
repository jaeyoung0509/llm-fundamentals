# 최적화와 수치 안정성

## 왜 중요한가

좋은 모델 구조를 알아도 학습이 불안정하면 실무에서는 소용이 없다. learning rate, conditioning, gradient clipping, normalization, floating-point 안정성은 "왜 이 학습이 갑자기 터지는가"를 읽는 핵심 언어다.

이 장은 convex/non-convex를 엄밀 증명하는 과목이 아니라, 실제 학습 곡선과 수치 폭발을 해석하는 실전 수학 장이다.

## 한 문장 핵심

최적화와 수치 안정성은 손실을 줄이는 방법 자체보다, 그 과정이 얼마나 믿을 만하고 안정적인지 읽는 언어다.

### 30초 직관

이 장은 "정답 방향으로 가고 있어도 걸음이 너무 크면 넘어진다"는 이야기다. 좋은 gradient가 있어도 learning rate, scale, float 범위가 맞지 않으면 학습은 쉽게 흔들린다.

### 개발자 관점에서 다시 읽기

`NaN`, loss 폭발, mixed precision 불안정, clipping, warmup은 다 같은 세계 이야기다. 즉, 모델이 틀렸다기보다 학습 수치가 버티지 못하는 상황을 읽는 수학이다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `eta_t` | 시점별 learning rate | scheduler |
| `cond(A)` | 얼마나 민감한지 나타내는 조건수 | optimization difficulty |
| `eps` | 0으로 나누기나 underflow 방지용 작은 수 | Adam, normalization |
| `clip(g)` | 너무 큰 gradient를 제한 | gradient clipping |
| `log-sum-exp` | 큰 수/작은 수를 안정적으로 다루는 형태 | stable softmax |

여기서 중요한 것은 최적화 알고리즘 이름을 외우는 것이 아니라, "왜 안정화 장치가 필요한가"를 이해하는 것이다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;forward&quot;] --> B[&quot;loss&quot;]
  B --> C[&quot;backward&quot;]
  C --> D[&quot;clip / normalize / scale&quot;]
  D --> E[&quot;optimizer step&quot;]
  E --> F[&quot;stable or unstable training&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Learning Rate Schedule Intuition&quot;
    x-axis &quot;step&quot; [1, 2, 3, 4, 5, 6]
    y-axis &quot;learning rate&quot; 0 --> 0.12
    line [0.10, 0.10, 0.08, 0.06, 0.04, 0.02]`"
/>

## 직관과 한 가지 예시

같은 gradient라도 learning rate가 너무 크면 손실이 튀고, 너무 작으면 거의 움직이지 않는다. 따라서 optimization은 "방향이 맞는가"뿐 아니라 "걸음걸이가 적절한가"의 문제이기도 하다.

### 아주 작은 숫자 예시

현재 파라미터가 `w = 10`, gradient가 `g = 2`라고 하자.

- learning rate가 `0.1`이면 업데이트 후 `w = 9.8`
- learning rate가 `1.0`이면 업데이트 후 `w = 8`
- learning rate가 너무 크면 한 번에 너무 멀리 뛰어 손실 골짜기를 지나칠 수 있다

즉, gradient가 맞아도 step size가 틀리면 학습이 흔들릴 수 있다. optimizer를 읽을 때는 항상 "방향"과 "걸음 크기"를 따로 생각하는 편이 좋다.

### Formula Autopsy: Stable Softmax

```text
softmax(z_i) = exp(z_i - m) / sum_j exp(z_j - m),  where m = max_j z_j
```

- `m`을 빼도 softmax 결과는 바뀌지 않는다.
- 대신 큰 로짓 때문에 `exp(z)`가 overflow 나는 문제를 줄인다.
- 즉, 수학적으로 같은 식을 수치적으로 더 안전하게 다시 쓴 것이다.

실무에서 이런 패턴은 매우 흔하다. 같은 수식도 구현 가능한 형태로 바꾸는 게 중요하다.

## 논문에서는 이렇게 보인다

| 논문 표현 | 읽는 법 | 연결 문맥 |
| --- | --- | --- |
| optimization instability | gradient scale이나 conditioning 문제가 있음 | deep training |
| warmup / decay | step size 제어 | transformer training |
| normalization | scale 조절 | layer norm, RMSNorm |
| mixed precision stability | float range 문제 관리 | large-scale training |

Adam, AdamW 같은 optimizer도 결국 noisy gradient 환경에서 step size와 scale을 더 안정적으로 조절하려는 장치로 읽는 편이 좋다.

## PyTorch와 코드로 연결하기

- `torch.nn.utils.clip_grad_norm_`는 gradient clipping을 구현한다.
- optimizer의 `eps`는 division stability를 보강한다.
- `torch.autocast`와 gradient scaler는 mixed precision 안정성과 연결된다.
- scheduler는 `eta_t`를 시간에 따라 바꾼다.

## 자주 틀리는 지점

- optimizer를 블랙박스로 보고 learning rate와 scale 문제를 분리해서 생각하지 못한다.
- 학습 곡선이 흔들리면 데이터나 모델 구조만 의심하고 수치 안정성 문제를 놓친다.
- stable softmax 같은 변형을 "수학이 달라졌다"고 오해한다.
- clipping을 무조건 좋은 것으로 보고 과도한 제한이 학습력을 줄일 수 있다는 점을 놓친다.

## 연습

### 기초 확인

1. learning rate가 너무 크거나 작을 때 어떤 현상이 생기는지 적어본다.
2. stable softmax에서 `max(z)`를 빼는 이유를 적어본다.
3. clipping이 필요한 상황을 한 가지 적어본다.

### 논문 읽기 훈련

1. `softmax(z_i - m)` 식에서 `m`의 역할을 적어본다.
2. 어떤 논문이 warmup을 쓴다고 하면 왜 초기 학습 안정성과 연결되는지 적어본다.
3. conditioning이 나쁘다는 문장이 optimization difficulty와 어떻게 연결되는지 적어본다.

### 엔지니어 / 코드 훈련

1. 현재 학습 코드에서 learning rate, clipping, normalization이 어디에 있는지 적어본다.
2. mixed precision을 켰을 때 가장 먼저 관찰할 로그 신호를 적어본다.
3. loss가 `NaN`이 될 때 수치 안정성 관점에서 어떤 순서로 점검할지 적어본다.

## 다음 장으로 연결

이제 손실 곡선이 왜 흔들리는지 읽을 수 있게 됐다. 다음 장에서는 분포 자체를 비교하고 정보량을 측정하는 정보 이론으로 넘어간다.

다음 장: [정보 이론](/math-advanced/information-theory)
