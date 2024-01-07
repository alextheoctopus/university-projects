import MatrixOperations from '../methods/MatrixOperations';
import VectorOperations from '../methods/VectorOperations';


export default class SquareRootMethod {
    constructor() {
        this.matrOperations = new MatrixOperations();
        this.vectOperations = new VectorOperations();
    }

    defineMatrixT(givenMatrix) {
        let n = givenMatrix[0].length;
        let T = this.matrOperations.createZeroMatrix(n);
        T[0][0] = (Math.pow(givenMatrix[0][0], 0.5));

        for (let j = 1; j < n; j++) {
            T[0][j] = (givenMatrix[0][j] / T[0][0]);
        }

        for (let i = 1; i < n; i++) {
            let sum = 0;
            for (let k = 0; k < i; k++) {
                sum += Math.pow(T[k][i], 2)
            }
            T[i][i] = (Math.pow(givenMatrix[i][i] - sum, 0.5))
            for (let j = i + 1; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < i; k++)
                    sum += T[k][i] * T[k][j];
                T[i][j] = ((givenMatrix[i][j] - sum) / T[i][i])
            }
        }

        return T;
    }

    defineY(T, b) {
        let n = T[0].length;
        let y = this.vectOperations.createZeroVector(n);

        y[0] = (b[0] / T[0][0]);

        for (let i = 1; i < n; i++) {
            let sum = 0;
            for (let k = 0; k < i; k++) {
                sum += T[k][i] * y[k]
            }
            y[i] = ((b[i] - sum) / T[i][i])
        }

        return y;
    }

    solveTheEquation(A, b) {
        let transposedMatrix = this.matrOperations.transposeMatrix(A);

        if (A > transposedMatrix || A < transposedMatrix) {
            A = this.matrOperations.multiplyMatrices(transposedMatrix, A);
            b = this.matrOperations.multiplyMatrixByVector(transposedMatrix, b);
        }

        let T = this.defineMatrixT(A);
        let y = this.defineY(T, b);
        let n = A[0].length;
        let x = this.vectOperations.createZeroVector(n);

        x[n - 1] = (y[n - 1] / T[n - 1][n - 1]);

        for (let i = n - 1; i > -1; i--) {
            let sum = 0;
            for (let k = i + 1; k < n; k++) {
                sum += T[i][k] * x[k]
            }
            x[i] = ((y[i] - sum) / T[i][i])
        }

        return x;
    }
    
    check(A, b, x) {
        let result = this.matrOperations.multiplyMatrixByVector(A, x).map(val => Math.round(val));
        return {
            isCorrect: (!(b > result || b < result)),
            result
        };
    }
}