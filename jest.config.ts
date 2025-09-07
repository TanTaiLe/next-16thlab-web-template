import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './', // thư mục root của Next.js app
})

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // alias @/ trỏ về thư mục gốc
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
}

export default createJestConfig(customJestConfig)
