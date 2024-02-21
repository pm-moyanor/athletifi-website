import React from 'react';

class ErrorBoundary extends React.Component<{
  fallback: string;
  children: React.ReactNode;
}> {
  state = { error: null, hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { error: error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
      //   return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
