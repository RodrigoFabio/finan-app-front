/**
 * Centralização de Rotas
 * Todas as rotas da aplicação definidas em um único arquivo como constantes tipadas
 */

export const ROUTES = {
  LOGIN: "/",
  HOME: "/",
  DASHBOARD: "/dashboard",

  RECEITAS: {
    ROOT: "/receitas",
    LIST: "/receitas",
    CREATE: "/receitas/cadastrar",
    EDIT: "/receitas/editar/:id",
    VIEW: "/receitas/:id",
  },

  DESPESAS: {
    ROOT: "/despesas",
    LIST: "/despesas",
    CREATE: "/despesas/cadastrar",
    EDIT: "/despesas/editar/:id",
    VIEW: "/despesas/:id",
  },

  PARCELAMENTOS: {
    ROOT: "/parcelamentos",
    LIST: "/parcelamentos",
    CREATE: "/parcelamentos/cadastrar",
    EDIT: "/parcelamentos/editar/:id",
    VIEW: "/parcelamentos/:id",
  },

  ASSINATURAS: {
    ROOT: "/assinaturas",
    LIST: "/assinaturas",
    CREATE: "/assinaturas/cadastrar",
    EDIT: "/assinaturas/editar/:id",
    VIEW: "/assinaturas/:id",
  },

  RELATORIOS: {
    ROOT: "/relatorio",
    LIST: "/relatorio",
  },
} as const;

/**
 * Substitui parâmetros dinâmicos em rotas
 * @param route - Rota com parâmetros (ex: "/receitas/editar/:id")
 * @param params - Objeto com os valores dos parâmetros (ex: { id: "123" })
 * @returns Rota com parâmetros substituídos (ex: "/receitas/editar/123")
 * 
 * @example
 * parseRoute(ROUTES.RECEITAS.EDIT, { id: "123" })
 * // Retorna: "/receitas/editar/123"
 */
export function parseRoute(
  route: string,
  params: Record<string, string | number>
): string {
  let parsedRoute = route;
  
  Object.entries(params).forEach(([key, value]) => {
    parsedRoute = parsedRoute.replace(`:${key}`, String(value));
  });
  
  return parsedRoute;
}

/**
 * Type helper para obter todas as rotas disponíveis
 */
export type RoutePath = typeof ROUTES[keyof typeof ROUTES] | 
  typeof ROUTES[keyof typeof ROUTES][keyof typeof ROUTES[keyof typeof ROUTES]];

// Mantém compatibilidade com código existente (deprecated)
export const FINAN = "http://localhost:3000/";

export const ROUTESBASE = {
  RECEITA: ROUTES.RECEITAS.ROOT,
  DESPESA: ROUTES.DESPESAS.ROOT,
  DASHBOARD: ROUTES.DASHBOARD,
} as const;
