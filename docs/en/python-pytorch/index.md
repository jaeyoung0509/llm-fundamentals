# Python and PyTorch

## Goals

- build a tensor-first mindset,
- understand why autograd matters,
- write a training loop by hand.

## One Sentence to Keep

PyTorch training is the discipline of reading and controlling tensor flow, loss computation, and gradient updates.

## Core Ideas

### Tensor-first thinking

Most math symbols in ML papers become tensors in code. `X`, `W`, `theta`, and `grad` are not abstract for long: they become actual PyTorch objects with shapes, devices, and gradients.

### From equation to code

| Equation | PyTorch view |
| --- | --- |
| `X` | input tensor |
| `W`, `b` | parameters inside `nn.Linear` |
| `f_theta(X)` | `model(X)` |
| `L(y_hat, y)` | `loss_fn(predictions, targets)` |
| `grad_theta L` | `parameter.grad` |
| `theta <- theta - eta g` | `optimizer.step()` |

## Core Pattern

```python
for inputs, targets in dataloader:
    optimizer.zero_grad()
    predictions = model(inputs)
    loss = loss_fn(predictions, targets)
    loss.backward()
    optimizer.step()
```

Most practical model training is a variation of this loop.

## Shape reading

The most common beginner failure in deep learning code is not syntax. It is shape confusion.

| Shape | Meaning |
| --- | --- |
| `(batch, dim)` | batch of vectors |
| `(batch, seq, dim)` | batch of token sequences |
| `(vocab, dim)` | embedding table |
| `(batch, classes)` | classification logits |

## Why autograd matters

Autograd records the forward computation graph and then walks backward through it to accumulate gradients.

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + 3 * x
y.backward()

print(x.grad)
```

The important questions are:

- which tensors require gradients,
- where gradients are stored after `backward()`.

## Dataset and DataLoader

- `Dataset`: defines how to read one sample
- `DataLoader`: batches, shuffles, and loads samples efficiently

Papers often skip this layer quickly, but practical training quality depends on it.

## Debugging checklist

- do input and output shapes match expectations,
- is loss decreasing,
- are gradients present on parameters,
- did you call `optimizer.zero_grad()`,
- are `train()` and `eval()` modes correct.

## Recommended Exercise

- `examples/torch-basics/linear_regression.py`
- write a custom `Dataset`,
- run the same code on CPU and GPU.
- replace one linear layer with a two-layer MLP.

## Checklist

- can you read tensor shapes,
- can you explain `requires_grad`,
- can you distinguish `loss.backward()` from `optimizer.step()`.

## How This Connects Forward

Once the loop is clear, the next step is understanding what kinds of models and losses live inside that loop.

Next: [Deep Learning Basics](/en/deep-learning/)
