import React from 'react'

// Global React provider to ensure React is available in all components
if (typeof window !== 'undefined') {
  // Make React available globally in browser environment
  (window as any).React = React
}

export default function GlobalReactProvider() {
  return null
}
