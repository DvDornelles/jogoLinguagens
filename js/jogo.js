const estadoJogo = {
    paredes: ['parede-norte', 'parede-leste', 'parede-sul', 'parede-oeste'], //0 a 3
    indiceParedeAtual: 0,
    olhandoParaOTeto: false
};

function trocarCenario(direcao){
    const teto = document.getElementById('teto');
    const setaEsq = document.querySelector('.seta-esq');
    const setaDir = document.querySelector('.seta-dir');
    const setaCima = document.querySelector('.seta-cima');
    const setaBaixo = document.querySelector('.seta-baixo');

    const idParedeAtual = estadoJogo.paredes[estadoJogo.indiceParedeAtual];
    document.getElementById(idParedeAtual).classList.remove('ativa');

    if (direcao === 'esq'){
        estadoJogo.indiceParedeAtual = (estadoJogo.indiceParedeAtual + 3) % 4; //faz um loop --> 2+3=5 -> %4 = 1 *voltou pro 1
    }

    if (direcao === 'dir'){
        estadoJogo.indiceParedeAtual = (estadoJogo.indiceParedeAtual + 1) % 4; //se for 5
    }

    if (direcao === 'cima'){
        estadoJogo.olhandoParaOTeto = true;
    }

    if (direcao === 'baixo'){
        estadoJogo.olhandoParaOTeto = false;
    }

    document.getElementById(estadoJogo.paredes[estadoJogo.indiceParedeAtual]).classList.add('ativa');
}