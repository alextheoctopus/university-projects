import Method from '../Method';
export default class NewtonPolynom extends Method {

    round = x => Math.round(x * 100) / 100;

    try(){
        console.log(999);
    }
    defineDividedDifferences() {

        const matrix = this.matrMaths.createZeroMatrix(this.n)
        for (let i = 0; i < this.n; i++) {               //столбец
            for (let j = 0; j < this.n - i; j++) {       //строка
                if (i === 0) {
                    matrix[j][i] = this.vectY[j]
                } else {
                    matrix[j][i] = (matrix[j + 1][i - 1] - matrix[j][i - 1]) / (this.vectX[i + j] - this.vectX[j])
                }
            }
        }

        return matrix;
    
    }

    defineYbyNewtonPoly(x) {
        let divDiffMatrix = this.defineDividedDifferences(this.points)
        let xPolies = x - this.vectX[0];

        let y = this.vectY[0];

        for (let i = 1; i < this.n; i++) {
            y += divDiffMatrix[0][i] * xPolies
            xPolies *= x - this.vectX[i]
        }
        console.log(y);
        return y;
    }

    polynomInStr() {
        let divDiffMatrix = this.defineDividedDifferences(this.points)
        let xPolies = `(x - ${this.vectX[0]})`;
        let str = `N(x) = ${this.round(this.vectY[0])}`;
        for (let i = 1; i < this.n; i++) {
            str += `+ ${this.round(divDiffMatrix[0][i])} * ${xPolies} `
            xPolies += `(x - ${this.vectX[i]})`
        }
        return str;
    }
}