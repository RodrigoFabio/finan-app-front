/**
 * Design Tokens - Borders, Radius, Shadows
 * Sistema de bordas, raios e sombras
 */

export const borders = {
  // Larguras de borda
  width: {
    none: '0',
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },

  // Estilos de borda
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  },

  // Raio de borda
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',  // Totalmente arredondado
  },

  // Sombras
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
} as const;

export type BorderWidthKey = keyof typeof borders.width;
export type BorderStyleKey = keyof typeof borders.style;
export type BorderRadiusKey = keyof typeof borders.radius;
export type ShadowKey = keyof typeof borders.shadow;
