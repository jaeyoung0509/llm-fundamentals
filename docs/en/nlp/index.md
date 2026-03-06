# NLP Before Transformers

## One Sentence to Keep

Transformers did not appear from nowhere. They emerged as a response to the bottlenecks of earlier NLP methods.

## Why This Module Matters

If you jump straight into Transformers, they can feel like just another good architecture. Earlier NLP methods make it clearer why attention mattered so much.

## What to Cover in the First Pass

- tokenization and one-hot representations,
- word2vec and embeddings,
- the rise of seq2seq and attention,
- the bottlenecks of RNN-style approaches.

## Core Flow

| Era | Main idea | Limitation |
| --- | --- | --- |
| one-hot / n-gram | treat text as symbolic statistics | weak semantic generalization |
| word2vec / embeddings | map words into vector space | weak long-context handling |
| seq2seq / attention | make input-output mapping more flexible | still constrained by sequential processing |
| Transformer | attention-first parallel structure | compute and scale become new issues |

## Checklist

- can you explain one-hot vs embeddings,
- can you explain why seq2seq was needed,
- can you explain which bottlenecks Transformers reduced.

## How This Connects Forward

Now that the older NLP limits are visible, the next step is to study the Transformer block itself.

Next: [Transformers](/en/transformers/)
