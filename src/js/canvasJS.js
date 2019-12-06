const canvasFunction = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) {
        return
    }

    canvas.style.backgroundColor = "#BFEFFF";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stage = new createjs.Stage(canvas);

    class Shapes {
        constructor(x, y, stroke, strokeColor, fillColor) {
            this.x = x;
            this.y = y;
            this.stroke = stroke;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
        }
    };

    class Text extends Shapes {
        constructor(text, baseline, font, x, y, stage) {
            super(x, y);
            this.text = text;
            this.baseline = baseline;
            this.font = font;
            this.stage = stage;
        }
        textCreate() {
            const text = new createjs.Text(`${this.text}`, `${this.font}`, "#eb0029");
            text.x = this.x;
            text.y = this.y;
            text.textBaseline = this.baseline;
            text.textAlign = "center";
            this.stage.addChild(text);


        }
    };

    class Line extends Shapes {
        constructor(x, xTo, y, yTo, stroke, strokeColor, fillColor, stage) {
            super(x, y, stroke, strokeColor, fillColor);
            this.xTo = xTo;
            this.yTo = yTo;
            this.stage = stage;
        }

        createLine() {
            const sunlight = new createjs.Shape();
            sunlight.graphics.setStrokeStyle(this.stroke, "round").beginStroke(`${this.strokeColor}`).beginFill(`${this.fillColor}`);
            sunlight.graphics.moveTo(this.x, this.y);
            sunlight.graphics.lineTo(this.xTo, this.yTo);
            sunlight.graphics.endStroke();
            this.stage.addChild(sunlight);
        }
        get getStroke() {
            return this.stroke;
        }
        set changeStroke(n) {
            this.stroke = n;
        }
    };

    class Rect extends Shapes {
        constructor(x, width, y, height, stroke, strokeColor, fillColor, stage) {
            super(x, y, stroke, strokeColor, fillColor);
            this.width = width;
            this.height = height;
            this.stage = stage;
        }

        createRect() {
            const rect = new createjs.Shape();
            rect.graphics.setStrokeStyle(this.stroke, "round").beginStroke(`${this.strokeColor}`).beginFill(`${this.fillColor}`);
            rect.graphics.drawRect(this.x, this.y, this.width, this.height);
            rect.graphics.endFill();
            this.stage.addChild(rect);
        }
    };

    class Circle extends Shapes {
        constructor(radius, x, y, stroke, strokeColor, fillColor, appendTo) {
            super(x, y, stroke, strokeColor, fillColor);
            this.radius = radius;
            this.appendTo = appendTo
        }

        createCircle() {
            const circleObj = new createjs.Shape();
            circleObj.graphics.setStrokeStyle(this.stroke, "round").beginStroke(`${this.strokeColor}`).beginFill(`${this.fillColor}`).drawCircle(0, 0, this.radius);
            circleObj.x = this.x;
            circleObj.y = this.y;
            this.appendTo.addChild(circleObj);
        }
    }

    class Tree {
        constructor(containerX, containerY) {
            this.containerX = containerX;
            this.containerY = containerY;
        }
        createTree() {
            const container = new createjs.Container();

            const treeCore = new Line(0, 0, 80, -40, 10, "#533118", "#533118", container);
            treeCore.createLine();

            let elementOne = new createjs.Shape();
            elementOne.graphics.beginFill("#1c4966").drawPolyStar(0, 0, 85, 3, 0, 150);
            elementOne.lineJoin = "round";
            container.addChild(elementOne);

            let elementTwo = new createjs.Shape();
            elementTwo.graphics.beginFill("#1c4966").drawPolyStar(0, -50, 65, 3, 0, 150);
            elementTwo.lineJoin = "round";
            container.addChild(elementTwo);

            let elementThree = new createjs.Shape();
            elementThree.graphics.beginFill("#1c4966").drawPolyStar(0, -90, 45, 3, 0, 150);
            elementThree.lineJoin = "round";
            container.addChild(elementThree);

            container.x = this.containerX;
            container.y = this.containerY;
            stage.addChild(container);
        }
    }

    class LogoCircle {
        constructor(containerX, containerY) {
            this.containerX = containerX;
            this.containerY = containerY;
        }
        createLogo() {
            const container = new createjs.Container();

            const circle = new Circle(21, 4, -10, 3, "#eb0029", "#ffffff", container);
            circle.createCircle();

            const one = new Text("1", "alphabetic", "bold 30px Georgia", 0, 0, container);
            one.textCreate();

            const plus = new Text("+", "alphabetic", "bold 25px Georgia", 12, -7, container);
            plus.textCreate();

            container.x = this.containerX;
            container.y = this.containerY;
            stage.addChild(container);
        }
        get getYValue() {
            return this.containerY;
        }
        set setYValue(n) {
            this.containerY = n;
        }
    }

    createjs.Ticker.addEventListener("tick", handleTick);

    let y = 0;

    function handleTick() {
        y += 10;

        const horizon = new Rect(0, innerWidth, innerHeight / 2, innerHeight, 1, "#FDFDFD", "#FDFDFD", stage);
        horizon.createRect();

        const treeMaker = (array) => {
            let trees = new Array(array);

            for (let i = 0; i < array.length; ++i) {
                trees[i] = new Tree(innerWidth / array[i][0], innerHeight / array[i][1]);
            }

            return trees.map(i => {
                i.createTree();
            });
        };

        let treesCoordinates;

        if (window.innerWidth > 670) {

            let treesCoordinates = [
                [18, 1.5],
                [7, 1.8],
                [4, 2],
                [2.7, 1.5],
                [2, 1.9],
                [1.6, 1.6],
                [1.3, 1.8],
                [1.1, 2]
            ];

            treeMaker(treesCoordinates);
            const message = new Text("Join Our Christmas Sale", "alphabetic", "60px Georgia", innerWidth / 2, innerHeight / 4, stage);
            message.textCreate();
        }

        if (window.innerWidth <= 670 && window.innerWidth > 400) {

            let treesCoordinates = [
                [5, 1.2],
                [1.5, 1.8],
                [1.3, 1.2],
                [6, 2],
            ];

            treeMaker(treesCoordinates);
            const message = new Text("Join Our Christmas Sale", "alphabetic", "40px Georgia", innerWidth / 2, innerHeight / 4, stage);
            message.textCreate();
        }


        if (window.innerWidth <= 400) {

            let treesCoordinates = [
                [5, 1.5],
                [1.5, 1.8],
                [1.3, 1.2],
            ];

            treeMaker(treesCoordinates);
            const message = new Text("Join Our Christmas Sale", "alphabetic", "25px Georgia", innerWidth / 2, innerHeight / 4, stage);
            message.textCreate();
        }


        let logoCoordinates = [
            [18, 150],
            [1.3, 200],
            [1.5, 100],
            [1.8, 200],
            [1.2, 5],
            [20, 20],
            [2, 50],
            [7, 4],
            [1.1, 12],
            [8, 100],
            [14, 70],
            [5, 200],
            [2.5, 54],
            [6, 35],
            [3.7, 35],
            [2.7, 85],
            [4.7, 120],
            [2.2, 35],
            [3.2, 35],
            [4.2, 85],
            [6.6, 120],
            [1, 120],
            [1.19, 120]
        ];


        let logoCircle = new Array(logoCoordinates);

        for (let i = 0; i < logoCoordinates.length; ++i) {
            logoCircle[i] = new LogoCircle(innerWidth / logoCoordinates[i][0], y + logoCoordinates[i][1]);
        }
        logoCircle.map(i => {
            i.setYValue = y + i.getYValue;
            if (y > innerHeight) {
                y = 0
                if (i.getYValue > innerHeight) {
                    i.setYValue = y;
                }
            }
            i.createLogo();
        });


        stage.update();
        stage.removeAllChildren();
    }


}



window.addEventListener("resize", canvasFunction);
window.addEventListener("load", canvasFunction);