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

## Minimal Self-Attention Sketch

```python
scores = (query @ key.transpose(-2, -1)) / (d_k ** 0.5)
weights = torch.softmax(scores, dim=-1)
output = weights @ value
```

Runnable example:

- `examples/transformers/self_attention.py`

## Checklist

- can you explain which RNN limitations attention reduces,
- can you explain Q, K, and V at an intuitive level,
- can you explain how decoder-only Transformers connect to GPT.

## How This Connects Forward

Once the Transformer block is clear, the next step is to see how GPT scaled this recipe into a new class of language models.

Next: [LLMs and GPT-3](/en/llms/)
