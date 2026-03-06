# Transformer

## 왜 Transformer인가

RNN 계열은 긴 의존성을 다루기 어렵고 병렬화에도 한계가 있었다. Transformer는 각 토큰이 다른 토큰을 얼마나 참고할지 직접 계산하는 attention을 중심에 놓으면서 이 병목을 크게 줄였다.

## 이 장에서 꼭 가져갈 한 문장

Transformer는 token representation, attention score, residual update를 반복하며 문맥을 정교하게 섞는 구조다.

## 핵심 블록

- token embedding
- positional encoding
- self-attention
- feed-forward network
- residual connection과 layer normalization

## attention 흐름

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;입력 토큰&quot;] --> B[&quot;임베딩 + 위치 정보&quot;]
  B --> C[&quot;Q, K, V 생성&quot;]
  C --> D[&quot;유사도 계산&quot;]
  D --> E[&quot;softmax 가중치&quot;]
  E --> F[&quot;가중합된 표현&quot;]
  F --> G[&quot;FFN + Residual&quot;]`"
/>

## Transformer 블록을 한 번에 보기

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;token ids&quot;] --> B[&quot;embedding&quot;]
  B --> C[&quot;positional info&quot;]
  C --> D[&quot;multi-head self-attention&quot;]
  D --> E[&quot;add &amp; norm&quot;]
  E --> F[&quot;feed-forward network&quot;]
  F --> G[&quot;add &amp; norm&quot;]
  G --> H[&quot;next layer or logits&quot;]`"
/>

## positional encoding은 왜 필요한가

attention만 보면 토큰 집합을 섞는 연산처럼 보일 수 있다. 그래서 순서 정보를 따로 넣지 않으면 "첫 번째 토큰"과 "마지막 토큰"의 차이를 잃기 쉽다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;token embedding&quot;] --> C[&quot;sum&quot;]
  B[&quot;position signal&quot;] --> C
  C --> D[&quot;order-aware representation&quot;]`"
/>

## 최소 self-attention 구현 스케치

```python
scores = (query @ key.transpose(-2, -1)) / (d_k ** 0.5)
weights = torch.softmax(scores, dim=-1)
output = weights @ value
```

실행 가능한 예제:

- `examples/transformers/self_attention.py`

## 식을 줄마다 읽기

```text
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V
```

- `Q`: 지금 어떤 정보를 찾고 싶은지 나타내는 query 표현
- `K`: 각 토큰이 어떤 정보를 가지고 있는지 나타내는 key 표현
- `QK^T`: 모든 토큰 쌍의 유사도 점수 표
- `/ sqrt(d_k)`: 점수가 너무 커져 softmax가 과하게 뾰족해지는 것을 완화
- `softmax(...)`: 점수 표를 attention 분포로 변환
- `...V`: 그 분포로 value를 가중합해 새로운 표현 생성

중요한 것은 이 식을 "유사도 계산 -> 정규화 -> 정보 혼합"으로 읽는 습관이다.

## multi-head attention이 왜 필요한가

한 개의 attention만 쓰면 모든 관계를 한 종류의 점수 표로만 읽게 된다. multi-head는 서로 다른 관계를 병렬로 읽게 해준다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;shared input X&quot;] --> B1[&quot;head 1&quot;]
  A --> B2[&quot;head 2&quot;]
  A --> B3[&quot;head 3&quot;]
  B1 --> C[&quot;concat&quot;]
  B2 --> C
  B3 --> C
  C --> D[&quot;output projection&quot;]`"
/>

## causal masking은 왜 필요한가

decoder-only 모델에서는 현재 토큰이 미래 토큰을 보면 안 된다. 그래서 미래 위치를 가리는 causal mask가 필요하다.

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;token 1&quot;] --> D[&quot;can attend&quot;]
  B[&quot;token 2&quot;] --> D
  C[&quot;future token&quot;] --> E[&quot;masked out&quot;]
  D --> F[&quot;current prediction&quot;]
  E --> F`"
/>

## residual connection과 layer normalization

Transformer는 단순히 attention만 반복하는 것이 아니라, 각 블록의 출력을 원래 입력에 더하고 정규화한다.

- residual: 정보를 잃지 않고 깊게 쌓게 해준다
- layer norm: 학습을 더 안정적으로 만든다

## encoder-decoder와 decoder-only 비교

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;encoder-decoder&quot;] --> B[&quot;source encoding&quot;]
  B --> C[&quot;cross-attention decoding&quot;]
  D[&quot;decoder-only&quot;] --> E[&quot;masked self-attention&quot;]
  E --> F[&quot;next-token generation&quot;]`"
/>

번역 같은 입력-출력 문제는 encoder-decoder가 자연스럽고, GPT처럼 다음 토큰 생성 중심 모델은 decoder-only가 자연스럽다.

## decoder-only 생성 흐름

GPT 계열을 읽으려면 encoder-decoder 전체보다 decoder-only 생성 루프를 먼저 보는 편이 낫다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;prompt tokens&quot;] --> B[&quot;masked self-attention&quot;]
  B --> C[&quot;next-token logits&quot;]
  C --> D[&quot;sampling or argmax&quot;]
  D --> E[&quot;append next token&quot;]
  E --> B`"
/>

## 논문에서 자주 보이는 표현

| 표현 | 읽는 법 |
| --- | --- |
| `X in R^(n x d)` | 길이 `n` 시퀀스의 표현 행렬 |
| `Q = XW_Q` | 입력 표현을 query 공간으로 투영 |
| `QK^T` | 토큰끼리 유사도 점수 표 |
| `softmax(QK^T / sqrt(d_k))` | 각 토큰이 어디를 참고할지 분포 |
| `FFN` | 토큰별 비선형 표현 변환 |

## 논문을 읽을 때 먼저 볼 것

1. 입력 shape와 attention score shape가 무엇인가
2. self-attention인지 cross-attention인지
3. mask가 있는지 없는지
4. decoder-only인지 encoder-decoder인지
5. residual과 normalization이 어디에 붙는지

## 코드 연결

PyTorch 코드에서 Transformer를 읽을 때는 아래 순서를 본다.

1. 임베딩과 positional encoding이 어디서 합쳐지는가
2. attention score가 어떤 shape로 계산되는가
3. softmax가 어느 차원에 적용되는가
4. residual과 normalization이 어떤 순서로 붙는가

## 연습

1. `QK^T / sqrt(d_k)`에서 `sqrt(d_k)`가 왜 필요한지 설명해본다.
2. causal mask가 없으면 decoder-only 모델에 어떤 문제가 생기는지 적어본다.
3. encoder-decoder와 decoder-only 차이를 한 문단으로 설명해본다.

## 체크리스트

- attention이 RNN의 어떤 한계를 줄였는지 설명할 수 있는가
- positional encoding이 왜 필요한지 설명할 수 있는가
- multi-head, masking, residual의 역할을 말할 수 있는가
- decoder-only Transformer가 GPT와 어떻게 연결되는지 설명할 수 있는가

## 다음 장으로 어떻게 연결되는가

Transformer 구조를 이해했다면, 이제 GPT 계열이 이 구조를 scale과 autoregressive training으로 어떻게 밀어붙여 GPT-3까지 갔는지 볼 수 있다.

다음 장: [LLM과 GPT-3](/llms/)
