export type Receita = {
  id: string;
  descricao: string;
  valor: number;
  data: string; // ISO: YYYY-MM-DD
  categoria: "Salário" | "Freelance" | "Investimentos" | "Renda extra"|  "Outros";
  isRecorrente: boolean;
  observacao?: string;
};

export const receitasMock: Receita[] = [
  {
    id: "1",
    descricao: "Salário mensal",
    valor: 4500,
    data: "2025-11-01",
    categoria: "Salário",
    isRecorrente: true,
    observacao: "Pagamento empresa X",
  },
  {
    id: "2",
    descricao: "Freelance landing page",
    valor: 1200,
    data: "2025-11-10",
    categoria: "Freelance",
    isRecorrente: false,
  },
  {
    id: "3",
    descricao: "Dividendos ações",
    valor: 350,
    data: "2025-11-15",
    categoria: "Investimentos",
    isRecorrente: true,
  },
  {
    id: "4",
    descricao: "Venda de equipamento",
    valor: 800,
    data: "2025-11-20",
    categoria: "Outros",
    isRecorrente: false,
    observacao: "Notebook antigo",
  },
];
