import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './', // thư mục root của Next.js app
})

const customJestConfig = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // alias @/ trỏ về thư mục gốc
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

export default createJestConfig(customJestConfig)
