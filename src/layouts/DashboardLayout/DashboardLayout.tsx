"use client";

import { DashboardLayoutProps } from './DashboardLayout.types';
import { cn } from '@/utils/cn';

export default function DashboardLayout({
  title,
  sections,
  children,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn('flex flex-col gap-6 p-4 md:p-6', className)}>
      {title && (
        <h1 className="text-2xl font-semibold text-neutral-900 font-display tracking-tight">
          {title}
        </h1>
      )}

      {sections && sections.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 animate-stagger">
          {sections.map((section) => (
            <div
              key={section.id}
              className={cn(
                'rounded-xl border border-neutral-200 bg-white p-6 shadow-sm',
                section.className
              )}
            >
              {section.title && (
                <h2 className="mb-4 text-base font-semibold text-neutral-800">
                  {section.title}
                </h2>
              )}
              {section.content}
            </div>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
