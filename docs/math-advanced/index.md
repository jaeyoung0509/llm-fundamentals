# 수학 심화 개요

## 왜 중요한가

수학 기초 트랙이 "모델을 구현하고 기본 논문 식을 읽는 최소 언어"를 세우는 단계였다면, 수학 심화 트랙은 "고급 논문에서 반복되는 표현을 더 깊게 읽는 단계"다. 여기서는 삼각함수, 고급 선형대수, 다변수 미적분, 추정, 수치 안정성, 정보 이론, 푸리에 감각을 ML 문맥으로 다시 연결한다.

중요한 점은 범위를 넓히는 것이 목적이 아니라는 것이다. 이 트랙은 학교 수학 커리큘럼 전체를 복습하는 과정이 아니라, LLM과 현대 ML 논문에 자주 나오는 수학 신호를 개발자 머리로 빠르게 복구하는 선택 심화 경로다.

## 한 문장 핵심

수학 심화 트랙은 논문에서 보이는 고급 수식과 구조를 "읽고 구현하고 디버깅하는 언어"로 바꾸는 선택형 가속 경로다.

### 30초 직관

이 트랙은 "수학을 더 많이 외우자"가 아니다. "논문에서 `sin`, `SVD`, `KL`, `Hessian`이 나오면 이제 겁먹지 말고 무슨 역할인지 읽자"가 핵심이다.

### 이 트랙은 이렇게 읽으면 된다

- 처음에는 모든 장을 완벽히 끝내려 하지 않는다.
- 지금 읽는 논문이나 모델에서 막히는 수학 신호가 보이면 그 장만 먼저 집어든다.
- 각 장에서 `한 문장 핵심 -> 그림 -> 작은 예시 -> 수식 -> 코드` 순서로 본다.

## 표기법 리부트

| 표기 | 빠른 해석 | 주로 연결되는 장 |
| --- | --- | --- |
| `sin(theta)`, `cos(theta)` | 각도와 주기 신호 | positional encoding, RoPE |
| `lambda`, `u`, `Sigma` | 고유값, 방향, 특이값 크기 | PCA, SVD, 저랭크 구조 |
| `J_f(x)` | 입력 변화가 출력에 미치는 민감도 | Jacobian, sensitivity |
| `H_f(x)` | 곡률 정보 | Hessian, optimization |
| `KL(p || q)` | 두 분포의 차이 | distillation, RLHF, distribution shift |
| `omega`, `phi` | 주파수와 위상 | Fourier features, 위치 신호 |

이 기호들이 보이면 "새 과목"이라고 느끼기보다 "지금은 주기성, 공간 구조, 곡률, 분포 차이 중 무엇을 읽는가"를 먼저 떠올리는 편이 좋다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;수학 기초&quot;] --> B[&quot;수학 최종 점검&quot;]
  B --> C[&quot;삼각함수와 위치 신호&quot;]
  B --> D[&quot;선형대수와 저랭크 구조&quot;]
  B --> E[&quot;다변수 미적분과 최적화&quot;]
  B --> F[&quot;통계와 정보 이론&quot;]
  C --> G[&quot;고급 논문 읽기&quot;]
  D --> G
  E --> G
  F --> G`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Math Depth vs Paper Fluency&quot;
    x-axis &quot;depth stage&quot; [1, 2, 3, 4, 5]
    y-axis &quot;paper fluency&quot; 0 --> 1
    line [0.25, 0.42, 0.60, 0.78, 0.92]`"
/>

## 직관과 한 가지 예시

아래 세 표현은 각각 다른 수학 계층을 호출한다.

```text
PE(pos, 2i) = sin(pos / 10000^(2i / d_model))
X ≈ U_k Sigma_k V_k^T
CE(p, q) = H(p) + KL(p || q)
```

첫째 식은 주기성과 각도를, 둘째 식은 저랭크 구조를, 셋째 식은 분포 차이를 읽게 만든다. 수학 심화 트랙은 바로 이런 문장을 "대충 알 것 같다" 수준에서 "왜 이 수식이 필요하고 구현에서는 무엇을 의미하는가" 수준으로 끌어올리는 과정이다.

## 논문에서는 이렇게 보인다

