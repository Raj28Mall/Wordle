const express=require('express');
const cors = require("cors");
const mysql=require('mysql2');
const app=express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',    
    user: 'root',    
    password: 'Jee2024!raj',  
    database: 'test_words'
});

app.set('view engine', 'ejs');

app.post("/check-word", async (req, res) => {
    const { word } = req.body; // Receive word from frontend
    if (!word) return res.status(400).json({ error: "No word provided" });
  
    db.query(
      `SELECT EXISTS(SELECT 1 FROM words WHERE word = ?) AS word_exists`,
      [word],
      (err, results) => {
        if (err) {
          console.error("Database Error: ", err);
          return res.status(500).json({ error: "Database error" });
        }
  
        const isValid = results[0].word_exists === 1;
        res.json({ isValid }); 
      }
    );
});
  

const PORT=3000;
app.listen(PORT);