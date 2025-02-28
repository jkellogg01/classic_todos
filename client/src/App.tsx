import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="mx-auto">
      <button className="p-4 rounded-xl bg-red-500" onClick={() => setCount((count) => count + 1)}>{count}</button>
    </div>
  )
}

export default App
