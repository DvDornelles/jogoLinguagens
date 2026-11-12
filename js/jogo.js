const estadoJogo = {
    paredes: ['parede-norte', 'parede-leste', 'parede-sul', 'parede-oeste', 'teto'], //0 a 4
    indiceParedeAtual: 0,
    olhandoParaOTeto: false,
    paredeAnterior: 0,
    emPopUp: false,
    emTerminal: false,

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
    estadoJogo.emPopUp = true
}
function fecharPainel(id){
    document.getElementById(id).classList.add('escondida');
    estadoJogo.emPopUp = false
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
            estadoJogo.emTerminal = true;
        break;
        case 'fechaPainelPorta':
            fecharPainel('painelPortaPopUp');
            estadoJogo.emTerminal = false;
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
            estadoJogo.bluePrint = true;
        break;
        case 'fechaBluePrint':
            fecharPainel('painelBluePrint');
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

        //começo mobília
        case 'mobilia':
            document.getElementById('retorno').innerHTML = `
            <p>"Uma mobília velha com algumas anotações..."</p>
            `
            abrirPainel('painelMobilia')
        break;
        case 'fechaMobilia':
            fecharPainel('painelMobilia')
        break;
        //fim mobília

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
                coletarItem(document.querySelector('#parafusosNoDuto'))
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
    const numeroSlot = Number(slot.dataset.n) - 1;
    estadoJogo.itemSelecionado = estadoJogo.inventario[numeroSlot];
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
        estadoJogo.inventario[indice] = null;
        console.log("✅ Item removido! O slot agora está vazio.");
    } else {
        console.log("⚠️ Item não encontrado.");
    }
    console.log(estadoJogo.inventario);     
}

function transferirBluePrint(){
    const itensValidos = ['fita', 'relogio', 'cabos', 'parafusosNoDuto', 'bateria', 'dinamite'];
    for (let i=0; i<5; i++){
        if (itensValidos.includes(estadoJogo.inventario[i])){
            const elemento = estadoJogo.inventario[i]
            
            if(estadoJogo.energiaAcionada){
                bluePrint.elemento = true
            
                estadoJogo.inventario[i] = ''
                const j = i+1;
                document.getElementById('slot' + j).innerHTML = ``
                estadoJogo.itemSelecionado = null
                estadoJogo.slotSelecionado = null
                document.getElementById('bp' + elemento).classList.remove('escondida')
            }else{
                if(estadoJogo.inventario[i] !== 'fita'){
                    bluePrint[elemento] = true
            
                    estadoJogo.inventario[i] = ''
                    const j = i+1;
                    document.getElementById('slot' + j).innerHTML = ``
                    estadoJogo.itemSelecionado = null
                    estadoJogo.slotSelecionado = null
                    document.getElementById('bp' + elemento).classList.remove('escondida')
                }
            }
        }
    }
}

function coletarItem(elemento){
    const slotLivre = document.querySelector('.slot.vazio');

    if (slotLivre){
        estadoJogo.inventario.push(elemento.id);
        elemento.classList.add('escondida');

        if(estadoJogo.bluePrint === false){
            const slotLivre = document.querySelector('.slot.vazio');
            slotLivre.classList.add('item-fundo');
            slotLivre.classList.remove('vazio');
        }
        else{
            switch (elemento.id){
                case 'bateria':
                    bluePrint.bateria = true
                    document.getElementById('retorno').innerHTML = `<p>"A bateria foi adicionada ao projeto de bomba."</p>`
                break;
                case 'cabos':
                    bluePrint.cabos = true
                    document.getElementById('retorno').innerHTML = `<p>"Os caboas foram adicionados ao projeto de bomba."</p>`
                break;
                case 'relogio':
                    bluePrint.relogio = true
                    document.getElementById('retorno').innerHTML = `<p>"O relógio de bolso foi adicionado ao projeto de bomba."</p>`
                break;
                case 'parafusosNoDuto':
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
    } else{
        document.getElementById('retorno').innerHTML = `<p>"Seu inventário está cheio."</p>`
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
    if (!estadoJogo.emTerminal){
        switch (event.key){
            case 'ArrowUp':
            case 'w':
                if(!estadoJogo.olhandoParaOTeto){
                    trocarCenario('cima')
                }
            break;
            case 'ArrowDown':
            case 's':
                if(estadoJogo.olhandoParaOTeto){
                    trocarCenario('baixo')
                }
            break;
            case 'ArrowRight':
            case 'd':
                if(!estadoJogo.olhandoParaOTeto){
                    trocarCenario('dir')
                }
            break;
            case 'ArrowLeft':
            case 'a':
                if(!estadoJogo.olhandoParaOTeto){
                    trocarCenario('esq')
                }
            break;
            case '1':
                marcarSlot(document.getElementById('slot'+1))
            break;
            case '2':
                marcarSlot(document.getElementById('slot'+2))
            break;
            case '3':
                marcarSlot(document.getElementById('slot'+3))
            break;
            case '4':
                marcarSlot(document.getElementById('slot'+4))
            break;
            case '5':
                marcarSlot(document.getElementById('slot'+5))
            break;
        }
    }
})

function submeterCod() {
    const codigo = document.getElementById('input_terminal').value;
    let retornoCod = 'erro'
    console.log(codigo);
    try {
        retornoCod = eval(codigo); //executa o texto como se fosse código js
    } catch (erro){
    }
    aprovarSenha(retornoCod)
}
//senha deve ser 6767*52+27/3
function gerarSenha() {
    const senha = 6767;
    return senha;
}

function aprovarSenha(senha) {
    if (senha === 351893){
        console.log('acertou')
        return true;
    }
    else{
        console.log('errou')
        return false;
    }
}

const campoCodigo = document.getElementById('input_terminal')
campoCodigo.addEventListener('keydown', function(event){
    if(event.key === 'Tab'){
        event.preventDefault(); //evita passar para o próximo elemento do navegador

        const cursor = this.selectionStart; //posição do cursor OU começo da seleção
        const fim = this.selectionEnd; //fim da seleção

        this.value = this.value.substring(0, cursor) + "\t" + this.value.substring(fim); //substring pega do 0 até a posição do cursor ou a metade da direita

        this.selectionStart = cursor + 1;
        this.selectionEnd = cursor + 1; //coloca o cursor após o tab
    }
});