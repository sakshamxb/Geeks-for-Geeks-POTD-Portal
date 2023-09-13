const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/addproblem', (req, res)=>{
    const newProb = 
    {
        title: req.body.title,
        link: req.body.link
    }
    fs.readFile('problems.json', 'utf-8', (err, data)=>{
        if(err)
        {
            console.error(err);
            res.send('Internal Server Error');
        }
        else
        {
            const problems = JSON.parse(data);
            problems.push(newProb);
            fs.writeFile('problems.json', JSON.stringify(problems), (err)=>{
                if (err){
                    console.error(err);
                    res.send('Internal Server Error');
                }
                else{
                    res.json(`Problem ${newProb.title} added successfully!`);
                }
            })
        }
    })
});

const port = 3000;

app.listen(port, ()=>{
    console.log(`Welcome to the POTD Portal, listening at port: ${port}`);
});
