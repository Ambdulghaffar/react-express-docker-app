import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // 1. Récupérer les tâches depuis le backend
  useEffect(() => {
    fetch("http://localhost:3000/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) =>
        console.error("Erreur lors de la récupération des tâches :", err),
      );
  }, []);

  // 2. Ajouter une tâche
  const addTodo = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    try {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (err) {
      console.error("Erreur lors de l'ajout de la tâche :", err);
    }
  };

  // 3. Supprimer une tâche
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la tâche :", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Mes Tâches
        </h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ajouter une nouvelle tâche..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
            Ajouter
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <span className="text-gray-700 font-medium">{todo.text}</span>
              <button
              onClick={()=> deleteTodo(todo.id)}
               className="text-red-500 hover:text-red-700 font-bold cursor-pointer">
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
