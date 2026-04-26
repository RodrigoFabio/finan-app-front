'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  IconDashboard,
  IconReceitas,
  IconDespesas,
  IconParcelamentos,
  IconAssinaturas,
  IconRelatorios,
  IconChevronLeft,
  IconChevronRight,
} from '@/components/ui';

interface MenuItem {
  label: string;
  route: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Dashboard',     route: ROUTES.DASHBOARD,           Icon: IconDashboard },
  { label: 'Receitas',      route: ROUTES.RECEITAS.ROOT,       Icon: IconReceitas },
  { label: 'Despesas',      route: ROUTES.DESPESAS.ROOT,       Icon: IconDespesas },
  { label: 'Parcelamentos', route: ROUTES.PARCELAMENTOS.ROOT,  Icon: IconParcelamentos },
  { label: 'Assinaturas',   route: ROUTES.ASSINATURAS.ROOT,    Icon: IconAssinaturas },
  { label: 'Relatórios',    route: ROUTES.RELATORIOS.ROOT,     Icon: IconRelatorios },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse } = useSidebar();
  const { user, logout } = useAuth();

  const isItemActive = (route: string) => {
    if (route === '/dashboard') return pathname === '/dashboard' || pathname.startsWith('/dashboard/');
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  };

  return (
    <aside
      className={cn(
        'flex flex-col bg-neutral-900 transition-all duration-300 ease-in-out',
        'sticky top-0 h-screen flex-shrink-0 overflow-hidden',
        isCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Branding */}
      <div className={cn(
        'flex items-center h-16 px-3 border-b border-neutral-800',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 min-w-0">
            {/* Logo mark */}
            <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold font-display">AF</span>
            </div>
            <span className="font-semibold text-white text-sm truncate font-display tracking-wide">
              AppFinanças
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold font-display">AF</span>
          </div>
        )}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 transition-all duration-150 flex-shrink-0"
            title="Recolher sidebar"
          >
            <IconChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto p-2 pt-3">
        {MENU_ITEMS.map((item) => {
          const isActive = isItemActive(item.route);
          return (
            <Link
              key={item.route}
              href={item.route}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
                isActive
                  ? 'bg-primary-500/10 text-primary-300 border-l-2 border-primary-400 rounded-l-none pl-[10px]'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100 border-l-2 border-transparent'
              )}
            >
              <item.Icon
                className={cn(
                  'flex-shrink-0 transition-colors duration-150',
                  isActive ? 'text-primary-400' : 'text-neutral-500'
                )}
                size={18}
              />
              {!isCollapsed && (
                <span className={cn(
                  'text-sm truncate transition-colors duration-150',
                  isActive ? 'font-medium' : 'font-normal'
                )}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Expand button when collapsed */}
      {isCollapsed && (
        <div className="p-2 border-t border-neutral-800">
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center w-full h-9 rounded-lg text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 transition-all duration-150"
            title="Expandir sidebar"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      )}

      {/* User + Logout */}
      <div className={cn(
        'border-t border-neutral-800 p-2',
        isCollapsed ? 'flex flex-col items-center gap-1' : 'flex flex-col gap-1'
      )}>
        {!isCollapsed && user && (
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-neutral-300 truncate">{user.name}</p>
            <p className="text-xs text-neutral-500 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          title="Sair"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg w-full transition-all duration-150',
            'text-neutral-500 hover:bg-neutral-800 hover:text-error-400',
            isCollapsed && 'justify-center'
          )}
        >
          {/* Logout icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!isCollapsed && <span className="text-sm">Sair</span>}
        </button>
      </div>
    </aside>
  );
};
