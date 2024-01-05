import HoletzkiyMethods from "../Holetzkiy/HoletzkiyMethods";
export default class ZeidelMethods {
    constructor() {
        this.H = new HoletzkiyMethods(29, 10);
        this.X = new Array(5);
        this.XPrev = [0, 0, 0, 0, 0];
        this.XNext = new Array(5);
        this.eps = 0.0001;
        this.length = this.H.A.length;
        this.q = 0;
        this.allVectors = [];
        this.DResults=[];
    }

    createPreparatoryMatrixX(previous) {
        for (let i = 0; i < this.length; i++) {
            this.X[i] = new Array(6);//создали пустую матрицу 5*6
        }
        this.fillXPrev(previous);//заполнили верхний треугольник предыдущим вектором и 6 столбец вектором d
    }

    fillXPrev(previous) {
        //заполним верхний треугольник предыдущим вектором
        for (let i = 0; i <= this.length; i++) {
            for (let j = i + 1; j <= this.length; j++) {
                this.X[i][j] = previous[j];
            }
        }
        for (let i = 0; i < this.length; i++) {
            this.X[i][this.length] = -this.H.D[i];//тут переносим сразу влево d с минусом 
        }
    }

    fillMatrixWithXNext() {

        //цикл по диагонали
        for (let i = 0, j = 0; j < this.length, i < this.length; i++, j++) {
            this.X[i][j] = this.zeidelCalculations(i, j);//производятся вычисления

            this.fillTheColumn(i, j);//как только нашёл новый элемент вектора,сразу заполняет под ним его столбец

        }

        this.getTheXNextVector();
        this.checkEps();
    }

    fillTheColumn(i, j) {
        for (let k = j; k < this.length; k++) {
            this.X[k][j] = this.X[i][j];
        }
    }

    zeidelCalculations(i, j) {
        let sum = 0;
        let coefficient = -1 / this.H.A[i][j];

        for (let r = 0; r < this.length; r++) {
            // у нас длина строки в матрице X 6 элементов , матрица 6х5
            // проверка на диагональное значение 
            if (i !== r) {
                sum += coefficient * (this.H.A[i][r] * this.X[i][r]);
            }

        }
        sum += coefficient * this.X[i][this.length];//добавляет d
        return sum;
    }

    getTheXNextVector() {

        let newVect = new Array(5);

        for (let i = 0; i < this.length; i++) {
            newVect[i] = this.X[this.length - 1][i];
        }

        this.XNext = newVect;

    }

    checkEps() {
        let value = new Array(5);

        for (let i = 0; i < this.XPrev.length; i++) {
            value[i] = Math.abs(this.XPrev[i] - this.XNext[i]);
        }


        let max = this.getMaxOfArray(value);
        this.checkConvergence();
        if (max > this.q * this.eps / (1 - this.q)) {
            this.allVectors.push(this.XNext);
            this.XPrev = this.XNext;
            this.createPreparatoryMatrixX(this.XPrev);
            this.fillMatrixWithXNext();
        } else {
            this.allVectors.push(this.XNext);
            this.checkTheResults();
        }
    }

    getMaxOfArray(array) {
        return Math.max.apply(null, array);
    }

    checkConvergence() {
        let q = 0;

        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (i !== j) {
                    q += Math.abs(this.H.A[i][j]);
                }
            }
            q = q / Math.abs(this.H.A[i][i]);
        }
        this.q = q;
    }

    checkTheResults() {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
                sum += this.H.A[i][j] * this.XNext[j];
            }
            this.DResults[i] = sum;
            sum = 0;
        }
    }
}