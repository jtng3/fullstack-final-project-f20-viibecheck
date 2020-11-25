const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const parser = require('body-parser');
const mongodb = require('mongodb');
const url = require('url');
const mongodbClient = mongodb.MongoClient;
const mongodb_connection_string = "mongodb+srv://viibeDBaccess:Sgr7y4ntzcqL3Rd@cluster.nfkr1.mongodb.net/ViiberCheck?retryWrites=true&w=majority";
const cors = require('cors');
app.set('views', __dirname + 'express-pug/views');
app.set('view engine', 'pug');


app.use(cors());
app.use(
    parser.urlencoded({
        extended: false,
        limit: 1024,
    }),
    express.static(__dirname + '/public')
);
app.use(parser.json());

let Perp = (p_name,p_state, p_phone) => {
    return {name: p_name, state : p_state, phone : p_phone  };
}

mongodbClient.connect(mongodb_connection_string,{native_parser: true, useUnifiedTopology: true}, (err, client) => {
    console.log('Connected to Database');
    const db = client.db('ViiberCheck');
   

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
    
    
    //Search that entry whether it is existed in list or not
    // If not existed, send a fail message back to client
    // If existed, send an object back client
    app.post('/search', (req, res) => {
        
        console.log(req.body.perp.name);
        db.collection('Perp').findOne({'name' : req.body.perp.name, 'phone' : req.body.perp.phone})
                                                            .then((result) => {
                                                                // check whether a student is in a list or not
                                                                if(!result){
                                                                    console.log("No Record Found");
                                                                    res.send("No Record Found");
                                                                }else{
                                                                    console.log(result);
                                                                    res.send(result);
                                                                }
                                                            })

    });

    // Lookup the perp and fill out an incident
    app.post("/createincident", (req, res) => {
        // look up the existing perp
        // now I just assume that I have retrieved the perp
        // it will be static since we are not done with frontend, so I will change this code
        // to search a perp base on name and phone#

        db.collection('Perp').findOne({'name' : "Jane", 'phone' : "971-533-0000"})
                            .then((result) => {
                                // check whether a student is in a list or not
                                    if(!result){
                                        // no perp exist
                                        console.log("No Perp Found");
                                        res.send("fail to create an incident due to no perp.");
                                    }else{
                                        // the perp existed
                                        let perpId = result._id;
                                        
                                        db.collection('Incident').insertOne(newPerp, (err, res) => {
                                            if(err) throw err;
                                            console.log('one document inserted');
                                        })
                                        console.log(perpId);
                                                                    //res.send(result);
                                    }
                            })
        })

    // Search that entry whether it is existed in list or not
    // If not existed, insert that data to the database, send a successful message back to client
    // If existed, send a fail message back client
    
    app.post('/createperp', (req, res) => {
        
        console.log(req.body.perp);
        db.collection('Perp').findOne({'name' : req.body.perp.name,'state' : req.body.perp.state, 'phone' : req.body.perp.phone})
                                .then((result) => {
                                    if(!result){
                                        // not found duplicated
                                        //create new perp
                                        var newPerp = Perp(req.body.perp.name,req.body.perp.state,req.body.perp.phone);
        
                                        console.log(newPerp);
                                        // insert a data to database
                                        db.collection('Perp').insertOne(newPerp, (err, res) => {
                                            if(err) throw err;
                                            console.log('one document inserted');
                                        })
                                        
                                        res.send("Inserted Successfully!!!");
                                    }else{
                                        res.send("Found That Record!!!");
                                    }
                                })
        
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
