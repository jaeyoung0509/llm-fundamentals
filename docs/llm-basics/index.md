# LLM 실전 기본기

## 왜 이 장이 필요한가

모델 구조를 이해하는 것과 실제로 LLM을 잘 다루는 것은 다른 일이다. 실전에서는 토큰 길이, 컨텍스트 윈도우, 샘플링 설정, 프롬프트 구조, 평가 방식이 결과를 크게 바꾼다.

## 이 장에서 꼭 가져갈 한 문장

LLM 실전 감각은 "좋은 모델"을 아는 것이 아니라, 입력-로짓-샘플링-평가 흐름을 제어하는 데서 나온다.

## 실전 제어판

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;입력 프롬프트&quot;] --> B[&quot;토큰화&quot;]
  B --> C[&quot;컨텍스트 윈도우&quot;]
  C --> D[&quot;모델 출력 로짓&quot;]
  D --> E[&quot;temperature / top-k / top-p&quot;]
  E --> F[&quot;최종 생성&quot;]
  F --> G[&quot;평가와 개선&quot;]`"
/>

## 토큰 길이와 비용

LLM은 글자 수가 아니라 토큰 단위로 입력과 출력을 처리한다. 그래서 토큰 길이는 아래와 직접 연결된다.

- 입력 비용
- 출력 비용
- latency
- context window 소모량

토큰 길이가 길다고 항상 좋은 것은 아니다. 관련 없는 문맥이 너무 많이 들어오면 중요한 정보가 희석되고, retrieval이나 prompt 구성도 흐려질 수 있다.

## context window를 어떻게 읽을까

context window는 모델이 한 번에 참고할 수 있는 작업 메모리 같은 것이다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;system prompt&quot;] --> D[&quot;context window&quot;]
  B[&quot;user input&quot;] --> D
  C[&quot;retrieved context / examples&quot;] --> D
  D --> E[&quot;model generation&quot;]`"
/>

실전에서는 아래를 같이 본다.

- system prompt가 얼마나 차지하는가
- 예시 몇 개를 넣을 수 있는가
- retrieval 결과가 context를 얼마나 잡아먹는가
- 긴 문맥이 실제 품질 향상으로 이어지는가

## 샘플링 파라미터를 어떻게 해석할까

모델은 보통 로짓을 낸 뒤, 그 분포에서 최종 토큰을 선택한다. 이때 temperature, top-k, top-p는 "어디까지 후보를 인정할 것인가"를 조정한다.

| 파라미터 | 보통 어떤 효과가 있는가 |
| --- | --- |
| temperature | 높을수록 더 다양한 출력을 만들기 쉽다 |
| top-k | 상위 k개 후보 안에서만 고르게 한다 |
| top-p | 누적 확률이 p가 될 때까지의 후보 안에서 고르게 한다 |

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;temperature adjust&quot;]
  B --> C[&quot;softmax distribution&quot;]
  C --> D[&quot;top-k / top-p filter&quot;]
  D --> E[&quot;sample next token&quot;]`"
/>

## argmax와 sampling

- argmax: 가장 높은 확률 하나를 고른다
- sampling: 분포를 따라 뽑는다

argmax는 안정적이지만 반복적일 수 있고, sampling은 다양하지만 산만해질 수 있다. 실전에서는 작업 종류에 따라 다르게 선택한다.

## 프롬프트 구조를 왜 분리해서 써야 할까

좋은 프롬프트는 "길게 쓰는 것"이 아니라, 역할과 제약과 출력 형식을 분리해서 쓰는 것이다.

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;role / task&quot;] --> D[&quot;structured prompt&quot;]
  B[&quot;input data&quot;] --> D
  C[&quot;constraints / output format&quot;] --> D
  D --> E[&quot;model output&quot;]`"
/>

실전 패턴은 보통 아래처럼 나뉜다.

- 역할 지정
- 입력 데이터 구역 분리
- 제약 조건 명시
- 원하는 출력 형식 명시

## hallucination을 어떻게 읽어야 할까

hallucination은 "모델이 거짓말을 한다"는 도덕적 설명보다, 주어진 문맥과 외부 근거 없이도 그럴듯한 확률 높은 출력을 만들 수 있다는 문제로 보는 편이 낫다.

그래서 아래를 같이 점검해야 한다.

- grounding이 필요한 작업인가
- retrieval이나 tool이 필요한가
- 정답 검증 단계를 붙였는가

## 평가를 왜 따로 해야 하는가

좋아 보이는 샘플 몇 개만으로는 시스템 품질을 판단하기 어렵다. 최소한 아래 셋은 분리해서 생각해야 한다.

- task-level 성능: 정확도, 성공률, 근거 포함 여부
- human-perceived quality: 자연스러움, 유용성, 일관성
- system-level 성능: 비용, latency, 실패 패턴

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;prompt / model change&quot;] --> B[&quot;sample outputs&quot;]
  B --> C[&quot;task metrics&quot;]
  B --> D[&quot;human review&quot;]
  B --> E[&quot;cost / latency checks&quot;]
  C --> F[&quot;go / no-go decision&quot;]
  D --> F
  E --> F`"
/>

## 논문과 실무에서 자주 보이는 표현

| 표현 | 읽는 법 |
| --- | --- |
| `context window` | 모델이 한 번에 참고 가능한 문맥 길이 |
| `temperature` | 분포를 더 날카롭게 혹은 평평하게 만드는 계수 |
| `top-k`, `top-p` | sampling 후보를 제한하는 규칙 |
| `hallucination` | 근거 없이 그럴듯한 출력을 만드는 실패 |
| `eval set` | 품질 비교를 위한 고정 테스트셋 |

## 논문을 읽을 때 먼저 볼 것

1. 출력 품질을 어떤 지표로 측정하는가
2. sampling 설정이 고정인지 조정 가능한지
3. context length가 성능에 어떤 영향을 주는가
4. hallucination이나 factuality를 어떻게 다루는가

## 코드 연결

실전 구현에서는 아래를 바로 확인하는 습관이 좋다.

- 입력이 실제 몇 토큰인지
- retrieval 결과가 context를 얼마나 차지하는지
- 샘플링 설정이 어디서 바뀌는지
- 출력 평가가 로그로 남는지

## 예제 연결

- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py): loss와 update 흐름 복습
- [self_attention.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/transformers/self_attention.py): logits와 attention 흐름 복습

## 연습

1. temperature와 top-p가 각각 무엇을 조절하는지 설명해본다.
2. 긴 컨텍스트가 항상 좋은 것은 아닌 이유를 적어본다.
3. "프롬프트를 잘 썼다"를 평가로 바꾸려면 무엇이 더 필요한지 적어본다.

## 체크리스트

- 토큰 길이가 비용과 성능에 어떤 영향을 주는지 설명할 수 있는가
- context window가 품질과 비용에 어떻게 연결되는지 설명할 수 있는가
- temperature, top-k, top-p 차이를 설명할 수 있는가
- hallucination을 줄이기 위해 무엇을 점검해야 하는지 말할 수 있는가

## 다음 장으로 어떻게 연결되는가

실전 기본기를 잡았다면, 이제 사람 선호를 학습시키는 RLHF와 강화학습 관점으로 넘어갈 수 있다.

다음 장: [강화학습과 RLHF](/rl/)
