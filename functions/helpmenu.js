const align = require("align-text");
const chalk = require("chalk");

function menu() {
  console.log(align(chalk.yellow("Archer V1.0"), 5));
  console.log(
    align(
      chalk.yellow(
        "Usage: node index.js [filename] [statuscodetoquery] [outputtype]"
      ),
      5
    )
  );

  console.log("");
  console.log(align(chalk.green("FILENAME --"), 5));
  console.log(
    align(
      chalk.blue(
        "Specifies the file name containing the domain list along with its full location"
      ),
      5
    )
  );
  console.log(
    align(chalk.blue("Note: Make sure the data is stored in txt format"), 5)
  );
  console.log(align(chalk.magenta("Example: /home/user/Desktop/file.txt"), 5));

  console.log("");
  console.log(align(chalk.green("STATUS CODE TO QUERY --"), 5));
  console.log(
    align(
      chalk.blue("Specifies the status codes you would like to be displayed"),
      5
    )
  );
  console.log(align(chalk.magenta("Example: 200/404/302/all"), 5));

  console.log("");
  console.log(align(chalk.green("OUTPUT TYPE --"), 5));
  console.log(
    align(
      chalk.blue("Specifies the format for the output which will be displayed by archer."),
      5
    )
  );
  console.log(align(chalk.magenta("Example: string/json"), 5));

  console.log("");
  console.log(align(chalk.green("EXAMPLE USAGE -- "), 5));
  console.log(
    align(
      chalk.magenta(
        "node index.js /home/user/Desktop/alldomains.txt 200 string"
      ),
      5
    )
  );
}

module.exports = { menu };
