export default class VizhenerMethods {
    constructor() {
        this.alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
        this.keyWord = ['Я', 'Б', 'Л', 'О', 'К', 'О'];
        this.encryptedText = '';
        this.textBeforeEnc = '';
        this.newAlphabet = [];
        this.outputArr = [];
        this.decipherArr = [];

    }

    transformInputText(input) {
        if (input) {
            this.textBeforeEnc = input.toUpperCase().split('');
            return input.toUpperCase();
        }
    }

    createNewAlphabet(i) {
        let indexOfKeyword = this.alphabet.indexOf(this.keyWord[i]);//находим индекс буквы ключевого слова из алфавита
        let secondSymbols = this.alphabet.slice(0, indexOfKeyword);//вырезаем элементы из алфавита с начала и до буквы ключевого слова
        let firstSymbols = this.alphabet.slice(indexOfKeyword, this.alphabet.length);//вырезаем элементы из алфавита после буквы ключевого слова

        this.newAlphabet = firstSymbols.concat(secondSymbols);//лепим новый алфавит и получаем
    }

    replaceLetter(value, russian, vizhener, arr) {
        let indexOfText = russian.indexOf(value) + 1;//находим индекс буквы незашифрованного слова в исходном алфавите
        let replacingLetter = vizhener[indexOfText - 1];//находим соответственный элемент из смещенного алфавита

        vizhener.slice(0, vizhener.length);//очищаем массив с использованным смещенным алфавитом

        arr.push(replacingLetter);
    }

    encrypt(input) {
        if (input) {
            this.transformInputText(input);
            let i = 0;
            this.textBeforeEnc.forEach((value) => {
                if (i < this.keyWord.length) {
                    if (value !== ' ') {
                        this.createNewAlphabet(i);
                        this.replaceLetter(value, this.alphabet, this.newAlphabet, this.outputArr);
                        i++;
                    } else {//добавляем пробел в масcив
                        this.outputArr.push(' ');
                    }
                }
                else {
                    this.newAlphabet.slice(0, this.newAlphabet.length);//очистили массив
                    i = 0;
                    if (value !== ' ') {
                        this.createNewAlphabet(i);
                        this.replaceLetter(value, this.alphabet, this.newAlphabet, this.outputArr);
                        i++;
                    } else {//добавляем пробел в масcив
                        this.outputArr.push(' ');
                    }
                }
            });
            this.encryptedText = this.outputArr.join('');
            console.log(this.encryptedText);
            return this.encryptedText;
        }
    }

