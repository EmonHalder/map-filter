import { useState, useEffect } from 'react'
import './App.css'

// Counter Component
function Counter() {
  const [count, setCount] = useState(0)

  const numbers = [1, 2, 3, 4, 5, 6, 8]
  const evenNumbers = numbers.filter(num => num % 2 === 0)
  const doubledEvens = evenNumbers.map(num => num * 2)

  return (
    <div className="card">
      <h2>COUNTER</h2>
      <p>Count is: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>

      <div>
        <h4>Original Numbers: {numbers.join(', ')}</h4>
        <h4>Even Numbers: {evenNumbers.join(', ')}</h4>
        <h4>Doubled Evens: {doubledEvens.join(', ')}</h4>
      </div>
    </div>
  )
}

// Stopwatch Component
function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="card">
      <h2>STOPWATCH</h2>
      <p>Time: {time}s</p>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={() => { setTime(0); setIsRunning(false) }}>Reset</button>
    </div>
  )
}

// Main App
function App() {
  return (
    <>
      <h1>Counter & Stopwatch</h1>
      <Counter />
      <Stopwatch />
    </>
  )
}

export default App
