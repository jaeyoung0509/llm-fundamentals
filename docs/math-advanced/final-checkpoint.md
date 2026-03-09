# 수학 심화 최종 점검

## 왜 중요한가

수학 심화 트랙은 장별로 따로 이해하는 것보다, 실제 논문 수식 안에서 여러 층위가 동시에 섞일 때 읽을 수 있어야 진짜 도움이 된다. 최종 점검 장은 trig, 선형대수, 미적분, 추정, 정보 이론, 푸리에 감각을 하나의 논문 읽기 도구 상자로 묶는 단계다.

여기서 막히는 부분이 있으면 모르는 분야가 하나 따로 남아 있다기보다, 여러 수학 층위를 한 식 안에서 연결하는 연습이 더 필요한 경우가 많다.

## 한 문장 핵심

심화 수학은 과목별 지식이 아니라, 논문 수식 안에 섞여 있는 주기성·공간 구조·곡률·추정·분포 차이를 동시에 읽는 언어다.

### 30초 직관

이 장의 목표는 "모든 심화 수학을 외웠는가"가 아니다. 논문 수식 하나를 봤을 때 "아, 여기서는 trig가 들어갔고, 여기서는 KL이 나오고, 여기서는 저랭크 구조를 보라는 거구나"를 빠르게 감지하는 것이다.

### 실전 사용법

읽는 논문이 막히면 이 장으로 돌아와서 먼저 수학 신호를 분류한다. 그다음 해당 장으로 다시 내려가 필요한 축만 복습하면 된다. 전체를 매번 처음부터 다시 읽을 필요는 없다.

## 표기법 리부트

| 수학 층위 | 자주 보는 표기 | 빠른 읽기 |
| --- | --- | --- |
| 주기성 | `sin`, `cos`, `theta`, `omega` | 위치와 회전, 반복 신호 |
| 공간 구조 | `rank`, `U Sigma V^T`, `basis` | 주요 방향과 저랭크 구조 |
| 곡률 | `J`, `H`, Taylor terms | 민감도와 sharpness |
| 추정 | `MLE`, covariance, expectation | 데이터에서 분포 추정 |
| 분포 차이 | entropy, `KL`, CE | uncertainty와 divergence |
| 스펙트럼 | Fourier basis, FFT | 주파수 성분 해석 |

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;trig and periodicity&quot;] --> G[&quot;advanced paper reading&quot;]
  B[&quot;linear algebra and SVD&quot;] --> G
  C[&quot;multivariable calculus&quot;] --> G
  D[&quot;statistics and estimation&quot;] --> G
  E[&quot;information theory&quot;] --> G
  F[&quot;Fourier and spectral view&quot;] --> G`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Research-Paper Fluency by Math Layer&quot;
    x-axis &quot;layer&quot; [1, 2, 3, 4, 5, 6]
    y-axis &quot;fluency gain&quot; 0 --> 1
    line [0.35, 0.50, 0.65, 0.76, 0.86, 0.94]`"
/>

## 직관과 한 가지 예시

아래 식을 보자.

```text
KL(p_theta(. | x) || p_ref(. | x)) + lambda ||Delta W||_*
```

이 식은 한 줄 안에 여러 심화 수학 신호를 같이 넣는다.

- `KL(...)`: 분포 차이와 정보 이론
- `p_theta`, `p_ref`: 추정과 probability
- `Delta W`: 선형대수적 업데이트 구조
- `||.||_*`: 스펙트럼/저랭크 제약과 연결될 수 있는 정규화 언어

즉, 심화 수학은 장별로 따로 나오지 않고 실제 논문에서는 한 줄 안에서 겹쳐 나온다.

### 풀이 순서 예시

처음 보는 수식이 어렵다면 아래 순서로만 읽어도 훨씬 낫다.

1. 확률 기호인지, 선형대수 기호인지 먼저 나눈다.
2. loss인지 regularization인지 역할을 구분한다.
3. 작은 숫자 예시로 "무엇이 커지면 벌점이 커지는가"만 본다.
4. 마지막에 코드에서 어느 텐서가 대응되는지 찾는다.

