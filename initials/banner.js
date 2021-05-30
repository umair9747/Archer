//Import starts
var figlet = require('figlet');
var colors = require('colors');
var align = require('align-text');
//Import ends

function data(){
figlet('-ARCHER->', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(align(data.green, 12))
    console.log(align("A Tool to Check for Response Status Codes".green, 15))
    console.log(align("Developed by Umair Nehri (0x9747)".green, 32))
    console.log("");
    console.log(align("\"It is sometimes an appropriate response to reality to go insane.\" ~Philip K.".blue, 4));
    console.log("");
    console.log(align("[Use --help or -h flag for getting information about command usage]".green, 6));

    console.log("");
    });
}

module.exports = {data};