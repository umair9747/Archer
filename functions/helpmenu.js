const align = require('align-text');
const colors = require('colors');

function menu(){
    console.log(align('Archer V1.0'.yellow, 5));
    console.log(align('Usage: node index.js [filename] [statuscodetoquery] [outputtype]'.yellow, 5));

    console.log("");
    console.log(align("FILENAME --".green ,5));
    console.log(align("Specifies the file name containing the domain list along with its full location".blue, 5));
    console.log(align("Note: Make sure the data is stored in txt format".blue, 5))
    console.log(align("Example: /home/user/Desktop/file.txt".red, 5));
    
    console.log("");
    console.log(align("STATUS CODE TO QUERY --".green ,5));
    console.log(align("Specifies the status codes you would like to be displayed".blue, 5));
    console.log(align("Example: 200/404/302/all".red, 5));

    console.log("");
    console.log(align("OUTPUT TYPE --".green, 5));
    console.log(align("Specifies the format for the output which will be displayed".blue, 5))
    console.log(align("Example: string/json".red, 5));

    console.log("");
    console.log(align("EXAMPLE USAGE -- ".green ,5));
    console.log(align("node index.js /home/user/Desktop/domains.txt 200 string".red,5 ))

}

module.exports = {menu};