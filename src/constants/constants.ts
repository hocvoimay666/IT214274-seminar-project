export const APP_NAME = 'English Steps';
export const PROGRESS_STORAGE_KEY = '@learning-english/progress';

export const Colors = {
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#172033',
    muted: '#65718A',
    primary: '#3568D4',
    border: '#E1E7F0',
    success: '#27845A',
  },
  dark: {
    background: '#101827',
    surface: '#1B2638',
    text: '#F2F5FA',
    muted: '#A7B1C2',
    primary: '#8EAEFF',
    border: '#344155',
    success: '#77D5A6',
  },
} as const;

export type ThemeName = keyof typeof Colors;
export type ThemeColors = (typeof Colors)[ThemeName];
export type ThemeColor = keyof ThemeColors;
export const Spacing = { one: 4, two: 8, three: 12, four: 16, five: 24, six: 32 } as const;
export const MaxContentWidth = 720;
export const Fonts = { mono: 'monospace' };
