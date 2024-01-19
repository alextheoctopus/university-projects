import { useRef, useState, useEffect } from "react";
const JordanMethods = (props) => {
        
}
export default JordanMethods;
/*

import React, { useState, useRef } from 'react';

function InputArray() {
const [inputs, setInputs] = useState(['']);
const inputRefs = useRef([]);

const handleInputChange = (index, event) => {
const newInputs = [...inputs];
newInputs[index] = event.target.value;
setInputs(newInputs);
};

const handleAddInput = () => {
setInputs([...inputs, '']);
};

const handleRemoveInput = (index) => {
const newInputs = [...inputs];
newInputs.splice(index, 1);
setInputs(newInputs);
};

const handleSubmit = (event) => {
event.preventDefault();
const inputValues = inputRefs.current.map((ref) => ref.value);
console.log(inputValues);
};

return (
<form onSubmit={handleSubmit}>
{inputs.map((value, index) => (
<div key={index}>
  <input
    type="text"
    value={value}
    onChange={(event) => handleInputChange(index, event)}
    ref={(ref) => (inputRefs.current[index] = ref)}
  />
  <button type="button" onClick={() => handleRemoveInput(index)}>
    Удалить
  </button>
</div>
))}
<button type="button" onClick={handleAddInput}>
Добавить инпут
</button>
<button type="submit">Отправить</button>
</form>
);
}

export default InputArray;
        input {
                border-color: rgb(219, 219, 219);
                padding: 5px;
                margin: 2px;
                border-radius: 3px;
                outline: 0;
                width: 100px;
        }
 
        #matrixOutput {
                background-color: rgb(235, 235, 235);
                padding: 10px;
                margin-top: 10px;
        }
 
        button {
                background-color: rgb(212, 212, 212);
                outline: 0;
                border: 0;
                padding: 7px;
                margin: 2px;
                border-radius: 3px;
        }
 
        button:hover {
                box-shadow: rgb(138, 138, 138) 1px 1px 3px 1px;
        }
 
        .smallInputs {
                width: 25px;
                border-radius: 3px;
        }
 
        .smallInputsReadOnly,
        .smallInputsClmn,
        .smallInputsStr {
                width: 25px;
                border-radius: 3px;
                color: gray;
        }
</style>
 
<body>
        <div id="matrixOutput">
                <input id="matrixWidth" placeholder="кол-во столбцов">
                <input id="matrixHeight" placeholder="кол-во строк">
                <button id="genMatrix">Создать матрицу</button>
        </div>
 
        <script>
 
                const matrixOutput = document.getElementById("matrixOutput");
                const genMatrixBtn = document.getElementById("genMatrix");
                const matrixWidthInput = document.getElementById("matrixWidth");
                const matrixHeightInput = document.getElementById("matrixHeight");
                const okBtn = document.createElement('button');
                const inputK = document.createElement('input');
                const inputS = document.createElement('input');
                const strokeDiv = document.createElement('div');
                const columnDiv = document.createElement('div');
 
                let width;
                let height;
                let columnArr = [];
                let strokeArr = [];
 
                genMatrixBtn.addEventListener('click', () => {
                        matrixOutput.innerHTML = '';
                        matrixOutput.innerHTML += 'Задайте матрицу коэффициентов: ';
                        width = matrixWidthInput.value - 0;
                        height = matrixHeightInput.value - 0;
                        columnDiv.width = '30px';
                        matrixOutput.appendChild(strokeDiv);
                        matrixOutput.appendChild(columnDiv);
                        for (let i = 0; i < height + 1; i++) {
                                const str = document.createElement('div');
                                for (let j = 0; j < width + 1; j++) {
                                        const field = document.createElement('input');
                                        if (j == 0 && i == 0) {
                                                field.setAttribute('class', 'smallInputsReadOnly');
                                                field.setAttribute('value', '');
                                                str.appendChild(field);
                                        }
                                        if (i == 0 && j != 0) {
                                                let ind = j;
                                                field.setAttribute('readonly', 'true');
                                                field.setAttribute('class', 'smallInputsStr');
                                                if (j == 1) {
                                                        field.setAttribute('value', '1');
                                                        strokeArr.push('1');
                                                } else {
                                                        field.setAttribute('value', '-x' + (ind - 1));
                                                        strokeArr.push('-x' + (ind - 1));
                                                }
                                                str.appendChild(field);
                                        }
                                        if (j == 0 && i != 0) {
                                                columnArr.push('0');
                                                field.setAttribute('readonly', 'true');
                                                field.setAttribute('class', 'smallInputsClmn');
                                                field.setAttribute('placeholder', '0');
                                                str.appendChild(field);
                                        }
                                        if (j != 0 && i != 0) {
                                                field.setAttribute('class', 'smallInputs');
                                                field.setAttribute('placeholder', '0');
                                                str.appendChild(field);
                                        }
                                }
                                matrixOutput.appendChild(str);
                        }
                        matrixOutput.innerHTML += 'Задайте разрешающий элемент: ';
 
                        const inputs = document.querySelectorAll('.smallInputs');
                        inputs.forEach((input, i, inputs) => input.addEventListener('keydown', () => {
                                if (event.keyCode == '39') {
                                        if (inputs[i + 1]) inputs[i + 1].focus();
                                } else if (event.keyCode == '37') {
                                        if (inputs[i - 1]) inputs[i - 1].focus();
                                }
                        }));
 
                        inputK.setAttribute('placeholder', 'столбец');
                        matrixOutput.appendChild(inputK);
 
                        inputS.setAttribute('placeholder', 'строка');
                        matrixOutput.appendChild(inputS);
 
                        okBtn.innerHTML = 'OK';
                        matrixOutput.appendChild(okBtn);
 
                });
 
                let matrixA = [];
                let matrixB = [];
 
                const switchElems = (matrixA, s, k) => {
                        for (let i = 0; i < matrixA.length; i++) {
                                matrixB.push(matrixA[i].slice());
                        }
                        const a = matrixA[k][s];
                        matrixB[k][s] = 1 / a;
                        matrixB[k].forEach((elem, i) => {
                                if (i != s) {
                                        matrixB[k][i] = elem / a;
                                }
                        }
                        );
                        matrixB.forEach((str, i) => {
                                if (i != k)
                                        str[s] /= -a;
                        });
                        for (let i = 0; i < matrixA.length; i++) {
                                if (i != k) {
                                        for (let j = 0; j < matrixA[i].length; j++) {
                                                if (j != s) {
                                                        matrixB[i][j] = matrixA[i][j] - (matrixA[i][s] * matrixA[k][j] / a);
                                                }
                                        }
                                }
                        }
                        return matrixB;
                }
 
                let flag = true;
                let matrixForbidden = [];
                okBtn.addEventListener('click', () => {
 
                        let inputs = document.querySelectorAll('.smallInputs');
                        const inputsClmn = document.querySelectorAll('.smallInputsClmn');
                        const inputsStr = document.querySelectorAll('.smallInputsStr');
 
                        // записываем значения из инпутов в двумерный массив
                        if (flag) {
                                for (let j = 0; j < inputsClmn.length; j++) {
                                        const str = [];
                                        for (let i = j * inputsStr.length; i < j * inputsStr.length + inputsStr.length; i++) {
                                                str.push(inputs[i].value - 0);
                                        }
                                        matrixA.push(str);
                                }
                        }
 
                        // индексы разрешающего элемента
                        const k = inputK.value - 1;
                        const s = inputS.value - 1;
                        //console.log(s);
                        //console.log(matrixForbidden);
                        //console.log(matrixForbidden.indexOf(s));
                        if (matrixA[s][k] != 0 && matrixForbidden.indexOf(s) == -1 && k != 0) {
                                // заполняем массивы для первой строки и первого столбца (нули и иксы)
                                console.log(k, s);
                                let temp = columnArr[s];
                                console.log("Строка ", temp);
                                columnArr[s] = strokeArr[k].split('').splice(1, 3).join('');
                                strokeArr[k] = temp;
                                console.log("Колонка ", strokeArr);
 
                                strokeDiv.innerHTML = strokeArr;
                                columnDiv.innerHTML = columnArr;
 
                                // выполняем преобразование матрицы коэффициентов
                                matrixB = [];
                                matrixB = switchElems(matrixA, k, s);
 
                                // удаляем из матрицы В столбец (каждый k-ый элемент)
                                for (let i = 0; i < matrixB.length; i++) {
                                        matrixB[i].splice(k, 1);
                                }
 
                                // матрица А = матрица В
                                matrixA = [];
                                for (let i = 0; i < matrixB.length; i++) {
                                        matrixA.push(matrixB[i].slice());
                                }
 
                                // преобразуем матрицу В в одномерный массив
                                let arr2 = matrixB.flat();
 
                                // удаляем лишние инпуты
                                for (let i = k; i < inputs.length; i += inputsStr.length) {
                                        inputs[i].remove();
                                }
                                inputsStr[k].parentElement.removeChild(inputsStr[k]);
 
                                // заполняем первую строку и первый столбец (нули и иксы)
                                inputsStr.forEach((input, index) => {
                                        input.value = strokeArr[index];
                                });
                                inputsClmn.forEach((input, index) => {
                                        input.value = columnArr[index];
                                });
 
                                // удаляем лишний элемент массива из строки первой(нулевой удаляем)
                                let deleteSymb = strokeArr.indexOf('0');
                                console.log(strokeArr[deleteSymb]);
                                strokeArr.splice(deleteSymb, 1);
 
                                // заполняем инпуты (матрица коэффициентов)
                                document.querySelectorAll('.smallInputs').forEach((input, index) => {
                                        input.value = arr2[index];
                                });
 
                                //запрещаем пользователю выбирать одну строку дважды
                                matrixForbidden.push(s);
 
                                let z1 = columnArr.indexOf('0');
                                let d = 0;
                                if (matrixB[z1]) {
                                        matrixB[z1].forEach((value) => { if (value == 0) { d++ } });
                                        if (d == strokeArr.length) {
                                                let massiveAlpha=[];
                                                strokeArr.forEach((strX, ind) => {
                                                        if (ind != 0){
                                                                matrixOutput.innerHTML += `<br>${strX.replace("-", "")} = a${ind}`;
                                                                massiveAlpha.push(`a${ind}`);
                                                        }
                                                })
                                                //         matrixOutput.innerHTML += showAnswer(matrixB);
                                                columnArr.forEach((x, i) => {
                                                        if (x != 0) {
                                                                matrixOutput.innerHTML += `<br>${x} = ${matrixB[i][0]}`;
                                                                massiveAlpha.forEach((value, j) => {
                                                                        matrixOutput.innerHTML += ` + ${matrixB[i][j + 1]} * (-${value})`
                                                                });
                                                        }
                                                });
                                        }
                                }
                                if (strokeArr.length === 1) {
 
                                        columnArr.forEach((x, ind) => {
                                                matrixOutput.innerHTML += `<br>${x} = ${matrixB[ind][0]}`;
                                        })
                                }
 
                        } else {
                                if (matrixA[s][k] == 0) alert("Введите ненулевой элемент")
                                else if (matrixForbidden.indexOf(s) + 1) alert("Выберите другую строку")
                                else if (k == 0) alert("Выберите другой столбец")
                        }
 
                        flag = false;
 
 
                });
 
 
                const showAnswer = (matrix) => {
                        return `
            <p> ${columnArr[0]} = ${matrix[0][0]} + ${matrix[0][1]}(${strokeArr[1]}) - ${matrix[0][2]}(${strokeArr[2]}) </p>
            <p> ${columnArr[1]} = ${matrix[1][0]} - ${matrix[1][1]}(${strokeArr[1]}) - ${matrix[1][2]}(${strokeArr[2]}) </p>`
                }
 
        </script>
</body>
 
</html>
            */
