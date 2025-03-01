export const COLORS = {
  primary: {
    DEFAULT: "#AA4D2B",
    light: "#d9af9e",
    dark: "#943f21",
    hover: "#8a3a1e",
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
    accent: "#AA4D2B",
  },
  state: {
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },
};

export const TYPOGRAPHY = {
  heading: {
    h1: "text-4xl md:text-5xl font-bold",
    h2: "text-3xl md:text-4xl font-semibold",
    h3: "text-2xl md:text-3xl font-medium",
    h4: "text-xl md:text-2xl font-medium",
    gradient:
      "bg-gradient-to-tr from-[#d9af9e] to-[#78270a] text-transparent bg-clip-text",
  },
  body: {
    DEFAULT: "text-base text-[#1C1F20]",
    large: "text-lg text-[#1C1F20]",
    small: "text-sm text-[#1C1F20]",
    muted: "text-base text-gray-600",
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
  hover: "hover:-translate-y-1 hover:shadow-lg transition-all duration-300",
};

export const ROUNDED = {
  DEFAULT: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-[40px]",
  full: "rounded-full",
};

export const BUTTON_STYLES = {
  primary: `bg-[${COLORS.primary.DEFAULT}] text-white hover:bg-[${COLORS.primary.dark}] ${SHADOWS.md} hover:${SHADOWS.lg} ${TRANSITIONS.DEFAULT} ${ROUNDED.md}`,
  secondary: `bg-white text-[${COLORS.primary.DEFAULT}] border border-[${COLORS.primary.DEFAULT}] hover:bg-[${COLORS.primary.light}]/10 ${TRANSITIONS.DEFAULT} ${ROUNDED.md}`,
  ghost: `bg-transparent text-[${COLORS.primary.DEFAULT}] hover:text-[${COLORS.primary.dark}] relative ${TRANSITIONS.DEFAULT} ${ROUNDED.md}`,
  outline: `bg-transparent text-[${COLORS.primary.DEFAULT}] border border-[${COLORS.primary.DEFAULT}] hover:bg-[${COLORS.primary.DEFAULT}] hover:text-white ${TRANSITIONS.DEFAULT} ${ROUNDED.md}`,
};

export const LAYOUTS = {
  container: "max-w-6xl mx-auto px-4 md:px-8",
  section: "py-12 md:py-16",
  card: `bg-white ${ROUNDED.lg} ${SHADOWS.md} hover:${SHADOWS.lg} ${TRANSITIONS.DEFAULT} p-6`,
};
