import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renderiza o nome do produto", () => {
    render(
      <Card
        nome="Produto Teste"
        codigo="123"
        imagem=""
        descricao="Descrição teste"
        preco={10}
        isFavorito={false}
        onToggleFavorito={() => {}}
      />
    );

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
  });
});