const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode") 
const forecast = require("./utils/forecast")

// console.log(__dirname);
// console.log(__filename);
// console.log();
const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

// Setup handlebars engine and views location and partials path
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
// app.use(express.static("public"))
app.use(express.static(publicDirectoryPath))


app.get("",function(req,res){
    res.render("index",{
        title:"Weather App",
        name:"Razeen Aman"
    })
})

app.get("/about",function(req,res){
    res.render("about",{
        title:"About Me",
        name:"Razeen Aman"
    })
})


app.get("/help",function(req,res){
    res.render("help",{
        title:"Help",
        helpText:"This is some helpful text.",
        name:"Razeen Aman"
    })
})

app.get("/help/*",function(req,res){
    res.render("404help",{
        title:"404",
        name:"Razeen Aman",
        helpErrorMessage:"Help Article Not Found"
    })
})

app.get("/weather",function(req,res){
    const address = req.query.address
    if(!address){
        res.send({
            error:"You must provide an address."
        })
    }else{
        geocode(address,function(g_error,g_data){
            if(g_error){
                res.send({
                    error:"Unable to find location.Try another search"
                });
            }else{
                forecast(g_data.latitude,g_data.longitude,function(f_error,f_data){
                    if(f_error){
                        console.log(f_error);
                    }else{
                        res.send([
                            {
                                forecast:f_data,
                                location:g_data.location,
                            }
                        ])
                    }
                })
            }
        })
       
    }
    
})



app.get("*",function(req,res){
    res.render("404",{
        title:"404",
        errorMessage:"Page Not Found",
        name:"Razeen Aman"
    })
})

app.listen(3000, function(){
    console.log("Server is up on port 3000");
})


// app.get("/products",function(req,res){
//     if(!req.query.search){
//         res.send({
//             error:"You must provide a search term"
//         })
//     }else{
//         console.log(req.query.search);
//         res.send({
//             products:[]
//         })
//     }
    
// })