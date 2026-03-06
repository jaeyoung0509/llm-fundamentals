import torch


def main() -> None:
    w = torch.tensor([2.0], requires_grad=True)
    x = torch.tensor([3.0])
    b = torch.tensor([1.0], requires_grad=True)

    z = w * x + b
    loss = z.pow(2).sum()
    loss.backward()

    print("z =", z.item())
    print("loss =", loss.item())
    print("dL/dw =", w.grad.item())
    print("dL/db =", b.grad.item())


if __name__ == "__main__":
    main()
