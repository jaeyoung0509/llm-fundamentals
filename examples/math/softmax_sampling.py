import torch


def show_distribution(logits: torch.Tensor, temperature: float) -> None:
    scaled_logits = logits / temperature
    probs = torch.softmax(scaled_logits, dim=-1)
    sample = torch.multinomial(probs, num_samples=1).item()

    print(f"temperature={temperature:.1f}")
    print("probabilities =", probs.tolist())
    print("sampled index =", sample)
    print()


def main() -> None:
    torch.manual_seed(0)
    logits = torch.tensor([2.0, 1.0, 0.1])

    for temperature in (0.5, 1.0, 2.0):
        show_distribution(logits, temperature)


if __name__ == "__main__":
    main()
