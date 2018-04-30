var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');

    
app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/angulartest');

var db = mongoose.connection;
    
db.on('error', function(){
        console.log('Connection failed!');
});
    
db.on('open', function() {
        console.log('connection established!!!');
});
    
var userSchema = mongoose.Schema({
        username: {
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        location: {
            type:String,
            required:true
        },
    });
    
var User = mongoose.model('users', userSchema);

var postSchema = mongoose.Schema({
    postTitle: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    createdBy: {
        type:String,
        required:true
    },
    likes: {
        type:Number,
        required:true
    },
    Time: {
        type: String,
        required:false
      },
    comments: {
            type: Array,
            required:true
            
        },
})

var Post = mongoose.model('posts', postSchema);

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
    }

app.post('/createuser', function(req, res){
    if(req.body){
        console.log("New User: ",req.body);
        var adduser = new User(req.body);
        console.log(adduser);
        adduser.save();
        res.send({'flg':true});
    }else{
        res.send({'flg':false});
        console.log("No user!");
    }
});

app.put('/inc_count/:id', function(req, res){
    let ids = req.params.id;
    console.log("Current body: ",ids);
        Post.findOneAndUpdate({_id : ids},{$inc: {"likes":1}}, function(err, docs){

            if(err){
                res.send(err);
            }
            else{
                Post.findOne({_id: ids}, function(err, docs){
                    if(err){
                        console.log("Error finding values",err);
                    }else{
                        res.send(docs);
                    }
                })
            }   
        });
});

app.post('/submitCom', function(req, res){
    console.log(req.body);
    Post.update({_id: req.body.id},
        {$push: {"comments": {commentBy:req.body.commentBy,
                              comment:req.body.content,
                              commentTime:new Date().toDateString(),
                              commentOn:req.body.commentOn}}},
     function(err, docs){
            if(err){
                console.log("Error updating the database", err);
                res.send({'flg':false});
            }else{
                console.log("Document Updated!");
                res.json(docs);
            }
        })
});

app.post('/createlist', function(req, res){
    if(req.body){
        console.log("Post: ",req.body);
        var addposts = new Post(req.body);
        addposts.save();
        res.send({'flg':true});
    }else{
        res.send({'flg':false});
        console.log("No post!");
    }
});

app.get('/getlists', function(req, res){

    Post.find({}, function(err, docs){
        if(err){
            console.log("Error", err);
        }else{
            if(docs){
                console.log("Posts Recieved: ",docs);
                res.json(docs);
            }else{
                res.send({'flg':false});
            }
        }
    });
})

app.post('/authenticate', function(req, res) {
    User.findOne({username:req.body.username,
         password:req.body.password}, function(err, docs){
        if(err){
            console.log("document not found!", err);
            res.send({"loggedIn":false});
        }else{
            if(docs){
                var token = jwt.sign({'uname':req.body.username}, 'user-skey', {
                    expiresIn: '1h'
                  });
                  res.send({"loggedIn":true, 'token':token});
                  //res.json({'User': docs});
            }else{
                res.send({"users": null});
            }
            
        }
    });  
  });

app.use(function(req, res, next) {
var token = req.headers.authorization;
if(token) {
      jwt.verify(token, 'marlabs-secret-key', function (err, decoded) {
        if (err) {
          console.log('Error');
        } else {
            req.decoded = decoded;
            console.log(req.decoded);
            next();
        }
      });
    } else {
        console.log("No Token received!");
    }
  });


  app.listen(2000, function(){
      console.log("Server running at localhost:2000");
  })