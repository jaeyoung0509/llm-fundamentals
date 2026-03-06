import torch
from torch import nn
from torch.utils.data import DataLoader, TensorDataset


def main() -> None:
    torch.manual_seed(42)

    x = torch.linspace(-1, 1, 200).unsqueeze(1)
    noise = torch.randn_like(x) * 0.1
    y = 3.0 * x + 0.7 + noise

    dataset = TensorDataset(x, y)
    dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

    model = nn.Linear(1, 1)
    optimizer = torch.optim.SGD(model.parameters(), lr=0.1)
    loss_fn = nn.MSELoss()

    for epoch in range(200):
        for features, targets in dataloader:
            optimizer.zero_grad()
            predictions = model(features)
            loss = loss_fn(predictions, targets)
            loss.backward()
            optimizer.step()

        if epoch % 50 == 0 or epoch == 199:
            weight = model.weight.item()
            bias = model.bias.item()
            print(
                f"epoch={epoch:03d} loss={loss.item():.4f} "
                f"weight={weight:.3f} bias={bias:.3f}"
            )


if __name__ == "__main__":
    main()
