const estadoJogo = {
    paredes: ['parede-norte', 'parede-leste', 'parede-sul', 'parede-oeste', 'teto'], //0 a 4
    indiceParedeAtual: 0,
    olhandoParaOTeto: false,
    inventario: [],
    slotSelecionado: null,
    itemSelecionado: null,
    emPopUp: false,
    parafusosDuto: false
};
const slot = {
    itemRespectivo: null
}

function abrirPainelPorta(){
    document.getElementById('painelPortaPopUp').classList.remove('escondida');
}
function fecharPainelPorta(){
    document.getElementById('painelPortaPopUp').classList.add('escondida');
}

//mudar todos esses === null!!!!!!  !!!!!!!!!!!!!!!
function retornarMensagem(elemento){
    switch (elemento.id){
        case 'portaBlindada':
            /*if(estadoJogo.itemSelecionado === bomba){} else*/
            if (estadoJogo.itemSelecionado === null){
                document.getElementById('retorno').innerHTML = `
                    <p>"A porta está trancada por uma fechadura pesada..."</p>
                `
            }
        break;
        case 'painelPorta':
            abrirPainelPorta();
        break;
        case 'fechaPainel':
            fecharPainelPorta();
        break;
        case 'compartimentoPorta':
            if (estadoJogo.itemSelecionado === null){
                document.getElementById('retorno').innerHTML = `
                    <p>"Esse seria um ótimo lugar para colocar uma bomba. Iria arrebentar a tranca."</p>
                `
            }
        break;
        case 'quadroDeForca':
            if (estadoJogo.itemSelecionado === null){
                document.getElementById('retorno').innerHTML = `
                    <p>"A sala está sem energia..."</p>
                `
            }
        break;
        case 'estante':
            if (estadoJogo.itemSelecionado === null){
                document.getElementById('retorno').innerHTML = `
                    <p>"Muitos livros velhos, mas falta um espaço vazio..."</p>
                `
            }
        break;
        case 'maquina':
            if (estadoJogo.itemSelecionado === null){
                document.getElementById('retorno').innerHTML = `
                    <p>"A máquina está sem energia..."</p>
                `
            }
        break;
        case 'duto':
            if (estadoJogo.itemSelecionado !== 'chaveDeFenda'){
                document.getElementById('retorno').innerHTML = `
                    <p>"A grade está presa por 4 parafusos enferrujados..."</p>
                `
            }
            else{
                estadoJogo.parafusosDuto = true
                coletarItem(document.querySelector('#parafusos'))
            }
        break;
    }
}

function marcarSlot(slot){
    if (estadoJogo.slotSelecionado !== null){
        document.getElementById(estadoJogo.slotSelecionado).classList.remove('slotSelecionado')
    }
    estadoJogo.slotSelecionado = slot.id;
    slot.classList.add('slotSelecionado');
}

function coletarItem(elemento){
    estadoJogo.inventario.push(elemento.id);
    elemento.classList.add('escondida');

    const slotLivre = document.querySelector('.slot.vazio');
    slotLivre.innerHTML = `<p>${elemento.id}</p>`;
    slotLivre.classList.remove('vazio');
}

let parede_anterior = 0
function trocarCenario(direcao){
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
        parede_anterior = estadoJogo.indiceParedeAtual
        estadoJogo.indiceParedeAtual = 4
        
        setaBaixo.classList.remove('escondida');
        setaDir.classList.add('escondida')
        setaEsq.classList.add('escondida')
        setaCima.classList.add('escondida')
    }

    if (direcao === 'baixo'){
        estadoJogo.olhandoParaOTeto = false;
        estadoJogo.indiceParedeAtual = parede_anterior

        setaBaixo.classList.add('escondida')
        setaDir.classList.remove('escondida')
        setaEsq.classList.remove('escondida')
        setaCima.classList.remove('escondida')
    }

    document.getElementById(estadoJogo.paredes[estadoJogo.indiceParedeAtual]).classList.add('ativa');
}