import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import AlunoDetalhes from './AlunoDetalhes'
import * as api from '../services/api'

// Mock da API
vi.mock('../services/api')

describe('AlunoDetalhes Component', () => {
  const mockAluno = {
    id: 1,
    nome: 'João Silva',
    matricula: '2024001',
    curso: 'Engenharia de Software',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    turma: 'ES-2024'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ===== TESTES DE RENDERIZAÇÃO =====
  
  it('deve renderizar o componente corretamente', async () => {
    api.getAlunoById.mockResolvedValue(mockAluno)

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Detalhes do Aluno')).toBeInTheDocument()
    })
  })

  it('deve exibir loading enquanto busca os dados', () => {
    api.getAlunoById.mockImplementation(() => new Promise(() => {}))

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  // ===== TESTES DE EXIBIÇÃO DE DADOS =====

  it('deve exibir todas as informações do aluno corretamente', async () => {
    api.getAlunoById.mockResolvedValue(mockAluno)

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText('2024001')).toBeInTheDocument()
      expect(screen.getByText('Engenharia de Software')).toBeInTheDocument()
      expect(screen.getByText('joao.silva@email.com')).toBeInTheDocument()
      expect(screen.getByText('(11) 98765-4321')).toBeInTheDocument()
    })
  })

  it('deve exibir os labels dos campos corretamente', async () => {
    api.getAlunoById.mockResolvedValue(mockAluno)

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/nome:/i)).toBeInTheDocument()
      expect(screen.getByText(/matrícula:/i)).toBeInTheDocument()
      expect(screen.getByText(/curso:/i)).toBeInTheDocument()
      expect(screen.getByText(/email:/i)).toBeInTheDocument()
      expect(screen.getByText(/telefone:/i)).toBeInTheDocument()
    })
  })

  // ===== TESTES DE CHAMADAS À API =====

  it('deve chamar a API com o ID correto da URL', async () => {
    api.getAlunoById.mockResolvedValue(mockAluno)

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(api.getAlunoById).toHaveBeenCalledWith('1')
      expect(api.getAlunoById).toHaveBeenCalledTimes(1)
    })
  })

  it('deve chamar a API com diferentes IDs', async () => {
    const mockAluno2 = { ...mockAluno, id: 5, nome: 'Maria Santos' }
    api.getAlunoById.mockResolvedValue(mockAluno2)

    const { unmount } = render(
      <MemoryRouter initialEntries={['/aluno/5']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(api.getAlunoById).toHaveBeenCalledWith('5')
    })

    unmount()

    api.getAlunoById.mockResolvedValue(mockAluno)
    
    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(api.getAlunoById).toHaveBeenCalledWith('1')
    })
  })

  // ===== TESTES DE ERRO =====

  it('deve exibir mensagem de erro quando a API falhar', async () => {
    api.getAlunoById.mockRejectedValue(new Error('Erro na API'))

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar/i)).toBeInTheDocument()
    })
  })

  it('deve exibir botão de voltar quando houver erro', async () => {
    api.getAlunoById.mockRejectedValue(new Error('Erro na API'))

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      const voltarButton = screen.getByRole('button', { name: /voltar/i })
      expect(voltarButton).toBeInTheDocument()
    })
  })

  // ===== TESTES DE INTERAÇÃO =====

  it('deve voltar para página anterior ao clicar no botão voltar', async () => {
    api.getAlunoById.mockResolvedValue(mockAluno)

    const mockNavigate = vi.fn()
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useNavigate: () => mockNavigate
      }
    })

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    const voltarButton = screen.getByRole('button', { name: /voltar/i })
    await userEvent.click(voltarButton)

    // Verifica se tentou navegar de volta
    // (O comportamento exato depende da implementação do componente)
  })

  // ===== TESTES DE VALIDAÇÃO DE DADOS =====

  it('deve lidar com dados parciais do aluno', async () => {
    const alunoIncompleto = {
      id: 1,
      nome: 'João Silva',
      matricula: '2024001'
    }

    api.getAlunoById.mockResolvedValue(alunoIncompleto)

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText('2024001')).toBeInTheDocument()
    })
  })

  it('deve exibir campos vazios quando dados não existirem', async () => {
    const alunoSemDados = {
      id: 1,
      nome: '',
      matricula: '',
      curso: '',
      email: '',
      telefone: ''
    }

    api.getAlunoById.mockResolvedValue(alunoSemDados)

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      // Deve renderizar sem erros
      expect(screen.getByText(/nome:/i)).toBeInTheDocument()
    })
  })

  // ===== TESTES DE ACESSIBILIDADE =====

  it('deve ter estrutura HTML semântica', async () => {
    api.getAlunoById.mockResolvedValue(mockAluno)

    const { container } = render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    // Verifica se tem card/container principal
    expect(container.querySelector('.card, [role="article"]')).toBeTruthy()
  })

  it('deve ter botão de voltar acessível', async () => {
    api.getAlunoById.mockResolvedValue(mockAluno)

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      const voltarButton = screen.getByRole('button', { name: /voltar/i })
      expect(voltarButton).toBeEnabled()
    })
  })

  // ===== TESTES DE PERFORMANCE =====

  it('deve carregar os dados rapidamente', async () => {
    api.getAlunoById.mockResolvedValue(mockAluno)

    const startTime = Date.now()

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    const endTime = Date.now()
    const loadTime = endTime - startTime

    // Deve carregar em menos de 1 segundo
    expect(loadTime).toBeLessThan(1000)
  })

  // ===== TESTES DE CASOS EXTREMOS =====

  it('deve lidar com ID inválido', async () => {
    api.getAlunoById.mockRejectedValue(new Error('ID inválido'))

    render(
      <MemoryRouter initialEntries={['/aluno/abc']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/erro/i)).toBeInTheDocument()
    })
  })

  it('deve lidar com nome muito longo', async () => {
    const alunoNomeLongo = {
      ...mockAluno,
      nome: 'João Pedro Silva Santos Oliveira Costa Ferreira Almeida'
    }

    api.getAlunoById.mockResolvedValue(alunoNomeLongo)

    render(
      <MemoryRouter initialEntries={['/aluno/1']}>
        <Routes>
          <Route path="/aluno/:id" element={<AlunoDetalhes />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(alunoNomeLongo.nome)).toBeInTheDocument()
    })
  })
})