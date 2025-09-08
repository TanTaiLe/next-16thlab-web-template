import '@testing-library/jest-dom';

const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("ReactDOMTestUtils.act")) {
    return; // suppress act warning
  }
  originalError(...args);
};