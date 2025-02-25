const express=require('express');
const mysql=require('mysql2');
const app=express();
const db = mysql.createConnection({
    host: 'localhost',    
    user: 'root',    
    password: 'Jee2024!raj',  
    database: 'test_words'
});

app.set('view engine', 'ejs');

let guessed_word='';
async function getWord(){
    guessed_word='GHOST';
}

async function checkValidity(word){
    let valid=false;
    db.query(`SELECT EXISTS(SELECT 1 FROM words WHERE word = ?) AS word_exists`, [word], 
      (err, results) => {
        if (err) {
            console.error("Database Error: ", err);
        }
        
        if(results[0].word_exists){
            valid=true;
        }
    });
    return valid;
}

async function handleValidity(){
    await getWord();
    let valid=await checkValidity(guessed_word);
    if(valid){
        //send response
    }
    else{
        //send response
    }
}

const PORT=3000;
app.listen(PORT);