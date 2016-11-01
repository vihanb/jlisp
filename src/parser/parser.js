// JLisp parser

class ParseError extends Error {}

function fixloc(token, ast) {
    ast.line = token.line;
    ast.column = token.column;
    return ast;
}

function parseExpr(tokens) {
    let token = tokens.shift();
    if (token.type === "LPar") {
        if (tokens[0].type === "RPar") {
            tokens.shift();
            return fixloc(token, {type: "List", value: []});
        }
        return fixloc(token, {type: "Call", value: parse(tokens, "RPar")});
    } else if (token.type === "LBrc") {
        return fixloc(token, {type: "Code", value: parse(tokens, "RBrc")});
    } else if (token.value === "'") {
        token = tokens.shift();
        if (token.type === "Variable") {
            return fixloc(token, {type: "String", value: token.value});
        } else if (token.type === "LPar") {
            return fixloc(token, {type: "List", value: parse(tokens, "RPar")});
        }
        tokens.unshift(token);
        return parseExpr(tokens);
    } else if (token.type === "RPar") {
        throw new ParseError(`Unexpected right parenthesis at L${token.line}C${token.column}`);
    } else if (token.type === "RBrc") {
        throw new ParseError(`Unexpected right brace at L${token.line}C${token.column}`);
    } else if (token.type === "Number" ||
               token.type === "String" ||
               token.type === "Variable") {
        return token;
    }
}

/**
 * Main parser function
 * @param {Array} tokens - The tokens
 * @param {Object} until - Token ending the parsing
 * @return {Object} An AST
 * @since 0.0.1
 */
function parse(tokens, until = "EOF") {
    let ast = [];
    while (tokens[0].type !== until) {
        if (tokens[0].type === "EOF") {
            throw new ParseError("Unexpected EOF");
        }
        ast.push(parseExpr(tokens));
    }
    tokens.shift();
    return ast;
}

export { parse, ParseError };
