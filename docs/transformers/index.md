# Transformer

## 왜 Transformer인가

RNN 계열은 긴 의존성을 다루기 어렵고 병렬화에도 한계가 있었다. attention은 "무엇을 얼마나 참고할 것인가"를 직접 계산하면서 이 병목을 크게 줄였다.

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

다음 장: [LLM과 GPT-3](/llms/)
