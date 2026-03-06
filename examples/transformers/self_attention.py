import math

import torch


def scaled_dot_product_attention(
    query: torch.Tensor,
    key: torch.Tensor,
    value: torch.Tensor,
) -> tuple[torch.Tensor, torch.Tensor]:
    d_k = query.size(-1)
    scores = query @ key.transpose(-2, -1) / math.sqrt(d_k)
    weights = torch.softmax(scores, dim=-1)
    output = weights @ value
    return output, weights


def main() -> None:
    torch.manual_seed(7)

    tokens = torch.randn(1, 4, 8)
    projection = torch.randn(8, 8)

    query = tokens @ projection
    key = tokens @ projection
    value = tokens @ projection

    output, weights = scaled_dot_product_attention(query, key, value)

    print("attention weights shape:", weights.shape)
    print(weights[0])
    print("output shape:", output.shape)


if __name__ == "__main__":
    main()
