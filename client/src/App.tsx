import { useEffect, useState } from "react";

export function App() {
  const [todos, setTodos] = useState<any>();
  useEffect(() => {
    fetch("/api/todos")
      .then((data) => {
        return data.json();
      })
      .then((todos) => {
        setTodos(todos);
      });
  });
  return <pre className="font-mono">{JSON.stringify(todos)}</pre>;
}
