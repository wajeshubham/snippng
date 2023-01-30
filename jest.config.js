const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components/$1",
    "^@/pages(.*)$": "<rootDir>/pages/$1",
    "^@/context(.*)$": "<rootDir>/context/$1",
    "^@/layout(.*)$": "<rootDir>/layout/$1",
    "^@/utils(.*)$": "<rootDir>/utils/$1",
    "^@/types(.*)$": "<rootDir>/types/$1",
    "^@/lib(.*)$": "<rootDir>/lib/$1",
    "^@/config(.*)$": "<rootDir>/config/$1",
  },
  moduleDirectories: ["node_modules", __dirname],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
