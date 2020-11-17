const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const parser = require('body-parser');
const mongodb = require('mongodb');
const mongodbClient = mongodb.MongoClient;
const mongodb_connection_string = "mongodb+srv://viibeDBaccess:Sgr7y4ntzcqL3Rd@cluster.nfkr1.mongodb.net/School?retryWrites=true&w=majority";

app.use(
    parser.urlencoded({
        extended: false,
        limit: 1024,
    })
);
let Student = (p_name, p_age) => {
    return {name: p_name, age: p_age  };
}
mongodbClient.connect(mongodb_connection_string,{ 
    useUnifiedTopology: true })
        .then(client => {
            console.log('Connected to Database');
            const db = client.db('School');
            const studentCollection = db.collection('Student');


            app.get('/',(req,res) => {
                console.log(path.join(__dirname + '/register.html'));
                res.sendFile(path.join(__dirname + '/register.html'));
            });
            
            app.post('/submit', (req, res) => {
           
                var student = Student(req.body.name, req.body.age);
                
                console.log(student);
                
                studentCollection.insertOne(student, (err, res) => {
                    if(err) throw err;
                    console.log('one document inserted');
                    mongodbClient.close();
                })
                
                res.write("successfully");
                res.end();
            });
            
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`);
            });

        })



