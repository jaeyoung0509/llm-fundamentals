# LLM과 GPT-3

## 왜 이 장이 필요한가

GPT-3는 단순히 유명한 모델 이름이 아니라, decoder-only Transformer를 scale 관점에서 읽는 분기점이다. 이 장의 목적은 "GPT-3가 대단하다"가 아니라, 어떤 구조와 학습 목표가 어떤 능력으로 이어졌는지를 이해하는 것이다.

## 이 장에서 꼭 가져갈 한 문장

GPT-3의 핵심은 새 구조보다, 같은 decoder-only 구조를 더 큰 파라미터, 더 많은 데이터, 더 많은 계산으로 밀어붙였을 때 나타나는 능력 변화다.

## GPT-1에서 GPT-3로

| 모델 | 핵심 포인트 |
| --- | --- |
| GPT-1 | decoder-only Transformer의 가능성을 보여줌 |
| GPT-2 | 대규모 생성 모델의 잠재력을 더 분명하게 드러냄 |
| GPT-3 | scale과 in-context learning의 위력을 강하게 드러냄 |

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;GPT-1&quot;] --> B[&quot;GPT-2&quot;]
  B --> C[&quot;GPT-3&quot;]
  A --> D[&quot;decoder-only recipe&quot;]
  B --> E[&quot;larger scale&quot;]
  C --> F[&quot;in-context learning signal&quot;]`"
/>

## 핵심 구조

- decoder-only autoregressive Transformer
- next-token prediction objective
- 긴 문맥을 앞 토큰 조건부 분포로 읽는 방식
- scale에 따라 더 강해지는 few-shot / zero-shot 행동

## autoregressive 생성 그림

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;context tokens&quot;] --> B[&quot;decoder-only Transformer&quot;]
  B --> C[&quot;next-token distribution&quot;]
  C --> D[&quot;pick one token&quot;]
  D --> E[&quot;append to context&quot;]
  E --> B`"
/>

## 학습 목표는 무엇인가

언어모델은 대체로 "다음 토큰의 확률을 잘 맞히자"는 목표로 학습된다.

```text
L = -sum_t log p_theta(y_t | y_<t, x)
```

이 식을 읽을 때는 아래처럼 보면 된다.

- `theta`: 모델 전체 파라미터
- `y_<t`: 현재 시점 이전까지의 문맥
- `y_t`: 지금 맞혀야 할 정답 토큰
- `p_theta(...)`: 모델이 주는 다음 토큰 확률
- `-log`: 정답 확률이 낮을수록 손실이 커지게 만드는 장치

즉, GPT 계열은 토큰 하나씩 정답 확률을 높이는 방식으로 학습된다.

## 논문에서 이렇게 읽는다

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;context y_<t and x&quot;] --> B[&quot;model predicts p_theta(y_t | context)&quot;]
  B --> C[&quot;compare with correct token y_t&quot;]
  C --> D[&quot;take negative log&quot;]
  D --> E[&quot;sum over positions&quot;]
  E --> F[&quot;training loss&quot;]`"
/>

논문에서 `p_theta(y_t | y_<t, x)`가 보이면 "문맥을 보고 다음 토큰 분포를 예측한다"로 먼저 읽으면 된다.

## context window와 in-context learning

GPT-3를 이야기할 때 중요한 것은 파라미터 수만이 아니다. 모델이 한 번에 볼 수 있는 문맥 안에서 예시와 지시를 읽고, 그 패턴을 따라가는 행동이 강하게 드러났다는 점이 중요하다.

- zero-shot: 예시 없이 지시만 줌
- one-shot: 예시 하나를 줌
- few-shot: 예시 몇 개를 문맥 안에 같이 넣음

이때 모델은 "파라미터를 새로 학습"하는 것이 아니라, 주어진 문맥 안의 패턴을 따라 다음 토큰을 예측한다.

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

scale의 핵심은 "새 알고리즘"보다 "같은 알고리즘을 더 크게 밀면 어떤 능력이 나타나는가"다.

## GPT-3를 배울 때 함께 봐야 할 한계

- 비용이 크다
- hallucination을 막지 못한다
- 제어와 정렬이 어렵다
- 더 큰 모델이 항상 더 좋은 제품을 뜻하지는 않는다

즉, GPT-3는 종착점이 아니라 이후 평가, RLHF, AI Engineering으로 이어지는 중간 이정표다.

## 논문에서 자주 보이는 표현

| 표현 | 읽는 법 |
| --- | --- |
| `p_theta(y_t | y_<t)` | 이전 토큰을 보고 다음 토큰 확률을 예측 |
| `context window` | 한 번에 볼 수 있는 문맥 범위 |
| `few-shot prompting` | 문맥에 예시를 넣어 패턴을 유도 |
| `scale` | 파라미터, 데이터, 계산을 함께 키우는 축 |

## 논문을 읽을 때 먼저 볼 것

1. decoder-only 구조인지
2. 학습 목표가 next-token prediction인지
3. context window가 얼마인지
4. few-shot이나 in-context learning을 어떻게 측정하는지
5. 한계를 무엇으로 보고 있는지

## 실무 연결

GPT-3 자체가 최종 목적은 아니다. 중요한 것은 큰 언어 모델이 왜 특정한 능력을 보이는지 이해하고, 그 위에서 평가와 운영을 설계할 수 있는 눈을 갖는 것이다.

## 연습

1. `p_theta(y_t | y_<t, x)`를 자연어로 풀어 설명해본다.
2. few-shot과 fine-tuning의 차이를 문맥 사용 관점에서 적어본다.
3. GPT-3의 scale이 왜 중요했는지 한 문단으로 설명해본다.

## 체크리스트

- decoder-only 구조를 설명할 수 있는가
- next-token prediction 목적을 설명할 수 있는가
- context window와 in-context learning을 설명할 수 있는가
- GPT-3의 중요성과 한계를 함께 말할 수 있는가

## 다음 장으로 어떻게 연결되는가

이제 GPT-3의 구조와 의미를 이해했다면, 다음은 실제 LLM을 다룰 때 필요한 토큰, 컨텍스트, 샘플링, 평가 감각으로 넘어간다.

다음 장: [LLM 실전 기본기](/llm-basics/)
