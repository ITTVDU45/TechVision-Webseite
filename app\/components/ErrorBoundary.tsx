import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-neutral-900 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Oops! Etwas ist schiefgelaufen
            </h2>
            <p className="text-gray-400 mb-4">
              Es tut uns leid, aber es ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu oder versuchen Sie es später erneut.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Seite neu laden
            </button>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-4 p-4 bg-neutral-800 rounded text-sm text-red-400 overflow-auto">
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 