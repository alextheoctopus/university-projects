class HoletzkiyMethods {
    constructor(k, m) {
        this.k = k;
        this.m = m;
        this.A = [
            [12 + k, 2, m / 4, 1, 2],
            [4, 113 + k, 1, m / 10, m - 4],
            [1, 2, -24 - k, 3, 4],
            [1, 2 / m, 4, 33 + k, 4],
            [-1, 2, -3, 3 + m, -44 - k]
        ];
        this.D = [1, 2, 3, 4, 5];
        this.B = new Array(5);
        this.C = new Array(5);
        this.Y = new Array(5);
        this.X = new Array(5);
        this.DResult = new Array(5);
    }

    createAdditionalMatrix() {

        for (let i = 0; i < 5; i++) {
            // Создать подмассив в массиве,
            // выделить память для другого измерения
            this.B[i] = new Array();
            // Установить длину массива
            this.B[i].length = 5;
        }

        for (let i = 0; i < 5; i++) {
            this.C[i] = new Array();
            this.C[i].length = 5;
        }

        return this.B, this.C;
    }


    firstStep() {
        for (let i = 0; i <= this.A.length - 1; i++) {//(*)
            for (let j = 0; j <= this.A.length - 1; j++) {
                this.B[i][0] = this.A[i][0];
                this.C[0][j] = this.A[0][j] / this.B[0][0];
            }
        }
    }

    upperTriangleC() {
        for (let j = 1, i = 1; j <= this.A.length - 1, i <= this.A.length - 1; i++, j++) {
            this.C[i][j] = 1;//единичная диагональ
        }
        for (let i = 1; i < this.A.length; i++) {
            for (let j = 0; j < i; j++) {
                this.C[i][j] = 0;
            }//нолики внизу
        }
    }

    lowerTriangleB() {
        for (let i = 0; i < this.A.length - 1; i++) {
            for (let j = i + 1; j <= this.A.length - 1; j++) {
                this.B[i][j] = 0;
            }
        }
    }

    calculateElementsOfBC() {
        this.createAdditionalMatrix();
        this.firstStep();

        for (let i = 0, j = 0; i < this.A.length, j < this.A.length; i++, j++) {
            this.fillTheColumnB(i, j);
            this.fillTheStrokeC(i, j);
        }

        this.upperTriangleC();
        this.lowerTriangleB();
        this.Y[0] = this.D[0] / this.B[0][0];
        this.calculateYMatrix();
        this.X[4] = this.Y[4];
        this.calculateXMatrix();
        this.check();
    }

    fillTheColumnB(i, j) {
        while (i < this.A.length) {
            this.B[i][j] = this.A[i][j] - this.calculateSumB(i, j);
            i++;
        }

    }
    fillTheStrokeC(i, j) {
        while (j < this.A.length) {
            this.C[i][j] = (1 / this.B[i][i]) * (this.A[i][j] - this.calculateSumC(i, j));
            j++;
        }
    }

    calculateSumB(i, j) {
        let sum1_ = 0;
        for (let k = 0; k <= j - 1; k++) {
            sum1_ += this.B[i][k] * this.C[k][j];
        }
        return sum1_;
    }

    calculateSumC(i, j) {
        let sum1_ = 0;
        for (let k = 0; k <= i - 1; k++) {
            sum1_ += this.B[i][k] * this.C[k][j];
        }
        return sum1_;
    }

    calculateYMatrix() {
        for (let i = 0; i < this.A.length; i++) {
            this.Y[i] = (this.D[i] - this.calculateSumY(i)) / this.B[i][i];
        }
    }

    calculateSumY(i) {
        let sum = 0;
        let k = 0;
        while (k < i) {
            sum += this.B[i][k] * this.Y[k];
            k++;
        }
        return sum;
    }

    calculateXMatrix() {
        for (let i = this.A.length - 1; i >= 0; i--) {
            this.X[i] = this.Y[i] - this.calculateSumX(i);
        }
    }

    calculateSumX(i) {
        let sum = 0;
        let k = i + 1;
        while (k < this.A.length) {
            sum += this.C[i][k] * this.X[k];
            k++;
        }
        return sum;
    }
    check() {
        let res = 0;
        for (let i = 0; i < this.A.length; i++) {
            for (let j = 0; j < this.A.length; j++) {
                res = res + this.A[i][j] * this.X[j];
            }
            
            this.DResult[i] = res;
            res = 0;
        }
    }
}
export default HoletzkiyMethods;