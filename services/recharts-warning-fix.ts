// This is a workaround for a harmless ResizeObserver error that occurs in Recharts.
// See: https://github.com/recharts/recharts/issues/3615

const originalError = console.error;

console.error = (...args) => {
  if (
    typeof args[0] === 'string' && 
    /ResizeObserver loop completed with undelivered notifications/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};
