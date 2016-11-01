import { tokenize } from "../parser/tokenizer.js";
import { parse } from "../parser/parser.js";

function makeOp(func, ufunc) {
    let f = [undefined];
    f[0] = function(x) {
        if (arguments.length === 0) {
            return f[0];
        } else if (arguments.length === 1 && ufunc) {
            return ufunc(x);
        } else if (!func) {
            return ufunc(x);
        }
        let acc = x || 0;
        for (let e of [...arguments].slice(1)) {
            acc = func(acc, e);
        }
        return acc;
    };
    return f[0];
}

/**
 * JLisp interpreter
 * @since 0.0.1
 */
class Interpreter {
    constructor() {
        this.scope = [{
            "+": makeOp((x, y) => x + y, x => +x),
            "-": makeOp((x, y) => x - y, x => -x),
            "*": makeOp((x, y) => x * y),
            "/": makeOp((x, y) => x / y),
            "%": makeOp((x, y) => x % y),
            "|": makeOp((x, y) => x | y),
            "&": makeOp((x, y) => x & y),
            "^": makeOp((x, y) => x ^ y),
            "!": makeOp(undefined, x => !x),
            "~": makeOp(undefined, x => ~x),
            ">": makeOp((x, y) => x > y),
            "<": makeOp((x, y) => x < y),
            ">=": makeOp((x, y) => x >= y),
            "<=": makeOp((x, y) => x <= y),
            "=": makeOp((x, y) => x === y),
            "=/": makeOp((x, y) => x !== y),

            "true": true,
            "false": false,
            "undefined": undefined,
            "Infinity": Infinity,
            "NaN": NaN,
            "pi": Math.PI,
            "e": Math.E,

            "write": function(x) {
                process.stdout.write("" + x);
            },
            "write-line": function(x) {
                if (x === undefined) {
                    console.log();
                } else {
                    console.log(x);
                }
            },
            "set": function(name, value) {
                this.scope[this.scope.length - 1][name] = value;
            },
            "get": function(name) {
                return this.getVar(name);
            },
            "lambda": function(args, body) {
                return function() {
                    let s = {};
                    for (let i = 0; i < args.length; ++i) {
                        s[args[i]] = arguments[i];
                    }
                    this.scope.push(s);
                    let r = this.exec(body);
                    this.scope.pop();
                    if (r.length > 0) {
                        return r[r.length - 1];
                    }
                }.bind(this);
            },
            "car": function(arr) {
                return arr[0];
            },
            "cdr": function(arr) {
                return arr.slice(1);
            },
            "cons": function() {
                return [...arguments];
            },
            "if": function(cond, a, b) {
                let x = cond ? a : b;
                let l;
                return (l = this.exec(x))[l.length - 1];
            },
            "while": function(cond, b) {
                let l;
                while ((l = this.exec(cond))[l.length - 1]) {
                    this.exec(b);
                }
            },
            "map": function(arr, func) {
                let n = [];
                for (let x of arr) {
                    n.push(func(x));
                }
                return n;
            },
            "filter": function(arr, func) {
                let n = [];
                for (let x of arr) {
                    if (func(x)) {
                        n.push(x);
                    }
                }
                return n;
            },
            "range": function(x, y) {
                let arr = [];
                for (let i = x; i < y; ++i) {
                    arr.push(i);
                }
                return arr;
            },
            "at": function(arr, i) {
                return arr[i];
            },
            "len": function(arr) {
                return arr.length;
            },
            "sin": function(n) {
                return Math.sin(n);
            },
            "cos": function(n) {
                return Math.cos(n);
            },
            "tan": function(n) {
                return Math.tan(n);
            },
            "sqrt": function(n) {
                return Math.sqrt(n);
            },
            "pow": function(x, y) {
                return Math.pow(x, y);
            },
            "sum": function(arr) {
                let n = 0;
                for (let x of arr) {
                    n += x;
                }
                return n;
            },
            "apply": function(func, arr) {
                return func(...arr);
            },
            "eval": function(code) {
                let l = this.exec(parse(tokenize(code)));
                return l[l.length - 1];
            },
            "exec": function(code) {
                return this.exec(parse(tokenize(code)));
            },
        }];
    }

    /**
     * Get the value of a variable (browse each scope from the last to the first)
     * @param {String} name - The name of the variable
     * @return {Object} The value of the variable
     * @since 0.0.1
     */
    getVar(name) {
        for (let i = this.scope.length - 1; i >= 0; --i) {
            if (name in this.scope[i]) {
                return this.scope[i][name];
            }
        }
        return undefined;
    }

    /**
     * Evaluate a single AST element (Not a raw code!)
     * @param {Object} ast - The AST element
     * @return {Object} The evaluated value
     * @since 0.0.1
     */
    eval(ast) {
        if (ast.type === "Number") {
            return parseFloat(ast.value);
        } else if (ast.type === "String") {
            return ast.value;
        } else if (ast.type === "List") {
            return this.exec(ast.value);
        } else if (ast.type === "Call") {
            let l = this.exec(ast.value);
            return l[0].call(this, ...l.slice(1));
        } else if (ast.type === "Variable") {
            return this.getVar(ast.value);
        } else if (ast.type === "Code") {
            return ast.value;
        }
    }
    /**
     * Evaluate an entire AST (Not a raw code!)
     * @param {Array} ast - The AST
     * @return {Array} The evaluated value of each element
     */
    exec(ast) {
        let arr = [];
        for (let elm of ast) {
            arr.push(this.eval(elm));
        }
        return arr;
    }
}

export { Interpreter };
