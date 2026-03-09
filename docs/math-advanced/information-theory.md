# 정보 이론

## 왜 중요한가

언어모델의 핵심 손실은 확률 분포를 다루는 문제이고, 정보 이론은 그 분포의 퍼짐, 차이, 놀람을 읽는 언어다. entropy, cross-entropy, KL divergence, mutual information은 LLM 학습, distillation, alignment, evaluation에서 반복해서 나타난다.

기초 수학에서 확률과 softmax를 배웠다면, 이 장은 그 위에 "분포를 어떻게 비교하고 해석할 것인가"를 더 얹는 단계다.

## 한 문장 핵심

정보 이론은 분포가 얼마나 퍼져 있는지, 두 분포가 얼마나 다른지, 정보가 얼마나 전달되는지를 읽는 언어다.

### 30초 직관

정보 이론을 아주 쉽게 말하면 "모델이 얼마나 헷갈리는가, 그리고 정답 분포와 얼마나 어긋나는가"를 재는 수학이다. entropy는 퍼짐, KL은 어긋남으로 읽으면 시작이 훨씬 쉽다.

### 개발자 관점에서 다시 읽기

cross-entropy loss를 이미 쓰고 있다면 정보 이론을 이미 쓰고 있는 것이다. 이 장은 새로운 세계를 여는 게 아니라, 이미 쓰는 loss를 더 깊은 분포 언어로 다시 설명하는 단계다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `H(p)` | 분포 자체의 퍼짐 | entropy |
| `CE(p, q)` | 정답 분포와 모델 분포의 차이 | cross-entropy |
| `KL(p || q)` | `p`와 `q`의 차이 | distillation, shift |
| `I(X; Y)` | `X`가 `Y`에 대해 주는 정보량 | mutual information |
| `-log p(y)` | 놀람의 크기 | surprise, token loss |

정보 이론에서 중요한 것은 "확률이 높다/낮다"를 넘어서, 분포 전체 구조를 읽는 감각이다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;entropy H(p)&quot;] --> B[&quot;cross-entropy CE(p, q)&quot;]
  B --> C[&quot;KL divergence&quot;]
  C --> D[&quot;distribution comparison&quot;]
  D --> E[&quot;LM loss / distillation / alignment&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Peaked vs Flat Distribution Intuition&quot;
    x-axis &quot;token rank&quot; [1, 2, 3, 4]
    y-axis &quot;probability&quot; 0 --> 1
    line [0.85, 0.10, 0.04, 0.01]
    line [0.40, 0.30, 0.20, 0.10]`"
/>

## 직관과 한 가지 예시

분포가 한 토큰에 몰려 있으면 entropy가 낮고, 여러 토큰에 퍼져 있으면 entropy가 높다. 이 감각은 생성 다양성, confidence, calibration을 읽을 때도 계속 나온다.

### 아주 작은 숫자 예시

정답 토큰이 첫 번째라고 하자.

- 모델 A: `q = [0.7, 0.2, 0.1]`
- 모델 B: `q = [0.4, 0.3, 0.3]`

두 모델 모두 첫 번째 토큰을 가장 높게 보지만, 모델 A가 정답에 더 자신 있다. 그래서 `-log q(correct)`는 A가 더 작고, cross-entropy도 더 작다. 정보 이론은 결국 이런 "얼마나 자신 있게 맞췄는가"를 분포 전체로 읽는 언어다.

### Formula Autopsy: Cross-Entropy와 KL의 관계

```text
CE(p, q) = H(p) + KL(p || q)
```

- `H(p)`: 정답 분포 자체의 불확실성
- `KL(p || q)`: 모델 분포 `q`가 정답 분포 `p`와 얼마나 다른가
- `CE(p, q)`: 결국 "정답 분포를 모델이 얼마나 잘 따라가나"를 보는 총비용

즉, cross-entropy는 단순 loss 숫자가 아니라, 정답 분포의 난이도 + 모델의 추가 실수 비용으로 읽을 수 있다.

## 논문에서는 이렇게 보인다

| 논문 표현 | 읽는 법 | 연결 문맥 |
| --- | --- | --- |
| token entropy | 다음 토큰 분포 퍼짐 | generation uncertainty |
| KL regularization | 기준 분포에서 너무 멀어지지 않게 함 | RLHF, PPO |
| distillation loss | teacher와 student 분포 차이 줄임 | model compression |
| mutual information | 정보 전달량 | representation learning |

RLHF 문맥에서 KL penalty가 등장하면 "새 policy가 reference model에서 너무 멀어지지 않게 하는 분포 거리 제어"로 읽으면 된다.

## PyTorch와 코드로 연결하기

- `CrossEntropyLoss`는 가장 익숙한 정보 이론 손실이다.
- `log_softmax`와 `nll_loss`는 놀람과 벌점 언어로 읽을 수 있다.
- KL은 `log_probs`와 `probs`를 조합해 직접 계산할 수 있다.
- distillation에서는 teacher logits와 student logits 사이 분포 차이를 줄이는 형태가 자주 등장한다.

## 자주 틀리는 지점

- entropy와 cross-entropy를 거의 같은 말로만 기억한다.
- KL을 대칭 거리처럼 오해한다.
- 낮은 entropy를 항상 좋은 것으로 오해한다.
- 정보 이론 손실을 "그냥 또 다른 loss 함수"로만 보고 분포 비교 감각을 놓친다.

## 연습

### 기초 확인

1. entropy와 cross-entropy의 차이를 적어본다.
2. 분포가 더 퍼질수록 entropy가 어떻게 변하는지 적어본다.
3. KL이 왜 두 분포 차이를 읽는 언어인지 적어본다.

### 논문 읽기 훈련

1. `CE(p, q) = H(p) + KL(p || q)`에서 각 항의 의미를 적어본다.
2. RLHF에서 KL penalty가 왜 필요한지 적어본다.
3. distillation 논문에서 teacher/student 분포를 비교한다는 말이 어떤 손실 언어와 연결되는지 적어본다.

### 엔지니어 / 코드 훈련

1. 현재 학습 코드에서 cross-entropy가 어디에 쓰이는지 적어본다.
2. logits와 log-probabilities를 혼동하면 어떤 버그가 생길 수 있을지 적어본다.
3. KL penalty를 구현하려면 어떤 텐서가 필요할지 적어본다.

## 다음 장으로 연결

분포와 정보량 감각이 잡혔다면, 이제 주파수와 위치 신호를 읽는 푸리에 관점으로 넘어간다. 다음 장에서는 sinusoidal encoding, RoPE, spectral bias를 같은 언어로 묶는다.

다음 장: [푸리에와 위치 신호](/math-advanced/fourier-positional-signals)