이 순서를 쓰면 고급 수식을 볼 때도 모든 기호를 동시에 이해하려다 멈추는 일을 줄일 수 있다.

## 논문에서는 이렇게 보인다

### Formula Autopsy: 고급 논문 수식 읽기 순서

```text
PE(pos, 2i) = sin(pos / 10000^(2i / d_model))
```

이 식을 심화 트랙 관점으로 다시 읽으면:

- 삼각함수: `sin`
- 주파수 스케일: `10000^(2i / d_model)`
- 표현 채널 분할: `2i`
- 위치 신호를 벡터 공간에 넣는 방법: positional encoding

### 심화 수학 신호 6개

| 신호 | 먼저 떠올릴 것 |
| --- | --- |
| `sin`, `cos`, rotation | 주기성과 위치 신호 |
| `rank`, `SVD`, eigen | 주요 방향과 압축 |
| `Jacobian`, `Hessian` | 민감도와 곡률 |
| `MLE`, covariance | 추정과 데이터 흔들림 |
| `KL`, entropy | 분포 차이와 uncertainty |
| Fourier, spectrum | 주파수 성분과 spectral bias |

## PyTorch와 코드로 연결하기

| 수식 언어 | PyTorch 대응 |
| --- | --- |
| trig / position | `torch.sin`, `torch.cos` |
| low-rank structure | `torch.linalg.svd` |
| Jacobian / Hessian | `torch.autograd.functional.jacobian`, `hessian` |
| estimation | `torch.mean`, `torch.var`, likelihood 계산 |
| KL / CE | `CrossEntropyLoss`, 직접 KL 계산 |
| spectral view | `torch.fft.rfft` |

핵심 질문은 늘 같다.

1. 이 식은 지금 주기성, 공간 구조, 곡률, 추정, 분포 차이 중 무엇을 호출하는가
2. 이 수학이 모델에서 어떤 역할을 하는가
3. 이걸 코드에서 어느 텐서 연산으로 볼 수 있는가

## 자주 틀리는 지점

- 고급 수식을 보면 한 번에 모두 읽으려 한다.
- `KL`, `SVD`, `Jacobian` 같은 단어를 "어렵다"로만 묶고 역할별로 분해하지 못한다.
- 심화 수학을 증명 과목으로만 생각하고 구현/디버깅 연결을 놓친다.
- 필요한 장만 골라 깊게 보는 대신 전체를 무작정 넓게 훑는다.

## 연습

### 기초 확인

1. 수학 심화 트랙의 여섯 축을 적어본다.
2. trig와 Fourier가 왜 서로 이어지는지 적어본다.
3. KL과 cross-entropy가 어떻게 다른지 적어본다.

### 논문 읽기 훈련

1. 읽고 싶은 논문 하나를 골라 그 안에 있는 심화 수학 신호를 최소 세 가지 표시해본다.
2. `KL(...) + regularization` 형태의 식을 분포 차이와 선형대수 관점으로 같이 읽어본다.
3. positional encoding이나 RoPE 식을 trig + spectral 관점으로 다시 설명해본다.

### 엔지니어 / 코드 훈련

1. 현재 코드베이스에서 `torch.sin`, `svd`, `CrossEntropyLoss`, `fft` 중 어떤 것이 이미 쓰이고 있는지 적어본다.
2. 앞으로 읽을 논문에서 자신이 가장 자주 막힐 심화 수학 층위를 하나 고르고 복습 계획을 적어본다.
3. 심화 수학을 배운 뒤 디버깅이나 구현에서 어떤 판단이 더 빨라질지 적어본다.

## 다음 장으로 연결

수학 심화 최종 점검까지 마쳤다면 이제 두 가지 선택이 있다. 구현 감각을 강화하려면 PyTorch와 Transformer로 들어가면 되고, 논문 읽기 훈련을 더 밀고 싶다면 현재 읽는 논문에 맞는 장으로 다시 돌아가 필요한 축만 반복하면 된다.

다음 장: [Python과 PyTorch](/python-pytorch/) 또는 [Transformer](/transformers/)
