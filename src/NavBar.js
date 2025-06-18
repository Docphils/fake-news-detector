import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function NavBar() {
  return (
    <header className='App-header'>
        <h1>Phils Fact</h1>
        <nav>
            <Link to="/">Home</Link>
        </nav>
    </header>
  )
}
