# Backend (integrado ao frontend)

Esta pasta concentra a camada de backend do projeto, agora mantida dentro do
próprio Next.js (via [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
em `src/app/api/**/route.ts`, quando forem criados).

A organização segue a mesma divisão por vertical já usada em `src/services`
(que hoje consome uma API externa via axios). A ideia é que, conforme a
lógica de negócio for migrada para dentro deste projeto, cada módulo abaixo
passe a ser a fonte de verdade do backend, e os `*.service.ts` em
`src/services/<Modulo>` passem a chamar estas funções diretamente (ou os
route handlers passem a chamá-las).

## Estrutura

```
src/backend/
  modules/
    auth/
      auth.repository.ts
      auth.service.ts
      auth.types.ts
      index.ts
    dashboard/
      dashboard.repository.ts
      dashboard.service.ts
      dashboard.types.ts
      index.ts
    despesas/
      despesas.repository.ts
      despesas.service.ts
      despesas.types.ts
      index.ts
    receitas/
      ...
    assinaturas/
      ...
    parcelamentos/
      ...
    relatorios/
      ...
  shared/
    types.ts        (tipos comuns: paginação, filtros de data, etc.)
    database.ts      (ponto único de acesso a dados — a definir: ORM/driver)
    errors.ts         (erros de domínio compartilhados)
    index.ts
```

## Convenções

- **`*.repository.ts`** — acesso a dados (banco, cache, API externa). Não
  deve conter regra de negócio, apenas CRUD/queries.
- **`*.service.ts`** — orquestra repositórios e contém a regra de negócio do
  módulo. É o que os route handlers (ou os services do frontend) devem
  chamar. Os métodos ainda estão como esqueleto (`TODO`) nesta etapa.
- **`*.types.ts`** — entidades de domínio e DTOs (Create/Update/Query/List)
  do módulo. Espelham os tipos já usados em `src/services/<Modulo>` para
  evitar divergência de contrato enquanto a migração não ocorre.
- **`index.ts`** — barrel de exportação do módulo.

## O que NÃO está incluso nesta etapa

- Regra de negócio (os métodos de service são esqueletos com `TODO`).
- Implementação de acesso a dados real (o `database.ts` em `shared/` é um
  placeholder — decidir ORM/driver, ex.: Prisma, Drizzle, etc.).
- Autenticação/autorização dos route handlers.

## Próximos passos sugeridos

1. Decidir a camada de persistência (ORM/driver) em `shared/database.ts`.
2. Implementar os repositórios módulo a módulo.
3. Implementar a regra de negócio nos services.
4. Criar os route handlers em `src/app/api/**` consumindo os services.
5. Migrar `src/services/<Modulo>/*.service.ts` (frontend) para chamar os
   endpoints internos, substituindo a API externa.
