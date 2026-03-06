# Fourier and Positional Signals

## Why This Matters

The Fourier view says that complicated signals can often be understood as combinations of simple waves. That perspective connects positional encodings, Fourier features, spectral bias, and parts of signal-style model analysis.

If the trigonometry chapter taught one wave, this chapter teaches how many waves combine into a usable representation.

## One Sentence Takeaway

The Fourier view turns complex signals into combinations of frequency components.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `omega_k` | the `k`th frequency | spectral component |
| `a_k`, `b_k` | strength of each component | Fourier coefficients |
| `phi_k` | phase shift | signal offset |
| `FFT` | transform into frequency space | spectral analysis |
| sinusoidal basis | sin/cos building blocks | positional signals |

The main mental shift is to stop seeing a signal only in position space and also ask what its frequency content looks like.

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;original signal&quot;] --> B[&quot;sin / cos basis&quot;]
  B --> C[&quot;frequency coefficients&quot;]
  C --> D[&quot;reconstruct or analyze&quot;]
  D --> E[&quot;position and spectral intuition&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Low and High Frequency Components&quot;
    x-axis &quot;position&quot; [0, 1, 2, 3, 4, 5, 6]
    y-axis &quot;value&quot; -1 --> 1
    line [0.00, 0.48, 0.84, 1.00, 0.91, 0.60, 0.14]
    line [0.00, 0.91, -0.76, -0.28, 0.99, -0.54, -0.54]`"
/>

## Intuition With One Concrete Example

A complicated signal can often be decomposed into slow-changing components and fast-changing components. Positional encodings use the same idea: different frequencies capture different scales of positional difference.

### Formula Autopsy: Fourier-Series Intuition

```text
x(t) ≈ sum_k a_k cos(omega_k t + phi_k)
```

- `omega_k`: how fast a component oscillates
- `a_k`: how strong that component is
- `phi_k`: where that wave starts
- summing across `k` builds a richer signal

This is the core Fourier idea: treat complexity as a sum of simple waves.

## How This Shows Up In Papers

| Paper expression | Reading | Context |
| --- | --- | --- |
| sinusoidal positional encoding | position as a set of frequencies | Transformer |
| Fourier features | map coordinates into frequency space | implicit representations |
| spectral bias | models learn lower frequencies first | training dynamics |
| frequency response | what bands a model reacts to | signal-style analysis |

RoPE also belongs in this family because it interprets position through rotation and phase.

## How This Maps To PyTorch/Code

- `torch.sin` and `torch.cos` build sinusoidal bases
- `torch.fft.rfft` exposes frequency components
- positional encoding code constructs tables at multiple frequencies
- spectral-bias experiments can compare low-frequency and high-frequency patterns during training

## Common Failure Modes Or Misconceptions

- assuming Fourier ideas belong only to signal processing
- using “low frequency” and “high frequency” as vague buzzwords
- missing why positional encodings use multiple frequencies
- treating FFT as a black-box transform without connecting it to the original signal

## Exercises

### Basic Check

1. Explain the difference between low-frequency and high-frequency components.
2. What does it mean to express a complex signal as a sum of waves?
3. Why do positional encodings use multiple frequencies?

### Paper-Reading Drill

1. Explain each term in the Fourier-style formula.
2. What does spectral bias mean in training behavior?
3. Re-explain RoPE through phase and rotation language.

### Engineer / Code Drill

1. What kinds of tensors would be interesting to inspect with `torch.fft.rfft`?
2. How are multiple frequency channels constructed in positional encoding code?
3. If a model struggles with high-frequency patterns, what would you inspect first?

## Bridge To Next Chapter

The main advanced math pillars are now in place. The final step is to connect them into a paper-readiness synthesis pass.

Next: [Advanced Math Final Checkpoint](/en/math-advanced/final-checkpoint)
