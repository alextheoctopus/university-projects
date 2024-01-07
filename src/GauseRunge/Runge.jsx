const EPS = 0.0001;

const p = {
    m: 10, a: 0, b: 1, Im: 0, Im2: 0
}



const Runge = () => {

    function f(xi) { return Math.cos(1 / (2 - xi ** 2)) };

    function computeImAndIm2(m){

        let sum1 = 0;

        function calcFor(m, sum) {
            for (let i = 0; i < m; i++) {
                let h = (p.b - p.a) / m;
                sum += h * f(p.a + i * h);
            }
            return sum;
        }


        p.Im = calcFor(m, sum1);
        p.Im2 = calcFor(2 * m, sum1);


        checkEps();
    }

    function check() {
        computeImAndIm2(p.m);

    }

    function checkEps() {
        let epsM;
        epsM = Math.abs(p.Im - p.Im2);


        if (epsM <= EPS) {
            console.log(p.Im2);
        } else {
            p.m = 2 * p.m;
            computeImAndIm2(p.m);
        }
    }

    check();
    return (
        <div className="runge">
            <h1>
                I={p.Im2} +/- {EPS}
            </h1>
        </div>
    );
}
export default Runge;