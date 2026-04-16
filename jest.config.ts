// jest.config.ts
import type { Config } from "@jest/types";
import nextJest from "next/jest.js";

// Sync object
const customJestConfig: Config.InitialOptions = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["<rootDir>/.jest/setEnvVars.ts"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  verbose: true,
};

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" })(customJestConfig);

export default async () => {
  // Create the Next.js jest configuration presets
  const jestConfig = await createJestConfig();

  // Custom `moduleNameMapper` configuration
  const moduleNameMapper = {
    ...jestConfig.moduleNameMapper,
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg)$": "<rootDir>/src/tests/mocks/mockSvg.js",
    "^next/link$": "<rootDir>/src/tests/mocks/mockNextLink.tsx",
    "swiper/react": "<rootDir>/node_modules/swiper",
  };

  return { ...jestConfig, moduleNameMapper, testTimeout: 20000 };
};
