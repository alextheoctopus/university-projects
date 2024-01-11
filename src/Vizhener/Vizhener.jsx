import { useRef, useState } from "react";
import VizhenerMethods from "./VizhenerMethods";
const Vizhener = () => {
    let vizhener = new VizhenerMethods();
    const input = useRef('');
    const [cypher, setCypher] = useState(false);
    const [decipher, setDecipher] = useState(false);

    return (<>
        <h2>Шифрование квадратом Виженера</h2>
        <h3>Введите текст для шифрования</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,200px)", gridGap: "10px", marginLeft: "auto", marginRight: "auto" }}>
            <input ref={input}
                style={{ width: "190px" }} onClick={() => { setCypher(false); setDecipher(false) }}></input>
            <button onClick={() => setCypher(true)} style={{ width: "200px" }}>Зашифровать</button>
            <button style={{ width: "200px" }} onClick={() => setDecipher(true)}>Расшифровать</button>
        </div>
        {cypher ?
            <>
                <h1 style={{ color: "#62b3ac" }}>Исходный текст:</h1>
                <h3 style={{ color: "#004d00" }}>{vizhener.transformInputText(input.current.value.toString())}</h3>
                <h1 style={{ color: "#375c5c" }}>Зашифрованный текст:</h1>
                <h3 style={{ color: "#004d00" }}>{vizhener.encrypt(input.current.value.toString())}</h3>
            </>
            : ''
        }
        {decipher ?
            <>
                <h1 style={{ color: "#253d3d" }}>Расшифрованный текст:</h1>
                <h3 style={{ color: "#004d00" }}>{vizhener.decipher()}</h3>
            </> : ''}
    </>);
}
export default Vizhener;