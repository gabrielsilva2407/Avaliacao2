import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getAlunos, getAlunoById } from "../services/api";

// Mock do axios
vi.mock("axios");

describe("API Service - Testes de Alunos", () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    vi.clearAllMocks();
  });

  describe("getAlunos - Buscar todos os alunos", () => {
    it("deve retornar uma lista de alunos com sucesso", async () => {
      const mockAlunos = [
        { id: 1, nome: "João Silva", curso: "Engenharia", matricula: "2024001" },
        { id: 2, nome: "Maria Santos", curso: "Medicina", matricula: "2024002" },
        { id: 3, nome: "Pedro Costa", curso: "Direito", matricula: "2024003" },
      ];

      axios.get.mockResolvedValue({ data: mockAlunos });

      const result = await getAlunos();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/alunos");
      expect(result).toEqual(mockAlunos);
      expect(result).toHaveLength(3);
    });

    it("deve retornar array vazio quando não houver alunos", async () => {
      axios.get.mockResolvedValue({ data: [] });

      const result = await getAlunos();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("deve lançar erro quando a API falhar", async () => {
      const errorMessage = "Erro de conexão com o servidor";
      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getAlunos()).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro 404 quando endpoint não existir", async () => {
      axios.get.mockRejectedValue({
        response: { status: 404, statusText: "Not Found" }
      });

      await expect(getAlunos()).rejects.toBeDefined();
    });

    it("deve lançar erro 500 em caso de erro no servidor", async () => {
      axios.get.mockRejectedValue({
        response: { status: 500, statusText: "Internal Server Error" }
      });

      await expect(getAlunos()).rejects.toBeDefined();
    });
  });

  describe("getAlunoById - Buscar aluno por ID", () => {
    it("deve retornar os dados de um aluno específico", async () => {
      const mockAluno = {
        id: 1,
        nome: "João Silva",
        curso: "Engenharia",
        matricula: "2024001",
        email: "joao@email.com",
        telefone: "(11) 98765-4321"
      };

      axios.get.mockResolvedValue({ data: mockAluno });

      const result = await getAlunoById(1);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/alunos/1");
      expect(result).toEqual(mockAluno);
      expect(result.id).toBe(1);
      expect(result.nome).toBe("João Silva");
    });

    it("deve buscar aluno com diferentes IDs", async () => {
      const mockAluno1 = { id: 5, nome: "Carlos", curso: "TI" };
      const mockAluno2 = { id: 10, nome: "Ana", curso: "ADM" };

      axios.get.mockResolvedValueOnce({ data: mockAluno1 });
      axios.get.mockResolvedValueOnce({ data: mockAluno2 });

      const result1 = await getAlunoById(5);
      const result2 = await getAlunoById(10);

      expect(result1.id).toBe(5);
      expect(result2.id).toBe(10);
      expect(axios.get).toHaveBeenCalledTimes(2);
    });

    it("deve lançar erro quando ID não existir", async () => {
      axios.get.mockRejectedValue({
        response: { status: 404, statusText: "Aluno não encontrado" }
      });

      await expect(getAlunoById(999)).rejects.toBeDefined();
    });

    it("deve lançar erro quando ID for inválido", async () => {
      axios.get.mockRejectedValue(new Error("ID inválido"));

      await expect(getAlunoById("abc")).rejects.toThrow("ID inválido");
    });

    it("deve lançar erro quando ocorrer timeout", async () => {
      axios.get.mockRejectedValue({
        code: "ECONNABORTED",
        message: "timeout exceeded"
      });

      await expect(getAlunoById(1)).rejects.toBeDefined();
    });
  });

  describe("Testes de integração", () => {
    it("deve buscar todos os alunos e depois buscar um específico", async () => {
      const mockAlunos = [
        { id: 1, nome: "João" },
        { id: 2, nome: "Maria" },
      ];
      const mockAluno = { id: 1, nome: "João", curso: "TI" };

      axios.get
        .mockResolvedValueOnce({ data: mockAlunos })
        .mockResolvedValueOnce({ data: mockAluno });

      const alunos = await getAlunos();
      const primeiroAluno = await getAlunoById(alunos[0].id);

      expect(alunos).toHaveLength(2);
      expect(primeiroAluno.nome).toBe("João");
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  describe("Testes de performance", () => {
    it("deve completar a requisição em menos de 5 segundos", async () => {
      const mockData = [{ id: 1, nome: "Teste" }];
      axios.get.mockResolvedValue({ data: mockData });

      const startTime = Date.now();
      await getAlunos();
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(5000);
    });
  });

  describe("Testes de validação de dados", () => {
    it("deve retornar alunos com estrutura correta", async () => {
      const mockAlunos = [
        { id: 1, nome: "João", curso: "TI", matricula: "001" }
      ];

      axios.get.mockResolvedValue({ data: mockAlunos });

      const result = await getAlunos();

      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("nome");
      expect(result[0]).toHaveProperty("curso");
      expect(result[0]).toHaveProperty("matricula");
    });

    it("deve retornar aluno com todos os campos necessários", async () => {
      const mockAluno = {
        id: 1,
        nome: "João",
        curso: "TI",
        matricula: "001",
        email: "joao@email.com",
        telefone: "11999999999"
      };

      axios.get.mockResolvedValue({ data: mockAluno });

      const result = await getAlunoById(1);

      expect(typeof result.id).toBe("number");
      expect(typeof result.nome).toBe("string");
      expect(typeof result.curso).toBe("string");
      expect(result.nome).not.toBe("");
      expect(result.matricula).not.toBe("");
    });
  });
});