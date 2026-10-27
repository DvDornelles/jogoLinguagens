const estadoJogo = {
    paredes: ['parede-norte', 'parede-leste', 'parede-sul', 'parede-oeste', 'teto'], //0 a 4
    indiceParedeAtual: 0,
    olhandoParaOTeto: false,
    paredeAnterior: 0,

    inventario: [],
    slotSelecionado: null,
    itemSelecionado: null,

    emPopUp: false,
    parafusosDuto: false,

    energiaAcionada: false,
    fiosConsertados: 0
};

function abrirPainel(id){
    document.getElementById(id).classList.remove('escondida');
}
function fecharPainel(id){
    document.getElementById(id).classList.add('escondida');
}

//mudar todos esses === null!!!!!!  !!!!!!!!!!!!!!!
function retornarMensagem(elemento){
    switch (elemento.id){
        //porta blindada
        case 'portaBlindada':
                document.getElementById('retorno').innerHTML = `
                    <p>"A porta está trancada por uma fechadura pesada..."</p>
                `
        break;
        case 'painelPorta':
            abrirPainel('painelPortaPopUp');
        break;
        case 'fechaPainelPorta':
            fecharPainel('painelPortaPopUp');
        break;
        case 'compartimentoPorta':
            if (estadoJogo.itemSelecionado !== 'bomba'){
                document.getElementById('retorno').innerHTML = `
                    <p>"Esse seria um ótimo lugar para colocar uma bomba. Iria arrebentar a tranca."</p>
                `
            }
        break;
        //fim porta blindada

        //quadro de energia
        case 'quadroDeForca':
            if (!estadoJogo.energiaAcionada){
                document.getElementById('retorno').innerHTML = `
                    <p>"A sala está sem energia..."</p>
                `
            }
            abrirPainel('painelQuadroEnergiaPopUp');
        break;
        case 'fechaQuadro':
            fecharPainel('painelQuadroEnergiaPopUp');
        break;
        //fim quadro de energia

        //estante
        case 'estante':
            if (estadoJogo.itemSelecionado === null){
                document.getElementById('retorno').innerHTML = `
                    <p>"Muitos livros velhos, mas falta um espaço vazio..."</p>
                `
            }
        break;
        case 'gaveta':
            abrirPainel('painelGaveta');
        break;
        case 'fechaGaveta':
            fecharPainel('painelGaveta');
        break;
        //fim estante

        //maquina
        case 'maquina':
            if (estadoJogo.itemSelecionado === null){
                document.getElementById('retorno').innerHTML = `
                    <p>"A máquina está sem energia..."</p>
                `
            }
        break;
        //fim maquina

        //duto
        case 'duto':
            if (estadoJogo.itemSelecionado !== 'chaveDeFenda' && estadoJogo.parafusosDuto === false){
                document.getElementById('retorno').innerHTML = `
                    <p>"A grade está presa por 4 parafusos enferrujados..."</p>
                `
            }
            else if(estadoJogo.parafusosDuto === false){
                estadoJogo.parafusosDuto = true
                coletarItem(document.querySelector('#parafusos'))
            }
        break;
        //fim duto
    }
}

function puzzleQuadroForca(fio){
    if(estadoJogo.itemSelecionado !== 'fita' && estadoJogo.energiaAcionada === false){
        document.getElementById('retorno').innerHTML = `<p>"Preciso de algo para prender um fio a outro."</p>`
    }
    else{
        fio.classList.remove('quebrado');
        fio.classList.add('consertado');
        estadoJogo.fiosConsertados++;
        if(estadoJogo.fiosConsertados === 3){
            estadoJogo.energiaAcionada = true;
        }
    }
}

function marcarSlot(slot){
    if (estadoJogo.slotSelecionado !== null){
        document.getElementById(estadoJogo.slotSelecionado).classList.remove('slotSelecionado')
    }
    estadoJogo.slotSelecionado = slot.id;
    estadoJogo.itemSelecionado = slot.innerText.trim(); //trim() limpa espaços em branco e caracteres invisíveis
    slot.classList.add('slotSelecionado');
}

function coletarItem(elemento){
    estadoJogo.inventario.push(elemento.id);
    elemento.classList.add('escondida');

    const slotLivre = document.querySelector('.slot.vazio');
    slotLivre.innerHTML = `<p>${elemento.id}</p>`;
    slotLivre.classList.remove('vazio');
}

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
        estadoJogo.paredeAnterior = estadoJogo.indiceParedeAtual
        estadoJogo.indiceParedeAtual = 4
        
        setaBaixo.classList.remove('escondida');
        setaDir.classList.add('escondida')
        setaEsq.classList.add('escondida')
        setaCima.classList.add('escondida')
    }

    if (direcao === 'baixo'){
        estadoJogo.olhandoParaOTeto = false;
        estadoJogo.indiceParedeAtual = estadoJogo.paredeAnterior

        setaBaixo.classList.add('escondida')
        setaDir.classList.remove('escondida')
        setaEsq.classList.remove('escondida')
        setaCima.classList.remove('escondida')
    }

    document.getElementById(estadoJogo.paredes[estadoJogo.indiceParedeAtual]).classList.add('ativa');
}