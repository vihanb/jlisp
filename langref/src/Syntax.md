# Syntax

JLisp is a Lisp dialect. So, you will see a lot of parentheses.

## Comments

Comments starts with a `;` and spend the entire line.

## Calls

Function calls are matched by the following EBNF grammar:

    call = '(' expr+ ')'

## Identifiers

Identifiers are composed of alphanumeric characters, and can also contains underscores and dashs.

There are also some special identifiers (The operators):

    + - * / % ^ & | > < >= <= = =/ ! ~

## Literals

### Number literals

Number literals support floats and the `e` notation.

Examples:

    10 ; => 10
    1e7 ; => 10000000
    8.75e3 ; => 8750
    7.3 ; => 7.3
    5e-1 ; => 0.5

### String literals

String literals starts with a `"` and end at the matching `"`, or starts with a `'` and transform an identifier into a string.

Examples:

    "Hello, World!"
    'hello-world

### List literals

List literals are like function calls, but are precedded by a `'`.

There is also a special case, `()`, which is an empty list, not a function call.

Examples:

    '(1 2 3 4) ; => [1, 2, 3, 4]
    () ; => []

### Block literals

Blocks are simply chunks of AST matched by the following EBNF syntax:

    block = '{' expr+ '}'
