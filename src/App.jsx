import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// Counter Component
function Counter() {
  const [count, setCount] = useState(0)

  const numbers = [1, 2, 3, 4, 5, 6]
  const evenNumbers = numbers.filter(num => num % 2 === 0)
  const doubledEvens = evenNumbers.map(num => num * 2)

  return (
    <div className="card">
      <h2>COUNTER</h2>
      <p>Count is: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <div>
        <h4>Original Numbers: {numbers.join(', ')}</h4>
        <h4>Even Numbers: {evenNumbers.join(', ')}</h4>
        <h4>Doubled Evens: {doubledEvens.join(', ')}</h4>
      </div>
    </div>
  )
}

// Stopwatch Component - shows minutes:seconds
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

  // Format seconds into mm:ss
  const formatTime = (time) => {
    const mins = String(Math.floor(time / 60)).padStart(2, '0')
    const secs = String(time % 60).padStart(2, '0')
    return `${mins}:${secs}`
  }

  return (
    <div className="card">
      <h2>STOPWATCH</h2>
      <p>Time: {formatTime(time)}</p>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={() => { setTime(0); setIsRunning(false) }}>Reset</button>
    </div>
  )
}

// FetchData Component - improved variant
function FetchData() {
  const [dataFetch, setDataFetch] = useState([])
  const [dataAxios, setDataAxios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=3'

    // fetch()
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Fetch request failed')
        return response.json()
      })
      .then(data => {
        setDataFetch(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Fetch Error:', error)
        setError(error.message)
        setLoading(false)
      })

    // axios
    axios.get(url)
      .then(response => setDataAxios(response.data))
      .catch(error => console.error('Axios Error:', error))
  }, [])

  return (
    <div className="card">
      <h2>FETCH DATA</h2>

      {loading && <p>Loading fetch data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h4>Using fetch():</h4>
      {dataFetch.map(post => (
        <div key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </div>
      ))}

      <h4>Using axios:</h4>
      {dataAxios.map(post => (
        <div key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

// Main App
function App() {
  return (
    <>
      <h1>Counter & Stopwatch & Fetch</h1>
      <Counter />
      <Stopwatch />
      <FetchData />
    </>
  )
}

export default App