### 심화 수학이 필요한 대표 신호

| 논문 신호 | 필요한 수학 감각 | 대표 문맥 |
| --- | --- | --- |
| `sin`, `cos`, rotation | 삼각함수와 주기성 | positional encoding, RoPE |
| `rank`, `SVD`, `eigen` | 고급 선형대수 | compression, low-rank adapters |
| `Jacobian`, `Hessian` | 다변수 미적분 | sensitivity, curvature, stability |
| `MLE`, `MAP`, covariance | 통계와 추정 | estimation, uncertainty, evaluation |
| `KL`, entropy, MI | 정보 이론 | language modeling, alignment |
| `Fourier`, frequency` | 푸리에 감각 | spectral bias, position signals |

### Formula Autopsy: 심화 수학이 한 식에 같이 묻어나는 경우

```text
softmax(QK^T / sqrt(d_k) + positional_bias)
```

- `QK^T`: 선형대수와 공간 관계 표
- `/ sqrt(d_k)`: scale 조절과 수치 안정성
- `positional_bias`: 주기성, 위치 신호, Fourier 감각
- `softmax`: 확률과 정보 이론

즉, 고급 논문 식은 보통 한 과목만 부르지 않는다. 여러 수학 계층이 동시에 섞인다.

## PyTorch와 코드로 연결하기

- 주기성: `torch.sin`, `torch.cos`
- 선형대수: `torch.linalg.svd`, `torch.linalg.eigh`
- 다변수 미분: `torch.autograd.grad`, `torch.autograd.functional.jacobian`
- 추정과 통계: `torch.mean`, `torch.var`, log-likelihood 계산
- 정보 이론: `CrossEntropyLoss`, KL 계산
- 푸리에: `torch.fft.rfft`

심화 트랙의 목적은 새로운 라이브러리를 배우는 것이 아니라, 이미 쓰던 PyTorch 연산을 더 깊은 수학 언어로 읽게 만드는 것이다.

## 자주 틀리는 지점

- 고급 기호가 나오면 식 전체를 포기하고 용어 암기로 도망간다.
- 삼각함수, SVD, KL을 서로 다른 세계라고 생각하고 모델 안에서 만나는 지점을 놓친다.
- 논문 수식을 읽을 때 "왜 이 수학을 지금 호출했는가"보다 정의 암기에 매달린다.
- 구현과 논문을 분리해서 보고, `torch` 연산이 어떤 수학을 쓰는지 연결하지 못한다.

## 연습

### 기초 확인

1. `sin`, `SVD`, `KL`이 각각 어떤 종류의 수학 신호인지 적어본다.
2. 수학 심화 트랙이 기본 수학 트랙과 어떻게 다른지 한 문장으로 적어본다.
3. 왜 이 트랙이 선택 심화이지 필수 선행 장벽이 아닌지 적어본다.

### 논문 읽기 훈련

1. 최근 읽고 싶은 논문에서 `sin`, `eigen`, `KL`, `Hessian` 중 어떤 단어가 나오는지 찾아본다.
2. `softmax(QK^T / sqrt(d_k) + positional_bias)`에 어떤 수학 층위가 섞여 있는지 분해해본다.
3. 자신이 자주 막히는 수학 신호를 하나 고르고, 이 트랙의 어느 장이 먼저 필요한지 적어본다.

### 엔지니어 / 코드 훈련

1. PyTorch에서 `torch.sin`, `torch.linalg.svd`, `CrossEntropyLoss`가 각각 어떤 수학 장과 연결되는지 적어본다.
2. 현재 구현 중인 모델 코드에서 "수학을 더 알면 이해가 깊어질 부분"을 두 군데 적어본다.
3. 심화 수학을 배우는 목적을 "증명"이 아니라 "논문 읽기와 디버깅" 관점으로 다시 써본다.

## 다음 장으로 연결

심화 트랙의 첫 시작점은 삼각함수와 주기성이다. positional encoding, RoPE, Fourier feature가 왜 등장하는지 읽기 시작하려면 여기서 각도, 위상, 주기 감각을 먼저 되살리는 편이 좋다.

다음 장: [삼각함수와 주기성](/math-advanced/trigonometry-periodicity)
