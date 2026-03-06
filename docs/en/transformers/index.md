# Transformers

## Why Transformers

RNN-style models struggled with long-range dependencies and parallelization. Attention changed the game by directly computing what each token should attend to.

## One Sentence to Keep

Transformers dramatically increased language-model capability by letting each token compute how much it should attend to every other token.

## Core Block

- token embeddings,
- positional encoding,
- self-attention,
- feed-forward layers,
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

## Minimal Self-Attention Sketch

```python
scores = (query @ key.transpose(-2, -1)) / (d_k ** 0.5)
weights = torch.softmax(scores, dim=-1)
output = weights @ value
```

Runnable example:

- `examples/transformers/self_attention.py`

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

## Decoder-Only Generation Loop

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;prompt tokens&quot;] --> B[&quot;masked self-attention&quot;]
  B --> C[&quot;next-token logits&quot;]
  C --> D[&quot;sampling or argmax&quot;]
  D --> E[&quot;append next token&quot;]
  E --> B`"
/>

## Checklist

- can you explain which RNN limitations attention reduces,
- can you explain Q, K, and V at an intuitive level,
- can you explain how decoder-only Transformers connect to GPT.

## How This Connects Forward

Once the Transformer block is clear, the next step is to see how GPT scaled this recipe into a new class of language models.

Next: [LLMs and GPT-3](/en/llms/)
