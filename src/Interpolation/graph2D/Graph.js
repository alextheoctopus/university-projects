class Graph {
    constructor(WINDOW, width = 600, height = 600) {

        this.WINDOW = WINDOW ? WINDOW : {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10
        }

        if (document.querySelector('canvas')) {
            this.canvas = document.querySelector('canvas');
        } else {
            this.canvas = document.createElement('canvas');
            document.querySelector('body').appendChild(this.canvas)
        };

        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
    }

    xs = x => (x - this.WINDOW.LEFT) / this.WINDOW.WIDTH * this.canvas.width
    ys = y => (this.canvas.height - (y - this.WINDOW.BOTTOM) / this.WINDOW.HEIGHT * this.canvas.height)

    clear() {
        this.context.fillStyle = 'rgb(252, 252, 252)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    point(x, y, color = '#f00', size = 2) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.lineWidth = 2;
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.fill();
    }

    line(x1, y1, x2, y2, color) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    text(x, y, text, color = 'grey') {
        this.context.strokeStyle = color;
        this.context.font = '11px Courier';
        this.context.strokeText(text, this.xs(x), this.ys(y));
    }

    printOXY() {
        const x = this.WINDOW.LEFT;
        const y = this.WINDOW.BOTTOM;
        for (let i = 0; i < x + this.WINDOW.WIDTH; i++) {
            this.line(i, y + this.WINDOW.HEIGHT, i, y, '#ababab', 1);
            this.text(i + 0.01, 0.3, i);
        }
        for (let i = -1; i > x; i -= 1) {
            this.line(i, y + this.WINDOW.HEIGHT, i, y, '#ababab', 1);
            this.text(i, 0.3, i);
        }
        for (let i = 1; i < y + this.WINDOW.HEIGHT; i++) {
            this.line(x, i, x + this.WINDOW.WIDTH, i, '#ababab', 1);
            this.text(0.02, i + 0.1, i);
        }
        for (let i = -1; i > y; i -= 1) {
            this.line(x, i, x + this.WINDOW.WIDTH, i, '#ababab', 1);
            this.text(0.02, i + 0.1, i);
        }

        this.line(0, 0, 0, y + this.WINDOW.HEIGHT, 'black', 1);    //ось у
        this.line(0, y, 0, 0, 'black', 1);
        this.line(0, 0, x + this.WINDOW.WIDTH, 0, 'black', 1);     //ось х
        this.line(x, 0, 0, 0, 'black', 1);
    }

    printFunction(f, color = 'black', x1 = this.WINDOW.LEFT, x2 = this.WINDOW.LEFT + this.WINDOW.WIDTH) {
        const dx = this.WINDOW.WIDTH / 300;
        if (x1 > x2) {
            const t = x1;
            x1 = x2;
            x2 = t;
        }
        while (x1 < x2 && x1 < 2) {
            this.line(x1, f(x1), x1 + dx, f(x1 + dx), color);
            x1 += dx;
        }
    }
}
