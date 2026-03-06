# Glossary

## Why It Exists

This book connects math, deep learning, Transformers, RLHF, and AI engineering in one path, so the same symbols and terms appear repeatedly. This page is a quick reference.

## Core Symbols

| Symbol | Meaning |
| --- | --- |
| `x`, `X` | scalar, vector, or matrix input |
| `y` | target or output |
| `W`, `b` | weight and bias |
| `h` | hidden representation |
| `Q`, `K`, `V` | query, key, and value in attention |
| `p(y|x)` | probability of `y` given input `x` |
| `L` | loss |
| `theta` | full model parameters |
| `grad` | gradient or update-direction signal |

## Common Model Terms

| Term | Short explanation |
| --- | --- |
| embedding | dense vector representation for a token or item |
| logits | scores before softmax |
| softmax | function that turns scores into a probability-like distribution |
| attention | computation of how much one token should reference others |
| residual connection | skip-style connection that preserves information across blocks |
| layer norm | normalization used to stabilize representations |

## Practical LLM Terms

| Term | Short explanation |
| --- | --- |
| context window | total usable context length |
| temperature | coefficient that sharpens or flattens sampling distribution |
| top-k | keep only the top `k` candidates |
| top-p | keep candidates until cumulative probability reaches `p` |
| hallucination | fluent but weakly grounded generation failure |
| eval set | fixed dataset for quality comparison |

## Engineering Terms

| Term | Short explanation |
| --- | --- |
| RAG | retrieval-augmented generation pattern |
| tool calling | allow the model to invoke external tools or APIs |
| agent workflow | multi-step planning and execution flow |
| rollback | revert to an earlier configuration after failure |
| observability | ability to track quality, latency, cost, and failure behavior |

Next: [Math Foundations](/en/math/)
