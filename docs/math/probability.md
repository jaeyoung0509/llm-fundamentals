# 확률과 softmax

## 이 페이지의 목표

- 모델 출력을 분포로 읽는 습관을 만든다.
- 기대값과 분산이 무엇을 말해주는지 이해한다.
- softmax와 sampling을 확률 관점에서 읽는다.

## 핵심 직관

모델은 "정답 하나를 확정적으로 찍는 기계"가 아니라, 여러 가능한 답에 대한 믿음의 분포를 내놓는 기계다.

## 분포로 읽는 출력

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;로짓&quot;] --> B[&quot;softmax&quot;]
  B --> C[&quot;확률 분포&quot;]
  C --> D[&quot;argmax 선택&quot;]
  C --> E[&quot;sampling 선택&quot;]`"
/>

## 자주 만나는 개념

- 확률: 어떤 사건이 일어날 가능성
- 기대값: 평균적으로 기대하는 결과
- 분산: 결과가 얼마나 흔들리는지
- softmax: 로짓을 확률처럼 읽히는 분포로 바꾸는 연산

## 논문에서 자주 보이는 표기

| 표기 | 직관 |
| --- | --- |
| `p(y|x)` | 입력 `x`가 주어졌을 때 출력 `y`의 확률 |
| `sum_i p_i = 1` | 분포 전체 확률은 1이어야 함 |
| `E[X]` | 평균적으로 기대하는 값 |
| `Var(X)` | 값이 얼마나 퍼져 있는가 |
| `H(p, q)` | 두 분포가 얼마나 다른가를 보는 cross-entropy |

특히 `|` 기호는 "조건이 주어졌을 때"라고 읽는다. 언어모델에서는 보통 "이전 토큰이 주어졌을 때 다음 토큰의 확률"이라는 뜻이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;context x&quot;] --> B[&quot;model&quot;]
  B --> C[&quot;p(y|x)&quot;]
  C --> D[&quot;distribution over candidates&quot;]`"
/>

## 기대값과 분산을 왜 보는가

- 기대값은 "평균적으로 어떤 결과가 나오는가"를 본다
- 분산은 "그 결과가 얼마나 흔들리는가"를 본다

학습에서 loss의 평균과 흔들림을 보는 것도 이 감각과 이어진다.

## calibration 감각

확률이 높다고 해서 항상 실제로도 정답률이 높은 것은 아니다. 모델이 내놓는 확률과 실제 맞는 비율이 얼마나 잘 맞는지를 calibration 관점으로 본다.

즉, softmax 값이 높다는 것과 "정말 믿을 수 있다"는 것은 같은 말이 아니다.

## softmax와 sampling

softmax는 점수를 분포처럼 읽을 수 있게 해 준다. 그 다음 선택 방식은 보통 둘 중 하나다.

| 방식 | 의미 |
| --- | --- |
| argmax | 가장 높은 확률 하나를 고른다 |
| sampling | 분포를 따라 랜덤하게 고른다 |

temperature는 이 분포를 더 날카롭게 하거나 더 평평하게 만든다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;temperature adjust&quot;]
  B --> C[&quot;softmax&quot;]
  C --> D[&quot;sharp or flat distribution&quot;]
  D --> E[&quot;argmax / sampling&quot;]`"
/>

## likelihood와 cross-entropy

논문에서 `maximize likelihood`와 `minimize cross-entropy`는 자주 사실상 같은 방향을 가리킨다.

- likelihood를 높인다는 말은 정답 데이터의 확률을 높인다는 뜻이다.
- negative log-likelihood를 줄인다는 말은 그 반대 표현이다.
- cross-entropy는 실제 정답 분포와 모델 분포 차이를 줄이는 손실로 읽을 수 있다.

표현이 달라 보여도 "정답에 더 높은 확률을 주도록 학습한다"는 핵심은 같다.

## entropy를 어떻게 직관적으로 볼까

- 분포가 뾰족하면 entropy가 낮다
- 분포가 퍼져 있으면 entropy가 높다

sampling 다양성과 출력 안정성을 같이 볼 때 이 감각이 유용하다.

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;maximize likelihood&quot;] --> D[&quot;raise probability on correct data&quot;]
  B[&quot;minimize NLL&quot;] --> D
  C[&quot;minimize cross-entropy&quot;] --> D`"
/>

## 모델 연결

| 수학 개념 | 모델 예시 |
| --- | --- |
| 확률 분포 | 다음 토큰 예측 |
| 기대값 | 평균 손실, 평균 보상 |
| 분산 | 불확실성, 학습 안정성 |
| softmax | 분류와 생성에서의 확률화 |

## 실전에서 중요한 해석

- 높은 softmax 값이 항상 "진짜 확실함"을 뜻하지는 않는다
- 분포가 너무 뾰족하면 출력이 반복적일 수 있다
- 분포가 너무 평평하면 출력이 불안정하고 산만해질 수 있다

## 논문에서 이렇게 읽는다

예를 들어 아래 식을 보면:

```text
p_theta(y_t | y_<t, x)
```

이렇게 해석한다.

- `theta`: 모델 파라미터
- `x`: 추가 입력 문맥
- `y_<t`: 현재 시점 이전까지의 토큰
- `y_t`: 지금 맞혀야 할 토큰

즉, "현재까지 본 문맥을 바탕으로 다음 토큰 분포를 예측한다"는 뜻이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;past tokens&quot;] --> B[&quot;model state&quot;]
  B --> C[&quot;next-token probabilities&quot;]
  C --> D[&quot;choose next token&quot;]`"
/>

## 평가와 연결되는 감각

- 평균 loss는 기대값 관점으로 본다.
- 샘플마다 loss 흔들림이 크면 분산 관점으로 본다.
- beam search, top-k, top-p는 모두 분포에서 무엇을 남길지 정하는 선택 규칙으로 읽는다.
- calibration 문제는 높은 확률이 실제 정답률과 얼마나 맞는지의 문제다.

## 코드 연결

- `torch.softmax(logits, dim=-1)`는 분포를 만든다
- `torch.multinomial(probs, num_samples=1)`는 sampling의 간단한 예다
- temperature를 적용하면 분포 모양이 달라진다

## 작은 실험으로 확인하기

- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)를 보면 같은 로짓에서 temperature가 분포와 샘플링에 어떤 변화를 주는지 볼 수 있다.

## 연습

1. argmax와 sampling의 차이를 생성 품질 관점에서 설명해본다.
2. temperature를 높이면 왜 더 다양한 출력이 나올 수 있는지 적어본다.
3. 기대값과 분산을 학습 안정성 관점에서 연결해본다.

## 생각해볼 질문

1. softmax 출력이 높다고 해서 왜 항상 확실한 것은 아닐까
2. sampling temperature는 분포를 어떻게 바꿀까
3. 분산이 큰 학습은 왜 불안정하게 느껴질까

다음: [Python과 PyTorch](/python-pytorch/)
