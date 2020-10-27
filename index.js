// //Test js code
// let a=10;
// let b=10;
// console.log(a+b);


//server with express
  let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

//DB initial code
let Datastore = require('nedb');
let db = new Datastore('point.db');
db.loadDatabase();

let pointTracker = [];

// app.get('/', (req,res)=> {
//     res.send('this is the main page');
// })


//2. add a route on server, that is listening for a post request
app.use("/", express.static('public'));


app.post('/noCups', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        point: req.body.number
    }

    //insert coffee data into the database
    db.insert(obj,(err, newDocs)=>{
        if(err) {
            res.json({task: "task failed"});
        } else {
            res.json({task:"success"});
        }

    // pointTracker.push(obj);
    // console.log(pointTracker);
    // res.json({task:"success"});
})



// app.get('/', (request, response)=> {
//     response.send("Hello");
    
// })



//add route to get all coffee track information
app.get('/getPoints', (req,res)=> {

    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }
        
    })
    
})})

app.listen(3000, ()=> {
    console.log("app is listening at localhost:3000");
})