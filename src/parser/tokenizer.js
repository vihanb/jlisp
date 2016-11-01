// JLisp tokenizer

class TokenizerError extends Error {}

function makeToken(type, value, line, column) {
    return {type: type, value: value, line: line, column: column};
}

const SYMBOLS = new Map([
    ["(", "LPar"],
    [")", "RPar"],
    ["{", "LBrc"],
    ["}", "RBrc"],
]);

for (let c of "+-*/%!~&|^'") {
    SYMBOLS.set(c, "Variable");
}

/**
 * Main tokenizer function
 * @param {String} code - The code to tokenize
 * @return {Array} Array of tokens with the format `{type: String, value: String, line: Number, column: Number}`
 * @since 0.0.1
 */
function tokenize(code) {
    let tokens = [];
    let buf = "";
    let line = 1;
    let column = 1;
    for (let i = 0; i < code.length; ++i) {
        let c = code[i];
        let d = code[i + 1];
        if (c === "\r" ||
            c === "\n") {
            ++line;
            if (c === "\r" && d === "\n") {
                ++i;
            }
            column = 0;
        } else if (c === ";") {
            while (i < code.length &&
                   !(c === "\n" ||
                     c === "\r")) {
                c = code[++i];
            }
            ++line;
            if (c === "\r" && d === "\n") {
                ++i;
            }
            column = 0;
        } else if ((c >= "0" && c <= "9") ||
                   (c === "-" &&
                    (d >= "0" && d <= "9"))) {
            buf = c;
            while ((d >= "0" && d <= "9") ||
                   d === "." ||
                   d === "e" ||
                   d === "-") {
                c = code[++i];
                d = code[i + 1];
                buf += c;
            }
            tokens.push(makeToken("Number", buf, line, column));
            column += buf.length;
        } else if (c === ">" ||
                   c === "<") {
            buf = c;
            if (d === "=") {
                buf += d;
                ++i;
            }
            tokens.push(makeToken("Variable", buf, line, column));
            column += buf.length;
        } else if (c === "=") {
            buf = c;
            if (d === "/") {
                buf += d;
                ++i;
            }
            tokens.push(makeToken("Variable", buf, line, column));
            column += buf.length;
        } else if (SYMBOLS.has(c)) {
            tokens.push(makeToken(SYMBOLS.get(c), c, line, column)); ++column;
        } else if (c === " ") {
            ++column;
        } else if ((c >= "a" && c <= "z") ||
                   (c >= "A" && c <= "Z")) {
            buf = c;
            while ((d >= "a" && d <= "z") ||
                   (d >= "A" && d <= "Z") ||
                   (d >= "0" && d <= "9") ||
                   d === "_" ||
                   d === "-") {
                c = code[++i];
                d = code[i + 1];
                buf += c;
            }
            tokens.push(makeToken("Variable", buf, line, column));
            column += buf.length;
        } else if (c === "\"") {
            buf = "";
            while (d !== "\"") {
                if (i > code.length) {
                    throw new TokenizerError("Unexpected EOF");
                }
                c = code[++i];
                d = code[i + 1];
                buf += c;
            }
            ++i;
            tokens.push(makeToken("String", buf, line, column));
            ++column;
            for (let j = 0; j < buf.length; ++j) {
                if (buf[j] === "\r" ||
                    buf[j] === "\n") {
                    ++line;
                    if (buf[j] === "\r" && buf[j + 1] === "\n") {
                        ++i;
                    }
                    column = 0;
                } else {
                    ++column;
                }
            }
            ++column;
        } else {
            throw new TokenizerError(`Can't tokenize the character ${c} at L${line}C${column}`);
        }
    }
    tokens.push(makeToken("EOF", undefined, line, column));
    return tokens;
}

export { tokenize, TokenizerError };
