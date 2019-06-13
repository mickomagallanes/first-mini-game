# first-mini-game
this is my first attempt to make a game using Javascript.
so far I have learned about animations, and some javascript objects techniques.
Thanks to my Sifu Walker Fleck for helping me

visit here: https://mickomagallanes.github.io/first-mini-game/

Learned things:

1. I learned about the proper formula of ball collision. 

Before, I was calculating the center point of the BULLET if its inside the ENEMY's area. The formula I used is: (enemy.y + radius > bullet.y && enemy.y - radius < bullet.y) && (enemy.x + radius > bullet.x && enemy.x - radius < bullet.x). But how if the bullet has a large radius? So what I've done is getting their own maximum, minimum and center of x/y coordinates leading me to another problem: GARBAGE CODE. So I searched a solution on stackedoverflow and found a formula on solving the distance between 2 points.

It was mesmerizing surely, I didn't expected that it would worked so well. But I just wonder how does it magically computes the distance? So simple, everyone might know it, its the Pythagorean Theorem! The distance of the 2 center points can be found by drawing a line between those points, and then make a right triangle with that line as the hypotenuse. Solve for it and its done! 

