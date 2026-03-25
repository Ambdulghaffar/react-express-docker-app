const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Autorise les requêtes CORS ( react -> backend )
app.use(express.json()); // Permet de parser le corps des requêtes en JSON

// simulation de base de données
let todos = [
  { id: 1, text: "Apprende Docker", completed: false },
  { id: 2, text: "Maîtriser Express", completed: false },
  {id: 3, text: "Créer une application fullstack", completed: false },
  {id: 4, text: "Déployer sur Docker Hub", completed: false },
];

// Endpoint pour récupérer les tâches
app.get("/api/todos", (req,res)=>{
  res.json(todos);
})

// Endpoint pour ajouter une tâche
app.post("/api/todos", (req,res)=>{
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Endpoint pour supprimer une tâche
app.delete("/api/todos/:id",(req,res)=>{
  const {id} = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.status(204).send();
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Serveur backend démarré sur le port ${PORT}`);
})
