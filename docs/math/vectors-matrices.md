# 벡터와 행렬

## 이 페이지의 목표

- 벡터와 행렬을 데이터와 파라미터를 담는 기본 구조로 이해한다.
- shape를 읽는 습관을 만든다.
- 행렬곱이 표현 변환이라는 점을 잡는다.

## 핵심 직관

- 벡터: 한 샘플의 특징 묶음
- 행렬: 여러 샘플 또는 여러 파라미터 묶음
- 행렬곱: 입력을 다른 표현 공간으로 보내는 변환

## 한눈에 보는 shape 감각

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;입력 벡터 x: (d,)&quot;] --> B[&quot;가중치 W: (d, h)&quot;]
  B --> C[&quot;출력 표현 h: (h,)&quot;]
  D[&quot;토큰 행렬 X: (n, d)&quot;] --> E[&quot;W_q, W_k, W_v&quot;]
  E --> F[&quot;Q, K, V: (n, h)&quot;]`"
/>

## 왜 shape를 읽는 습관이 중요한가

딥러닝 구현에서 자주 생기는 오류는 수학적 아이디어 부족보다 shape 감각 부족에서 나온다. 모델을 읽는다는 것은 값뿐 아니라 차원을 읽는 일이다.

## 표기법을 shape로 번역하기

논문에서는 같은 연산이라도 기호가 압축돼서 나온다. 그래서 아래처럼 바로 번역하는 습관이 필요하다.

| 표기 | 보통 의미 |
| --- | --- |
| `x in R^d` | 길이 `d`인 벡터 |
| `X in R^(n x d)` | 토큰 `n`개, 특성 `d`개인 행렬 |
| `W in R^(d x h)` | 입력 `d`를 출력 `h`로 보내는 가중치 |
| `Q, K, V in R^(n x h)` | 각 토큰에 대한 query, key, value 표현 |
| `A in R^(n x n)` | 토큰끼리 관계를 적은 점수 표 |

기호를 보면 먼저 숫자를 대입해보는 습관이 좋다. 예를 들어 `n=128`, `d=768`처럼 상상하면 attention 식이 훨씬 덜 추상적으로 보인다.

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;x in R^d&quot;] --> B[&quot;one vector&quot;]
  C[&quot;X in R^(n x d)&quot;] --> D[&quot;n vectors stacked&quot;]
  E[&quot;W in R^(d x h)&quot;] --> F[&quot;projection matrix&quot;]
  D --> G[&quot;XW in R^(n x h)&quot;]
  F --> G`"
/>

## 기본 예시

### 선형층

입력 벡터 `x`가 `(d,)`이고 가중치 행렬 `W`가 `(d, h)`이면 출력은 `(h,)`가 된다. 이때 모델은 "입력 특징 d개를 새로운 표현 h개로 바꾼다"고 해석할 수 있다.

### 배치 데이터

입력 배치가 `(batch, d)`라면 한 번에 여러 샘플을 같은 규칙으로 변환할 수 있다. 이게 딥러닝에서 행렬 연산이 중요한 이유다.

### attention score

`Q`가 `(n, h)`, `K`가 `(n, h)`라면 `QK^T`는 `(n, n)`이 된다. 각 토큰이 다른 토큰을 얼마나 참고할지 계산하는 표가 만들어지는 셈이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;Q: (n, h)&quot;] --> C[&quot;QK^T&quot;]
  B[&quot;K^T: (h, n)&quot;] --> C
  C --> D[&quot;scores: (n, n)&quot;]
  D --> E[&quot;token-to-token relation table&quot;]`"
/>

### 임베딩 행렬

어휘 수가 `V`, 임베딩 차원이 `d_model`이면 임베딩 행렬은 `(V, d_model)`이다. 토큰 하나를 조회하면 길이 `d_model`짜리 벡터가 나온다.

이 관점이 잡히면 "토큰 ID -> 임베딩 벡터 -> attention 입력" 흐름이 자연스럽게 이어진다.

## 모델 연결

| 연산 | 모델에서의 역할 |
| --- | --- |
| 벡터 | 토큰 임베딩, 특성 표현 |
| 행렬 | 가중치, 배치 데이터 |
| 행렬곱 | 선형층, attention score 계산의 핵심 |

## 논문에서 이렇게 읽는다

아래 식은 Transformer에서 매우 자주 본다.

```text
Q = XW_Q, K = XW_K, V = XW_V
```

읽는 법은 이렇다.

- `X`: 입력 토큰들의 현재 표현 행렬
- `W_Q`, `W_K`, `W_V`: 같은 입력을 서로 다른 관점으로 투영하는 가중치
- 결과 `Q`, `K`, `V`: attention 계산에 쓰일 새 표현들

즉, 행렬곱은 단순 계산 기술이 아니라 "표현을 다른 역할로 바꾸는 변환"이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;X&quot;] --> B[&quot;W_Q&quot;]
  A --> C[&quot;W_K&quot;]
  A --> D[&quot;W_V&quot;]
  B --> E[&quot;Q&quot;]
  C --> F[&quot;K&quot;]
  D --> G[&quot;V&quot;]`"
/>

## 논문을 읽을 때 자주 틀리는 포인트

- `(n, d)`와 `(d, n)`을 무심코 뒤집는다.
- 배치 차원을 생략한 식을 보고 실제 구현 shape를 놓친다.
- `QK^T`를 값 변환으로 착각하고, 사실은 점수 계산이라는 점을 놓친다.

## 실수하기 쉬운 지점

- row와 column의 의미를 놓치기
- shape 호환을 확인하지 않고 곱하려 하기
- "값"만 보고 "차원"을 놓치기

## 빠른 체크 규칙

- 마지막 차원끼리 맞는지 본다
- 배치 차원은 보통 유지된다고 본다
- 결과 shape가 무엇을 의미하는지 말로 설명해본다

## 연습

1. 입력이 `(32, 128)`이고 가중치가 `(128, 256)`일 때 출력 shape를 써본다.
2. 임베딩 행렬이 왜 "단어 사전 x 임베딩 차원" 구조가 되는지 설명해본다.
3. `QK^T`가 `(n, n)`이 되는 이유를 토큰 관계 표 관점으로 설명해본다.

## 생각해볼 질문

1. 임베딩 벡터는 왜 단순 숫자 묶음이 아닌가
2. 선형층이 하는 일을 행렬곱 관점에서 설명할 수 있는가
3. attention에서 `QK^T`가 왜 shape를 바꾸는가

다음: [미분과 gradient](/math/gradients)
