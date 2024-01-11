const SideBar = (props) => {
    let buttonStyle = {
        width: '325px',
        heigth: '59px',
        color: '#E1EBEC',
        border: 'none'
    }

    let barStyle = {
        width: '325px',
        backgroundColor: '#EDF2F2',
    }
    return (<div style={barStyle}>
        <button style={buttonStyle} onClick={() => props.setPage('Vizhener')}>
            <p style={{ color: "black" }}>Шифрование квадратом Виженера</p>
        </button>
        <button style={buttonStyle} onClick={() => props.setPage('Jordan')}>
            <p style={{ color: "black" }}>Жордановы исключения</p>
        </button>
        <button style={buttonStyle} onClick={() => props.setPage('HoletzkiyZeidel')}>
            <p style={{ color: "black" }}>Метод Халецкого и Зейделя</p>
        </button>
        <button style={buttonStyle} onClick={() => props.setPage('RungeGauss')}>
            <p style={{ color: "black" }}>Метод Рунге и Гаусса(интегрирование)</p>
        </button>
        <button style={buttonStyle} onClick={() => props.setPage('Interpolation')}>
            <p style={{ color: "black" }}>Интерполяция и приближение фукнций</p>
        </button>
    </div >);
}
export default SideBar;