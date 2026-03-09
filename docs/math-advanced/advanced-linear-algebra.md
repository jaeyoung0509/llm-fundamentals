# 고급 선형대수

## 왜 중요한가

기초 수학에서 벡터와 행렬을 shape와 투영 관점으로 읽었다면, 심화 선형대수에서는 span, basis, orthogonality, rank, change of basis를 통해 표현 공간 자체를 더 세밀하게 읽는다.

이 감각이 없으면 임베딩 공간, attention projection, feature subspace, whitening 같은 표현이 전부 추상적으로 느껴진다. 반대로 이 장이 잡히면 "모델이 어떤 방향을 유지하고 어떤 방향을 버리는가"를 훨씬 잘 읽게 된다.

## 한 문장 핵심

고급 선형대수는 표현 공간의 방향, 독립성, 압축 가능성, 투영 구조를 읽는 언어다.

### 30초 직관

이 장을 아주 쉽게 말하면 "벡터 여러 개가 어느 방향으로 퍼져 있는가"를 보는 수학이다. 모델은 입력을 아무 방향으로나 보내지 않고, 몇 개의 중요한 방향으로 밀고 당기며 표현을 만든다.

### 개발자 관점에서 다시 읽기

`Linear` 레이어를 볼 때 "숫자를 바꾼다"보다 "표현을 다른 방향 공간으로 보낸다"라고 생각하면 훨씬 이해가 쉽다. query, key, value projection도 결국 같은 입력을 서로 다른 방향 묶음으로 다시 보는 과정이다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `span(v_1, ..., v_k)` | 만들 수 있는 모든 조합 공간 | feature subspace |
| `basis` | 공간을 표현하는 최소 독립 방향 집합 | embedding axes |
| `u · v = 0` | 서로 직교 | 독립 정보 축 |
| `rank(X)` | 실제로 살아 있는 독립 방향 수 | 압축 가능성 |
| `P_U(x)` | 부분공간 `U`로의 투영 | projection, denoising |

선형대수 심화에서 핵심은 "행렬이 몇 개인가"보다 "공간 안의 방향과 독립성이 무엇인가"다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;원래 표현 공간&quot;] --> B[&quot;basis 선택&quot;]
  B --> C[&quot;projection&quot;]
  C --> D[&quot;압축된 표현&quot;]
  D --> E[&quot;모델이 실제로 쓰는 정보&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Projection Error vs Subspace Dimension&quot;
    x-axis &quot;subspace dimension&quot; [1, 2, 3, 4, 5]
    y-axis &quot;projection error&quot; 0 --> 1
    line [0.86, 0.58, 0.34, 0.18, 0.09]`"
/>

## 직관과 한 가지 예시

벡터 `v`를 방향 `u` 위로 투영하는 식을 보자.

```text
proj_u(v) = ((v · u) / ||u||^2) u
```

이 식은 "벡터 `v` 안에서 `u` 방향 성분만 남긴다"는 뜻이다. ML에서는 입력 표현에서 특정 방향 정보만 꺼내거나, 여러 feature 중 중요한 축에 더 가깝게 재표현하는 해석으로 이어진다.

rank 감각도 중요하다. 행렬 크기가 커 보여도 rank가 낮으면 실제로는 몇 개 안 되는 독립 방향만 쓰고 있는 셈이다. 이게 저랭크 압축과 adapter로 이어진다.

### 아주 작은 숫자 예시

`u = [1, 0]`, `v = [3, 4]`라고 하자. 그러면 `u`는 x축 방향이다.

- `v` 전체는 x축과 y축 정보를 둘 다 가진다.
- `proj_u(v)`를 계산하면 `[3, 0]`이 된다.
- 즉, y축 정보 `4`는 버리고 x축 성분만 남긴 것이다.

이걸 모델 관점으로 읽으면 "표현 전체를 다 쓰지 않고, 지금 필요한 방향 성분만 꺼낸다"가 된다. projection이 어려워 보일 때는 항상 이 수준으로 내려오면 된다.

## 논문에서는 이렇게 보인다

### Formula Autopsy: Projection과 Basis Change

```text
h = XW
```

기초 트랙에서는 이 식을 "투영"으로 읽었다. 심화 선형대수에서는 한 단계 더 들어가 아래처럼 읽는다.

- `X`: 원래 basis에서 표현된 입력
- `W`: 새 basis 또는 방향 조합을 정의하는 행렬
- `h`: 새 부분공간에서 읽히는 표현

즉, `XW`는 숫자 곱이 아니라 "표현을 다른 좌표계로 다시 읽는 과정"이다.

| 논문 표현 | 읽는 법 | 연결 문맥 |
| --- | --- | --- |
| orthogonal projection | 특정 부분공간만 남김 | denoising, compression |
| low-rank structure | 독립 방향 수가 적음 | adapters, compression |
| change of basis | 같은 정보를 다른 축에서 봄 | learned representations |
| orthogonality regularization | 방향을 덜 겹치게 만듦 | disentanglement, stability |

## PyTorch와 코드로 연결하기

- `x @ W`는 projection이자 basis change로 읽을 수 있다.
- `F.normalize(...)`는 방향 비교를 더 직접적으로 보게 만든다.
- `torch.linalg.matrix_rank`는 행렬의 독립 방향 수를 계산한다.
- attention projection의 `W_Q`, `W_K`, `W_V`는 같은 입력을 서로 다른 subspace로 보낸다.

즉, 코드에서는 이미 선형대수를 쓰고 있고, 심화 장은 그 연산의 공간적 의미를 다시 읽게 해준다.

## 자주 틀리는 지점

- basis를 "축 이름" 정도로만 생각하고 표현 방식의 변화라는 점을 놓친다.
- rank를 단순한 수치로만 보고 압축 가능성과 연결하지 못한다.
- projection을 값 버리기라고만 보고 "어떤 방향을 남기는가"를 생각하지 않는다.
- orthogonality를 예쁜 수학 성질로만 보고 feature overlap 감소와 연결하지 못한다.

## 연습

### 기초 확인

1. basis와 span의 차이를 자신의 말로 적어본다.
2. rank가 낮다는 말이 모델 표현 관점에서 무엇을 뜻하는지 적어본다.
3. projection이 왜 "방향 선택"이라고 말할 수 있는지 적어본다.

### 논문 읽기 훈련

1. `h = XW`를 basis change 관점으로 다시 풀어본다.
2. 어떤 논문이 low-rank adapter를 쓴다고 할 때 왜 rank 개념이 중요한지 적어본다.
3. `orthogonal`이라는 단어가 나오면 정보 중복 관점에서 어떤 기대를 할 수 있는지 적어본다.

### 엔지니어 / 코드 훈련

1. 현재 모델 코드에서 projection 역할을 하는 `Linear`를 두 군데 찾아 적어본다.
2. `matrix_rank`를 측정하면 어떤 텐서에서 재미있는 정보를 얻을 수 있을지 적어본다.
3. query, key, value projection이 각각 다른 subspace를 만든다는 말을 코드 관점으로 설명해본다.

## 다음 장으로 연결

공간과 방향 감각이 잡혔다면 이제 그 공간을 압축하고 분해하는 언어로 넘어간다. 다음 장에서는 고유값, 고유벡터, SVD를 통해 저랭크 구조와 대표 방향을 읽는다.

다음 장: [고유값, 고유벡터, SVD](/math-advanced/eigendecomposition-svd)
