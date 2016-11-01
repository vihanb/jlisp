import { tokenize } from "../parser/tokenizer.js";
import { parse } from "../parser/parser.js";
import { Interpreter } from "../interpreter/interpreter.js";
const path = require("path");
const prompt = require("prompt-sync")({
    history: require("prompt-sync-history")(
                     path.join(
                        process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"]),
                        ".jlisp.hist"),
});

let interpreter = new Interpreter();

let s;
let l;
while (true) {
    s = prompt("] ");
    if (!s) {
        break;
    }
    l = interpreter.exec(parse(tokenize(s)));
    if (l[l.length - 1] !== undefined) {
        console.log(l[l.length - 1]);
    }
}

prompt.history.save();
