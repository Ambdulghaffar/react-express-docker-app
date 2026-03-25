const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Import du pool de connexions à PostgreSQL
const app = express();

app.use(cors()); // Autorise les requêtes CORS ( react -> backend )
app.use(express.json()); // Permet de parser le corps des requêtes en JSON

// Initialisation de la base de données au dematrage du serveur:
const startServer = async () => {
  try {
    // 1. On attend que la table soit créée
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT false
      );
    `);
    console.log("✅ Table 'todos' prête !");

    // 2. SEULEMENT APRÈS, on lance le serveur
    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Impossible de démarrer le serveur (Erreur DB) :", err);
    // On attend 5 secondes et on réessaie si Postgres n'était pas encore prêt
    setTimeout(startServer, 5000);
  }
};

startServer();


// Endpoint pour récupérer les tâches (SELECT)
app.get("/api/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des tâches :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Endpoint pour ajouter une tâche(INSERT)
app.post("/api/todos", async (req, res) => {
  try {
    const { text } = req.body;
    const result = await pool.query(
      "INSERT INTO todos (text) VALUES ($1) RETURNING *",
      [text],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de l'ajout d'une tâche :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Endpoint pour supprimer une tâche
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Erreur lors de la suppression d'une tâche :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
