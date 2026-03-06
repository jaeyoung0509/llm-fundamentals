# Math Foundations

## Why This Matters

The place where many engineers get stuck in LLM reading is not advanced theory. It is rusty fluency in the basic math language behind `XW`, `softmax(z)`, `-log p(y)`, and `grad_theta L`.

The goal of this section is not to replay school math from the beginning. The goal is to rebuild just enough mathematical fluency to read models and papers without turning every formula into a memorization exercise.

## One Sentence Takeaway

Math is not a separate subject here. It is the language for reading inputs, representations, probabilities, losses, and updates.

## Notation Reboot

| Symbol | First role to see | Common model example |
| --- | --- | --- |
| `x`, `X` | data | token ids, embeddings, batches |
| `W`, `theta` | parameters | linear weights, model parameters |
| `h`, `Q`, `K`, `V` | intermediate representations | hidden states, attention inputs |
| `p(.)` | probability distribution | next-token distribution |
| `L` | objective to minimize | cross-entropy, NLL |

When you read a formula, read symbols by role before you read them by name. `W` should feel like “learned weights,” `p` like “uncertainty over outcomes,” and `L` like “the penalty we are trying to reduce.”

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;data x, X&quot;] --> B[&quot;representation h, XW&quot;]
  B --> C[&quot;logits&quot;]
  C --> D[&quot;probability p(y|x)&quot;]
  D --> E[&quot;loss L&quot;]
  E --> F[&quot;gradient update&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;see a formula&quot;] --> B[&quot;separate data and parameters&quot;]
  B --> C[&quot;imagine shapes&quot;]
  C --> D[&quot;identify operation role&quot;]
  D --> E[&quot;map to tensor ops&quot;]
  E --> F[&quot;interpret training or generation meaning&quot;]`"
/>

## Intuition With One Concrete Example

The fastest way to rebuild fluency is to diagnose where formula reading currently breaks.

### Quick Diagnostic

- Does `QK^T` make you think about shapes before arithmetic?
- Does `softmax(logits)` read as a distribution transform?
- Can you explain `L = -log p(y)` as “low correct-token probability means high penalty”?
- Does `theta = theta - lr * grad` immediately read as an update rule?
- Does `p_theta(y_t | context)` immediately read as a next-token distribution?

If three or more feel shaky, the issue is usually not weak intelligence or weak math. It is rusty model-math fluency.

Use this line as a compact example:

```text
L = -log p_theta(y_t | x, y_<t)
```

It already packs probability, logarithms, loss, and learning direction into one line.

## How This Shows Up In Papers

Use the same reading rubric every time:

| Question | What to inspect | Example |
| --- | --- | --- |
| What kind of term is this | data / parameter / representation / probability / loss | `X`, `W`, `h`, `p`, `L` |
| What is the shape | vector / matrix / batch / sequence | `X in R^(n x d)` |
| What is the operation doing | projection / scoring / normalization / penalty | `XW`, `QK^T`, `softmax`, `-log` |
| What behavior follows | generation / classification / update | next-token prediction, gradient step |

Five expressions should become automatic:

| Expression | Fast reading |
| --- | --- |
| `XW` | project inputs into a new space |
| `QK^T` | build a token-to-token score table |
| `softmax(z)` | normalize scores into a distribution |
| `L = -log p(y)` | low correct probability means large loss |
| `grad_theta L` | signal for how parameters should move |

## How This Maps To PyTorch/Code

- `XW` usually becomes `x @ W` or `nn.Linear(...)`
- `softmax(z)` becomes `torch.softmax(logits, dim=-1)`
- `-log p(y)` becomes `CrossEntropyLoss` or `F.nll_loss`
- `grad_theta L` becomes `loss.backward()` followed by `param.grad`

Useful examples:

- [gradient_chain_rule.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/gradient_chain_rule.py)
- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)
- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py)

## Common Failure Modes Or Misconceptions

- Reading symbol names without identifying their role
- Treating every formula like scalar algebra instead of imagining tensor shapes
- Memorizing `softmax` without understanding what it does to score gaps
- Treating gradients as textbook derivatives instead of update signals
- Failing to connect paper notation to tensor operations in code

## Exercises

### Basic Check

1. Classify `X`, `W`, `p(.)`, and `L` as data, parameter, probability, or loss.
2. Explain the role of `softmax(z)` and `-log p(y)` in one sentence each.
3. Explain why `QK^T` should make you think of a `(seq, seq)` relation table.

### Paper-Reading Drill

1. Break `L = -log p_theta(y_t | x, y_<t)` into data, probability, and loss pieces.
2. Explain why `XW` should be read as a projection before it is read as multiplication.
3. Pick one paper page and annotate five symbols with their role.

### Code Drill

1. Explain which part of the math is represented by `loss.backward()`.
2. Explain how `torch.softmax(logits, dim=-1)` maps to paper notation.
3. Open one example file and label its tensors as data, parameters, representations, or losses.

## Bridge To Next Chapter

Now that the reboot target is clear, the first real recovery step is functions, logarithms, and exponentials. That chapter unlocks logits, softmax, loss, and perplexity in one pass.

If you need a synthesis pass later, return to [Math Final Checkpoint](/en/math/final-checkpoint).

Next: [Functions, Logs, and Exponentials](/en/math/functions-growth)
