export const defaultTheme = {
  colors: {
    'primary-dark': '#2C73EB',
    'primary-light': '#1565D8',

    'base-title': '#000',
    'base-subtitle': '#696F79',
    'base-text': '#494949',
    'base-alt-text': '#8692A6',

    warning: '#FC4737',
    success: '#1B873F',

    white: '#fff',
  },

  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '1050px',
    xl: '1291px',
  },
} as const

export default defaultTheme
