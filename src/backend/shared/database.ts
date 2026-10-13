// Placeholder do ponto único de acesso a dados.
//
// TODO: decidir e configurar a camada de persistência (ex.: Prisma, Drizzle,
// driver nativo do banco escolhido). Os repositórios de cada módulo devem
// importar o client a partir deste arquivo, para que exista um único lugar
// de configuração de conexão.

export type DatabaseClient = unknown;

export function getDatabaseClient(): DatabaseClient {
  throw new Error('Database client ainda não configurado. Ver src/backend/shared/database.ts');
}
