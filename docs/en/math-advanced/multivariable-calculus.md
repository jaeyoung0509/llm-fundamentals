# Multivariable Calculus

## Why This Matters

Deep learning models are functions with huge numbers of variables. That means scalar derivatives are not enough. Gradients, Jacobians, Hessians, and Taylor intuition help explain sensitivity, curvature, and optimization behavior.

If this chapter is weak, terms like conditioning, curvature, and sensitivity remain abstract. If it is strong, paper discussions about stability become much easier to parse.

## One Sentence Takeaway

Multivariable calculus reads how change spreads across many dimensions at once.

### 30-Second Intuition

Single-variable calculus asks what happens when one knob moves. Multivariable calculus asks what happens when thousands or millions of knobs move together.

### Developer Lens

You already use gradients. Jacobians are the bigger version for input-output sensitivity, and Hessians are the bigger version for local curvature and sharpness.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `partial f / partial x_i` | change along one variable | partial derivative |
| `grad f(x)` | strongest increase direction | gradient |
| `J_f(x)` | sensitivity table from inputs to outputs | Jacobian |
| `H_f(x)` | curvature information | Hessian |
| Taylor approximation | local shape approximation | optimization intuition |

The two big questions are: how sensitive is the function, and how curved is the landscape?

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;partial derivatives&quot;] --> B[&quot;gradient&quot;]
  B --> C[&quot;Jacobian&quot;]
  C --> D[&quot;Hessian&quot;]
  D --> E[&quot;curvature and stability&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Flat vs Sharp Curvature&quot;
    x-axis &quot;parameter move&quot; [-2, -1, 0, 1, 2]
    y-axis &quot;loss&quot; 0 --> 9
    line [4.0, 1.5, 0.0, 1.5, 4.0]
    line [8.0, 2.5, 0.0, 2.5, 8.0]`"
/>

## Intuition With One Concrete Example

You already know gradients as update signals. Jacobians and Hessians add two more layers:

- Jacobian: how one input change affects many outputs
- Hessian: how sharply the local loss landscape bends

### Tiny Worked Example

Take `L(w_1, w_2) = w_1^2 + 4w_2^2`.

- at `w_1 = 1`, `w_2 = 1`, the gradient is `[2, 8]`
- so the `w_2` direction is much steeper
- the Hessian reflects the same asymmetry in curvature

This one toy example already separates two ideas: gradient tells you where to move now, Hessian tells you which directions are sharper.

### Formula Autopsy: Second-Order Taylor Intuition

```text
L(theta + Delta) ≈ L(theta) + grad^T Delta + 1/2 Delta^T H Delta
```

- `grad^T Delta`: first-order directional effect
- `Delta^T H Delta`: second-order curvature effect
- `H`: tells you which directions are sharper or flatter

So the Hessian is a compact language for local geometry beyond the gradient.

## How This Shows Up In Papers

| Paper expression | Reading | Context |
| --- | --- | --- |
| Jacobian norm | size of sensitivity | robustness, smoothness |
| Hessian spectrum | curvature distribution | sharpness, stability |
| first-order method | gradient-only optimization | SGD, Adam |
| second-order intuition | curvature-aware reasoning | Newton-like discussion |

When Transformer or RLHF papers mention stability or conditioning, they are often invoking this language.

## How This Maps To PyTorch/Code

- `torch.autograd.grad` computes targeted derivatives
- `torch.autograd.functional.jacobian` gives Jacobians
- `torch.autograd.functional.hessian` gives Hessians
- even when you do not compute the full Hessian in practice, curvature intuition still matters for optimizer behavior

## Common Failure Modes Or Misconceptions

- thinking gradients are the full optimization story
- viewing the Jacobian as a scary matrix rather than a sensitivity table
- treating the Hessian as classroom math instead of sharpness information
- memorizing Taylor expansions without seeing them as local shape approximations

## Exercises

### Basic Check

1. Explain the difference between a Jacobian and a Hessian.
2. How does sharp curvature affect optimization differently from flat curvature?
3. Why is Taylor approximation called a local approximation?

### Paper-Reading Drill

1. Explain each term in `L(theta + Delta)`.
2. If a paper uses Jacobian regularization, what is it trying to reduce?
3. How does the Hessian spectrum connect to sharpness?

### Engineer / Code Drill

1. What is the difference between `autograd.grad` and `functional.jacobian`?
2. Why might gradient clipping help even when you never compute a Hessian?
3. Where in your training code would excessive sensitivity show up first?

## Bridge To Next Chapter

Once change and curvature feel clearer, the next step is to understand how data uncertainty and estimation logic shape training and evaluation.

Next: [Statistics and Estimation](/en/math-advanced/statistics-estimation)
