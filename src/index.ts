import figlet from "figlet";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

console.log(chalk.blue(figlet.textSync("Hello World!")));
