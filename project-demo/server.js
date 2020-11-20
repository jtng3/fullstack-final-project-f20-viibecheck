const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const parser = require('body-parser');
const mongodb = require('mongodb');
const url = require('url');
const mongodbClient = mongodb.MongoClient;
const mongodb_connection_string = "mongodb+srv://viibeDBaccess:Sgr7y4ntzcqL3Rd@cluster.nfkr1.mongodb.net/School?retryWrites=true&w=majority";


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
   

    // register form
    // Example: url(https://localhost:8080/register)
    app.get('/register',(req,res) => {
        console.log(path.join(__dirname + '/register.html'));
        res.sendFile(path.join(__dirname + '/register.html'));
    });
    // get a list of students who registered
    // Example: url(https://localhost:8080/lists)
    app.get('/lists', (req,res) => {
                // get list of students who registered
                db.collection('Student').find({}).toArray( (err,result) => {
                    if(err) throw err;
                    // print out each student in a list
                    console.log(result);
                })
                res.write('</ol>');
                
                
    })
    // main page is currently empty
    app.get('/', (req, res) => {
        console.log('main page');
    })
    // Submit a new Student
    // get student information from register form
    // insert to the database
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
    // assume that in order to update an age of a student with a name
    // Check whether the student is in a list or not.
    // if no, return error "No record found"
    // if yes, update the student with new age
    // Example: found {name: Gina, age: 32}
    // Example: url(https://localhost:8080/update?name=Gina&&age=23)
    app.get('/update', (req, res) => {
        const needToUpdate = require('url').parse(req.url, true).query;
        const name = needToUpdate.name;
        db.collection('Student').findOne({'name' : name})
                                .then((result) => {
                                    // check whether a student is in a list or not
                                    if(!result){
                                        throw new Error('No record found.');
                                    }else{
                                        console.log("Found student with name: "+result.name + ", Age: "+result.age +" in the list.");
                                        // update new age
                                        let newAge = { $set: {age: needToUpdate.age }}
                                        db.collection('Student').updateOne(result, newAge, (err, res) => {
                                            if(err) throw err;
                                            console.log("1 document updated.");
                                        });
                                    }
                                })
        

    })

    // assume that in order to remove a student with a name
    // Check whether the student is in a list or not.
    // if no, return error "No record found"
    // if yes, remote the student
    // Example: url(https://localhost:8080/remove?name=Gina)
    app.get('/remove', (req, res) => {
        const nameNeedToBeRemoved = require('url').parse(req.url, true).query;
        const name = nameNeedToBeRemoved.name;
        // look up a student
        db.collection('Student').findOne({'name' : name})
                                .then((result) => {
                                    // check whether a student is in a list or not
                                    if(!result){
                                        throw new Error('No record found.');
                                    }else{
                                        // remove student in the list
                                        console.log("Found student with name: "+result.name + ", Age: "+result.age +" in the list.");
                                        db.collection('Student').remove(result, (err, res) => {
                                            if(err) throw err;
                                            console.log(`1 document ${name} is removed.`);
                                        });
                                    }
                                })
    })
    
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
