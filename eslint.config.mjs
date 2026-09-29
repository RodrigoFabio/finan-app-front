import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**'],
  },
  {
    rules: {
      // Este projeto ainda não usa o React Compiler, e o padrão
      // setLoading(true) no início de um useEffect de fetch é idiomático
      // e correto aqui — mantemos como aviso em vez de erro bloqueante.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default config;
