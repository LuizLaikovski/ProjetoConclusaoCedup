module.exports = {
    theme: {
        screens: {
            'tablet': '640px',
            // => @media (min-width: 640px) { ... }

            'laptop': '1024px',
            // => @media (min-width: 1024px) { ... }

            'desktop': '1280px',
            // => @media (min-width: 1280px) { ... }
        },
        extends: {
            colors: {
                bgPrimary: '#014740',
            },
        },
    },
}

plugins: [require('tailwind-scrollbar-hide')]