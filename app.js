const http = require("http");
const dotenv = require("dotenv");
const fs = require("fs");
const express = require("express");

const path = require("path");
const mustacheExpress = require("mustache-express");

//au debut d fichier
dotenv.config();

/* const server = http.createServer((request, response) =>{
    //response.end('test server');
    if(request.method == "GET" && request.url =="/"){
        
        const file = fs.readFileSync('./public/index.html','utf-8');
        response.setHeader('Content-Type','text/html');
        
        response.statusCode = 200;

        console.log('success!');
        
        response.end(file);
        
    }else{
        
        const file = fs.readFileSync('./public/404.html','utf-8');
        response.setHeader('Content-Type','text/html');
        response.statusCode = 404;

        response.end(file);
    }
}) */

const server = express();
//////////

server.set('views', path.join(__dirname, 'views'));
server.set("view engine",'mustache');
server.engine('mustache', mustacheExpress())

//Middlewares
server.use(express.static(path.join(__dirname,"public")));

//Point d'acces
server.get('/donnees',(req, res)=>{
    //const test = {email:"akil@aol.ca"};

    // Ceci sera remplacee par un fetch ou appel a la DB
    const donnees = require("./data/donneesTest");

    res.statusCode = 200;
    res.json(donnees);
});

/**
 * @method GET
 * @param id
 * Permet d'acceder a un user
 */
server.get("/donnees/:id",(req, res)=>{
    console.log(req.params.id);

    const donnees = require("./data/donneesTest");
    // j chereche la donnee
    const user = donnees.find((element)=>{
        return element.id == req.params.id;
    })

    if(user){
        res.statusCode = 200;
        res.json(user);
    }else{
        res.statusCode = 404;
        res.json({ message: 'user not found !'})
    }
    //res.end(req.params.id)


});


// Doit etre la derniere !!
// gestion d une requete non trouvée

server.use((req, res)=>{
    //console.log(req);
    res.statusCode = 400;
    //res.send("requete non trouvee");

    // call mustache
    res.render('404',{ url: req.url})
});


server.listen(process.env.PORT, ()=>{
    console.log("Server is runing");
});