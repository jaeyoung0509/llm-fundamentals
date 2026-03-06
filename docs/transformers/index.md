# Transformer

## 왜 Transformer인가

RNN 계열은 긴 의존성을 다루기 어렵고 병렬화에도 한계가 있었다. attention은 "무엇을 얼마나 참고할 것인가"를 직접 계산하면서 이 병목을 크게 줄였다.

## 이 장에서 꼭 가져갈 한 문장

Transformer는 각 토큰이 다른 토큰을 얼마나 참고할지 직접 계산함으로써 언어 모델의 표현력을 크게 끌어올렸다.

## 핵심 블록

- 토큰 임베딩
- positional encoding
- self-attention
- feed-forward network
- residual connection과 layer normalization

## attention 흐름

<MermaidDiagram>
flowchart LR
  A["입력 토큰"] --> B["임베딩 + 위치 정보"]
  B --> C["Q, K, V 생성"]
  C --> D["유사도 계산"]
  D --> E["softmax 가중치"]
  E --> F["가중합된 표현"]
  F --> G["FFN + Residual"]
</MermaidDiagram>

## 최소 self-attention 구현 스케치

```python
scores = (query @ key.transpose(-2, -1)) / (d_k ** 0.5)
weights = torch.softmax(scores, dim=-1)
output = weights @ value
```

실행 가능한 예제:

- `examples/transformers/self_attention.py`

## 학습 포인트

- 왜 Q, K, V로 나누는가
- softmax가 attention 분포를 어떻게 만드는가
- multi-head가 왜 필요한가
- decoder-only 구조가 GPT와 어떻게 연결되는가

## 체크리스트

- attention이 RNN의 어떤 한계를 줄였는지 설명할 수 있는가
- Q, K, V의 역할을 직관적으로 말할 수 있는가
- decoder-only Transformer가 GPT와 어떻게 연결되는지 설명할 수 있는가

## 다음 장으로 어떻게 연결되는가

Transformer 구조를 이해하면, 이제 GPT 계열이 이 구조를 어떻게 확장해 GPT-3까지 갔는지 볼 수 있다.

다음 장: [LLM과 GPT-3](/llms/)
