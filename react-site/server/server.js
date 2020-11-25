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
let Perp = (p_name,p_state, p_phone) => {
    return {name: p_name, state : p_state, phone : p_phone  };
}
let Incident = (p_pid, p_state, p_year, p_details ) => {
    return {perp_ID : p_pid, state: p_state, year: p_year, details : p_details };
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

    // This is how I handle to test at Server side, if you get access from Client to this function you need to fix some steps here.
    // first, at line 88, change get to post
    // second,at line 94, {'name' : "Jane", 'phone' : "971-533-0000"} needs to get values by using req.body.perp get get (name, phone).So, it is required to fix
    // last ,at line 110, "CA","2010", "Portland State University" needs to get values by using req.body.incident get get (state, year, details).So, it is required to fix
    // OR REQUEST ME TO FIX THIS
    // Lookup the perp and fill out an incident
    app.get("/createincident", (req, res) => {
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
                                        let perpId = result._id; // return perp id
                                        
                                        // Note: state gets from POST request
                                        // year gets from POST request
                                        // detail get from POST request 
                                        // Assume I have incident detail like (perp_Id, state, year, details) as ("5fbdeab426780053b8022758","CA","2010","Portland State University")
                                        let newIncident = Incident(perpId, "CA","2010", "Portland State University" );
                                        db.collection('Incident').insertOne(newIncident, (err, res) => {
                                            if(err) throw err;
                                            console.log('one document inserted');
                                        })
                                        res.send("Insert an Incident related with Perp succesfully!!!");
                                        
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
