# Derivatives and Gradients

## Why This Matters

In deep learning, derivatives matter because they tell us how to reduce loss. A gradient is a compact update signal: which way should the parameters move, and how strongly?

If this chapter is weak, `loss.backward()` works like magic. If it is strong, optimizer behavior, instability, and training dynamics become much easier to read.

## One Sentence Takeaway

The gradient summarizes how the loss changes when parameters move.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `dL/dw` | how loss changes when `w` changes | single parameter |
| `partial L / partial w_i` | effect of one variable inside many | partial derivative |
| `grad_theta L` | direction signal across all parameters | optimizer input |
| `theta <- theta - lr * grad` | update rule | gradient descent |
| `chain rule` | influence flows backward through intermediate computations | backpropagation |

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;forward: input -> model&quot;] --> B[&quot;loss L&quot;]
  B --> C[&quot;backward: gradients&quot;]
  C --> D[&quot;optimizer step&quot;]
  D --> E[&quot;updated parameters&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;scalar derivative&quot;] --> B[&quot;partial derivatives&quot;]
  B --> C[&quot;gradient vector&quot;]
  C --> D[&quot;chain rule&quot;]
  D --> E[&quot;backpropagation&quot;]
  E --> F[&quot;parameter update&quot;]`"
/>

## Intuition With One Concrete Example

Take a tiny regression example:

```text
y_hat = wx
L = (y_hat - y)^2
```

`dL/dw` tells you what happens to loss if `w` moves a little. Positive means moving `w` upward makes loss worse. Negative means moving `w` upward helps.

With many parameters, those signals stack into a gradient vector.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;prediction error&quot;] --> B[&quot;loss&quot;]
  B --> C[&quot;dL/dw&quot;]
  C --> D[&quot;update w&quot;]
  D --> E[&quot;new prediction&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Stable vs Unstable Loss Curves&quot;
    x-axis &quot;step&quot; [1, 2, 3, 4, 5, 6]
    y-axis &quot;loss&quot; 0 --> 7
    line [6.0, 4.8, 3.7, 2.9, 2.2, 1.8]
    line [6.0, 5.7, 5.9, 5.1, 5.8, 4.9]`"
/>

## How This Shows Up In Papers

The canonical update rule is:

```text
theta <- theta - eta * grad_theta L
```

### Read The Gradient Formula Line By Line

| Piece | Reading | Meaning |
| --- | --- | --- |
| `theta` | current parameters | all learnable weights |
| `grad_theta L` | direction that increases loss | move against it |
| `eta` | learning rate | step size |
| `-` | opposite direction of the gradient | loss reduction |

Another common paper form is:

```text
partial L / partial W = partial L / partial h * partial h / partial W
```

This is chain rule in compressed form. The loss depends on an intermediate representation `h`, and `h` depends on `W`, so the effect on `W` is the product of those dependencies.

Gradient-scale problems also matter later in Transformers. Residual connections and normalization are partly about keeping optimization signals more stable.

## How This Maps To PyTorch/Code

- `loss.backward()` computes gradients through the graph
- `param.grad` stores the gradient for each parameter
- `optimizer.step()` applies the update
- `optimizer.zero_grad()` prevents accidental accumulation

Example links:

- [gradient_chain_rule.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/gradient_chain_rule.py)
- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py)

## Common Failure Modes Or Misconceptions

- Thinking derivatives are only about textbook slopes instead of update signals
- Assuming bigger gradients are always better
- Failing to connect learning rate to gradient scale
- Treating `loss.backward()` as local loss math instead of graph-wide propagation
- Missing why residuals and normalization matter for optimization stability

<MermaidDiagram
  :code="`xychart
    title &quot;Gradient Scale Across Layers&quot;
    x-axis &quot;layer depth&quot; [1, 2, 3, 4, 5]
    y-axis &quot;gradient magnitude&quot; 0 --> 5
    line [1.8, 1.3, 0.9, 0.5, 0.2]
    line [0.9, 1.2, 1.8, 2.9, 4.4]`"
/>

## Exercises

### Basic Check

1. Explain `dL/dw` as “what happens to loss if `w` moves a little.”
2. What happens if the learning rate is too large?
3. Why do we need the chain rule?

### Paper-Reading Drill

1. Explain each term in `theta <- theta - eta * grad_theta L`.
2. Explain `partial L / partial W = partial L / partial h * partial h / partial W` in plain language.
3. If a paper says residuals improve optimization stability, how does that relate to gradients?

### Code Drill

1. In `gradient_chain_rule.py`, separate forward values from backward signals.
2. In `linear_regression.py`, map `loss.backward()` and `optimizer.step()` to the math.
3. Explain what you would observe if gradients accidentally accumulated across steps.

## Bridge To Next Chapter

Now the update signal is clear. The next step is to understand why model outputs are distributions, and how sampling, entropy, and calibration sit on top of that view.

Next: [Probability and Softmax](/en/math/probability)
