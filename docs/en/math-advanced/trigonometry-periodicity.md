# Trigonometry and Periodicity

## Why This Matters

Trigonometry returns in LLM work more often than many engineers expect. Sinusoidal positional encodings, RoPE, Fourier features, and periodic signal views all depend on angles and repeating patterns.

School trig may have felt like angle bookkeeping. In ML, the more useful view is “a language for periodic structure.”

## One Sentence Takeaway

Trigonometry is both the language of angles and the language of repeating signals, which makes it central to positional and rotational structure in models.

### 30-Second Intuition

The easiest way to think about trig here is: it is a way to write repeating waves as numbers. That is why it is useful for encoding order and relative position.

### Developer Lens

In code, this usually becomes `integer positions -> sin/cos table -> add or rotate embeddings`. Read it as a feature transform before you read it as abstract math.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `theta` | angle | phase, rotation |
| `sin(theta)`, `cos(theta)` | repeating values | positional encoding |
| `omega` | frequency | how fast a signal oscillates |
| `phi` | phase shift | horizontal shift |
| `T` | period | repeat length |

Radian intuition matters more than degree intuition here. Papers and implementations almost always live in radians.

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;angle theta on a circle&quot;] --> B[&quot;sin(theta), cos(theta)&quot;]
  B --> C[&quot;periodic signal&quot;]
  C --> D[&quot;position encoding&quot;]
  D --> E[&quot;positional encoding / RoPE&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Sine and Cosine as Periodic Signals&quot;
    x-axis &quot;angle&quot; [0, 1, 2, 3, 4, 5, 6]
    y-axis &quot;value&quot; -1 --> 1
    line [0.00, 0.84, 0.91, 0.14, -0.76, -0.96, -0.28]
    line [1.00, 0.54, -0.42, -0.99, -0.65, 0.28, 0.96]`"
/>

## Intuition With One Concrete Example

Imagine a point moving around the unit circle. `cos(theta)` is its x-coordinate and `sin(theta)` is its y-coordinate. As the angle changes, the values repeat. That repeat pattern is the key idea.

Because of that periodicity, a model can encode positions not just as integers, but as combinations of waves at different frequencies.

### Tiny Worked Example

Take positions `0`, `1`, and `2` and look at one rough wave:

- `sin(0) = 0`, `cos(0) = 1`
- `sin(1) ≈ 0.84`, `cos(1) ≈ 0.54`
- `sin(2) ≈ 0.91`, `cos(2) ≈ -0.42`

The important part is not memorizing the numbers. Nearby positions produce nearby wave coordinates, so order becomes a smooth geometric change instead of a raw counter.

### Formula Autopsy: Sinusoidal Positional Encoding

```text
PE(pos, 2i) = sin(pos / 10000^(2i / d_model))
PE(pos, 2i + 1) = cos(pos / 10000^(2i / d_model))
```

- `pos`: current position
- `2i`, `2i + 1`: even and odd channels
- `10000^(2i / d_model)`: creates different frequencies by channel
- `sin`, `cos`: convert position into periodic signals that can be compared across scales

This is best read as “turn a position into a stack of waves at different frequencies.”

## How This Shows Up In Papers

| Paper expression | Reading | Context |
| --- | --- | --- |
| `sin`, `cos` position functions | encode position as periodic signal | Transformer positional encoding |
| rotation matrix | rotate a vector by an angle | RoPE |
| phase shift | same wave, shifted sideways | relative position |
| Fourier features | expand input coordinates with frequencies | implicit representations |

RoPE is still the same story at a deeper level: rotate queries and keys by angle so relative position enters the inner product.

## How This Maps To PyTorch/Code

- `torch.arange(seq_len)` builds position indices
- `torch.sin` and `torch.cos` build periodic tables
- RoPE implementations split even/odd channels and rotate them
- Fourier features expand coordinates before feeding them into an MLP

The key mapping is always the same: `integer position -> real-valued wave features`.

## Common Failure Modes Or Misconceptions

- mixing degree intuition with radian-based implementations
- memorizing `sin` and `cos` as functions without seeing periodicity as their core role
- treating positional encoding as a small additive trick instead of a frequency design
- viewing RoPE as a magic trick rather than angle-based relative-position structure

## Exercises

### Basic Check

1. Why are `sin` and `cos` called periodic signals?
2. Why are radians more natural than degrees in implementations?
3. Why are multiple frequencies useful in positional encoding?

### Paper-Reading Drill

1. Explain each term in the positional encoding formula.
2. Explain why RoPE is connected to relative position through rotation.
3. Explain how Fourier features change an input representation.

### Engineer / Code Drill

1. If you had only `torch.sin` and `torch.cos`, what tensors would you need to build a positional encoding table?
2. Why do RoPE implementations split even and odd channels?
3. Find where position enters your current Transformer code and explain how.

## Bridge To Next Chapter

Once periodicity and angles feel natural, the next step is to read representation space more deeply through basis, span, orthogonality, projections, and rank.

Next: [Advanced Linear Algebra](/en/math-advanced/advanced-linear-algebra)
