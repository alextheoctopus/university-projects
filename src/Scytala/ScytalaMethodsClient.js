export default class ScytalaMethods {
    constructor(socket) {
        // this.socket = socket;
        this.ciphertext = '';
        this.impossibleSigns = ["ёя", "ёь", "ёэ", "ъж", "эё", "ъд", "цё", "уь", "щч", "чй", "шй", "шз", "ыф",
            "жщ", "жш", "жц", "ыъ", "ыэ", "ыю", "ыь", "жй", "ыы", "жъ", "жы", "ъш", "пй", "ъщ", "зщ", "ъч", "ъц",
            "ъу", "ъф", "ъх", "ъъ", "ъы", "ыо", "жя", "зй", "ъь", "ъэ", "ыа", "нй", "еь", "цй", "ьй", "ьл", "ьр",
            "пъ", "еы", "еъ", "ьа", "шъ", "ёы", "ёъ", "ът", "щс", "оь", "къ", "оы", "щх", "щщ", "щъ", "щц", "кй",
            "оъ", "цщ", "лъ", "мй", "шщ", "ць", "цъ", "щй", "йь", "ъг", "иъ", "ъб", "ъв", "ъи", "ъй", "ъп", "ър",
            "ъс", "ъо", "ън", "ък", "ъл", "ъм", "иы", "иь", "йу", "щэ", "йы", "йъ", "щы", "щю", "щя", "ъа", "мъ",
            "йй", "йж", "ьу", "гй", "эъ", "уъ", "аь", "чъ", "хй", "тй", "чщ", "ръ", "юъ", "фъ", "уы", "аъ", "юь",
            "аы", "юы", "эь", "эы", "бй", "яь", "ьы", "ьь", "ьъ", "яъ", "яы", "хщ", "дй", "фй"];
    }

    scytaleEncrypt(message, diameter) {
        message = message.toUpperCase();
        const numRows = Math.trunc((message.length - 1) / diameter) + 1;// округляем до большего

        const grid = Array.from({ length: numRows }, () => Array(diameter).fill('*'));//создали пустую таблицу и заполнили ****

        let rowIndex = 0;
        let colIndex = 0;
        for (let i = 0; i < message.length; i++) {
            grid[rowIndex][colIndex] = message[i];
            rowIndex = (rowIndex + 1) % numRows;
            if (rowIndex === 0) {
                colIndex++;
            }
        }
        //заполнили таблицу символами
        //  ['Э', 'Ф', 'В', 'П']
        //  ['Т', 'Р', 'Н', 'А']
        //  ['О', ' ', 'Е', 'Р']
        //  [' ', 'Д', 'Й', 'Т']
        //  ['Ш', 'Р', ' ', 'Ы']
        //  ['И', 'Е', 'С', '*']

        let encryptedMessage = '';
        grid.forEach((value) => {
            encryptedMessage += value.join('');//соединяем в предложение по строкам ['Э', 'Ф', 'В', 'П']+['Т', 'Р', 'Н', 'А']
        });
        this.ciphertext = encryptedMessage;

        return encryptedMessage;
    }

    scytaleDecrypt(diameter) {

        let decryptedMessage = '';

        for (let i = 0; i < diameter; i++) {
            for (let j = i; j < this.ciphertext.length; j += diameter) {
                decryptedMessage += this.ciphertext[j];
            }
        }
        decryptedMessage = decryptedMessage.replace(/\*+$/, "");
        return decryptedMessage;
    }

    crackScytale() {
        const messageLength = this.ciphertext.length;
        let variants = [];
        let uniqueArray = [];
        for (let diameter = 2; diameter < messageLength; diameter++) {
            const decryptedMessage2 = this.scytaleDecrypt(diameter);
            variants.push(decryptedMessage2);
        }
        // console.log("variants",variants);
        variants.forEach((item) => {
            let flag = true;
            this.impossibleSigns.forEach((sign) => {
                if (item.includes(sign.toUpperCase()) || item.includes("*")) {
                    flag = false;
                }
            });
            if (flag) uniqueArray.push(item);
        });
        return uniqueArray;

    }
}