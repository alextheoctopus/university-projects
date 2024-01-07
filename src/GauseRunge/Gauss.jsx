import cos from '../assets/cos.png';
import './style.css';
const Gauss = () => {
    const GAUSS_CONSTANTS = {
        // Taken from http://keisan.casio.com/exec/system/13309407313: {
        3: {
            weights: [
                0.8888888888888889,
                0.5555555555555556, 0.5555555555555556
            ],
            abscissas: [
                0,
                -0.774596669241483, 0.774596669241483
            ]
        },
        16: {
            weights: [
                0.0271524594117540948518,
                0.062253523938647892863,
                0.0951585116824927848099,
                0.1246289712555338720525,
                0.1495959888165767320815,
                0.169156519395002538189,
                0.182603415044923588867,
                0.189450610455068496285,
                0.1894506104550684962854,
                0.182603415044923588867,
                0.1691565193950025381893,
                0.149595988816576732081,
                0.124628971255533872053,
                0.095158511682492784809,
                0.062253523938647892863,
                0.027152459411754094852
            ],
            abscissas: [
                -0.989400934991649932596,
                -0.944575023073232576078,
                -0.86563120238783174388,
                -0.7554044083550030338951,
                -0.6178762444026437484467,
                -0.4580167776572273863424,
                -0.28160355077925891323,
                -0.0950125098376374401853,
                0.0950125098376374401853,
                0.28160355077925891323,
                0.4580167776572273863424,
                0.617876244402643748447,
                0.755404408355003033895,
                0.8656312023878317438805,
                0.944575023073232576078,
                0.989400934991649932596
            ],
        }
    }

    function gaussQuadrature(f, interval, order) {
        if (interval[0] === interval[1]) {
            return 0;
        }
        const { weights, abscissas } = GAUSS_CONSTANTS[order];
        const [a, b] = interval;
        let result = 0;
        const m1 = (b - a) / 2;
        const m2 = (b + a) / 2;
        for (let i = 0; i <= order - 1; i++) {
            result += weights[i] * f(m1 * abscissas[i] + m2);
        }
        return m1 * result;
    }


    const cosFunc = (x) => Math.cos(1 / (2 - x ** 2));

    let gaussQuadr = () => {
        let result = gaussQuadrature(
            cosFunc,
            [0, 1],
            3);
        return result;
    }
    return (
        <div>
            <table>
                <td><img src={cos} /></td>
                <td><h2 className='result'>{gaussQuadr()}</h2></td>
            </table>
        </div >
    );
}
export default Gauss;