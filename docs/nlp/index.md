# NLP와 Transformer 이전 배경

## 왜 이 장이 필요한가

Transformer를 곧바로 배우면 "좋은 구조 하나" 정도로만 보이기 쉽다. 하지만 그 이전 흐름을 보면 attention이 왜 그렇게 큰 변화였는지, 그리고 논문에서 왜 embedding, context vector, encoder-decoder 같은 말이 반복되는지가 훨씬 또렷해진다.

## 이 장에서 꼭 가져갈 한 문장

Transformer는 갑자기 나온 기적의 구조가 아니라, 의미 표현 부족, 고정 길이 병목, 긴 문맥 약점, 순차 처리 한계를 밀어내는 과정에서 등장했다.

## 시대 흐름 다이어그램

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;one-hot / n-gram&quot;] --> B[&quot;embeddings&quot;]
  B --> C[&quot;RNN / seq2seq&quot;]
  C --> D[&quot;attention&quot;]
  D --> E[&quot;Transformer&quot;]`"
/>

## 병목이 어떻게 이동했는가

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;symbol counting&quot;] --> B[&quot;semantic vector space&quot;]
  B --> C[&quot;sequence compression bottleneck&quot;]
  C --> D[&quot;attention over source tokens&quot;]
  D --> E[&quot;parallel attention-first modeling&quot;]`"
/>

## 핵심 흐름

| 시대 | 핵심 아이디어 | 해결한 것 | 남은 한계 |
| --- | --- | --- | --- |
| one-hot / n-gram | 텍스트를 기호 통계로 읽음 | 단순한 빈도 패턴 학습 | 의미 일반화가 약함 |
| embedding | 단어를 벡터 공간에 배치 | 비슷한 의미를 가까운 표현으로 묶음 | 문맥 전체 구조는 약함 |
| seq2seq | 입력 시퀀스를 읽고 출력 시퀀스를 생성 | 번역, 요약 같은 입력-출력 매핑 | 긴 입력을 하나의 벡터에 압축 |
| attention | 필요한 입력 위치를 직접 참고 | 고정 길이 context bottleneck 완화 | 여전히 RNN 순차 처리 제약 |
| Transformer | attention 중심 병렬 구조 | 긴 의존성, 병렬화, 표현력 | 계산량과 scale 관리가 중요 |

## one-hot과 n-gram

초기 NLP는 단어를 기호처럼 다뤘다. one-hot은 단어를 거대한 사전에서 한 칸만 켜진 벡터로 표현하고, n-gram은 주변 단어 통계를 세서 다음 단어를 예측하려 했다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;token id&quot;] --> B[&quot;one-hot vector&quot;]
  B --> C[&quot;sparse symbolic representation&quot;]
  C --> D[&quot;n-gram counting&quot;]`"
/>

이 접근의 장점은 단순함이다. 하지만 `king`과 `queen`, `dog`와 `puppy`처럼 의미가 가까운 단어끼리 가까운 표현을 만들기 어렵다.

## word2vec과 embedding

embedding은 "단어를 좌표로 보자"는 전환이다. 단어가 더 이상 단순 기호가 아니라, 의미 관계를 반영하는 밀집 벡터가 된다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;token id&quot;] --> B[&quot;embedding table lookup&quot;]
  B --> C[&quot;dense vector&quot;]
  C --> D[&quot;semantic neighborhood&quot;]`"
/>

논문에서는 보통 `E`, `W_e`, `embedding matrix` 같은 말로 등장한다. 여기서 봐야 할 것은 "토큰 하나가 벡터 하나로 바뀐다"는 점이다.

## seq2seq와 context bottleneck

seq2seq는 입력 문장을 읽고, 그 정보를 요약한 뒤, 출력 문장을 생성하는 방식이다. 문제는 긴 입력 전체를 하나의 고정 길이 context vector로 압축하려는 순간 정보가 새기 쉽다는 것이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;source tokens&quot;] --> B[&quot;encoder&quot;]
  B --> C[&quot;single context vector&quot;]
  C --> D[&quot;decoder&quot;]
  D --> E[&quot;target tokens&quot;]`"
/>

긴 문장에서 뒤쪽 정보가 약해지거나, 중요한 토큰을 놓치는 이유가 여기에 있다.

## attention이 왜 필요했는가

attention은 "입력 전체를 하나로 압축하지 말고, 출력 시점마다 필요한 입력 위치를 다시 보자"는 발상이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;encoder states&quot;] --> B[&quot;attention weights&quot;]
  C[&quot;current decoder state&quot;] --> B
  B --> D[&quot;context vector for this step&quot;]
  D --> E[&quot;next output token&quot;]`"
/>

이걸로 고정 길이 bottleneck은 크게 완화됐지만, 여전히 RNN 기반이면 순차 처리라는 병목은 남는다.

## 왜 Transformer로 갔는가

RNN은 토큰을 순서대로 처리한다. 그래서 길이가 길수록 병렬화가 어렵고, 멀리 떨어진 토큰 관계를 잡는 것도 비효율적이다. Transformer는 recurrent state 대신 attention을 중심에 놓아 이 병목을 크게 줄였다.

## 논문에서 자주 보이는 표현

| 표현 | 읽는 법 |
| --- | --- |
| `x_t` | 시점 `t`의 입력 토큰 또는 임베딩 |
| `h_t` | 시점 `t`의 hidden state |
| `c` | 입력 전체를 요약한 context vector |
| `Enc(x)` | 입력을 읽는 encoder 표현 |
| `Dec(y_<t, c)` | 이전 출력과 context를 바탕으로 다음 출력을 만드는 decoder |

## 논문을 읽을 때 먼저 볼 것

1. 입력을 sparse symbol로 보는가, dense vector로 보는가
2. 문맥을 하나의 벡터로 압축하는가, 여러 위치를 직접 참고하는가
3. 계산이 순차적인가, 병렬적인가
4. 긴 문맥에서 어떤 병목이 생기는가

## 다음 장에서 어떻게 이어지는가

이제 "왜 attention이 필요했는가"를 봤으니, 다음 장에서는 Transformer가 attention을 어떻게 블록 구조로 정리했는지 들어간다.

## 연습

1. one-hot과 embedding의 차이를 "의미 표현" 관점에서 설명해본다.
2. seq2seq의 고정 길이 context vector가 왜 긴 입력에서 약해지는지 적어본다.
3. attention이 context bottleneck을 어떻게 완화했는지 말로 정리해본다.

## 체크리스트

- one-hot과 embedding의 차이를 설명할 수 있는가
- seq2seq와 attention의 차이를 설명할 수 있는가
- Transformer가 어떤 병목을 줄였는지 설명할 수 있는가

다음 장: [Transformer](/transformers/)
