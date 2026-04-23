import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

// Fallback UI component
function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 bg-red-100 rounded">
      <p className="font-semibold text-red-600">Something went wrong:</p>
      <pre className="text-red-500">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}

// ErrorBoundary wrapper
const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => {
        // Optional reset logic, e.g. clear state or reload
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
