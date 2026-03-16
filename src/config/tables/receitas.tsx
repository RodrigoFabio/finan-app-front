/**
 * Configuração da tabela de Receitas
 * Exemplo de como usar o DataTable genérico
 */

import { ColumnConfig } from '@/components/data-display/DataTable/DataTable.types';
import { formatCurrency, formatDate } from '@/components/data-display/DataTable/table-utils';
import { Receita } from '@/services/Receitas/receitas.mocks';
import { ROUTES, parseRoute } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export const receitasTableConfig: ColumnConfig<Receita>[] = [
  {
    key: 'descricao',
    label: 'Descrição',
    sortable: true,
    width: '30%',
  },
  {
    key: 'valor',
    label: 'Valor',
    format: (val) => formatCurrency(val),
    align: 'right',
    sortable: true,
    width: '15%',
  },
  {
    key: 'data',
    label: 'Data',
    format: (val) => formatDate(val),
    sortable: true,
    width: '15%',
  },
  {
    key: 'categoria',
    label: 'Categoria',
    sortable: true,
    width: '15%',
  },
  {
    key: 'isRecorrente',
    label: 'Recorrente',
    render: (value) => (value ? 'Sim' : 'Não'),
    align: 'center',
    width: '10%',
  },
  {
    key: 'actions',
    label: 'Ações',
    render: (_, row) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              router.push(parseRoute(ROUTES.RECEITAS.EDIT, { id: row.id }));
            }}
          >
            Editar
          </Button>
        </div>
      );
    },
    align: 'center',
    width: '15%',
  },
];
