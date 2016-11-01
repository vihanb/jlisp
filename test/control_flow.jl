(if true {1} {0})
(if false {1} {0})
(set 'x 0)
(set 'y 0)
(while {(< x 9)} {(set 'y (+ y 3)) (set 'x (+ x 1))})
y
