const getinput = require('../initials/input');
const help = require('../functions/helpmenu');
const align = require('align-text');
var request = require('../functions/request');

function process(){
    var input = getinput.input();
    var inputlength = input.length;
    var filename;
    var statuscodetoquery;
    var outputtype;

    if(!input[0]){
        console.log(align("Please provide the minimum number of arguments to run this program!".red, 5));
    }
    else if(input[0] == "--help" || input[0] == "-h"){
        help.menu();
    }
    else {
        if(inputlength < 3){
            console.log("");
        }
        filename = input[0];
        statuscodetoquery = input[1];
        outputtype = input[2];
        request.processtargets(filename, statuscodetoquery, outputtype);
  }

}

module.exports = {process};