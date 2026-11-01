import { Component, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    console.error(error)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <main className="container-x flex min-h-[70vh] flex-col items-start justify-center gap-6 py-32">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="display-lg max-w-2xl">This page hit an unexpected error.</h1>
        <p className="max-w-lg text-muted">Reloading usually fixes it. If it doesn’t, you can still reach me directly by email.</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => window.location.reload()} className="h-11 rounded-full bg-fg px-5 text-sm font-medium text-ink-950">
            Reload page
          </button>
          <a href="mailto:baghelmilendrakumar@gmail.com" className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm">
            Email Milendra
          </a>
        </div>
      </main>
    )
  }
}
