/**
 * Design Tokens - States
 * Estados de interação e feedback visual
 */

import { colors } from './colors';

export const states = {
  // Estados de hover
  hover: {
    primary: {
      background: colors.primary[600],
      text: colors.primary[700],
      border: colors.primary[600],
    },
    secondary: {
      background: colors.secondary[600],
      text: colors.secondary[700],
      border: colors.secondary[600],
    },
    neutral: {
      background: colors.neutral[100],
      text: colors.neutral[900],
      border: colors.neutral[300],
    },
  },

  // Estados de focus
  focus: {
    ring: {
      color: colors.primary[500],
      width: '2px',
      offset: '2px',
    },
    outline: 'none',
  },

  // Estados de active
  active: {
    primary: {
      background: colors.primary[700],
      text: colors.primary[50],
      border: colors.primary[700],
    },
    secondary: {
      background: colors.secondary[700],
      text: colors.secondary[50],
      border: colors.secondary[700],
    },
  },

  // Estados de disabled
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: colors.neutral[200],
    text: colors.text.disabled,
    border: colors.neutral[300],
  },

  // Estados de loading
  loading: {
    opacity: 0.7,
    cursor: 'wait',
  },

  // Estados de erro
  error: {
    background: colors.semantic.error[50],
    text: colors.semantic.error[700],
    border: colors.semantic.error[500],
    icon: colors.semantic.error[500],
  },

  // Estados de sucesso
  success: {
    background: colors.semantic.success[50],
    text: colors.semantic.success[700],
    border: colors.semantic.success[500],
    icon: colors.semantic.success[500],
  },

  // Estados de warning
  warning: {
    background: colors.semantic.warning[50],
    text: colors.semantic.warning[700],
    border: colors.semantic.warning[500],
    icon: colors.semantic.warning[500],
  },

  // Estados de info
  info: {
    background: colors.semantic.info[50],
    text: colors.semantic.info[700],
    border: colors.semantic.info[500],
    icon: colors.semantic.info[500],
  },
} as const;

export type StateKey = keyof typeof states;
