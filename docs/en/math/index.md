# Math Foundations

## Goals

- read functions, logs, and exponentials through model behavior,
- understand vectors and matrices as containers for data and parameters,
- interpret derivatives as signals for reducing loss,
- treat probability as the language of uncertainty and prediction.

## Why This Section Matters So Much

This is the load-bearing section of the book. If the math layer stays fuzzy, PyTorch, Transformers, GPT-3, and RLHF all risk turning into vocabulary memorization.

## Recommended Order

<MermaidDiagram>
flowchart TD
  A["Functions, logs, growth"] --> B["Vectors and matrices"]
  B --> C["Derivatives and gradients"]
  C --> D["Probability and softmax"]
  D --> E["PyTorch training loop"]
</MermaidDiagram>

## Math Priority TODO

- [ ] connect function graphs to loss curves,
- [ ] connect logs and exponentials to cross-entropy and softmax,
- [ ] connect matrix multiplication to embeddings and linear layers,
- [ ] connect the chain rule to backpropagation,
- [ ] connect distributions and expectation to sampling and evaluation,
- [ ] add at least three exercises per sub-page.

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

Next: [Python and PyTorch](/en/python-pytorch/)
