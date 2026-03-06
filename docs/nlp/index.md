# NLP와 Transformer 이전 배경

## 이 장에서 꼭 가져갈 한 문장

Transformer는 갑자기 하늘에서 떨어진 구조가 아니라, 기존 NLP 방법들의 병목을 해결하려는 흐름 속에서 등장했다.

## 왜 이 장이 필요한가

Transformer를 곧바로 배우면 "좋은 구조" 정도로만 이해하기 쉽다. 하지만 그 이전의 한계를 보면 왜 attention이 그렇게 큰 변화였는지 더 분명해진다.

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

## 체크리스트

- one-hot과 embedding의 차이를 설명할 수 있는가
- seq2seq가 왜 필요했는지 말할 수 있는가
- Transformer가 어떤 병목을 줄였는지 설명할 수 있는가

## 다음 장으로 어떻게 연결되는가

이제 기존 NLP의 한계를 봤으니, 다음 장에서 Transformer 블록 자체를 볼 준비가 된다.

다음 장: [Transformer](/transformers/)

