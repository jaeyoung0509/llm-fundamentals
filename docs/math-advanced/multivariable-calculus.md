# 다변수 미적분

## 왜 중요한가

딥러닝은 파라미터가 수천만 개인 함수다. 그래서 한 변수 미분만으로는 부족하고, gradient, Jacobian, Hessian처럼 여러 변수의 상호작용을 읽는 다변수 미적분 감각이 필요하다.

이 장이 약하면 optimization, curvature, sensitivity, conditioning 같은 문장이 전부 추상적으로 느껴진다. 반대로 이 장이 잡히면 논문에서 "이 함수가 얼마나 민감한가", "이 손실 곡면이 얼마나 날카로운가"를 더 잘 읽게 된다.

## 한 문장 핵심

다변수 미적분은 변화가 여러 축에 동시에 퍼질 때 그 방향, 민감도, 곡률을 읽는 언어다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `partial f / partial x_i` | 한 변수 방향 변화 | partial derivative |
| `grad f(x)` | 가장 가파르게 증가하는 방향 | gradient |
| `J_f(x)` | 입력 변화가 출력 각 축에 주는 영향 표 | Jacobian |
| `H_f(x)` | 곡률 정보 | Hessian |
| Taylor approximation | 근처에서 함수 모양 근사 | local behavior |

이 장에서는 "얼마나 민감한가"와 "얼마나 휘어 있는가"라는 두 질문이 핵심이다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;partial derivatives&quot;] --> B[&quot;gradient&quot;]
  B --> C[&quot;Jacobian&quot;]
  C --> D[&quot;Hessian&quot;]
  D --> E[&quot;curvature and stability&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Flat vs Sharp Curvature&quot;
    x-axis &quot;parameter move&quot; [-2, -1, 0, 1, 2]
    y-axis &quot;loss&quot; 0 --> 9
    line [4.0, 1.5, 0.0, 1.5, 4.0]
    line [8.0, 2.5, 0.0, 2.5, 8.0]`"
/>

## 직관과 한 가지 예시

gradient는 이미 알고 있는 업데이트 신호다. 여기에 Jacobian과 Hessian을 더하면 두 가지가 추가된다.

- Jacobian: 입력 한 축을 건드렸을 때 출력 여러 축이 얼마나 변하는가
- Hessian: 현재 위치 주변에서 loss 곡면이 얼마나 날카로운가

### Formula Autopsy: 2차 Taylor 감각

```text
L(theta + Delta) ≈ L(theta) + grad^T Delta + 1/2 Delta^T H Delta
```

- `grad^T Delta`: 1차 방향 효과
- `Delta^T H Delta`: 곡률 때문에 생기는 2차 효과
- `H`: 같은 크기로 움직여도 어느 방향은 더 위험하고 어느 방향은 더 안전한지 알려줌

즉, Hessian은 "기울기 다음에 오는 지형 정보"다.

## 논문에서는 이렇게 보인다

| 논문 표현 | 읽는 법 | 연결 문맥 |
| --- | --- | --- |
| Jacobian norm | 입력 민감도 크기 | robustness, smoothness |
| Hessian spectrum | 곡률 분포 | sharpness, stability |
| first-order method | gradient만 사용 | SGD, Adam |
| second-order intuition | curvature까지 고려 | Newton-like discussions |

Transformer나 RLHF 논문에서 stability, conditioning, curvature라는 표현이 나오면 대부분 이 장의 언어로 다시 읽을 수 있다.

## PyTorch와 코드로 연결하기

- `torch.autograd.grad`는 특정 변수에 대한 미분을 계산한다.
- `torch.autograd.functional.jacobian`은 Jacobian을 계산한다.
- `torch.autograd.functional.hessian`은 Hessian을 계산한다.
- 실무에서는 Hessian 전체를 다 쓰지 않더라도 sharpness와 curvature 직관은 optimizer 해석에 중요하다.

## 자주 틀리는 지점

- gradient만 알면 모든 optimization 직관이 끝난다고 생각한다.
- Jacobian을 복잡한 행렬로만 보고 민감도 표라는 직관을 놓친다.
- Hessian을 시험용 개념으로 보고 날카로운 minima, conditioning과 연결하지 못한다.
- Taylor approximation을 공식 암기로만 보고 "근처에서 함수 모양을 근사하는 도구"라는 의미를 놓친다.

## 연습

### 기초 확인

1. Jacobian과 Hessian의 차이를 적어본다.
2. sharp curvature와 flat curvature가 optimization에 어떤 차이를 주는지 적어본다.
3. Taylor approximation이 왜 지역적 근사라고 불리는지 적어본다.

### 논문 읽기 훈련

1. `L(theta + Delta)` 식에서 각 항의 역할을 설명해본다.
2. 어떤 논문이 Jacobian regularization을 쓴다고 하면 무엇을 줄이려는 것인지 적어본다.
3. Hessian spectrum이 sharpness와 연결된다는 말을 풀어 써본다.

### 엔지니어 / 코드 훈련

1. 작은 함수에 대해 `autograd.grad`와 `functional.jacobian`이 각각 무엇을 주는지 적어본다.
2. gradient clipping이 Hessian을 직접 계산하지 않고도 왜 도움이 될 수 있는지 적어본다.
3. 현재 학습 코드에서 "민감도가 너무 커 보이는 부분"을 어디서 의심할 수 있을지 적어본다.

## 다음 장으로 연결

변화와 곡률 감각이 잡혔다면, 이제 데이터에서 통계를 어떻게 추정하고 불확실성을 어떻게 읽는지 넘어간다. 다음 장에서는 random variable, covariance, MLE, MAP를 ML 평가와 연결한다.

다음 장: [통계와 추정](/math-advanced/statistics-estimation)
