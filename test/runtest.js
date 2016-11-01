const tokenizer = require("../lib/parser/tokenizer.js");
const parser = require("../lib/parser/parser.js");
const interpreter = require("../lib/interpreter/interpreter.js");
const fs = require("fs");
const path = require("path");

function WILDCARD() {
    return WILDCARD;
}

var assertions = 0;
var fails = 0;
var success = 0;
function assert(cond) {
    ++assertions;
    if (cond) {
        ++success;
        console.log("Test #" + assertions + " passed");
        return true;
    } else {
        ++fails;
        console.log("Test #" + assertions + " failed");
        return false;
    }
}
function assert_eq_arr(x, y) {
    var b = true;
    for (var i = 0; i < x.length; ++i) {
        if (y[i] === WILDCARD) {
            continue;
        }
        if (x[i] !== y[i]) {
            console.log("Failed assertion: " + x[i] + " !== " + y[i])
            b = false;
            break;
        }
    }
    assert(b);
}

var interpreter_ = new interpreter.Interpreter();

function parseFile(filename) {
    filename = path.join(__dirname, filename);
    var code = fs.readFileSync(filename, {encoding: "utf8"});
    var tokens = tokenizer.tokenize(code);
    var ast = parser.parse(tokens);
    return ast;
}

function runFile(filename) {
    return interpreter_.exec(parseFile(filename));
}

function last(arr) {
    return arr[arr.length - 1];
}

assert(parseFile("parser.jl")); // It should parse correctly without errors
assert_eq_arr(runFile("math.jl"), [
    10.9e-5,
    -8e7,
    Math.PI,
    Math.E,
    Math.sin(5),
    Math.PI * 5 * 2,
    65536,
]);
assert_eq_arr(runFile("funcs.jl"), [
    WILDCARD,
    8,
    16,
    WILDCARD,
    26,
    165,
    55,
]);
assert_eq_arr(runFile("cond.jl"), [
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
]);
assert_eq_arr(runFile("control_flow.jl"), [
    1,
    0,
    WILDCARD,
    WILDCARD,
    WILDCARD,
    27,
]);
assert_eq_arr(runFile("eval.jl"), [
    55,
    55,
]);

console.log();
console.log("Tests ended");
console.log("===========");
console.log(assertions + " assertions, " + fails + " fails, " + success + " success");
