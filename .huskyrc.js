module.exports = {
  '*.{js,jsx,ts,tsx}': ['npm run tsc && npm run lint-fix:script'],
  '*.{css,less,scss}': ['npm run lint-fix:style'],
  '*.{js,jsx,ts,tsx}': ['npm run lint-fix:script', () => 'npm run tsc'],
}
