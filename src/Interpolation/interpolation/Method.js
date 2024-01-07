import VectorOperations from '../methods/VectorOperations';
import MatrixOperations from '../methods/MatrixOperations';

export default class Method {

    constructor(points = []) {

        this.vectMaths = new VectorOperations();
        this.matrMaths = new MatrixOperations();

        this.points = points;
        this.vectX = [];
        this.vectY = [];

        this.points.forEach(point => {
            this.vectX.push(point.x);
            this.vectY.push(point.y);
        });

        this.n = points.length;
    }

}