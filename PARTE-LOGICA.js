//ALEJANDRO MORENO CAMAS
//AQUI TENEMOS NUESTRA PARTE LOGICA PARA REALIZAR LA OPERACION DE ANALIZAR

function analizar() {
    const inputText = document.getElementById('inputText').value;
    const tokens = lexer(inputText);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = tokens.map(token => `<div>${token}</div>`).join('');
}

function lexer(input) {
    const tokens = [];
    const tokenTypes = [
        { regex: /\s+/, type: 'WHITESPACE' },
        { regex: /\d+/, type: 'NUMBER' },
        { regex: /[a-zA-Z_]\w*/, type: 'IDENTIFIER' },
        { regex: /[+\-*/]/, type: 'OPERATOR' },
        { regex: /[(){};]/, type: 'PUNCTUATION' },
        { regex: /".*?"|'.*?'/, type: 'STRING' },
        { regex: /\/\/.*|\/\*[\s\S]*?\*\//, type: 'COMMENT' }
    ];

    let pos = 0;
    while (pos < input.length) {
        let match = null;
        for (const tokenType of tokenTypes) {
            match = input.slice(pos).match(tokenType.regex);
            if (match && match.index === 0) {
                tokens.push(`${tokenType.type}: ${match[0]}`);
                pos += match[0].length;
                break;
            }
        }
        //COLOCAMOS NUESTRA CONDICION LA CUAL NOS REGRESARA QUE ES UN DATO NO CONOCIDO O NO RESERVADO
        if (!match) {
            tokens.push(`UNKNOWN: ${input[pos]}`);
            pos++;
        }
    }
    return tokens;
}
