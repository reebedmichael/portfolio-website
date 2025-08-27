import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import RotatingHeadline from './RotatingHeadline'

// Mock Supabase client
vi.mock('../utils/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => ({
          data: { id: '1', headline: 'Software Engineer, Full-Stack Developer, Problem Solver' },
          error: null
        }))
      }))
    })),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn(() => ({ unsubscribe: vi.fn() }))
      }))
    })),
    removeChannel: vi.fn()
  }
}))

// Mock Math.random to make tests deterministic
const mockMath = Object.create(global.Math)
mockMath.random = () => 0.5
global.Math = mockMath

describe('RotatingHeadline', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<RotatingHeadline />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<RotatingHeadline className="custom-class" />)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('custom-class')
  })

  it('renders as specified HTML element', () => {
    render(<RotatingHeadline as="h2" />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<RotatingHeadline />)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveAttribute('aria-live', 'polite')
    expect(heading).toHaveAttribute('aria-atomic', 'true')
  })

  it('shows cursor animation', () => {
    render(<RotatingHeadline />)
    const cursor = screen.getByText('|')
    expect(cursor).toBeInTheDocument()
    expect(cursor).toHaveAttribute('aria-hidden', 'true')
  })

  it('shows initial phrase before animation starts', () => {
    render(<RotatingHeadline />)
    // Should show the first phrase initially
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })

  it('parses comma-separated phrases correctly', async () => {
    render(<RotatingHeadline />)
    
    // Wait for the component to load and parse phrases
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    })
  })
})
