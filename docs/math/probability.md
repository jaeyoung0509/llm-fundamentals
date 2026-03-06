# 확률과 softmax

## 왜 중요한가

LLM은 정답 하나를 확실히 아는 기계가 아니라, 다음 토큰 후보들에 대한 분포를 추정하는 기계다. 그래서 확률을 이해하지 못하면 생성, sampling, 평가, calibration을 전부 따로따로 외우게 된다.

이 장이 잡히면 `p_theta(y_t | context)`가 바로 next-token prediction으로 읽히고, temperature sampling과 cross-entropy, entropy, calibration이 한 언어 안에서 연결된다.

## 한 문장 핵심

확률은 모델의 불확실성을 표현하는 언어이고, softmax는 점수를 그 언어로 바꾸는 번역기다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `p(y|x)` | 입력 `x`가 주어졌을 때 `y`의 확률 | 분류, 생성 |
| `E[X]` | 평균적으로 기대되는 값 | 기대 손실, expected reward |
| `Var(X)` | 결과의 흔들림 정도 | 분산, 불확실성 |
| `H(p)` | 분포의 퍼짐 정도 | entropy |
| `CE(p, q)` | 정답 분포와 모델 분포의 차이 | cross-entropy |

여기서 핵심은 "확률 = 정답 비율"로만 이해하지 않는 것이다. 모델에서는 확률이 예측 신뢰도, sampling 재료, loss 계산 입력, calibration 판단 기준을 동시에 담당한다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;softmax&quot;]
  B --> C[&quot;probability distribution&quot;]
  C --> D[&quot;sampling or argmax&quot;]
  C --> E[&quot;cross-entropy loss&quot;]
  C --> F[&quot;calibration check&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;context&quot;] --> B[&quot;p_theta(next token | context)&quot;]
  B --> C[&quot;high-probability candidates&quot;]
  B --> D[&quot;long tail candidates&quot;]
  C --> E[&quot;greedy / beam / sample&quot;]
  D --> E`"
/>

## 직관과 한 가지 예시

모델이 어떤 문맥 뒤에 다음 토큰 분포를 아래처럼 냈다고 하자.

```text
{ "Paris": 0.72, "London": 0.16, "Seoul": 0.07, "other": 0.05 }
```

이 분포는 세 가지를 동시에 말한다.

- 모델이 가장 그럴듯하다고 보는 후보는 `Paris`
- 완전히 확신한 것은 아니므로 다른 후보도 남겨둠
- sampling 전략에 따라 실제 출력은 달라질 수 있음

temperature를 높이면 꼬리 후보도 더 자주 선택되고, 낮추면 상위 후보에 더 집중한다.

<MermaidDiagram
  :code="`xychart
    title &quot;Temperature Changes Distribution Sharpness&quot;
    x-axis &quot;token rank&quot; [1, 2, 3, 4]
    y-axis &quot;probability&quot; 0 --> 1
    line [0.83, 0.10, 0.05, 0.02]
    line [0.55, 0.23, 0.14, 0.08]`"
/>

calibration도 같은 언어다. 모델이 `0.9`라고 말할 때 실제로 90%쯤 맞는가를 보는 것이다.

<MermaidDiagram
  :code="`xychart
    title &quot;Confidence vs Actual Correctness&quot;
    x-axis &quot;confidence bucket&quot; [0.2, 0.4, 0.6, 0.8, 1.0]
    y-axis &quot;actual accuracy&quot; 0 --> 1
    line [0.25, 0.38, 0.58, 0.69, 0.81]`"
/>

## 논문에서는 이렇게 보인다

대표 식은 아래다.

```text
p_theta(y_t | y_<t, x)
```

이 식을 읽는 순서는 고정하면 된다.

| 조각 | 읽는 법 |
| --- | --- |
| `theta` | 현재 모델 파라미터 |
| `y_<t, x` | 지금까지 본 문맥 |
| `y_t` | 지금 맞히려는 다음 토큰 |
| `p_theta(...)` | 그 토큰에 대한 모델의 분포 |

이 분포에서:

- 가장 큰 확률을 택하면 greedy decoding
- 여러 후보를 탐색하면 beam search
- 분포에서 직접 뽑으면 sampling

cross-entropy는 이 분포가 정답 쪽에 얼마나 질량을 잘 두는지를 평가한다. entropy는 분포가 얼마나 퍼져 있는지를 보고, expectation은 평균적인 결과를 계산할 때 등장한다.

## PyTorch와 코드로 연결하기

- `torch.softmax(logits, dim=-1)`는 logits를 확률 분포로 바꾼다.
- `torch.multinomial(probs, num_samples=1)`는 sampling을 구현한다.
- `CrossEntropyLoss`는 예측 분포가 정답에 얼마나 질량을 주는지 본다.
- 평가에서는 confidence bucket을 모아 calibration plot을 만들 수 있다.

예제 연결:

- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)

## 자주 틀리는 지점

- softmax 확률을 사실 그 자체로 믿고 calibration을 보지 않는다.
- entropy를 "무작위성"으로만 외우고 분포 퍼짐 정도로 읽지 못한다.
- cross-entropy와 entropy를 비슷한 단어로만 기억하고 역할 차이를 구분하지 못한다.
- sampling을 "랜덤"이라고만 생각하고 temperature, top-k, top-p 같은 제어를 놓친다.
- `p_theta(y_t | context)`를 식으로만 보고 실제 생성 루프로 연결하지 못한다.

## 연습

### 기초 확인

1. `p(y|x)`가 분류와 생성에서 각각 어떻게 읽히는지 적어본다.
2. temperature가 커질수록 분포가 왜 평평해지는지 적어본다.
3. calibration이 왜 단순 accuracy와 다른지 설명해본다.

### 논문 읽기 훈련

1. `p_theta(y_t | y_<t, x)`를 줄 단위로 해석해본다.
2. entropy가 높다는 말이 생성 분포 관점에서 무엇을 뜻하는지 적어본다.
3. 어떤 논문에서 모델이 overconfident하다고 썼다면 calibration 그래프에서 어떤 패턴이 나올지 적어본다.

### 코드 연결 훈련

1. `softmax_sampling.py`에서 logits -> probabilities -> sampled token 흐름을 직접 설명해본다.
2. `argmax` decoding과 multinomial sampling이 각각 어떤 상황에 더 어울리는지 적어본다.
3. confidence bucket 기반 평가 코드를 짠다면 어떤 값들을 저장해야 하는지 적어본다.

## 다음 장으로 연결

네 개의 수학 축이 모두 연결됐다. 이제 남은 일은 이 개념들을 한 번에 엮어서 논문 식과 PyTorch 코드로 번역하는 최종 점검이다.

다음 장: [수학 최종 점검](/math/final-checkpoint)
