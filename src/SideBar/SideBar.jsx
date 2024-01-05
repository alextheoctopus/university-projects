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
        <button style={buttonStyle} onClick={()=>props.setPage('HoletzkiyZeidel')}>
            <p style={{ color: "black" }}>Метод Халецкого и Зейделя</p>
        </button>
    </div >);
}
export default SideBar;