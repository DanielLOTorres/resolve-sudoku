const tabuleiro =document.querySelector("#tabuleiro")
const botao = document.querySelector("#botao-resolver")
const botaoLimpar = document.querySelector("#botao-limpar")
const mostraSolucao = document.querySelector("#solucao")
const quadrados = 81
let submeter = []


for (let i = 0; i < quadrados; i++){
    const input = document.createElement('input')
    input.setAttribute('type', 'number')
    input.setAttribute('min', '1')
    input.setAttribute('max', '9')
    tabuleiro.appendChild(input)
    input.classList.add('quadrado')
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        input.classList.add('secao')
    }
}

const juntaValores = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submeter.push(input.value)
        }
        else {
            submeter.push('.')
        }
    })
    console.log(submeter)
}
const limpaTabuleiro = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
            input.value = ''
    })
    mostraSolucao.innerHTML = ''
    submeter = []
}

const  povoaTabuleiro = (temSolucao, solucao) => {
    const inputs = document.querySelectorAll('input')
    if (temSolucao && solucao) {
        inputs.forEach((input, i) => {
            input.value = solucao[i]
        })
        mostraSolucao.innerHTML = 'Essa é a solução'
    } else {
        mostraSolucao.innerHTML = 'Impossivel solucionar'
    }
}

const resolveJogo = () => {
    juntaValores()
    const data = { numeros: submeter.join('') }
    fetch('http://localhost:8000/resolver', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response => response.json()))
    .then(data => {
        povoaTabuleiro(data.solvable, data.solution)
        submeter = []
    })
    .catch((error) => {
        console.log(error)
    })
}


botao.addEventListener('click', resolveJogo)
botaoLimpar.addEventListener('click', limpaTabuleiro)

