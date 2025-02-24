const express=require('express');
const app=express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(200);
    res.render('index');
    }
);

const PORT=3000;
app.listen(PORT);