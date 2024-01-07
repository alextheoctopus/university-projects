import Method from '../Method';
import SquareRootMethod from '../../calcEquation/SquareRootMethod'
export default class BestRmsFitFunction extends Method {
    constructor(points, phi = 0, m = 0) {
        super(points);

        this.m = m ? m : 3;
        this.phi = phi ? phi : (x, i) => Math.pow(x, i) * (1 - x);

        this.sqrRootMethod = new SquareRootMethod();
    }

    calculateProximityMeasure() {
        let S = 0;
        for (let i = 0; i < this.m; i++) {
            S += Math.pow(this.phi(this.vectX[i], i) - this.vectY[i])
        }
        return S;
    }

    calculateCoefsA() {
        const C = this.matrMaths.createZeroMatrix(this.m);
        for (let k = 0; k < this.m; k++) {           //столбец
            for (let l = 0; l < this.m; l++) {       //строка
                let sum = 0;
                for (let i = 0; i < this.n; i++) {
                    sum += this.phi(this.vectX[i], k) * this.phi(this.vectX[i], l)
                }
                C[l][k] = sum;
            }
        }

        const b = this.vectMaths.createZeroVector(this.m);
        for (let k = 0; k < this.m; k++) {
            for (let i = 0; i < this.n; i++) {
                b[k] += this.phi(this.vectX[i], k) * this.vectY[i]
            }
        }

        return this.sqrRootMethod.solveTheEquation(C, b);
    }

    defineBestRmsFitFunc(x) {
        let PHI = 0;
        const a = this.calculateCoefsA(this.phi);
        for (let j = 0; j < this.m; j++) {
            PHI += a[j] * this.phi(x, j)
        }
        return PHI;
    }
}
