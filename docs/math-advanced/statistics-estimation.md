# 통계와 추정

## 왜 중요한가

머신러닝은 결국 유한한 데이터에서 보이지 않는 분포를 추정하는 작업이다. 그래서 random variable, expectation, covariance, MLE, MAP, bias-variance 감각은 학습과 평가 전반에 직접 연결된다.

이 장이 약하면 "성능 수치가 왜 흔들리는가", "왜 validation이 필요한가", "uncertainty를 어떻게 읽는가"가 감으로만 남는다. 반대로 이 장이 잡히면 데이터와 모델의 관계를 훨씬 더 통계적으로 읽게 된다.

## 한 문장 핵심

통계와 추정은 유한한 샘플에서 분포, 평균, 흔들림, 불확실성을 읽는 언어다.

### 30초 직관

통계를 아주 쉽게 말하면 "몇 개 본 데이터로 전체 세상을 추측하는 방법"이다. 그래서 평균만 보는 게 아니라, 그 추측이 얼마나 흔들릴지도 같이 봐야 한다.

### 개발자 관점에서 다시 읽기

validation 점수가 출렁이거나 샘플 수가 적을 때 불안한 이유를 설명하는 언어가 바로 통계다. MLE도 새 알고리즘이 아니라 "지금 데이터에 제일 잘 맞는 파라미터를 고른다"는 말이다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `E[X]` | 평균적으로 기대되는 값 | expected loss |
| `Var(X)` | 흔들림 크기 | uncertainty |
| `Cov(X, Y)` | 두 변수의 함께 움직임 | feature correlation |
| `theta_MLE` | 데이터를 가장 잘 설명하는 추정값 | likelihood maximization |
| `theta_MAP` | prior까지 반영한 추정값 | Bayesian flavor |

통계에서 중요한 것은 "정답 숫자 하나"보다 "이 추정이 얼마나 흔들릴 수 있는가"를 같이 보는 습관이다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;sampled data&quot;] --> B[&quot;estimate mean / variance&quot;]
  B --> C[&quot;fit model&quot;]
  C --> D[&quot;measure likelihood&quot;]
  D --> E[&quot;generalization check&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Estimation Error vs Sample Size&quot;
    x-axis &quot;sample size&quot; [10, 50, 100, 500, 1000]
    y-axis &quot;estimation error&quot; 0 --> 0.6
    line [0.52, 0.31, 0.22, 0.10, 0.07]`"
/>

## 직관과 한 가지 예시

샘플 평균은 단순하지만 매우 중요한 예시다. 같은 분포에서 데이터를 조금만 뽑으면 평균 추정도 흔들리고, 많이 뽑으면 안정된다. 이 감각이 바로 evaluation variance와 신뢰구간 감각의 출발점이다.

### Formula Autopsy: Maximum Likelihood Estimation

```text
theta_MLE = argmax_theta prod_i p(x_i | theta)
```

- `theta`: 추정하려는 파라미터
- `p(x_i | theta)`: 현재 파라미터가 샘플 `x_i`를 얼마나 잘 설명하는가
- `prod_i`: 모든 샘플에 대해 함께 고려
- `argmax`: 가장 설명력이 높은 파라미터를 고름

실제로는 곱보다 로그합으로 바꿔 `sum_i log p(x_i | theta)` 형태로 더 자주 읽는다.

## 논문에서는 이렇게 보인다

| 논문 표현 | 읽는 법 | 연결 문맥 |
| --- | --- | --- |
| maximum likelihood | 데이터를 가장 잘 설명하는 방향 | language modeling objective |
| MAP estimate | prior를 반영한 추정 | Bayesian regularization |
| covariance matrix | 같이 움직이는 구조 | representation analysis |
| bias-variance tradeoff | 과소적합 vs 과적합 균형 | model selection |

언어모델의 next-token objective도 결국 conditional likelihood를 높이는 추정 문제로 읽을 수 있다.

## PyTorch와 코드로 연결하기

- `torch.mean`, `torch.var`는 기본 통계량 계산이다.
- 학습 루프의 loss 평균은 expectation 감각과 연결된다.
- `CrossEntropyLoss`도 결국 likelihood maximization 언어로 읽을 수 있다.
- validation metric의 흔들림은 sample size와 variance 감각으로 해석해야 한다.

## 자주 틀리는 지점

- 평균 수치만 보고 분산이나 불확실성을 무시한다.
- MLE를 새로운 최적화 트릭처럼 보고 likelihood 해석을 놓친다.
- covariance를 복잡한 표로만 보고 feature co-movement 감각을 놓친다.
- validation 성능 변동을 코드 버그로만 생각하고 샘플링 흔들림 가능성을 놓친다.

## 연습

### 기초 확인

1. expectation과 variance가 각각 무엇을 말하는지 적어본다.
2. sample size가 커질수록 추정이 안정되는 이유를 적어본다.
3. MLE를 한 문장으로 설명해본다.

### 논문 읽기 훈련

1. `theta_MLE` 식에서 각 기호의 역할을 적어본다.
2. 언어모델의 cross-entropy 학습이 왜 likelihood maximization과 연결되는지 적어본다.
3. bias-variance tradeoff가 evaluation 문맥에서 왜 중요한지 적어본다.

### 엔지니어 / 코드 훈련

1. 현재 학습 로그에서 평균 loss 외에 어떤 분산성 신호를 같이 보면 좋은지 적어본다.
2. covariance를 보면 representation collapse 여부를 어떻게 의심할 수 있을지 적어본다.
3. validation 결과가 출렁일 때 통계적 원인과 구현 버그를 어떻게 구분할지 적어본다.

## 다음 장으로 연결

데이터와 추정의 흔들림을 읽었다면, 이제 실제 학습이 왜 안정하거나 불안정해지는지를 봐야 한다. 다음 장에서는 최적화와 수치 안정성으로 넘어간다.

다음 장: [최적화와 수치 안정성](/math-advanced/optimization-numerical-stability)
