const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const adminSearch = require('./adminSearch');

app.use(bodyParser.json());

const adminAuth = (req,res,next)=>{
    const {username, password} = req.headers;

    fs.readFile('admins.json', 'utf-8', (err, data)=>{
        if(err){
            console.error(err);
            console.log(`Internal Server Error: ${err.message}`);
            res.status(500).json(`Internal Server Error`);
        } else{
            const adminData = JSON.parse(data);
            const loginStatus = adminSearch(adminData, username, password);
            if (loginStatus == 1){
                next();
            } else{
                res.status(403).json(`Admin Authentication Failed`);
            }
        }
    });
}

app.post('/addproblem', adminAuth,(req, res)=>{
    const newProb = 
    {
        id: Math.floor(Math.random()*1000),
        title: req.body.title,
        link: req.body.link,
        date: req.body.date
    }
    fs.readFile('problems.json', 'utf-8', (err, data)=>{
        if(err)
        {
            console.error(err);
            res.send('Internal Server Error');
        } else
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

app.put('/changeProblem', )

const port = 3000;

app.listen(port, ()=>{
    console.log(`Welcome to the POTD Portal, listening at port: ${port}`);
});
