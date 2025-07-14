import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// Counter Component (same)
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

      <div>
        <h4>Original Numbers: {numbers.join(', ')}</h4>
        <h4>Even Numbers: {evenNumbers.join(', ')}</h4>
        <h4>Doubled Evens: {doubledEvens.join(', ')}</h4>
      </div>
    </div>
  )
}

// Stopwatch Component (same)
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

// FetchData Component - shows fetch() and axios
function FetchData() {
  const [dataFetch, setDataFetch] = useState(null)
  const [dataAxios, setDataAxios] = useState(null)

  useEffect(() => {
    // Example API: JSONPlaceholder
    const url = 'https://jsonplaceholder.typicode.com/posts/1'

    // fetch()
    fetch(url)
      .then(response => response.json())
      .then(data => setDataFetch(data))
      .catch(error => console.error('Fetch Error:', error))

    // axios
    axios.get(url)
      .then(response => setDataAxios(response.data))
      .catch(error => console.error('Axios Error:', error))
  }, [])

  return (
    <div className="card">
      <h2>FETCH DATA</h2>

      <h4>Using fetch():</h4>
      {dataFetch ? (
        <pre>{JSON.stringify(dataFetch, null, 2)}</pre>
      ) : (
        <p>Loading fetch data...</p>
      )}

      <h4>Using axios:</h4>
      {dataAxios ? (
        <pre>{JSON.stringify(dataAxios, null, 2)}</pre>
      ) : (
        <p>Loading axios data...</p>
      )}
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
