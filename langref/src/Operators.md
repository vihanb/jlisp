# Operators

If an operator is given more than two values, the operations will be chained. So `(+ 1 2 3)` in JLisp is equvalent to `1 + 2 + 3` in infix notation.

Some operators have a special meaning if given only 1 argument.

## Binary operators

(`<pipe>` is `|`, but it's like this in the table because the Markdown parser is non cooperative)

|Operator|Description|
|--------|-----------|
|`+`|Addition|
|`-`|Subtraction|
|`*`|Multiplication|
|`/`|Division|
|`%`|Modulo (Remainder of division)|
|`&`|Bitwise/logic and|
|`<pipe>`|Bitwise/logic or|
|`^`|Bitwise/logic xor|
|`>`|Greater than|
|`<`|Lesser than|
|`>=`|Greater than or equal|
|`<=`|Lesser than or equal|
|`=`|Equality|
|`=/`|Difference|

## Unary operators

|Operator|Description|
|--------|-----------|
|`+`|Numeric identity|
|`-`|Negation|
|`!`|Logic not|
|`~`|Bitwise not|
