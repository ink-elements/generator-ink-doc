import resolve from 'rollup-plugin-node-resolve'

module.exports = {
  input: 'scripts/ink-elements.js',
  output: {
    file: 'dist/html/scripts/ink-elements.js',
    format: 'es'
  },
  plugins: [
    resolve()
  ]
}
