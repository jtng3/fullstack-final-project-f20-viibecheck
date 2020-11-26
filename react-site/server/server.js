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

// Object Declaration 



let Incident = (p_fname, p_lname, p_state, p_phone, p_year, p_work, p_school ) => {
    return {fname : p_fname, lname: p_lname, state: p_state, phone: p_phone, year: p_year, work : p_work, school : p_school};
};


mongodbClient.connect(mongodb_connection_string,{native_parser: true, useUnifiedTopology: true}, (err, client) => {
    console.log('Connected to Database');
    const db = client.db('ViiberCheck');
   

    
    // main page is currently empty
    app.get('/', (req, res) => {
        console.log('main page');
    })
    
    
    //Search that entry whether it is existed in list or not
    // If not existed, send a fail message back to client
    // If existed, send an object back client
    app.post('/search', (req, res) => {
        var search = req.body.search;
        console.log('data' + search);
        var query = {'fname' : search.fName, 'lname' : search.lName, 'state' : search.state, 'phone' : search.phone };
        db.collection('Report')
            .find(query)
            .toArray()
            .then((result) => {
                if(!result){
                    console.log("No record found");
                    res.send("The record isn't existed in database");
                }else{
                    console.log(result);
                    res.send(result);
                }

            })                                        
    });

    app.post("/createincident", (req, res) => {
        
        var report = req.body.report;
        let newIncident = Incident(report.fName, report.lName, report.state, report.phone, report.year, report.work, report.school);
        var query = {'fname' : report.fName,'lname': report.lName, 'state' : report.state, 'phone': report.phone, 'year': report.year, 'work' : report.work, 'school' : report.school };
        db.collection('Report').findOne(query)
                                .then((result) => {
                                    if(!result){
                                        console.log(result);
                                        // No record found in database, insert new report
                                        db.collection('Report').insertOne(newIncident, (err, res) => {
                                            if(err) throw err;
                                            console.log('one document inserted');
                                        })
                                        res.send("Insert an Incident related with Perp succesfully!!!");
                                    }else{
                                        res.send("A report has been inserted to the database.");
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
                                        res.send("Existed that Perp!!!");
                                    }
                                })
        
    });
    
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
