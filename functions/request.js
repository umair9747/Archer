const align = require('align-text');
const colors = require('colors');

function processtargets(file, statuscode, output){
    console.log(align("Archer is starting...".blue, 5));
    console.log("");
    //start of string
    if (output == "string"){
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
      });
      
      lineReader.on('line', function (line) {
        const request = require('request');
        request(line, function (error, response, body) {
            var op = "[+] " + line + " : ";
         
          if(error){
            var coloredop = op.red;
            console.log(align(coloredop + " domain doesn't exists", 5));
          }
          else{
          if(response.statusCode == statuscode){
            //console.log(line + ":", response.statusCode);
            if(statuscode == 200){
                var coloredop = op.green;
                console.log(align(coloredop + response.statusCode, 5))
            }
            else if(statuscode == 404){
                var coloredop = op.red;
                console.log(align(coloredop + response.statusCode, 5))
            }
            else {
                var coloredop = op.yellow;
                console.log(align(coloredop + response.statusCode, 5))
            }
        }

        else if(statuscode == "any"){
            
          if(response.statusCode == 200){
            var coloredop = op.green;
            console.log(align(coloredop + response.statusCode, 5))
        }
        else if(response.statusCode == 404){
            var coloredop = op.red;
            console.log(align(coloredop + response.statusCode, 5))
        }
        else {
            var coloredop = op.yellow;
            console.log(align(coloredop + response.statusCode, 5))
        }

        }
      }

        
        });
      });
    }
    //end of string

    //start of json
    else if (output == "json"){
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(file)
          });
          
          lineReader.on('line', function (line) {
            const request = require('request');
            request(line, function (error, response, body) {
              if(error){
                var str2json = require('string-to-json');
                var output = str2json.convert({"target":line, "response":"domain doesn't exists"});
                console.log(output);
              }
              else{
                   if(response.statusCode == statuscode){
                var str2json = require('string-to-json');
                var output = str2json.convert({"target":line, "response":response.statusCode});
                  
                console.log(output);
                   }
                   else if (statuscode == "any"){
                    var str2json = require('string-to-json');
                    var output = str2json.convert({"target":line, "response":response.statusCode});
                      
                    console.log(output);
                   }
              }
            });
          });
        }

    else if (output != "json" && output != "string"){
        console.log(align("Please make sure you are using the correct arguments!".red ,5));
        console.log(align("Refer to the help menu (--help or -h) for more details".red, 5));
    }
}

module.exports = {processtargets};