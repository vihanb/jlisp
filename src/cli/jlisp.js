import { tokenize } from "../parser/tokenizer.js";
import { parse } from "../parser/parser.js";
import { Interpreter } from "../interpreter/interpreter.js";

const program = require("commander");
const fs = require("fs");

let code = "";

program.version("0.0.1")
       .arguments("<file> [files...]")
       .action(function(file, files) {
           code += fs.readFileSync(file, {encoding: "utf8"});
           if (files) {
               files.forEach(function(file) {
                   code += fs.readFileSync(file, {encoding: "utf8"});
               });
           }
       })
       .parse(process.argv);

let tokens = tokenize(code);
let ast = parse(tokens);
let interpreter = new Interpreter();
interpreter.exec(ast);
