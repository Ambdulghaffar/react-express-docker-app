const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Autorise les requêtes CORS ( react -> backend )
app.use(express.json()); // Permet de parser le corps des requêtes en JSON

app.get("/", (req, res) => {
  res.json({ message: "Salut depuis le backend!" });
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Serveur backend démarré sur le port ${PORT}`);
})
