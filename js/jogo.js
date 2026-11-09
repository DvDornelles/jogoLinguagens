const estadoJogo = {
    paredes: ['parede-norte', 'parede-leste', 'parede-sul', 'parede-oeste', 'teto'], //0 a 4
    indiceParedeAtual: 0,
    olhandoParaOTeto: false,
    paredeAnterior: 0,
    emPopUp: false,

    inventario: [],
    slotSelecionado: null,
    itemSelecionado: null,

    bluePrint: false,
   
    parafusosDuto: false,
    bateria: false,
    cabos: false,

    energiaAcionada: false,
};

const bluePrint = {
    cabos: false,
    bateria: false,
    fita: false,
    parafusos: false,
    dinamite: false,
    relogio: false,
}

const estadoPuzzleLuz = {
    fiosConsertados: 0
}

const estadoPuzzleMaquina = {
    numeroAtual: 0,
    iniciado: false,
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

        //começo blueprint
        case 'bluePrint':
            abrirPainel('painelBluePrint');
            estadoJogo.bluePrint = true
        break;
        case 'fechaBluePrint':
            fecharPainel('painelBluePrint')
        break;
        //fim blueprint

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
            if (estadoJogo.itemSelecionado !== 'livro'){
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
            if (estadoJogo.energiaAcionada === false){
                document.getElementById('retorno').innerHTML = `
                    <p>"A máquina está sem energia..."</p>
                `
            }
            else{
                abrirPainel('painelMaquina');
            }
        break;
        case 'fechaMaquina':
            fecharPainel('painelMaquina');
        break;
        case 'bateria':
            coletarItem(document.getElementById('bateria'))
        break;
        case 'cabos':
            coletarItem(document.getElementById('cabos'))
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

// Puzzle Maquina
function puzzleMaquina(bloco) {
    if (bloco.id === 'iniciarPuzzleMaquina') {
        estadoPuzzleMaquina.iniciado = true;
        document.getElementById('ordemNumerica').classList.remove('escondida');
        bloco.classList.add('escondida');
    } else {
        // Pega apenas o número do ID (ex: de 'b1' vira 1)
        const botaoClicado = parseInt(bloco.id.replace('b', ''));

        if (botaoClicado === estadoPuzzleMaquina.numeroAtual + 1) {
            estadoPuzzleMaquina.numeroAtual++;
            bloco.classList.add('escondida');
            if (estadoPuzzleMaquina.numeroAtual === 9) {
                document.getElementById('retorno').innerHTML = `<p>"A máquina destravou e liberou a Bateria e Cabos!"</p>`;
                document.getElementById('bateria').classList.remove('escondida')
                document.getElementById('cabos').classList.remove('escondida')
            }
        } else {
            estadoPuzzleMaquina.numeroAtual = 0;
            estadoPuzzleMaquina.iniciado = false;
            document.getElementById('ordemNumerica').classList.add('escondida');
            document.getElementById('iniciarPuzzleMaquina').classList.remove('escondida');
            document.getElementById('retorno').innerHTML = `<p>"Sequência incorreta!"</p>`;
            for(i=1; i<10; i++){
                document.getElementById('b' + i).classList.remove('escondida')
            }
        }
    }
}

function puzzleQuadroForca(fio){
    if(estadoJogo.itemSelecionado !== 'fita' && estadoJogo.energiaAcionada === false){
        document.getElementById('retorno').innerHTML = `<p>"Preciso de algo para prender um fio a outro."</p>`
    }
    else if(fio.classList !== 'consertado'){
        fio.classList.remove('quebrado');
        fio.classList.add('consertado');
        estadoPuzzleLuz.fiosConsertados++;
        if(estadoPuzzleLuz.fiosConsertados === 3){
            estadoJogo.energiaAcionada = true;
            document.getElementById('retorno').innerHTML = `<p>"A energia foi restaurada!"</p>`
            if(estadoJogo.bluePrint === true){
                adicionarBlueprint('fita');
            } 
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

function adicionarBlueprint(material){
    switch (material){
        case 'fita':
            bluePrint.fita = true
            document.getElementById('retorno').innerHTML = document.getElementById('retorno').innerHTML + `<p> "A fita foi adicionada ao projeto de bomba."</p>`
            
        break;
    }
    const indice = estadoJogo.inventario.indexOf(material);

    var slotMarcado = document.getElementById(estadoJogo.slotSelecionado)
    slotMarcado.innerHTML = `<p></p>`
    slotMarcado.classList.add('vazio')
    slotMarcado.classList.remove('slotSelecionado')
    estadoJogo.itemSelecionado = null
    estadoJogo.slotSelecionado = null

    if (indice !== -1) {
  // Substitui o ID por null. O slot agora está vazio!
  estadoJogo.inventario[indice] = null;
  console.log("✅ Item removido! O slot agora está vazio.");
} else {
  console.log("⚠️ Item não encontrado.");
}

console.log(estadoJogo.inventario);     
}

function coletarItem(elemento){
    estadoJogo.inventario.push(elemento.id);
    elemento.classList.add('escondida');

    if(estadoJogo.bluePrint === false){
        const slotLivre = document.querySelector('.slot.vazio');
        slotLivre.innerHTML = `<p>${elemento.id}</p>`;
        slotLivre.classList.remove('vazio');
    }
    else{
        switch (elemento.id){
            case 'bateria':
                bluePrint.bateria = true
                document.getElementById('retorno').innerHTML = `<p>"A bateria foi adicionada ao projeto de bomba."</p>`
            break;
            case 'cabos':
                bluePrint.caboas = true
                document.getElementById('retorno').innerHTML = `<p>"Os caboas foram adicionados ao projeto de bomba."</p>`
            break;
            case 'relogio':
                bluePrint.relogio = true
                document.getElementById('retorno').innerHTML = `<p>"O relógio de bolso foi adicionado ao projeto de bomba."</p>`
            break;
            case 'parafusos':
                bluePrint.parafusos = true
                document.getElementById('retorno').innerHTML = `<p>"Os parafusos foram adicionados ao projeto de bomba."</p>`
            break;
            case 'dinamite':
                bluePrint.dinamite = true
                document.getElementById('retorno').innerHTML = `<p>"A dinamite foi adicionada ao projeto de bomba."</p>`
            break;
            default:
                const slotLivre = document.querySelector('.slot.vazio');
                slotLivre.innerHTML = `<p>${elemento.id}</p>`;
                slotLivre.classList.remove('vazio');    
            break;
        }
    }
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

document.addEventListener('keydown', (event) =>{
    switch (event.key){
        case 'ArrowUp':
            if(estadoJogo.paredes[estadoJogo.indiceParedeAtual] !== 'teto'){
                trocarCenario('cima')
            }
        break;
        case 'ArrowDown':
            trocarCenario('baixo')
        break;
        case 'ArrowRight':
            trocarCenario('dir')
        break;
        case 'ArrowLeft':
            trocarCenario('esq')
        break;
    }
})