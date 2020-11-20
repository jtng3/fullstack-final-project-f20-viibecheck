const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const parser = require('body-parser');
const mongodb = require('mongodb');
const mongodbClient = mongodb.MongoClient;
const mongodb_connection_string = "mongodb+srv://viibeDBaccess:Sgr7y4ntzcqL3Rd@cluster.nfkr1.mongodb.net/School?retryWrites=true&w=majority";
const db = require('mongodb').Db;

app.set('views', __dirname + 'express-pug/views');
app.set('view engine', 'pug');



app.use(
    parser.urlencoded({
        extended: false,
        limit: 1024,
    }),
    express.static(__dirname + '/public')
);

let Student = (p_name, p_age) => {
    return {name: p_name, age: p_age  };
}

mongodbClient.connect(mongodb_connection_string,{native_parser: true, useUnifiedTopology: true}, (err, client) => {
    console.log('Connected to Database');
    const db = client.db('School');
   

    app.get('/register',(req,res) => {
        console.log(path.join(__dirname + '/register.html'));
        res.sendFile(path.join(__dirname + '/register.html'));
    });

    app.get('/lists', (req,res) => {
                // get list of students who registered
                res.write("List of Student:");
                res.write('<ol>');
                db.collection('Student').find({}).toArray( (err,result) => {
                    if(err) throw err;
                    res.write(`<li> name: ${result.name} - age: ${result.age}`);
                    console.log(result);
                })
                
                res.write('</ol>');
                //res.end();
                
    })

    app.get('/', (req, res) => {
        console.log('main page');
    })
    app.post('/submit', (req, res) => {
           
        var student = Student(req.body.name, req.body.age);
        
        console.log(student);
        
        db.collection('Student').insertOne(student, (err, res) => {
            if(err) throw err;
            console.log('one document inserted');
        })
        
        res.write("successfully");
        res.end();
    });
    
    
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
