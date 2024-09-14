
module.exports = {
    preset: 'ts-jest',                       // Use ts-jest for TypeScript support
    testEnvironment: 'node',                 // Use the Node environment for backend tests
    transform: {
      '^.+\\.tsx?$': 'ts-jest',              // Transform TypeScript files using ts-jest
    },
    testMatch: ['<rootDir>/src/tests/**/*.test.ts'], // Look for test files in src/tests
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    roots: ["<rootDir>/src/tests"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],                    // Use the project root directory

  };
  