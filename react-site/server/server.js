const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const parser = require('body-parser');
const mongodb = require('mongodb');
const url = require('url');
const mongodbClient = mongodb.MongoClient;
const mongodb_connection_string = "mongodb+srv://admin:bGEkB9typOafM69Y@vibecheck.nfkr1.mongodb.net/test?authSource=admin&replicaSet=atlas-62q9dx-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
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



let Incident = (p_fname, p_lname, p_state, p_phone, p_year, p_work, p_school,p_details ) => {
    return {fname : p_fname, lname: p_lname, state: p_state, phone: p_phone, year: p_year, work : p_work, school : p_school, details : p_details};
};
let Response = (p_message, p_object) => {
    return {message : p_message, object : p_object};

}
let Perp = (p_fname, p_lname, p_state, p_phone) => {
    return {fname : p_fname, lname : p_lname, state : p_state, phone : p_phone};
}

mongodbClient.connect(mongodb_connection_string,{native_parser: true, useUnifiedTopology: true,useNewUrlParser : true}, (err, client) => {
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
        var query = {'fname' : search.fName, 'lname' : search.lName, 'phone' : search.phone };
        var response = null;
        var responseMessage = "";
        db.collection('Report')
            .find(query)
            .toArray()
            .then((result) => {
                if(result.length == 0){
                    responseMessage = "No record found";
                    console.log(responseMessage);

                    response = Response(responseMessage, null);
                    res.send(response);
                }else{
                    responseMessage = "The record is exists in database";
                    console.log(responseMessage);
                    response = Response(responseMessage, result);
                    res.send(response);
                }

            })                                        
    });

    app.post("/createincident", (req, res) => {
        
        var report = req.body.report;
        console.log(report);
        let newIncident = Incident(report.fName, report.lName, report.state, report.phone, report.year, report.work, report.school, report.details);
        var query = {'fname' : report.fName,'lname': report.lName, 'state' : report.state, 'phone': report.phone, 'year': report.year, 'work' : report.work, 'school' : report.school, 'details' : report.details };
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
    
    app.get('/testcreateperp', (req, res) => {
        

        var fname = "Adam";
        var lname = "Smith";
        var state = "OR";
        var phone = "971-892-9872";
        
        db.collection('Perp').findOne({'fname' : fname, 'lname' : lname, 'state' : state, 'phone' : phone})
                                .then((result) => {
                                    if(!result){
                                        // not found duplicated
                                        //create new perp
                                        var newPerp = Perp(fname,lname,state,phone);
        
                                        console.log(newPerp);
                                        // insert a data to database
                                        db.collection('Perp').insertOne(newPerp, (err, res) => {
                                            if(err) throw err;
                                            console.log('one document inserted');
                                        })
                                        
                                        res.write("Inserted Successfully!!!");
                                    }else{
                                        res.write("Existed that Perp!!!");
                                    }
                                })
        
    });
    
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
