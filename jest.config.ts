import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },

  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Результаты тестов Stellar Burger',
        outputPath: './test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true
      }
    ]
  ]
};

export default config;