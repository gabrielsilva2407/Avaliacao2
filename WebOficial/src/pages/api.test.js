import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { Get, ById } from "./api";

vi.mock("axios");

describe("Get function", () => {
  it("deve chamar o endpoint de alunos e executar setInfo", async () => {
    const mockData = [
      { id: 1, nome: "João" },
      { id: 2, nome: "Maria" },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    const setInfo = vi.fn();

    const result = await Get(setInfo);

    expect(axios.get).toHaveBeenCalledWith(
      "https://proweb.leoproti.com.br/alunos",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    expect(setInfo).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  it("deve lançar erro quando axios falhar", async () => {
    axios.get.mockRejectedValue(new Error("Erro API"));

    const setInfo = vi.fn();

    await expect(Get(setInfo)).rejects.toThrow("Erro API");

    expect(setInfo).not.toHaveBeenCalled();
  });
});