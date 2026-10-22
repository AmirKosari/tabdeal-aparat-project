import type {Config} from 'tailwindcss'

export default {
    content: [
        './app/components/**/*.{js,vue,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/plugins/**/*.{js,ts}',
        './app/app.vue',
    ],
    theme: {
        extend: {
            colors: {
                surface: {
                    DEFAULT: '#1A1A1A',
                    card: '#2A2A2A',
                    elevated: '#323232',
                    input: '#252525',
                },
                brand: {
                    yellow: '#F5C518',
                    'yellow-hover': '#E0B100',
                },
                tag: '#5B9BD5',
                muted: '#9CA3AF',
            },
            fontFamily: {
                sans: ['IRANSans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                glow: '0 0 60px 20px rgba(245, 197, 24, 0.12)',
            },
        },
    }
} satisfies Config