    decipher() {
        let i = 0;
        this.outputArr.forEach((value) => {
            if (i < this.keyWord.length) {
                if (value !== ' ') {
                    this.createNewAlphabet(i);
                    this.replaceLetter(value, this.newAlphabet, this.alphabet,this.decipherArr);
                    i++;
                } else {//добавляем пробел в масcив
                    this.decipherArr.push(' ');
                }
            }
            else {
                this.newAlphabet.slice(0, this.newAlphabet.length);//очистили массив
                i = 0;
                if (value !== ' ') {
                    this.createNewAlphabet(i);
                    this.replaceLetter(value, this.newAlphabet, this.alphabet,this.decipherArr);
                    i++;
                } else {//добавляем пробел в масcив
                    this.decipherArr.push(' ');
                }
            }
        });
        console.log(this.decipherArr.join(''));

        this.textBeforeEnc = this.decipherArr.join('');
        return this.textBeforeEnc;
    }
}
/*window.onload = () => {
    const input = document.getElementById("input");
    const encrypt = document.getElementById("encrypt");
    const decipher = document.getElementById("decipher");
    decipher.style.display = "none";
    const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    const keyWord = ['Я', 'Б', 'Л', 'О', 'К', 'О'];
    const inputData = document.getElementById('inputData');
    const encryptedOutput = document.getElementById('encryptedOutput');
    const decipheredOutput = document.getElementById('decipheredOutput');
 
    let encryptedText;
    let outputArr = [];
    encrypt.addEventListener('click', () => {
        let textBeforeEnc = input.value.toUpperCase().split('');
        inputData.innerHTML = input.value.toUpperCase();
        encrypt.style.display = 'none';
        let vizhenerSquare = [];
        let i = 0;
        console.log(textBeforeEnc);
        textBeforeEnc.forEach((value) => {
            if (i < keyWord.length) {
                if (value != ' ') {
                    let indexOfKeyword = alphabet.indexOf(keyWord[i]);//1. находим индекс буквы ключевого слова из алфавита
                    let secondSymbols = alphabet.slice(0, indexOfKeyword);//2. вырезаем элементы из алфавита с начала и до буквы ключевого слова
                    let firstSymbols = alphabet.slice(indexOfKeyword, alphabet.length);//3. вырезаем элементы из алфавита после буквы ключевого слова
 
                    vizhenerSquare = firstSymbols.concat(secondSymbols);//4. лепим новый алфавит и получаем
 
                    let indexOfText = alphabet.indexOf(value) + 1;//5. находим индекс буквы незашифрованного слова в исходном алфавите
                    let replacingLetter = vizhenerSquare[indexOfText - 1];//6. находим соответственный элемент из смещенного алфавита
 
                    vizhenerSquare = [];//7. очищаем массив с использованным смещенным алфавитом
 
                    outputArr.push(replacingLetter);
                    i++;
                } else {//добавляем пробел в масcив
                    outputArr.push(' ');
                }
            } else {
                vizhenerSquare.slice(0, vizhenerSquare.length);//очистили массив
                i = 0;
                if (value != ' ') {
                    let indexOfKeyword = alphabet.indexOf(keyWord[i]);//1. находим индекс буквы ключевого слова из алфавита
                    let secondSymbols = alphabet.slice(0, indexOfKeyword);//2. вырезаем элементы из алфавита с начала и до буквы ключевого слова
                    let firstSymbols = alphabet.slice(indexOfKeyword, alphabet.length);//3. вырезаем элементы из алфавита после буквы ключевого слова
 
                    vizhenerSquare = firstSymbols.concat(secondSymbols);//4. лепим новый алфавит и получаем
 
                    let indexOfText = alphabet.indexOf(value) + 1;//5. находим индекс буквы незашифрованного слова в исходном алфавите
                    let replacingLetter = vizhenerSquare[indexOfText - 1];//6. находим соответственный элемент из смещенного алфавита
 
                    vizhenerSquare = [];//7. очищаем массив с использованным смещенным алфавитом
 
                    outputArr.push(replacingLetter);
                    i++;
                } else {//добавляем пробел в масcив
                    outputArr.push(' ');
                }
            }
        });
        encryptedText = outputArr.join('');
        encryptedOutput.innerHTML = encryptedText;
        decipher.style.display = "block";
    })
    let decipherArr = [];
    let outputData;
    let deciperedText;
    decipher.addEventListener('click', () => {
        let vizhenerSquare = [];
        decipher.style.display = "none";
        let i = 0;
        outputArr.forEach((value) => {
            if (i < keyWord.length) {
                if (value != ' ') {
                    let indexOfKeyword = alphabet.indexOf(keyWord[i]);//1. находим индекс буквы ключевого слова из алфавита
                    let secondSymbols = alphabet.slice(0, indexOfKeyword);//2. вырезаем элементы из алфавита с начала и до буквы ключевого слова
                    let firstSymbols = alphabet.slice(indexOfKeyword, alphabet.length);//3. вырезаем элементы из алфавита после буквы ключевого слова
 
                    vizhenerSquare = firstSymbols.concat(secondSymbols);//4. лепим новый алфавит и получаем
 
                    let indexOfText = vizhenerSquare.indexOf(value) + 1;//5. находим индекс буквы незашифрованного слова в исходном алфавите
                    let replacingLetter = alphabet[indexOfText - 1];//6. находим соответственный элемент из смещенного алфавита
 
                    vizhenerSquare = [];//7. очищаем массив с использованным смещенным алфавитом
 
                    decipherArr.push(replacingLetter);
                    i++;
 
                    
                } else {//добавляем пробел в масcив
                    decipherArr.push(' ');
                }
            } else {
                vizhenerSquare.slice(0, vizhenerSquare.length);//очистили массив
                i = 0;
                if (value != ' ') {
                    let indexOfKeyword = alphabet.indexOf(keyWord[i]);//1. находим индекс буквы ключевого слова из алфавита
                    let secondSymbols = alphabet.slice(0, indexOfKeyword);//2. вырезаем элементы из алфавита с начала и до буквы ключевого слова
                    let firstSymbols = alphabet.slice(indexOfKeyword, alphabet.length);//3. вырезаем элементы из алфавита после буквы ключевого слова
 
                    vizhenerSquare = firstSymbols.concat(secondSymbols);//4. лепим новый алфавит и получаем
 
                    let indexOfText = vizhenerSquare.indexOf(value) + 1;//5. находим индекс буквы незашифрованного слова в исходном алфавите
                    let replacingLetter = alphabet[indexOfText - 1];//6. находим соответственный элемент из смещенного алфавита
 
                    vizhenerSquare = [];//7. очищаем массив с использованным смещенным алфавитом
 
                    decipherArr.push(replacingLetter);
                    i++;
                } else {//добавляем пробел в масcив
                    decipherArr.push(' ');
                }
            }
        });
 
        deciperedText = decipherArr.join('');
        decipheredOutput.innerHTML = deciperedText;
 
    });
}*/
