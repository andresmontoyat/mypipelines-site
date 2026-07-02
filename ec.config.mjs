import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
export default {
  themes: ['dracula', 'github-light'],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => {
    if (theme.name === 'dracula') return 'html.dark';
    if (theme.name === 'github-light') return 'html:not(.dark)';
    return false;
  },
  plugins: [pluginLineNumbers()],
  defaultProps: {
    showLineNumbers: false,
    overridesByLang: { 'bash,sh,zsh': { showLineNumbers: false, wrap: false } },
  },
};
