import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white p-8">
      <div className="max-w-md text-center space-y-4">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <pre className="text-sm text-red-400 bg-red-950/30 p-4 rounded-xl overflow-auto">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
