const getinput = require("../initials/input");
const help = require("../functions/helpmenu");
const align = require("align-text");
const request = require("../functions/request");
const chalk = require("chalk");

function process() {
  const input = getinput.input();

  if (!input[0])
    console.log(
      align(
        chalk.red(
          "Please provide the minimum number of arguments to run this program!"
        ),
        5
      )
    );
  else if (input[0] === "--help" || input[0] === "-h") help.menu();
  else {
    if (input.length < 3) console.log("");
    const [filename, statuscodetoquery, outputtype] = input.slice(0, 3);
    request.processTargets(filename, statuscodetoquery, outputtype);
  }
}

module.exports = { process };
