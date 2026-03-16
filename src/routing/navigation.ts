/**
 * Navigation Utilities
 * Utilitários para navegação tipada usando Next.js router
 */

"use client";

import { useRouter, usePathname } from 'next/navigation';
import { ROUTES, parseRoute } from '../constants/routes';

/**
 * Hook customizado para navegação tipada
 * 
 * @example
 * const nav = useAppNavigation();
 * nav.goToReceitas();
 * nav.goToEditReceita("123");
 */
export function useAppNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return {
    // Navegação geral
    goToHome: () => router.push(ROUTES.HOME),
    goToDashboard: () => router.push(ROUTES.DASHBOARD),
    
    // Receitas
    goToReceitas: () => router.push(ROUTES.RECEITAS.LIST),
    goToCreateReceita: () => router.push(ROUTES.RECEITAS.CREATE),
    goToEditReceita: (id: string | number) => 
      router.push(parseRoute(ROUTES.RECEITAS.EDIT, { id })),
    goToViewReceita: (id: string | number) => 
      router.push(parseRoute(ROUTES.RECEITAS.VIEW, { id })),
    
    // Despesas
    goToDespesas: () => router.push(ROUTES.DESPESAS.LIST),
    goToCreateDespesa: () => router.push(ROUTES.DESPESAS.CREATE),
    goToEditDespesa: (id: string | number) => 
      router.push(parseRoute(ROUTES.DESPESAS.EDIT, { id })),
    goToViewDespesa: (id: string | number) => 
      router.push(parseRoute(ROUTES.DESPESAS.VIEW, { id })),
    
    // Parcelamentos
    goToParcelamentos: () => router.push(ROUTES.PARCELAMENTOS.LIST),
    goToCreateParcelamento: () => router.push(ROUTES.PARCELAMENTOS.CREATE),
    goToEditParcelamento: (id: string | number) => 
      router.push(parseRoute(ROUTES.PARCELAMENTOS.EDIT, { id })),
    goToViewParcelamento: (id: string | number) => 
      router.push(parseRoute(ROUTES.PARCELAMENTOS.VIEW, { id })),
    
    // Assinaturas
    goToAssinaturas: () => router.push(ROUTES.ASSINATURAS.LIST),
    goToCreateAssinatura: () => router.push(ROUTES.ASSINATURAS.CREATE),
    goToEditAssinatura: (id: string | number) => 
      router.push(parseRoute(ROUTES.ASSINATURAS.EDIT, { id })),
    goToViewAssinatura: (id: string | number) => 
      router.push(parseRoute(ROUTES.ASSINATURAS.VIEW, { id })),
    
    // Relatórios
    goToRelatorios: () => router.push(ROUTES.RELATORIOS.LIST),
    
    // Utilitários
    goBack: () => router.back(),
    goForward: () => router.forward(),
    refresh: () => router.refresh(),
    replace: (path: string) => router.replace(path),
    pathname,
  };
}

/**
 * Função helper para navegação programática (sem hook)
 * Útil para uso em callbacks e handlers
 */
export function navigateTo(path: string) {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
}
