const config = {
    theme: {
        extend: {
            animation: {
                shimmer: 'shimmer 2s linear infinite',
            },
            keyframes: {
                shimmer: {
                    from: {
                        backgroundPosition: '0 0',
                    },
                    to: {
                        backgroundPosition: '-200% 0',
                    },
                },
            },
        },
    },
    animation: {
        shimmer: 'shimmer 2s linear infinite',
    },
    keyframes: {
        shimmer: {
            from: {
                backgroundPosition: '0 0',
            },
            to: {
                backgroundPosition: '-200% 0',
            },
        },
    },
    plugins: { '@tailwindcss/postcss': {} },
}

export default config
