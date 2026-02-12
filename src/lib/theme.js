const THEME_STORAGE_KEY = "wuyuan-theme";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

export function isThemeValue(value) {
  return value === THEME_DARK || value === THEME_LIGHT;
}

export function getStoredTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeValue(storedTheme) ? storedTheme : null;
}

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_DARK
    : THEME_LIGHT;
}

export function getCurrentTheme() {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === THEME_DARK);
}

export function setTheme(theme, options = {}) {
  const { persist = true } = options;
  if (!isThemeValue(theme)) {
    return getCurrentTheme();
  }

  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  applyTheme(theme);
  return theme;
}

export function toggleTheme() {
  const nextTheme = getCurrentTheme() === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  return setTheme(nextTheme, { persist: true });
}

export function initTheme() {
  const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  applyTheme(getCurrentTheme());

  const onSystemThemeChange = (event) => {
    if (getStoredTheme()) {
      return;
    }

    applyTheme(event.matches ? THEME_DARK : THEME_LIGHT);
  };

  mediaQueryList.addEventListener("change", onSystemThemeChange);
  return () => mediaQueryList.removeEventListener("change", onSystemThemeChange);
}
