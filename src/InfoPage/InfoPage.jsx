import Holetzkiy from '../Holetzkiy/Holetzkiy';
import Zeidel from '../Zeidel/Zeidel';
import MainPage from '../MainPage/MainPage';
import Runge from '../GauseRunge/Runge';
import Gauss from '../GauseRunge/Gauss';
import HoletzkiyZeidel from '../taskText/HoletzkiyZeidel';
import GaussRungeText from '../taskText/GaussRungeText';
import Interpolation from '../Interpolation/Interpolation';
const InfoPage = ({ page }) => {
    return (
        <>
            {page === "Main" ? <MainPage></MainPage> :
                page === "HoletzkiyZeidel" ?
                    <div style={{ display: 'grid', gridTemplateRows: "auto" }}>
                        <HoletzkiyZeidel></HoletzkiyZeidel>
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}>
                            <Holetzkiy></Holetzkiy>
                            <Zeidel></Zeidel>
                        </div>
                    </div>
                    : page === 'RungeGauss' ?
                        <div style={{ display: 'grid', gridTemplateRows: "auto" }}>
                            <GaussRungeText></GaussRungeText>
                            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}>
                                <Runge></Runge>
                                <Gauss></Gauss>
                            </div>
                        </div>
                        : page === 'Interpolation' ?
                        <div style={{ display: 'grid', gridTemplateRows: "auto" }}>
                            {/* <InterpolationText></InterpolationText> */}
                            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}>
                                <Interpolation></Interpolation>
                            </div>
                        </div>
                        : ''}
        </>);
}
export default InfoPage;