# Transformers

## Why Transformers

RNN-style models struggled with long-range dependencies and parallelization. Attention changed the game by directly computing what each token should attend to.

## Core Block

- token embeddings,
- positional encoding,
- self-attention,
- feed-forward layers,
- residual connections and layer normalization.

## Attention Flow

<MermaidDiagram>
flowchart LR
  A["Input tokens"] --> B["Embeddings + positions"]
  B --> C["Build Q, K, V"]
  C --> D["Similarity scores"]
  D --> E["Softmax weights"]
  E --> F["Weighted value mix"]
  F --> G["FFN + residual"]
</MermaidDiagram>

## Minimal Self-Attention Sketch

```python
scores = (query @ key.transpose(-2, -1)) / (d_k ** 0.5)
weights = torch.softmax(scores, dim=-1)
output = weights @ value
```

Runnable example:

- `examples/transformers/self_attention.py`

Next: [LLMs and GPT-3](/en/llms/)
