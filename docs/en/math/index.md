# Math Foundations

## Goals

- read functions, logs, and exponentials through model behavior,
- understand vectors and matrices as containers for data and parameters,
- interpret derivatives as signals for reducing loss,
- treat probability as the language of uncertainty and prediction.

## Why This Section Matters So Much

This is the load-bearing section of the book. If the math layer stays fuzzy, PyTorch, Transformers, GPT-3, and RLHF all risk turning into vocabulary memorization.

The goal is not to rebuild all of school math. The goal is to rebuild the minimum language needed to read models, formulas, and code without panic.

## One Sentence to Keep

Math is not a separate school subject here. It is the language needed to read every later model and training loop.

## Recommended Order

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;Functions, logs, growth&quot;] --> B[&quot;Vectors and matrices&quot;]
  B --> C[&quot;Derivatives and gradients&quot;]
  C --> D[&quot;Probability and softmax&quot;]
  D --> E[&quot;PyTorch training loop&quot;]`"
/>

## What To Focus On In This Section

- how functions, logs, and exponentials connect to softmax and loss,
- how matrix multiplication shows up in embeddings, linear layers, and attention,
- how the chain rule becomes backpropagation,
- how probability, expectation, and variance connect to sampling and evaluation.

## Minimal Syllabus

### 1. Functions, Logs, and Exponentials

Neural networks constantly rely on non-linear behavior. Softmax, cross-entropy, and decay schedules all bring logs and exponentials into practice.

### 2. Vectors and Matrices

- vector: one bundle of features,
- matrix: many bundles of data or weights,
- matrix multiplication: a way to remix features into new representations.

### 3. Derivatives and Gradients

A derivative measures how much the loss changes when you nudge something slightly. Gradient descent uses that signal to move parameters in the opposite direction.

```text
new_weight = old_weight - learning_rate * gradient
```

### 4. Probability and Expectation

Models do not output certainty. They estimate distributions over possible answers. Expectation captures average outcome, while variance captures spread.

## Submodules

| Submodule | Core question | Page |
| --- | --- | --- |
| Functions, Logs, and Growth | why do model values move non-linearly | [Functions, Logs, and Growth](/en/math/functions-growth) |
| Vectors and Matrices | how do we bundle and transform data | [Vectors and Matrices](/en/math/vectors-matrices) |
| Derivatives and Gradients | how do we reduce loss | [Derivatives and Gradients](/en/math/gradients) |
| Probability and Softmax | why is model output a distribution | [Probability and Softmax](/en/math/probability) |

## Math Reading Loop

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;read symbols&quot;] --> B[&quot;read shapes&quot;]
  B --> C[&quot;read operation roles&quot;]
  C --> D[&quot;interpret loss / probability&quot;]
  D --> E[&quot;map to PyTorch code&quot;]
  E --> F[&quot;read the formula again&quot;]`"
/>

## Checklist

- can you explain why vectors matter for representations,
- can you explain gradients as loss-reduction signals,
- can you explain why model outputs are distributions.

## Example Links

- [gradient_chain_rule.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/gradient_chain_rule.py)
- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)
- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py)

## How This Connects Forward

Once math starts to feel like model language, the next step is to express that language directly in tensors and training loops.

Next: [Python and PyTorch](/en/python-pytorch/)
