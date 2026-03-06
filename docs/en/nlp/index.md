# NLP Before Transformers

## Why This Module Matters

If you jump straight into Transformers, they can feel like just another strong architecture. The earlier NLP path makes it much clearer why attention mattered, and why papers kept talking about embeddings, context vectors, and encoder-decoder structure.

## One Sentence to Keep

Transformers emerged from repeated attempts to overcome weak semantic representations, fixed-context bottlenecks, poor long-range handling, and sequential processing limits.

## Timeline

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;one-hot / n-gram&quot;] --> B[&quot;embeddings&quot;]
  B --> C[&quot;RNN / seq2seq&quot;]
  C --> D[&quot;attention&quot;]
  D --> E[&quot;Transformer&quot;]`"
/>

## How The Bottleneck Moved

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;symbol counting&quot;] --> B[&quot;semantic vector space&quot;]
  B --> C[&quot;sequence compression bottleneck&quot;]
  C --> D[&quot;attention over source tokens&quot;]
  D --> E[&quot;parallel attention-first modeling&quot;]`"
/>

## Core Flow

| Era | Main idea | What it fixed | Remaining limitation |
| --- | --- | --- | --- |
| one-hot / n-gram | read text as symbolic counts | simple local pattern modeling | weak semantic generalization |
| embeddings | place words in vector space | denser semantic representation | weak full-context modeling |
| seq2seq | map input sequence to output sequence | translation and conditional generation | compresses long inputs too aggressively |
| attention | look back at relevant source positions | reduces fixed-context bottleneck | still tied to sequential RNN processing |
| Transformer | attention-first parallel architecture | better long-range modeling and parallelism | compute cost and scale become central |

## One-Hot And N-Grams

Early NLP treated words like symbols. One-hot vectors turned each word into a huge sparse vector, and n-grams tried to predict by counting nearby word patterns.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;token id&quot;] --> B[&quot;one-hot vector&quot;]
  B --> C[&quot;sparse symbolic representation&quot;]
  C --> D[&quot;n-gram counting&quot;]`"
/>

## Word2vec And Embeddings

Embeddings changed the game by treating words as coordinates in a semantic space.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;token id&quot;] --> B[&quot;embedding table lookup&quot;]
  B --> C[&quot;dense vector&quot;]
  C --> D[&quot;semantic neighborhood&quot;]`"
/>

In papers, this often appears as `E`, `W_e`, or an embedding matrix. The key interpretation is simple: one token becomes one dense vector.

## Seq2seq And The Context Bottleneck

Seq2seq models read the source, compress it, then generate the target. The weakness is that a long input often has to pass through one fixed-size context vector.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;source tokens&quot;] --> B[&quot;encoder&quot;]
  B --> C[&quot;single context vector&quot;]
  C --> D[&quot;decoder&quot;]
  D --> E[&quot;target tokens&quot;]`"
/>

## Why Attention Was Needed

Attention says: do not force the whole source into one vector. Let each decoding step look back at the source positions it needs.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;encoder states&quot;] --> B[&quot;attention weights&quot;]
  C[&quot;current decoder state&quot;] --> B
  B --> D[&quot;context vector for this step&quot;]
  D --> E[&quot;next output token&quot;]`"
/>

## Why Transformers Won

RNNs are sequential by design. That makes parallelization hard and long-range dependency tracking inefficient. Transformers moved attention to the center and removed the recurrent bottleneck.

## Paper-Reading Cues

| Expression | How to read it |
| --- | --- |
| `x_t` | input token or embedding at time `t` |
| `h_t` | hidden state at time `t` |
| `c` | context vector |
| `Enc(x)` | encoder-side representation |
| `Dec(y_<t, c)` | decoder step conditioned on previous outputs and context |

## What To Inspect In A Paper First

1. is the input sparse or dense,
2. does the model compress context into one vector or revisit many positions,
3. is computation sequential or parallel,
4. where does long-context failure come from.

## Exercises

1. Explain one-hot vs embeddings in semantic terms.
2. Explain why seq2seq struggles on long inputs.
3. Explain how attention reduces the context bottleneck.

## Checklist

- can you explain one-hot vs embeddings,
- can you explain seq2seq vs attention,
- can you explain which bottlenecks Transformers reduced.

Next: [Transformers](/en/transformers/)
