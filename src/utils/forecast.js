const request = require("postman-request")

const forecast = function(latitude,longitude,callback){
    const url = "http://api.weatherstack.com/current?access_key=7d878834f2674376aefb1050e4e792b9&query="+latitude+","+longitude+"&units=f"
    request({url:url , json:true}, function(error,response){
        if(error){
            callback("Unable to connect to weather service :( ",undefined)
        }else if(response.body.error){
            callback("Unable to find location :( ",undefined)
        }else{
            callback(undefined,
                // temp:response.body.current.temperature,
                // feelsLike:response.body.current.feelslike,
                // weatherDescription:response.body.current.weather_descriptions[0],
                response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature+" degrees out. It feels like "+response.body.current.feelslike+" degrees out."
            )

        }
    })
}


module.exports = forecast

// Short Hand and Destructuring
// const forecast = function(latitude,longitude,callback){
//     const url = "http://api.weatherstack.com/current?access_key=7d878834f2674376aefb1050e4e792b9&query="+latitude+","+longitude+"&units=f"
//     request({url , json:true}, function(error,{ body }){
//         if(error){
//             callback("Unable to connect to weather service :( ",undefined)
//         }else if(body.error){
//             callback("Unable to find location :( ",undefined)
//         }else{
//             callback(undefined,
//                 // temp:response.body.current.temperature,
//                 // feelsLike:response.body.current.feelslike,
//                 // weatherDescription:response.body.current.weather_descriptions[0],
//                 body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out."
//             )

//         }
//     })
// }
