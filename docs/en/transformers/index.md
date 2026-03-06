# Transformers

## Why Transformers

RNN-style models struggled with long-range dependencies and parallelization. Transformers moved attention to the center, letting each token compute how much it should use information from other tokens.

## One Sentence to Keep

A Transformer repeatedly builds token representations, computes attention distributions, and updates those representations through residual blocks.

## Core Block

- token embeddings,
- positional encoding,
- self-attention,
- feed-forward network,
- residual connections and layer normalization.

## Attention Flow

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;Input tokens&quot;] --> B[&quot;Embeddings + positions&quot;]
  B --> C[&quot;Build Q, K, V&quot;]
  C --> D[&quot;Similarity scores&quot;]
  D --> E[&quot;Softmax weights&quot;]
  E --> F[&quot;Weighted value mix&quot;]
  F --> G[&quot;FFN + residual&quot;]`"
/>

## Transformer Block At A Glance

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

## Why Positional Encoding Matters

Attention alone does not reliably preserve order. Positional signals tell the model which token is first, later, or nearby.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;token embedding&quot;] --> C[&quot;sum&quot;]
  B[&quot;position signal&quot;] --> C
  C --> D[&quot;order-aware representation&quot;]`"
/>

## Minimal Self-Attention Sketch

```python
scores = (query @ key.transpose(-2, -1)) / (d_k ** 0.5)
weights = torch.softmax(scores, dim=-1)
output = weights @ value
```

Runnable example:

- `examples/transformers/self_attention.py`

## Read The Formula Line By Line

```text
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V
```

- `Q`: what the current token is looking for
- `K`: what each token offers as an addressable key
- `QK^T`: similarity score table
- `/ sqrt(d_k)`: keeps scores from exploding before softmax
- `softmax(...)`: turns scores into attention weights
- `...V`: mixes value vectors according to those weights

The right reading habit is: score -> normalize -> mix information.

## Why Multi-Head Attention Helps

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

## Why Causal Masking Matters

Decoder-only models must not look into the future while predicting the next token.

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;token 1&quot;] --> D[&quot;can attend&quot;]
  B[&quot;token 2&quot;] --> D
  C[&quot;future token&quot;] --> E[&quot;masked out&quot;]
  D --> F[&quot;current prediction&quot;]
  E --> F`"
/>

## Residual And Layer Norm

- residual connections preserve information and make depth easier to train,
- layer normalization stabilizes the representation flowing through the block.

## Encoder-Decoder vs Decoder-Only

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;encoder-decoder&quot;] --> B[&quot;source encoding&quot;]
  B --> C[&quot;cross-attention decoding&quot;]
  D[&quot;decoder-only&quot;] --> E[&quot;masked self-attention&quot;]
  E --> F[&quot;next-token generation&quot;]`"
/>

## Decoder-Only Generation Loop

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;prompt tokens&quot;] --> B[&quot;masked self-attention&quot;]
  B --> C[&quot;next-token logits&quot;]
  C --> D[&quot;sampling or argmax&quot;]
  D --> E[&quot;append next token&quot;]
  E --> B`"
/>

## Paper-Reading Cues

| Expression | How to read it |
| --- | --- |
| `X in R^(n x d)` | sequence representation matrix |
| `Q = XW_Q` | project inputs into query space |
| `QK^T` | token-to-token score table |
| `softmax(QK^T / sqrt(d_k))` | attention distribution |
| `FFN` | per-token non-linear transform |

## What To Inspect In A Paper First

1. input and attention score shapes,
2. self-attention vs cross-attention,
3. whether masking is applied,
4. decoder-only vs encoder-decoder,
5. where residuals and normalization sit.

## Code Connection

In PyTorch, inspect:

1. where embeddings and positions are combined,
2. how score tensors are shaped,
3. which dimension softmax uses,
4. how residual and normalization are ordered.

## Exercises

1. Explain why `sqrt(d_k)` appears in attention.
2. Explain what breaks without a causal mask.
3. Compare encoder-decoder and decoder-only in one paragraph.

## Checklist

- can you explain which RNN bottlenecks attention reduced,
- can you explain positional encoding,
- can you explain multi-head attention, masking, and residuals,
- can you explain how decoder-only Transformers connect to GPT.

## How This Connects Forward

Once the Transformer block is clear, the next step is to see how GPT scaled this recipe into GPT-3.

Next: [LLMs and GPT-3](/en/llms/)
