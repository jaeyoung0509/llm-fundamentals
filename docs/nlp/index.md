# NLP와 Transformer 이전 배경

## 이 장에서 꼭 가져갈 한 문장

Transformer는 갑자기 하늘에서 떨어진 구조가 아니라, 기존 NLP 방법들의 병목을 해결하려는 흐름 속에서 등장했다.

## 왜 이 장이 필요한가

Transformer를 곧바로 배우면 "좋은 구조" 정도로만 이해하기 쉽다. 하지만 그 이전의 한계를 보면 왜 attention이 그렇게 큰 변화였는지 더 분명해진다.

## 시대 흐름 다이어그램

<MermaidDiagram>
flowchart LR
  A["n-gram / one-hot"] --> B["word2vec / embeddings"]
  B --> C["seq2seq"]
  C --> D["attention"]
  D --> E["Transformer"]
</MermaidDiagram>

## 1차 패스에서 볼 것

- 토큰화와 one-hot 표현
- word2vec과 embedding의 의미
- seq2seq와 attention의 등장 배경
- RNN 기반 접근의 병목

## 핵심 흐름

| 시대 | 핵심 아이디어 | 한계 |
| --- | --- | --- |
| one-hot / n-gram | 텍스트를 단순한 기호 통계로 다룸 | 의미 일반화가 약함 |
| word2vec / embedding | 단어를 벡터 공간으로 보냄 | 긴 문맥 처리가 약함 |
| seq2seq / attention | 입력-출력 관계를 더 유연하게 다룸 | 여전히 순차 처리의 제약이 큼 |
| Transformer | attention 중심 병렬 구조 | 계산량과 scale 문제가 새로 중요해짐 |

## 핵심 포인트

### one-hot과 n-gram

초기 접근은 단어를 기호처럼 다뤘다. 구현은 단순했지만, 비슷한 의미를 가진 단어끼리 가까운 표현을 만들기 어려웠다.

### word2vec과 embedding

단어를 벡터로 보내면서 "비슷한 의미는 비슷한 위치"라는 감각이 생겼다. 하지만 문맥 전체를 길게 보는 능력은 여전히 약했다.

### seq2seq와 attention

입력을 하나의 고정 길이 벡터로만 압축하려는 방식은 긴 문장에서 정보 손실이 컸다. attention은 필요한 부분을 더 직접 참고할 수 있게 만들었다.

### 왜 Transformer로 갔는가

RNN 계열은 순차 처리라 병렬화가 어렵고 긴 의존성도 힘들었다. Transformer는 attention을 중심에 놓고 이 병목을 크게 줄였다.

## 연습

1. one-hot과 embedding의 차이를 "표현력" 관점에서 설명해본다.
2. seq2seq가 긴 입력에서 왜 힘들었는지 적어본다.
3. Transformer가 병렬화에서 유리한 이유를 설명해본다.

## 체크리스트

- one-hot과 embedding의 차이를 설명할 수 있는가
- seq2seq가 왜 필요했는지 말할 수 있는가
- Transformer가 어떤 병목을 줄였는지 설명할 수 있는가

## 다음 장으로 어떻게 연결되는가

이제 기존 NLP의 한계를 봤으니, 다음 장에서 Transformer 블록 자체를 볼 준비가 된다.

다음 장: [Transformer](/transformers/)
