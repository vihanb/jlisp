# Standard library

See [Operators](Operators.html) for documentation on operators.

## Variables

|Variable|Value|
|--------|-----|
|`true`|True|
|`false`|False|
|`undefined`|Null|
|`Infinity`|Infinity|
|`NaN`|Not a number|
|`pi`|Mathematical constant pi|
|`e`|Euler's constant|

## Functions

|Name|Usage|Description|
|----|-----|-----------|
|`write`|`(write Object)`|Write something to stdout|
|`write-line`|`(write-line Object)`|Write something to stdout with a newline|
|`set`|`(set String Object)`|Set a variable|
|`get`|`(get String) -> Object`|Get the value of a variable|
|`lambda`|`(lambda List Block) -> Function`|Create a lambda|
|`car`|`(car List) -> List`|Get the first element of a list|
|`cdr`|`(cdr List) -> List`|Drop the first element of a list|
|`cons`|`(cons Object...) -> List`|Create a list (equivalent to `'(Object...)`)|
|`if`|`(if Boolean Block Block) -> Object`|Execute the first block if the condition is true, the second otherwise|
|`while`|`(while Block->Boolean Block)`|While evaluating the first block is true, execute the second|
|`map`|`(map List Function) -> List`|Map a function on a list|
|`filter`|`(filter List Function->Boolean) -> List`|Filter a list|
|`range`|`(range Number Number) -> List`|Get a `[x..y)` range|
|`at`|`(at List Number) -> Object`|List indexing|
|`len`|`(len List) -> Number`|Length of a list|
|`sin`|`(sin Number) -> Number`|Sinus of a number|
|`cos`|`(cos Number) -> Number`|Cosinus of a number|
|`tan`|`(tan Number) -> Number`|Tangeant of a number|
|`sqrt`|`(sqrt Number) -> Number`|Square root of a number|
|`pow`|`(pow Number Number) -> Number`|Raise a number to another|
|`sum`|`(sum List) -> Object`|Sum a list (equivalent to `(apply + List)`)|
|`apply`|`(apply Function List) -> Object`|Apply a list of argument to a function|
|`eval`|`(eval String) -> Object`|Evaluate a JLisp code|
|`exec`|`(exec String) -> List`|Evaluate a JLisp code and get all intermediate values|
