const align = require("align-text");
const str2json = require("string-to-json");
const createInterface = require("readline").createInterface;
const createReadStream = require("fs").createReadStream;
const request = require("request");
const chalk = require("chalk");

const statusCodePrint = async (statuscode, response, line) => {
  const op = `[+] ${line}: `;
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
  else if (response.statusCode === statuscode || statuscode === "any")
    output.response = response.statusCode;

  return str2json.convert(output);
};

function processStringOutput(file, statuscode) {
  const lineReader = createInterface({
    input: createReadStream(file),
  });

  lineReader.on("line", (line) => {
    const op = `[+] ${line}:`;
    request(line, async (error, response) => {
      if (error) {
        console.log(align(`${chalk.red(op)} Error: domain doesn't exist`, 5));
      } else {
        if (response.statusCode == statuscode) {
          //console.log(line + ":", response.statusCode);
          await statusCodePrint(statuscode, response, line);
        } else if (statuscode == "any") {
          await statusCodePrint(response.statusCode.toString(), response, line);
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

function processTargets(file, statuscode, output) {
  console.log(align(chalk.blue("Archer is starting...\n"), 5));
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
