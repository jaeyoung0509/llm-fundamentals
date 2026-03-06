# Probability and Softmax

## Why This Matters

An LLM does not “know the answer” in a deterministic way. It estimates a distribution over plausible next tokens. That makes probability the common language behind generation, sampling, loss, entropy, and calibration.

If this chapter is weak, those topics stay disconnected. If it is strong, `p_theta(y_t | context)` reads naturally as model behavior.

## One Sentence Takeaway

Probability expresses model uncertainty, and softmax is the translator from scores into that probabilistic language.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `p(y|x)` | probability of `y` given `x` | classification, generation |
| `E[X]` | expected value | average loss, expected reward |
| `Var(X)` | spread of outcomes | uncertainty |
| `H(p)` | spread of a distribution | entropy |
| `CE(p, q)` | gap between target and model distributions | cross-entropy |

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;softmax&quot;]
  B --> C[&quot;probability distribution&quot;]
  C --> D[&quot;sampling or argmax&quot;]
  C --> E[&quot;cross-entropy loss&quot;]
  C --> F[&quot;calibration check&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;context&quot;] --> B[&quot;p_theta(next token | context)&quot;]
  B --> C[&quot;top candidates&quot;]
  B --> D[&quot;tail candidates&quot;]
  C --> E[&quot;decode or sample&quot;]
  D --> E`"
/>

## Intuition With One Concrete Example

Suppose the model predicts:

```text
{ "Paris": 0.72, "London": 0.16, "Seoul": 0.07, "other": 0.05 }
```

That one distribution already says three things:

- the model prefers `Paris`,
- it is not fully certain,
- generation will depend on the decoding rule.

Higher temperature keeps more mass in the tail. Lower temperature concentrates more on the top few options.

<MermaidDiagram
  :code="`xychart
    title &quot;Temperature Changes Distribution Sharpness&quot;
    x-axis &quot;token rank&quot; [1, 2, 3, 4]
    y-axis &quot;probability&quot; 0 --> 1
    line [0.83, 0.10, 0.05, 0.02]
    line [0.55, 0.23, 0.14, 0.08]`"
/>

Calibration is another view on the same probability language: when the model says `0.9`, is it actually correct close to 90% of the time?

<MermaidDiagram
  :code="`xychart
    title &quot;Confidence vs Actual Correctness&quot;
    x-axis &quot;confidence bucket&quot; [0.2, 0.4, 0.6, 0.8, 1.0]
    y-axis &quot;actual accuracy&quot; 0 --> 1
    line [0.25, 0.38, 0.58, 0.69, 0.81]`"
/>

## How This Shows Up In Papers

The core expression is:

```text
p_theta(y_t | y_<t, x)
```

Read it in this order:

| Piece | Reading |
| --- | --- |
| `theta` | current model parameters |
| `y_<t, x` | context seen so far |
| `y_t` | next token to predict |
| `p_theta(...)` | the model distribution over candidates |

From this distribution:

- greedy decoding picks the largest probability,
- beam search explores several strong candidates,
- sampling draws from the distribution directly.

Cross-entropy checks whether the model places enough probability mass on the correct answer. Entropy measures how spread out the distribution is.

## How This Maps To PyTorch/Code

- `torch.softmax(logits, dim=-1)` converts scores into probabilities
- `torch.multinomial(probs, num_samples=1)` performs sampling
- `CrossEntropyLoss` evaluates whether the correct class gets enough probability mass
- calibration checks can bucket confidence and compare it to actual accuracy

Example link:

- [softmax_sampling.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/math/softmax_sampling.py)

## Common Failure Modes Or Misconceptions

- trusting softmax probabilities without checking calibration
- treating entropy as “randomness” only, instead of distribution spread
- mixing up entropy and cross-entropy
- thinking sampling is just randomness rather than controlled distribution use
- reading `p_theta(y_t | context)` as pure notation instead of generation behavior

## Exercises

### Basic Check

1. Explain how `p(y|x)` reads in classification and in generation.
2. Why does larger temperature flatten the distribution?
3. Why is calibration different from plain accuracy?

### Paper-Reading Drill

1. Explain `p_theta(y_t | y_<t, x)` piece by piece.
2. What does high entropy mean for a generation distribution?
3. If a paper says a model is overconfident, what pattern should appear on a calibration plot?

### Code Drill

1. In `softmax_sampling.py`, explain the flow from logits to probabilities to sampled token.
2. Compare argmax decoding to multinomial sampling.
3. If you were writing calibration code, which values would you log for each prediction?

## Bridge To Next Chapter

The four math pillars are now connected. The next step is to synthesize them and practice turning paper formulas into PyTorch reasoning.

Next: [Math Final Checkpoint](/en/math/final-checkpoint)
