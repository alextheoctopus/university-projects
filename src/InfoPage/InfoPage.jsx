import Holetzkiy from '../Holetzkiy/Holetzkiy';
import Zeidel from '../Zeidel/Zeidel';
import MainPage from '../MainPage/MainPage';
const InfoPage = ({ page }) => {
    return (
        <>
            {page === "Main" ? <MainPage></MainPage> :
                page === "HoletzkiyZeidel" ?
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}>
                        <Holetzkiy></Holetzkiy>
                        <Zeidel></Zeidel>
                    </div>
                    : ''}
        </>);
}
export default InfoPage;