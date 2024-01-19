import ScytalaMethods from "./ScytalaMethodsClient";
import { useRef, useState } from "react";
const Scytala = (props) => {
    let scytala = new ScytalaMethods(props.socket);
    const input = useRef('');
    const [cypher, setCypher] = useState(false);
    const [decipher, setDecipher] = useState(false);
    const [broke, setBreak] = useState(false);

    const diameter = 4;

    return (<>
        <h2>Шифрование Скитала</h2>
        <p style={{ fontStyle: "italic" }}>Расшифровка лучше всего работает с предложениями и небольшими текстами</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,200px)", gridGap: "10px", marginLeft: "auto", marginRight: "auto" }}>
            <input ref={input} onClick={() => { setCypher(false); setDecipher(false);setBreak(false) }}></input>
            <button onClick={() => setCypher(true)}>Зашифровать</button>
            <button onClick={() => setDecipher(true)} disabled={!cypher}>Расшифровать</button>
            <button onClick={() => setBreak(true)} disabled={!decipher}>Взломать</button>
        </div>
        {cypher ?
            <>
                <h3>Исходный текст</h3>
                <p>{input.current.value}</p>
                <h3>Зашифрованный текст</h3>
                <p>{scytala.scytaleEncrypt(input.current.value, diameter)}</p>
            </>
            : ''
        }
        {decipher ?
            <>
                <h3>Расшифрованный c ключом текст</h3>
                <p>{scytala.scytaleDecrypt(diameter)}</p>
            </>
            : ''}
        {broke ?
            <>
                <h3>Взломанный текст </h3>
                <p>{scytala.crackScytale()}</p>
            </>
            : ''}
    </>);
}
export default Scytala;