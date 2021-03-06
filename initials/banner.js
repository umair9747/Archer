//Import starts
// vars are unscoped, better use const instead
const figlet = require("figlet");
const align = require("align-text");
const chalk = require("chalk");
//Import ends

function data() {
  figlet("-ARCHER->", (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(align(chalk.green(data), 12));
    console.log(
      align(chalk.green("A Tool to Check for Response Status Codes"), 15)
    );
    console.log(align(chalk.green("Developed by Umair Nehri (0x9747)\n"), 32));
    console.log(
      align(
        chalk.blue(
          '"It is sometimes an appropriate response to reality to go insane." ~Philip K.'
        ),
        4
      )
    );
    console.log("");
    console.log(
      align(
        chalk.green(
          "[Use --help or -h flag for getting information about command usage]"
        ),
        6
      )
    );

    console.log("");
  });
}

module.exports = { data };
