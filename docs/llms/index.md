# LLM과 GPT-3

## 이 장의 질문

- GPT 계열은 Transformer에서 무엇을 가져왔는가
- GPT-3는 왜 중요한 이정표인가
- 오늘 시점에서 GPT-3를 배우는 이유는 무엇인가

## 이 장에서 꼭 가져갈 한 문장

GPT-3의 핵심은 "새 구조"보다 "같은 구조를 엄청난 규모로 밀어붙였을 때 어떤 능력이 나타나는가"를 보여준 데 있다.

## GPT-1에서 GPT-3로

| 모델 | 핵심 포인트 |
| --- | --- |
| GPT-1 | decoder-only Transformer의 가능성을 보여줌 |
| GPT-2 | 대규모 언어 모델의 생성 능력을 대중적으로 보여줌 |
| GPT-3 | scale과 in-context learning의 위력을 강하게 드러냄 |

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;GPT-1&quot;] --> B[&quot;GPT-2&quot;]
  B --> C[&quot;GPT-3&quot;]
  A --> D[&quot;decoder-only recipe&quot;]
  B --> E[&quot;larger scale&quot;]
  C --> F[&quot;in-context learning signal&quot;]`"
/>

## 꼭 이해해야 하는 것

- decoder-only autoregressive 구조
- next-token prediction 목표
- scale law의 직관
- few-shot과 zero-shot의 차이
- 한계: 비용, 환각, 제어 어려움

## autoregressive 생성 그림

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;context tokens&quot;] --> B[&quot;decoder-only Transformer&quot;]
  B --> C[&quot;next-token distribution&quot;]
  C --> D[&quot;pick one token&quot;]
  D --> E[&quot;append to context&quot;]
  E --> B`"
/>

## scale이 의미하는 것

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;same core architecture&quot;] --> B[&quot;more parameters&quot;]
  A --> C[&quot;more data&quot;]
  A --> D[&quot;more compute&quot;]
  B --> E[&quot;stronger few-shot behavior&quot;]
  C --> E
  D --> E`"
/>

## 실무 연결

GPT-3 자체가 최종 목적은 아니다. 중요한 것은 "큰 언어 모델이 왜 특정한 능력을 보이는가"를 이해하고, 그 위에서 평가와 운영을 설계할 수 있는 눈을 갖는 것이다.

## 체크리스트

- decoder-only 구조를 설명할 수 있는가
- few-shot과 zero-shot의 차이를 설명할 수 있는가
- GPT-3가 왜 중요한 이정표인지 말할 수 있는가

## 다음 장으로 어떻게 연결되는가

이제 GPT-3의 구조와 의미를 이해했다면, 다음은 실제로 LLM을 다룰 때 필요한 컨텍스트, 토큰, 샘플링, 평가 감각으로 넘어간다.

다음 장: [LLM 실전 기본기](/llm-basics/)
