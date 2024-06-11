module.exports = {
    // Indicates which environment Jest should run tests in
    testEnvironment: 'jsdom',
   
    // The glob patterns Jest uses to detect test files
    testMatch: [
      '**/__tests__/**/*.test.[jt]s?(x)',
      '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
   
    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>'],
   
    // Transform files with ts-jest
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
   
    // Indicates whether each individual test should be reported during the run
    verbose: true,
   
    // Setup files before running the test suites
    setupFilesAfterEnv: ['./jest.setup.js'],
   
    // Other configurations as needed
  };