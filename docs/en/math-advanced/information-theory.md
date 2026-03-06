# Information Theory

## Why This Matters

Language-model training is fundamentally about probability distributions, and information theory is the language for reading their spread, difference, and surprise. Entropy, cross-entropy, KL divergence, and mutual information keep appearing in LLM training, distillation, alignment, and evaluation.

The core probability chapter introduced distributions. This chapter deepens that into full distribution comparison.

## One Sentence Takeaway

Information theory explains how spread out a distribution is, how different two distributions are, and how much information one variable carries about another.

### 30-Second Intuition

The easiest summary is: information theory measures how confused a model is and how far its distribution is from the target distribution. Entropy is spread; KL is mismatch.

### Developer Lens

If you already use cross-entropy loss, you are already using information theory. This chapter deepens the meaning of losses you already see in code.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `H(p)` | spread of one distribution | entropy |
| `CE(p, q)` | cost of matching target `p` with model `q` | cross-entropy |
| `KL(p || q)` | mismatch between two distributions | distillation, shift |
| `I(X; Y)` | information shared between variables | mutual information |
| `-log p(y)` | amount of surprise | token loss |

The key upgrade is to stop thinking only about single probabilities and start thinking about whole distributions.

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;entropy H(p)&quot;] --> B[&quot;cross-entropy CE(p, q)&quot;]
  B --> C[&quot;KL divergence&quot;]
  C --> D[&quot;distribution comparison&quot;]
  D --> E[&quot;LM loss / distillation / alignment&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Peaked vs Flat Distribution Intuition&quot;
    x-axis &quot;token rank&quot; [1, 2, 3, 4]
    y-axis &quot;probability&quot; 0 --> 1
    line [0.85, 0.10, 0.04, 0.01]
    line [0.40, 0.30, 0.20, 0.10]`"
/>

## Intuition With One Concrete Example

A distribution concentrated on one token has low entropy. A flatter distribution has high entropy. That intuition links directly to confidence, diversity, and uncertainty in generation.

### Formula Autopsy: Cross-Entropy and KL

```text
CE(p, q) = H(p) + KL(p || q)
```

- `H(p)`: uncertainty inside the target distribution itself
- `KL(p || q)`: extra cost because the model distribution differs from the target
- `CE(p, q)`: total mismatch cost

So cross-entropy is not just “a loss number.” It is target difficulty plus model mismatch.

## How This Shows Up In Papers

| Paper expression | Reading | Context |
| --- | --- | --- |
| token entropy | spread of next-token uncertainty | generation behavior |
| KL regularization | keep a new policy near a reference distribution | RLHF, PPO |
| distillation loss | reduce teacher-student distribution gap | compression |
| mutual information | measure information transfer | representation learning |

In RLHF, a KL penalty is best read as “do not let the new policy drift too far from the reference model.”

## How This Maps To PyTorch/Code

- `CrossEntropyLoss` is the most common information-theory loss
- `log_softmax` and `nll_loss` implement surprise-based penalties
- KL can be computed from log-probs and probs directly
- distillation often compares teacher and student logits as distributions

## Common Failure Modes Or Misconceptions

- treating entropy and cross-entropy as the same thing
- assuming KL is a symmetric distance
- thinking low entropy is always good
- treating information-theory losses as arbitrary loss names instead of distribution language

## Exercises

### Basic Check

1. Explain the difference between entropy and cross-entropy.
2. What happens to entropy when a distribution spreads out more?
3. Why is KL a natural way to talk about distribution mismatch?

### Paper-Reading Drill

1. Explain each term in `CE(p, q) = H(p) + KL(p || q)`.
2. Why does RLHF often need a KL penalty?
3. In distillation, what distributions are being compared?

### Engineer / Code Drill

1. Where is cross-entropy used in your current training code?
2. What bugs happen if logits and log-probabilities get mixed up?
3. What tensors would you need to implement a KL penalty?

## Bridge To Next Chapter

Once distribution spread and mismatch are readable, the final deep-dive step is to connect periodic signals with spectral decomposition and positional structure.

Next: [Fourier and Positional Signals](/en/math-advanced/fourier-positional-signals)
