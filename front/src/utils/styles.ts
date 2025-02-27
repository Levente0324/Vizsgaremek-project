export const COLORS = {
  primary: {
    DEFAULT: "#AA4D2B",
    light: "#d9af9e",
    dark: "#943f21",
    gradient: "bg-gradient-to-tr from-[#d9af9e] to-[#78270a]",
  },
  background: {
    light: "#F1EFEA",
    card: "#FFFFFF",
    dark: "#1C1F20",
    accent: "#ffd6c8",
    gradient: "bg-gradient-to-b from-[#F1EFEA] to-[#ffd6c8]",
  },
  text: {
    dark: "#1C1F20",
    light: "#FFFFFF",
    muted: "#6B7280",
  },
  state: {
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },
};

export const SHADOWS = {
  sm: "shadow-sm",
  DEFAULT: "shadow",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

export const TRANSITIONS = {
  DEFAULT: "transition-all duration-300 ease-in-out",
  fast: "transition-all duration-150 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
};

export const ROUNDED = {
  DEFAULT: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-full",
};

export const BUTTON_STYLES = {
  primary: `bg-[${COLORS.primary.DEFAULT}] text-white hover:bg-[${COLORS.primary.dark}] hover:ring-2 hover:ring-[${COLORS.primary.dark}] ${TRANSITIONS.DEFAULT} ${ROUNDED.md}`,
  secondary: `bg-white text-[${COLORS.primary.DEFAULT}] border border-[${COLORS.primary.DEFAULT}] hover:bg-[${COLORS.primary.DEFAULT}] hover:text-white ${TRANSITIONS.DEFAULT} ${ROUNDED.md}`,
  ghost: `bg-transparent text-[${COLORS.primary.DEFAULT}] hover:bg-[${COLORS.primary.light}]/10 ${TRANSITIONS.DEFAULT} ${ROUNDED.md}`,
};
