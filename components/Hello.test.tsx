import { render, screen } from '@testing-library/react'
import React from 'react'

function Hello() {
  return <h1>Hello 16thLab</h1>
}

describe('Hello component', () => {
  it('renders correctly', () => {
    render(<Hello />)
    expect(screen.getByText('Hello 16thLab')).toBeInTheDocument()
  })
})
