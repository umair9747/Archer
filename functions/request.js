const align = require("align-text");
const str2json = require("string-to-json");
const chalk = require("chalk");

// avoid importing modules inside functions - it's better to not repeat the code unnecessarily
const createInterface = require("readline").createInterface;
const createReadStream = require("fs").createReadStream;
const request = require("request");


const statusCodePrint = async (statuscode, response, line) => {
  const op = `[+] ${line}: `;

  // about switch: see comment at line 78
  switch (statuscode) {
    case "200":
      console.log(align(chalk.green(op) + response.statusCode, 5));
      break;
    case "404":
      console.log(align(chalk.red(op) + response.statusCode, 5));
      break;
    default:
      console.log(align(chalk.yellow(op) + response.statusCode, 5));
  }
};

const requestOutputProcess = (line, error, response, statuscode) => {
  let output = {
    target: line,
    response,
  };

  if (error) output.response = "Error: domain doesn't exist";
  // since the two conditions give the same result, it's simpler to make them only one with the "||" (or) operator
  else if (response.statusCode.toString() === statuscode || statuscode === "any")
    output.response = response.statusCode;

  return str2json.convert(output);
};

function processStringOutput(file, statuscode) {
  const lineReader = createInterface({
    input: createReadStream(file),
  });

  lineReader.on("line", (line) => {
    const op = `[+] ${line}:`;
    request(line, (error, response) => {
      if (error) {
        console.log(align(`${chalk.red(op)} Error: domain doesn't exist`, 5));
      } else {
        if (response.statusCode == statuscode) {
          statusCodePrint(statuscode, response, line);
        } else if (statuscode == "any") {
          statusCodePrint(response.statusCode.toString(), response, line);
        }
      }
    });
  });
}

function processJSONOutput(file, statuscode) {
  const lineReader = createInterface({
    input: createReadStream(file),
  });

  lineReader.on("line", (line) => {
    request(line, (error, response) =>
      console.log(requestOutputProcess(line, error, response, statuscode))
    );
  });
}

// instead of putting all the stuff in one function, I separated the code into multiple functions
// that have their own purposes and they can be reused later in other places
function processTargets(file, statuscode, output) {
  console.log(align(chalk.blue("Archer is starting...\n"), 5));
  // switch is a more clean way to test the value of something, especially to avoid if, else if, else
  switch (output) {
    case "string":
      return processStringOutput(file, statuscode);
    case "json":
      return processJSONOutput(file, statuscode);
    default:
      console.log(
        align(
          chalk.red(
            "Please make sure you are using the correct arguments!\n \
          Refer to the help menu (--help or -h) for more details"
          ),
          5
        )
      );
  }
}

module.exports = { processTargets };
