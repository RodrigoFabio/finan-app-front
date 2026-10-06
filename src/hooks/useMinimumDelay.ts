import { useCallback } from 'react';

/**
 * Garante um tempo mínimo de exibição para estados de loading, evitando
 * "flashes" de skeleton quando a resposta do backend é muito rápida.
 *
 * Uso:
 * ```ts
 * const withMinimumDelay = useMinimumDelay(1000);
 * useEffect(() => {
 *   setLoading(true);
 *   withMinimumDelay(getDados()).then(setDados).finally(() => setLoading(false));
 * }, []);
 * ```
 */
export function useMinimumDelay(delayMs = 1000) {
  return useCallback(
    <T>(promise: Promise<T>): Promise<T> => {
      const wait = new Promise((resolve) => setTimeout(resolve, delayMs));
      return Promise.all([promise, wait]).then(([result]) => result);
    },
    [delayMs]
  );
}
