tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "var(--theme-primary, #00338d)",
        "accent": "var(--theme-accent, #00b8f5)",
        "secondary": "var(--theme-secondary, #1e49e2)",
        "background-light": "var(--theme-bg-light, #f5f6f8)",
        "background-dark": "var(--theme-bg-dark, #0c233c)",
        "brand-navy": "var(--theme-navy, #0c233c)",
        "purple-accent": "var(--theme-purple, #7213ea)",
        "pink-accent": "var(--theme-pink, #fd349c)"
      },
      fontFamily: {
        "display": ["Public Sans", "Inter", "sans-serif"]
      }
    }
  }
};
