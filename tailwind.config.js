module.exports = {
  mode: 'jit',
  purge: ['src/*.ejs', 'src/common/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        0: '0',
      },
      spacing: {
        0.8: '1.25rem',
        1.25: '0.3rem',
      },
      lineHeight: {
        11: '4rem',
      },
      borderRadius: {
        3: '3rem',
      },
      colors: {
        primary: '#FFC244',
        secondary: '#8372E7',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
