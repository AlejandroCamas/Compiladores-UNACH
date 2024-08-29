//INTEGRANTES:
//ALEJANDRO MORENO CAMAS
//Alan Ruiz Álvarez
//Mariajose Martinez Vazquez
//AQUI TENEMOS NUESTRA PARTE LOGICA PARA REALIZAR LA OPERACION DE ANALIZAR

// Función principal que se llama al hacer clic en el botón
function analizar() {
    const inputText = document.getElementById('inputText').value; // Obtiene el texto de entrada del usuario
    const tokens = lexer(inputText); // Llama a la función lexer() para generar los tokens
    const outputDiv = document.getElementById('output'); // Div para mostrar los tokens generados
    const typeOutputDiv = document.getElementById('typeOutput'); // Div para mostrar el tipo de cada token
    
    // Mostrar los tokens generados
    outputDiv.innerHTML = tokens.map(token => `<div>${token}</div>`).join('');
    
    // Mostrar el tipo de cada token
    typeOutputDiv.innerHTML = tokens.map(token => {
        const type = token.split(': ')[0];
        const value = token.split(': ')[1];
        if (type === 'IDENTIFIER') {
            return `<div>${value} es un Identificador</div>`;
        } else if (type === 'RESERVED') {
            return `<div>${value} es una Palabra Reservada</div>`;
        } else if (type === 'STRING') {
            return `<div>${value} es una Cadena de Caracteres</div>`;
        } else {
            return `<div>${value} es de tipo ${type}</div>`;
        }
    }).join('');
}

// Función que realiza el análisis léxico
function lexer(input) {
    const tokens = [];
    const reservedWords = ['if', 'else', 'while', 'return', 'function']; // Lista de palabras reservadas
    const tokenTypes = [
        { regex: /\s+/, type: 'WHITESPACE' }, // Espacios en blanco
        { regex: /\d+/, type: 'NUMBER' }, // Números
        { regex: /[a-zA-Z_]\w*/, type: 'IDENTIFIER' }, // Identificadores
        { regex: /[+\-*/]/, type: 'OPERATOR' }, // Operadores
        { regex: /[(){};]/, type: 'PUNCTUATION' }, // Puntuación
        { regex: /".*?"|'.*?'/, type: 'STRING' }, // Cadenas de caracteres
        { regex: /\/\/.*|\/\*[\s\S]*?\*\//, type: 'COMMENT' } // Comentarios
    ];

    let pos = 0;
    while (pos < input.length) {
        let match = null;
        for (const tokenType of tokenTypes) {
            match = input.slice(pos).match(tokenType.regex);
            if (match && match.index === 0) {
                let tokenValue = match[0];
                if (tokenType.type === 'IDENTIFIER' && reservedWords.includes(tokenValue)) {
                    tokens.push(`RESERVED: ${tokenValue}`); // Identificar palabras reservadas
                } else {
                    tokens.push(`${tokenType.type}: ${tokenValue}`);
                }
                pos += tokenValue.length;
                break;
            }
        }
        if (!match) {
            tokens.push(`UNKNOWN: ${input[pos]}`); // Token desconocido
            pos++;
        }
    }
    return tokens;
}
