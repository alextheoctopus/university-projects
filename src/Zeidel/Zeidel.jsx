import ZeidelMethods from "./ZeidelMethods";
const Zeidel = () => {
    const z = new ZeidelMethods();
    z.createPreparatoryMatrixX(z.XPrev);
    z.fillMatrixWithXNext();

    let answer = [];
    z.allVectors[z.allVectors.length - 1].forEach((value, index) => {
        index === 0 ? answer.push("(" + value + ", ") :
            index === z.allVectors[z.allVectors.length - 1].length - 1 ? answer.push(value + ")") : answer.push(value + ", ");

    });

    return (<>
        <td align="top">
            <h2>Метод Зейделя:</h2>
            <div id="steps">
                {z.allVectors.map((value, i) => {
                    let arrStroke = [];
                    value.map((point, last) => {
                        last !== value.length - 1 ?
                            arrStroke.push(point.toString() + ", ") : arrStroke.push(point.toString())
                    });
                    return (<div key={i}>
                        <h2>Шаг {i + 1}</h2>
                        <p>Вектор X: ({arrStroke})</p>
                    </div>);
                })}
            </div>
            <h2>Решение системы</h2>
            <div>Вектор X: {answer}</div>
            <h2>Проверка сходимости:</h2>
            <div>||B|| = {z.q} {' < '}  1 {'=>'} Процесс сходится</div>
            <h2>Проверка решение {'( '}путём умножения вектора X на матрицу А{' )'}</h2>
            <div>{
                z.DResults.map((value, i) => {
                    if (i != z.DResults.length - 1) { return value = value + "," } else { return value }
                })}
            </div>
        </td >
    </>);
}
export default Zeidel;