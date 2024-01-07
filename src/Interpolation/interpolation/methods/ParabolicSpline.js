import Method from '../Method';

export default class ParabolicSpline extends Method {
    constructor(points) {
        super(points);
    }

    defineParabolicSpline(x) {
        let vectX = this.vectX;
        let vectY = this.vectY;
        let a, b, c;
        a = [];
        b = [];
        c = [];
        b[0] = 0;

        for (let i = 0; i < this.n - 1; i++) {
            c[i] = this.vectY[i];
            b[i + 1] = 2 * (vectY[i + 1] - vectY[i]) / (vectX[i + 1] - vectX[i]) - b[i];
            a[i] = (b[i + 1] - b[i]) / (2 * (vectX[i + 1] - vectX[i]));
            if (x > vectX[i] && x < vectX[i + 1]) {
                return a[i] * Math.pow((x - vectX[i]), 2) + b[i] * (x - vectX[i]) + c[i];
            }
        }
    }
}
