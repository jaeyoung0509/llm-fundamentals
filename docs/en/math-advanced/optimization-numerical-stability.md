# Optimization and Numerical Stability

## Why This Matters

Understanding model architecture is not enough if training is unstable. Learning rates, conditioning, clipping, normalization, and floating-point stability are the math of “why did this training run suddenly explode?”

This chapter is not a proof-heavy convex optimization course. It is the practical math of trustworthy training.

## One Sentence Takeaway

Optimization and numerical stability explain not only how loss is reduced, but how that process stays reliable.

### 30-Second Intuition

This chapter is the story of walking downhill without falling over. A correct direction is not enough if the step size or the number scale is unstable.

### Developer Lens

`NaN`, exploding loss, mixed-precision weirdness, clipping, and warmup all belong to the same world: the math of whether training can numerically survive.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `eta_t` | learning rate at step `t` | scheduler |
| `cond(A)` | sensitivity / conditioning | optimization difficulty |
| `eps` | small stabilizing constant | Adam, normalization |
| `clip(g)` | limit overly large gradients | clipping |
| `log-sum-exp` | numerically stable rewrite | stable softmax |

The main question is not “which optimizer name is trendy,” but “why does this run stay stable or fail?”

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;forward&quot;] --> B[&quot;loss&quot;]
  B --> C[&quot;backward&quot;]
  C --> D[&quot;clip / normalize / scale&quot;]
  D --> E[&quot;optimizer step&quot;]
  E --> F[&quot;stable or unstable training&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Learning Rate Schedule Intuition&quot;
    x-axis &quot;step&quot; [1, 2, 3, 4, 5, 6]
    y-axis &quot;learning rate&quot; 0 --> 0.12
    line [0.10, 0.10, 0.08, 0.06, 0.04, 0.02]`"
/>

## Intuition With One Concrete Example

Even with a correct gradient direction, a learning rate that is too large can make loss jump wildly, while one that is too small can make training crawl.

### Formula Autopsy: Stable Softmax

```text
softmax(z_i) = exp(z_i - m) / sum_j exp(z_j - m),  where m = max_j z_j
```

- subtracting `m` does not change the softmax result,
- it does reduce overflow risk in `exp(z)`,
- so the formula is mathematically equivalent but numerically safer.

That pattern appears constantly in real implementations: same math, safer computation.

## How This Shows Up In Papers

| Paper expression | Reading | Context |
| --- | --- | --- |
| optimization instability | gradient scale or conditioning problem | deep training |
| warmup / decay | control step size over time | Transformer training |
| normalization | regulate scale | layer norm, RMSNorm |
| mixed precision stability | manage floating-point range | large-scale training |

Adam and AdamW should be read as attempts to make noisy gradient optimization more stable and adaptive.

## How This Maps To PyTorch/Code

- `torch.nn.utils.clip_grad_norm_` performs gradient clipping
- optimizer `eps` terms improve division stability
- `torch.autocast` and gradient scaling relate to mixed-precision stability
- schedulers implement time-varying `eta_t`

## Common Failure Modes Or Misconceptions

- treating the optimizer like a black box
- blaming data or architecture first while ignoring numerical issues
- thinking stable rewrites like stable softmax change the math itself
- assuming clipping is always helpful regardless of side effects

## Exercises

### Basic Check

1. What happens if the learning rate is too large or too small?
2. Why do we subtract `max(z)` in stable softmax?
3. Name one situation where gradient clipping helps.

### Paper-Reading Drill

1. Explain the role of `m` in the stable softmax formula.
2. Why is warmup often tied to early-stage training stability?
3. How does poor conditioning connect to optimization difficulty?

### Engineer / Code Drill

1. Identify where learning rate, clipping, and normalization appear in your training code.
2. What logs would you inspect first when mixed precision causes instability?
3. If loss becomes `NaN`, what numerical checks would you do first?

## Bridge To Next Chapter

Once training stability is readable, the next step is to compare whole distributions through the language of entropy, KL, and information.

Next: [Information Theory](/en/math-advanced/information-theory)
