import gdConfig from 'eslint-config-godaddy';

export default [
  ...gdConfig,
  {
    ignores: ['**/*.yaml']
  }
];
