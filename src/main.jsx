import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("LeafBook Runtime Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '40px auto', textAlign: 'center', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#dc2626', fontSize: '20px', marginBottom: '12px' }}>⚠️ เกิดข้อผิดพลาดในการโหลด LeafBook</h2>
          <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '16px' }}>
            {this.state.error?.message || 'ระบบเกิดข้อผิดพลาดในการประมวลผล'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ background: '#186438', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            โหลดใหม่อีกครั้ง (Reload)
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

