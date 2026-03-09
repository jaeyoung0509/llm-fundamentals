# Statistics and Estimation

## Why This Matters

Machine learning is ultimately about estimating patterns in a hidden distribution from finite samples. That makes expectations, variance, covariance, MLE, MAP, and bias-variance intuition deeply relevant to training and evaluation.

Without this chapter, metric fluctuations and uncertainty often feel like noise. With it, those behaviors start to look statistically interpretable.

## One Sentence Takeaway

Statistics and estimation are the language of learning from limited samples under uncertainty.

### 30-Second Intuition

The easiest summary is: statistics is how you guess the whole world from a limited amount of data, while remembering that the guess can wobble.

### Developer Lens

If validation scores swing around, or sample counts are small, this chapter explains why. MLE is not a mysterious new algorithm; it is “pick the parameter that best explains the data.”

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `E[X]` | expected value | average loss |
| `Var(X)` | variability | uncertainty |
| `Cov(X, Y)` | co-movement | feature correlation |
| `theta_MLE` | parameter that best explains the data | likelihood maximization |
| `theta_MAP` | estimate with prior information | Bayesian flavor |

The crucial habit is to ask not only “what is the estimate,” but also “how much could it fluctuate?”

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;sampled data&quot;] --> B[&quot;estimate mean / variance&quot;]
  B --> C[&quot;fit model&quot;]
  C --> D[&quot;measure likelihood&quot;]
  D --> E[&quot;generalization check&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Estimation Error vs Sample Size&quot;
    x-axis &quot;sample size&quot; [10, 50, 100, 500, 1000]
    y-axis &quot;estimation error&quot; 0 --> 0.6
    line [0.52, 0.31, 0.22, 0.10, 0.07]`"
/>

## Intuition With One Concrete Example

The sample mean is simple but revealing. With few samples, the estimate fluctuates more. With many samples, it stabilizes. The same intuition underlies evaluation variance and confidence in results.

### Tiny Worked Example

Compare two mini-batches:

- batch A: `[4, 5, 6]`, mean `5`
- batch B: `[1, 5, 9]`, mean `5`

The means match, but batch B is much more spread out. So average alone is not enough. This is exactly why variance and uncertainty matter in evaluation.

### Formula Autopsy: Maximum Likelihood Estimation

```text
theta_MLE = argmax_theta prod_i p(x_i | theta)
```

- `theta`: parameter to estimate
- `p(x_i | theta)`: how well the parameter explains sample `x_i`
- `prod_i`: consider all samples together
- `argmax`: choose the most explanatory parameter

In practice, papers usually move to the log form `sum_i log p(x_i | theta)`.

## How This Shows Up In Papers

| Paper expression | Reading | Context |
| --- | --- | --- |
| maximum likelihood | choose parameters that best explain the data | language-model objective |
| MAP estimate | combine data fit and prior | Bayesian regularization |
| covariance matrix | how features move together | representation analysis |
| bias-variance tradeoff | underfit vs overfit balance | model selection |

Next-token training is still an estimation problem: maximize conditional likelihood over data.

## How This Maps To PyTorch/Code

- `torch.mean` and `torch.var` compute basic statistics
- average loss logs connect directly to expectation
- `CrossEntropyLoss` can still be read as likelihood-maximization language
- validation instability should be interpreted with sample size and variance in mind

## Common Failure Modes Or Misconceptions

- focusing on averages while ignoring uncertainty or spread
- treating MLE like an isolated algorithm instead of a likelihood view
- seeing covariance as a scary table rather than co-movement
- assuming every validation swing must be a bug instead of possibly sampling noise

## Exercises

### Basic Check

1. Explain expectation and variance in plain language.
2. Why do larger sample sizes stabilize estimation?
3. Explain MLE in one sentence.

### Paper-Reading Drill

1. Explain each part of the MLE formula.
2. Why can language-model training still be read as likelihood maximization?
3. Why does the bias-variance tradeoff matter for evaluation?

### Engineer / Code Drill

1. Besides mean loss, what variability signals would you log during training?
2. How might covariance help detect collapsed or redundant features?
3. How would you distinguish statistical fluctuation from a coding bug in evaluation metrics?

## Bridge To Next Chapter

Once estimation and uncertainty are clearer, the next step is to understand why training becomes stable or unstable in practice.

Next: [Optimization and Numerical Stability](/en/math-advanced/optimization-numerical-stability)
