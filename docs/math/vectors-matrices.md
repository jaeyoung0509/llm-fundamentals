# 벡터와 행렬

## 왜 중요한가

벡터와 행렬은 딥러닝 수학의 저장 형식이자 연산 단위다. 입력 샘플, 토큰 임베딩, 배치, 가중치, attention score가 전부 벡터와 행렬로 표현된다.

이 장을 놓치면 구현에서 shape error가 자주 나고, 논문에서는 `XW`, `QK^T`, `R^(n x d)` 같은 표현이 전부 비슷비슷하게 보인다. 반대로 이 장이 잡히면 수식이 숫자 놀이가 아니라 "표현을 어디서 어디로 옮기는지"를 보여주는 지도처럼 읽힌다.

## 한 문장 핵심

행렬곱은 단순 계산이 아니라, 표현을 다른 공간으로 투영하고 관계 표를 만드는 연산이다.

## 표기법 리부트

| 표기 | 빠른 해석 | 자주 보는 위치 |
| --- | --- | --- |
| `x in R^d` | 길이 `d`인 벡터 하나 | 한 샘플, 한 토큰 표현 |
| `X in R^(n x d)` | 벡터 `n`개를 쌓은 행렬 | 시퀀스 표현 |
| `W in R^(d x h)` | `d -> h` 투영 가중치 | 선형층, attention projection |
| `E in R^(V x d)` | 단어 사전 크기 `V`의 임베딩 테이블 | embedding lookup |
| `A in R^(n x n)` | 토큰 간 관계 표 | attention score, mask |

논문에 배치 차원이 생략돼 있어도 실제 구현에서는 `(batch, seq, dim)`처럼 앞에 배치가 붙는 경우가 많다. 식을 볼 때는 항상 "실제 코드에서는 배치가 하나 더 있겠지"를 같이 상상해야 한다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;token ids&quot;] --> B[&quot;embedding table E&quot;]
  B --> C[&quot;X: (seq, dim)&quot;]
  C --> D[&quot;projection XW&quot;]
  D --> E[&quot;new representation&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;Q: (seq, head_dim)&quot;] --> C[&quot;QK^T&quot;]
  B[&quot;K^T: (head_dim, seq)&quot;] --> C
  C --> D[&quot;scores: (seq, seq)&quot;]
  D --> E[&quot;which token looks at which token&quot;]`"
/>

## 직관과 한 가지 예시

가장 기본 예시는 선형층이다.

```text
x: (d,)
W: (d, h)
xW: (h,)
```

이 식은 "길이 `d`의 입력 특징을 길이 `h`의 새 표현으로 보낸다"는 뜻이다. 숫자를 하나씩 곱하고 더하는 계산보다, 표현 공간이 바뀐다는 점이 핵심이다.

배치가 붙으면 식의 의미는 더 분명해진다.

```text
X: (batch, d)
W: (d, h)
XW: (batch, h)
```

같은 투영 규칙을 여러 샘플에 한 번에 적용하는 것이다. GPU가 빠른 이유도 이 대량 행렬 연산을 잘 처리하기 때문이다.

### Row, Column, Transpose를 어떻게 읽을까

- row는 보통 샘플이나 토큰 하나의 표현이다.
- column은 특정 feature나 채널을 가로지르는 축이다.
- transpose는 축의 의미를 바꿔 곱셈을 가능하게 만든다.

`QK^T`가 중요한 이유는 shape만 `(seq, seq)`로 바뀌어서가 아니다. "토큰 표현"이 "토큰 간 관련도 표"로 의미가 바뀐다. 이 전환이 attention의 핵심이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;X: token representations&quot;] --> B[&quot;W_Q, W_K, W_V&quot;]
  B --> C[&quot;Q, K, V&quot;]
  C --> D[&quot;QK^T = relation scores&quot;]
  D --> E[&quot;softmax over scores&quot;]
  E --> F[&quot;weighted sum of V&quot;]`"
/>

## 논문에서는 이렇게 보인다

이 장의 대표 식은 아래다.

```text
Q = XW_Q, K = XW_K, V = XW_V
AttentionScores = QK^T
```

이걸 줄 단위로 읽으면:

| 줄 | 읽는 법 |
| --- | --- |
| `XW_Q` | 입력 표현을 query 관점으로 투영 |
| `XW_K` | 같은 입력을 key 관점으로 투영 |
| `XW_V` | 같은 입력을 value 관점으로 투영 |
| `QK^T` | 토큰끼리 얼마나 참고할지 점수 표 생성 |

`QK^T`에서 자주 틀리는 포인트는 두 가지다.

- `K`를 그대로 곱하는 것이 아니라 `K^T`로 축을 바꿔 score table을 만든다.
- 결과는 새 토큰 표현이 아니라, 아직 확률화 전의 점수 표다.

## PyTorch와 코드로 연결하기

- `nn.Embedding(V, d)`는 `(V, d)` 임베딩 테이블을 가진다.
- `nn.Linear(d, h)`는 마지막 차원을 `d -> h`로 바꾸는 투영이다.
- `query @ key.transpose(-2, -1)`는 attention score table을 만든다.
- 실제 구현에서는 거의 항상 `(batch, seq, dim)` 또는 `(batch, heads, seq, head_dim)` shape를 본다.

직접 shape를 확인할 예제:

- [self_attention.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/transformers/self_attention.py)

## 자주 틀리는 지점

- `(n, d)`와 `(d, n)`을 같은 것으로 착각한다.
- 논문에서 배치 차원이 생략된 식을 보고 구현 shape를 상상하지 못한다.
- 행렬곱을 숫자 계산으로만 보고 투영 의미를 놓친다.
- `QK^T` 결과를 새로운 표현으로 착각하고, 사실은 관계 점수 표라는 점을 놓친다.
- transpose를 "그냥 뒤집기"로 외우고 왜 축 의미가 바뀌는지 생각하지 않는다.

## 연습

### 기초 확인

1. `X: (32, 128)`, `W: (128, 256)`이면 `XW` shape를 적고 의미를 설명해본다.
2. 임베딩 테이블이 왜 `(vocab, dim)` 구조인지 적어본다.
3. `QK^T` 결과가 왜 `(seq, seq)`인지 설명해본다.

### 논문 읽기 훈련

1. `Q = XW_Q, K = XW_K, V = XW_V`에서 `X`, `W_Q`, `Q`의 역할을 각각 적어본다.
2. 어떤 논문에서 `X in R^(n x d)`라고만 적혀 있을 때 실제 코드에서 추가될 가능성이 큰 차원을 적어본다.
3. `A in R^(n x n)`이 보이면 왜 "관계 표"를 먼저 떠올려야 하는지 적어본다.

### 코드 연결 훈련

1. `self_attention.py`를 열고 `weights.shape`와 `output.shape`를 실행 전에 예측해본다.
2. `nn.Linear(d, h)`와 `x @ W`가 같은 투영 언어라는 점을 적어본다.
3. `(batch, seq, dim)`에서 마지막 차원만 바꾸는 선형층이 왜 편리한지 설명해본다.

## 다음 장으로 연결

이제 표현이 어떤 그릇에 담기는지는 알게 됐다. 다음은 그 표현이 잘못된 방향으로 갔을 때 손실이 어떻게 "수정 신호"를 보내는지 보는 차례다. 그게 미분과 gradient다.

다음 장: [미분과 gradient](/math/gradients)
