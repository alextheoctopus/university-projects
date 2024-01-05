import HoletzkiyMethods from "./HoletzkiyMethods";
const Holetzkiy = () => {
    const haletzkiy =
        new HoletzkiyMethods(
            29, 10
        );

    haletzkiy.calculateElementsOfBC();
    // let matrixA = [[41, 2, 2.5, 1, 2], [4, 142, 1, 1, 6], [1, 2, -53, 3, 4], [1, 0.2, 4, 62, 4], [-1, 2, -3, 13, -73]];
    // let matrixB = [[41, 0, 0, 0, 0], [4, 141.8, 0, 0, 0], [1, 1.951, -53.07, 0, 0], [1, 0.151, 3.938, 62.19, 0], [-1, 2.048, -2.94, 12.84, -74.1]];

    const result = (matrix) => {
        let newMatrix = matrix.map((value, i) => {
            if (i !== haletzkiy.DResult.length - 1) { return value = value + ", " } else { return value }
        });
        return newMatrix.map((stroke) => { return <p>{stroke}</p> });
    }
    const resultMatrixDouble = (matrix) => {
        let newMatrix = matrix.map((stroke, i) => {
            return stroke.map((point, i) => {
                if (i === 0) { return "[ " + point.toFixed(3) + " " }
                else if (i === stroke.length - 1) { return point.toFixed(3) + " ]" }
                else { return " " + point.toFixed(3) + " " }
            });
        });
        return newMatrix.map((stroke) => { return <p>{stroke}</p> });
    }
    return (
        <table width="100%" cellSpacing="0" cellPadding="5">
            <td width="300px" align="top">
                <h2>Метод Холецкого:</h2>
                <h2>Матрица A:</h2>
                {resultMatrixDouble(haletzkiy.A)}
                <h2>Матрица B:</h2>
                {resultMatrixDouble(haletzkiy.B)}
                <h2>Матрица C:</h2>
                {resultMatrixDouble(haletzkiy.C)}

                <h2>Матрица Y:</h2>
                <div>{result(haletzkiy.Y)}</div>


                <h2>Матрица X:</h2>
                <div>{result(haletzkiy.X)}</div>

                <h2>Проверка метода Халецкого :</h2>
                <div id="check">Проверка</div>
                <div>{result(haletzkiy.DResult)}</div>
            </td>

            <td></td>
        </table>
    );
}
export default Holetzkiy;