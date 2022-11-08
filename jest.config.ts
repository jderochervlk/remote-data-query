export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"],
  collectCoverageFrom: [
    "./src/**/*",
    "!./src/mocks/*",
    "!./src/index.ts"
  ],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  setupFilesAfterEnv: ['./jest.setup.ts']
};
