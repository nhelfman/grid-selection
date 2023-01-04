Grid selection - PaintWorklet
=========================================================
Demo for grid selection using PaintWorklet (CSSPaint API). 
The goal is to being able to perform smooth and fast selection without inducing renderer layout.

Since the drawing of the selection highlight happens in the paint phase no layout is required.

Test page to see this in action:
https://nhelfman.github.io/grid-selection/index.html

To run locally need to have a web server. E.g.:
```
>npm install -g http-server
>http-server
...

```

Open Chrome on http://localhost:8080

Use mouse to select on grid.

![image](https://user-images.githubusercontent.com/6101900/203783096-78cfbf5b-9f9a-4ba0-84f3-66d3d5969965.png)
