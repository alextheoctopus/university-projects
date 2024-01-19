import './App.css';
import SideBar from './SideBar/SideBar';
import InfoPage from './InfoPage/InfoPage';
import { useState } from 'react';
import MainPage from './MainPage/MainPage';
function App() {
  const [page, setPage] = useState('Jordan');
  const [sideBar, openSideBar] = useState(false);
  const buttonStyle = {
    backgroundColor: "grey",
    width: "50px",
    height: "50px"
  };

  const barStyle = {
    width: "30px",
    margin: "10px",
    padding: "0px",
    height: "2px",
    borderRadius: "5px",
    backgroundColor: "darkgrey"
  };
  const MenuButton = () => {
    return (<div style={buttonStyle} onClick={() => openSideBar(!sideBar)}>
      <div style={barStyle}></div>
      <div style={barStyle}></div>
      <div style={barStyle}></div>
    </div>);
  }
  return (
    <div className="App">
      {!sideBar ?
        <div style={{ display: "grid", gridTemplateRows: "1fr 5fr" }}>
          <MenuButton></MenuButton>
          <MainPage></MainPage>
        </div> :
        <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
          <SideBar setPage={setPage}></SideBar>
          <InfoPage page={page}></InfoPage>
        </div>
      }
    </div >
  );
}

export default App;
