import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-disney-blue-50 to-white flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg text-center">
            <div className="text-6xl mb-4">🏰✨</div>
            <h1 className="text-2xl font-bold text-disney-blue mb-2">Oops! Something magical went wrong.</h1>
            <p className="text-gray-600 mb-6">
              Our pixie dust ran out for a moment. Please reload and try again.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-disney-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
