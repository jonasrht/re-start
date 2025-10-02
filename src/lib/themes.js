export const themes = {
    default: {
        displayName: 'default',
        colors: {
            '--bg-1': 'oklch(19% 0 0)',
            '--bg-2': 'oklch(23% 0 0)',
            '--bg-3': 'oklch(27% 0 0)',
            '--bg-4': 'oklch(31% 0 0)',
            '--txt-1': 'oklch(90% 0 0)',
            '--txt-2': 'oklch(75% 0 0)',
            '--txt-3': 'oklch(50% 0 0)',
            '--txt-4': 'oklch(40% 0 0)',
            '--txt-err': 'oklch(70% 0.11 0)',
        },
    },
    nord: {
        displayName: 'nord',
        colors: {
            '--bg-1': '#2e3440',
            '--bg-2': '#3b4252',
            '--bg-3': '#434c5e',
            '--bg-4': '#4c566a',
            '--txt-1': '#eceff4',
            '--txt-2': '#d8dee9',
            '--txt-3': 'hsl(219, 23%, 65%)',
            '--txt-4': '#88c0d0',
            '--txt-err': '#bf616a',
        },
    },
    'catppuccin-mocha': {
        displayName: 'catppuccin mocha',
        colors: {
            '--bg-1': '#181825',
            '--bg-2': '#1e1e2e',
            '--bg-3': '#313244',
            '--bg-4': '#45475a',
            '--txt-1': '#cdd6f4',
            '--txt-2': '#a6adc8',
            '--txt-3': '#6c7086',
            '--txt-4': '#cba6f7',
            '--txt-err': '#f38ba8',
        },
    },
    'catppuccin-latte': {
        displayName: 'catppuccin latte',
        colors: {
            '--bg-1': '#eff1f5',
            '--bg-2': '#dce0e8',
            '--bg-3': '#ccd0da',
            '--bg-4': '#bcc0cc',
            '--txt-1': 'hsl(234, 16%, 20%)',
            '--txt-2': '#4c4f69',
            '--txt-3': '#8c8fa1',
            '--txt-4': '#7287fd',
            '--txt-err': '#d20f39',
        },
    },
}

export const themeNames = Object.keys(themes)

export const defaultTheme = 'default'
