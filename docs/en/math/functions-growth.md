# Functions, Logs, and Exponentials

## Why This Matters

In LLM work, functions, logarithms, and exponentials are not decoration. They sit inside logits, softmax, cross-entropy, negative log-likelihood, temperature scaling, and perplexity.

If this chapter is weak, you end up using those terms by habit without being able to explain why they behave the way they do.

## One Sentence Takeaway

Functions transform values, exponentials magnify score gaps, and logarithms turn probabilities into a loss-friendly scale.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `f(x)` | rule that maps input to output | linear layer, activation |
| `exp(z)` | magnify differences | softmax numerator |
| `log p(y|x)` | log probability of the correct answer | likelihood |
| `-log p(y|x)` | larger penalty when the correct probability is low | NLL, cross-entropy |
| `softmax(z)` | normalize score vector into a distribution | next-token probabilities |

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input representation&quot;] --> B[&quot;linear layer&quot;]
  B --> C[&quot;logits&quot;]
  C --> D[&quot;exp&quot;]
  D --> E[&quot;softmax probabilities&quot;]
  E --> F[&quot;-log p(correct)&quot;]
  F --> G[&quot;training loss&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;small score gap&quot;] --> B[&quot;exp magnifies gap&quot;]
  B --> C[&quot;top token stands out more&quot;]
  C --> D[&quot;softmax sharpens the distribution&quot;]
  D --> E[&quot;loss depends on correct-token probability&quot;]`"
/>

## Intuition With One Concrete Example

Suppose the model produces:

```text
logits = [2.0, 1.0, 0.0]
```

These are not probabilities yet. They are preference scores. `exp` widens the gap between them, and softmax turns them into a normalized distribution.

<MermaidDiagram
  :code="`xychart
    title &quot;Linear vs Exponential Response&quot;
    x-axis &quot;score gap&quot; [0, 1, 2, 3, 4]
    y-axis &quot;effect&quot; 0 --> 55
    line [0, 1, 2, 3, 4]
    line [1, 2.72, 7.39, 20.09, 54.60]`"
/>

And if the correct-token probability is `0.9`, `-log(0.9)` is small. If it is `0.1`, `-log(0.1)` is large.

<MermaidDiagram
  :code="`xychart
    title &quot;Negative Log Loss&quot;
    x-axis &quot;p(correct)&quot; [0.1, 0.3, 0.5, 0.7, 0.9]
    y-axis &quot;-log(p)&quot; 0 --> 2.5
    line [2.30, 1.20, 0.69, 0.36, 0.10]`"
/>

## How This Shows Up In Papers

The key formula for this chapter is:

```text
L = -sum_t log p_theta(y_t | x, y_<t)
```

### Paper Formula Autopsy: Negative Log-Likelihood

| Piece | Reading | What it does |
| --- | --- | --- |
| `p_theta(...)` | model probability under parameters `theta` | predicts the next-token distribution |
| `y_t` | correct token at time `t` | target |
| `x, y_<t` | input and prior context | conditioning information |
| `log` | puts tiny probabilities onto an additive scale | stable accumulation |
| `-` | makes high correct probability produce low loss | optimization direction |
| `sum_t` | accumulates over time steps | sequence training |

Perplexity is just another view on the same learning signal. Lower cross-entropy means lower perplexity and less confusion about the next token.

## How This Maps To PyTorch/Code

- `logits = model(x)` produces scores, not probabilities.
- `torch.softmax(logits, dim=-1)` is useful for inspection and sampling.
- `nn.CrossEntropyLoss()` handles the log-softmax/NLL structure internally.
- Temperature sampling is the same family of behavior as `logits / T` before softmax.

Example links:

- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)
- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py)

## Common Failure Modes Or Misconceptions

- Treating softmax as a memorized probability function without understanding score-gap amplification
- Using cross-entropy without the `-log p(correct)` intuition
- Treating perplexity as a disconnected metric instead of a loss-relative view
- Assuming inference must always compute explicit probabilities before every decision
- Forgetting that temperature acts on logits, not on final probabilities

## Exercises

### Basic Check

1. Explain why `[2, 1, 0]` is not yet a probability distribution.
2. Explain why `-log(0.9)` and `-log(0.1)` differ so much.
3. Explain why larger `T` makes `softmax(logits / T)` flatter.

### Paper-Reading Drill

1. Explain each term in `L = -sum_t log p_theta(y_t | x, y_<t)`.
2. Explain why a small cross-entropy improvement can still matter in generation quality.
3. Explain why `negative log-likelihood` and cross-entropy often feel like the same training language in practice.

### Code Drill

1. Predict how `softmax_sampling.py` will change when temperature moves from `0.5` to `2.0`.
2. Explain why `CrossEntropyLoss` expects logits directly.
3. Explain the difference between sampling from probabilities and taking `argmax`.

## Bridge To Next Chapter

Once logits, softmax, loss, and perplexity feel connected, the next step is to understand the containers that hold those values: vectors, matrices, batches, embeddings, and attention score tables.

Next: [Vectors and Matrices](/en/math/vectors-matrices)
