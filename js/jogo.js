const estadoJogo = {
    paredes: ['parede-norte', 'parede-leste', 'parede-sul', 'parede-oeste', 'teto'], //0 a 4
    indiceParedeAtual: 0,
    olhandoParaOTeto: false,
    paredeAnterior: 0,
    emPopUp: false,
    emTerminal: false,

    inventario: [null, null, null, null, null],
    slotSelecionado: null,
    itemSelecionado: null,

    bluePrint: false,
   
    parafusosDuto: false,
    bateria: false,
    cabos: false,

    energiaAcionada: false,
    terminalHackeado: false,

    bombaConstruida: false,
    bombaNoCompartimento: false,

    finalizando: false,
};

const bluePrint = {
    cabos: false,
    bateria: false,
    fita: false,
    parafusosNoDuto: false,
    dinamite: false,
    relogio: false,
}

const estadoPuzzleLuz = {
    fiosConsertados: 0,
    quadroAberto: false,
}

const estadoPuzzleMaquina = {
    numeroAtual: 0,
    iniciado: false,
};

const estadoPuzzleTerminal = {
    hackeado: false,
}

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
            if (!estadoJogo.terminalHackeado) {
                document.getElementById('retorno').innerHTML = `
                    <p>"Esse seria um ótimo lugar para colocar uma bomba, iria arrebentar a tranca. Mas antes preciso abri-lo com esse terminal..."</p>
                `;
            } else {
                if (estadoJogo.itemSelecionado !== 'bomba') {
                    if (document.getElementById('painelPortaPopUp').classList.contains('painel-porta-fechado')) {
                        document.getElementById('painelPortaPopUp').classList.remove('painel-porta-fechado');
                        document.getElementById('painelPortaPopUp').classList.add('painel-porta-aberto');
                        if(estadoJogo.bombaNoCompartimento){
                            document.getElementById('bombaNoCompartimento').classList.remove('escondida');
                        }
                    } else{
                        document.getElementById('painelPortaPopUp').classList.remove('painel-porta-aberto');
                        document.getElementById('painelPortaPopUp').classList.add('painel-porta-fechado');
                        if(estadoJogo.bombaNoCompartimento){
                            document.getElementById('bombaNoCompartimento').classList.add('escondida');
                        }
                    }
                } else if (estadoJogo.itemSelecionado === 'bomba') {
                    if (document.getElementById('painelPortaPopUp').classList.contains('painel-porta-aberto')) {
                        document.getElementById('bombaNoCompartimento').classList.remove('escondida');
                        estadoJogo.bombaNoCompartimento = true;
                        
                        for (let i = 0; i < 5; i++) {
                            if (estadoJogo.inventario[i] === 'bomba') {
                                estadoJogo.inventario[i] = null;
                                const j = i + 1;
                                document.getElementById('slot' + j).classList.remove('item-fundo-bomba');
                                document.getElementById('slot' + j).classList.add('vazio');
                                document.getElementById('slot' + j).classList.remove('slotSelecionado');
                                estadoJogo.itemSelecionado = null;
                                estadoJogo.slotSelecionado = null;
                            }
                        }
                    } else {
                        document.getElementById('retorno').innerHTML = `
                            <p>"O compartimento está fechado. Preciso abri-lo primeiro para colocar a bomba."</p>
                        `;
                    }
                }
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
        case 'painelQuadroEnergiaPopUp':
            if(!estadoPuzzleLuz.quadroAberto){
                estadoPuzzleLuz.quadroAberto = true
                document.getElementById('vermelho').classList.remove('escondida');
                document.getElementById('verde').classList.remove('escondida');
                document.getElementById('azul').classList.remove('escondida');
                document.getElementById('painelQuadroEnergiaPopUp').classList.add('quadro-aberto');
                document.getElementById('painelQuadroEnergiaPopUp').classList.remove('quadro-fechado');
            }
            else{
                estadoPuzzleLuz.quadroAberto = false
                document.getElementById('painelQuadroEnergiaPopUp').classList.add('quadro-fechado');
                document.getElementById('painelQuadroEnergiaPopUp').classList.remove('quadro-aberto');
                document.getElementById('vermelho').classList.add('escondida');
                document.getElementById('verde').classList.add('escondida');
                document.getElementById('azul').classList.add('escondida');
            }
        break;
        //fim quadro de energia

        //começo mobília
        case 'mobilia':
            document.getElementById('retorno').innerHTML = `
            <p>"Uma mobília velha com algumas anotações..."</p>
            `
            abrirPainel('painelMobilia')
            document.getElementById('postitInventario1').classList.remove('escondida');
        break;
        case 'fechaMobilia':
            fecharPainel('painelMobilia')
        break;
        //fim mobília

        //estante
        case 'estante':
            if (estadoJogo.itemSelecionado !== 'livro'){
                document.getElementById('retorno').innerHTML = `
                    <p>"Muitos livros velhos, mas talvez eu encontre algo útil..."</p>
                `
            }
        break;
        case 'gaveta':
            abrirPainel('painelGaveta');
        break;
        case 'fechaGaveta':
            fecharPainel('painelGaveta');
        break;
        case 'abrePostitEstante':
            abrirPainel('painelPostitEstante');
            document.getElementById('postitInventario2').classList.remove('escondida')
        break;
        case 'fechaPostitEstante':
            fecharPainel('painelPostitEstante');
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
                coletarItem(document.querySelector('#parafusosNoDuto'));
                document.getElementById('duto').classList.add('duto-aberto');
                document.getElementById('abrePostitDuto').classList.remove('escondida');
            }
        break;
        case 'abrePostitDuto':
            abrirPainel('painelPostitDuto');
            document.getElementById('postitInventario3').classList.remove('escondida');
        break;
        case 'fechaPostitDuto':
            fecharPainel('painelPostitDuto');
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
        document.getElementById('cofreMaquina').classList.add('escondida')
    } else {
        // Pega apenas o número do ID (ex: de 'b1' vira 1)
        const botaoClicado = parseInt(bloco.id.replace('b', ''));

        if (botaoClicado === estadoPuzzleMaquina.numeroAtual + 1) {
            estadoPuzzleMaquina.numeroAtual++;
            bloco.classList.add('respondido');
            if (estadoPuzzleMaquina.numeroAtual === 9) {
                document.getElementById('retorno').innerHTML = `<p>"A máquina destravou e liberou a Bateria e Cabos!"</p>`;
                document.getElementById('bateria').classList.remove('escondida')
                document.getElementById('cabos').classList.remove('escondida')
                document.getElementById('ordemNumerica').classList.add('escondida')
                document.getElementById('cofreMaquina').classList.remove('escondida');
                document.getElementById('painelMaquina').classList.add('maquina-aberta');
                document.getElementById('painelMaquina').classList.remove('maquina-fechada');
            }
        } else {
            estadoPuzzleMaquina.numeroAtual = 0;
            estadoPuzzleMaquina.iniciado = false;
            document.getElementById('ordemNumerica').classList.add('escondida');
            document.getElementById('iniciarPuzzleMaquina').classList.remove('escondida');
            document.getElementById('cofreMaquina').classList.remove('escondida');
            document.getElementById('retorno').innerHTML = `<p>"Sequência incorreta!"</p>`;
            for(i=1; i<10; i++){
                document.getElementById('b' + i).classList.remove('respondido')
            }
        }
    }
}

function puzzleQuadroForca(fio){
    if (estadoJogo.itemSelecionado !== 'fita') {
        document.getElementById('retorno').innerHTML = `<p>"Preciso de algo para prender um fio a outro."</p>`;
        return;
    }

    if (!fio.classList.contains('consertado')) {
        fio.classList.add('consertado');
        estadoPuzzleLuz.fiosConsertados++;

        if (estadoPuzzleLuz.fiosConsertados === 3) {
            estadoJogo.energiaAcionada = true;
            document.getElementById('retorno').innerHTML = `<p>"A energia foi restaurada!"</p>`;
            if (estadoJogo.bluePrint === true) {
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
            document.getElementById(estadoJogo.slotSelecionado).classList.remove('item-fundo-fita')
            document.getElementById('bpfita').classList.remove('escondida')
            if(bluePrint.bateria && bluePrint.cabos && bluePrint.dinamite && bluePrint.fita && bluePrint.parafusosNoDuto && bluePrint.relogio){
                document.getElementById('botaoMontaBomba').classList.remove('escondida');
            }
        break;
    }
    const indice = estadoJogo.inventario.indexOf(material);

    var slotMarcado = document.getElementById(estadoJogo.slotSelecionado)
    estadoJogo.inventario[indice] = null
    slotMarcado.classList.add('vazio')
    slotMarcado.classList.remove('slotSelecionado')
    estadoJogo.itemSelecionado = null
    estadoJogo.slotSelecionado = null
}

function transferirBluePrint(){
    const itensValidos = ['fita', 'relogio', 'cabos', 'parafusosNoDuto', 'bateria', 'dinamite'];
    for (let i=0; i<5; i++){
        if (itensValidos.includes(estadoJogo.inventario[i])){
            const elemento = estadoJogo.inventario[i]
            
            if(estadoJogo.energiaAcionada){
                bluePrint[elemento] = true
                estadoJogo.inventario[i] = null
                const j = i+1;
                document.getElementById('slot' + j).classList.remove('item-fundo-'+elemento)
                if (estadoJogo.slotSelecionado === 'slot' + j) {
                    document.getElementById('slot' + j).classList.remove('slotSelecionado');
                    estadoJogo.itemSelecionado = null;
                    estadoJogo.slotSelecionado = null;
                }
                estadoJogo.itemSelecionado = null
                estadoJogo.slotSelecionado = null
                document.getElementById('bp' + elemento).classList.remove('escondida')
            }else{
                if(estadoJogo.inventario[i] !== 'fita'){
                    bluePrint[elemento] = true
            
                    estadoJogo.inventario[i] = null
                    const j = i+1;
                    document.getElementById('slot' + j).classList.remove('item-fundo-'+elemento)
                    document.getElementById('slot' + j).classList.add('vazio')
                    document.getElementById('slot' + j).classList.remove('slotSelecionado')
                    estadoJogo.itemSelecionado = null
                    estadoJogo.slotSelecionado = null
                    document.getElementById('bp' + elemento).classList.remove('escondida')
                }
            }
        }
    }
    if(bluePrint.bateria && bluePrint.cabos && bluePrint.dinamite && bluePrint.fita && bluePrint.parafusosNoDuto && bluePrint.relogio){
        document.getElementById('botaoMontaBomba').classList.remove('escondida');
    }
}

function coletarItem(elemento){
    const slotLivre = document.querySelector('.slot.vazio');

    if (slotLivre){
        const numeroSlot = Number(slotLivre.dataset.n) - 1;
        elemento.classList.add('escondida');
        if(estadoJogo.bluePrint === false){
            slotLivre.classList.add('item-fundo-' + elemento.id);
            slotLivre.classList.remove('vazio');
            estadoJogo.inventario[numeroSlot] = elemento.id;
        }
        else {
            switch (elemento.id) {
                case 'bateria':
                    bluePrint.bateria = true;
                    document.getElementById('retorno').innerHTML = `<p>"A bateria foi adicionada ao projeto de bomba."</p>`;
                    document.getElementById('bp' + elemento.id).classList.remove('escondida');
                    break;
                case 'cabos':
                    bluePrint.cabos = true;
                    document.getElementById('retorno').innerHTML = `<p>"Os cabos foram adicionados ao projeto de bomba."</p>`;
                    document.getElementById('bp' + elemento.id).classList.remove('escondida');
                    break;
                case 'relogio':
                    bluePrint.relogio = true;
                    document.getElementById('retorno').innerHTML = `<p>"O relógio de bolso foi adicionado ao projeto de bomba."</p>`;
                    document.getElementById('bp' + elemento.id).classList.remove('escondida');
                    break;
                case 'parafusosNoDuto':
                    bluePrint.parafusosNoDuto = true;
                    document.getElementById('retorno').innerHTML = `<p>"Os parafusos foram adicionados ao projeto de bomba."</p>`;
                    document.getElementById('bp' + elemento.id).classList.remove('escondida');
                    break;
                case 'dinamite':
                    bluePrint.dinamite = true;
                    document.getElementById('retorno').innerHTML = `<p>"A dinamite foi adicionada ao projeto de bomba."</p>`;
                    document.getElementById('bp' + elemento.id).classList.remove('escondida');
                    break;
                default:
                    slotLivre.classList.add('item-fundo-' + elemento.id);
                    slotLivre.classList.remove('vazio');
                    estadoJogo.inventario[numeroSlot] = elemento.id;
                    break;
            }
            if(bluePrint.bateria && bluePrint.cabos && bluePrint.dinamite && bluePrint.fita && bluePrint.parafusosNoDuto && bluePrint.relogio && !estadoJogo.bombaConstruida){
                document.getElementById('botaoMontaBomba').classList.remove('escondida');
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

    document.getElementById('retorno').innerHTML = `
        <p></p>
    `

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

const chaveDaSenha1 = Math.floor(Math.random()*10)+1;
const chaveDaSenha2 = Math.floor(Math.random()*10)+1;
const chaveDaSenha3 = Math.floor(Math.random()*10)+1;

document.getElementById('postitMobilia').innerHTML = `
    <p>*${chaveDaSenha1}</p>
`
document.getElementById('conteudoPostitEstante').innerHTML = `
    <p>+${chaveDaSenha2}</p>
`
document.getElementById('conteudoPostitDuto').innerHTML = `
    <p>/${chaveDaSenha3}</p>
`

document.getElementById('postitInventario1').innerHTML = `
    <p>*${chaveDaSenha1}</p>
`
document.getElementById('postitInventario2').innerHTML = `
    <p>+${chaveDaSenha2}</p>
`
document.getElementById('postitInventario3').innerHTML = `
    <p>/${chaveDaSenha3}</p>
`


console.log(chaveDaSenha1)
console.log(chaveDaSenha2)
console.log(chaveDaSenha3)

function gerarSenha() {
    const senha = 6767;
    return senha;
}

function aprovarSenha(senha) {
    if (senha === 6767*chaveDaSenha1+chaveDaSenha2/chaveDaSenha3){
        document.getElementById('consoleTerminal').innerHTML = `
        <p>Sucess<br>Senha correta!</p>
        `
        estadoJogo.terminalHackeado = true;
        document.getElementById('painelPortaPopUp').classList.add('painel-porta-aberto');
        document.getElementById('dinamite').classList.remove('escondida');
    }
    else{
        document.getElementById('consoleTerminal').innerHTML = `
        <p>Error<br>Senha incorreta!</p>
        `
    }
}

function construirBomba(){
    document.getElementById('botaoMontaBomba').classList.add('escondida');
    document.getElementById('itensNaBancada').innerHTML = `
        <div class="elemento-interativo" id="bomba" onclick="coletarItem(this)"><div>
    `
}

let explosao
function finalJogo(){
    let tempo = 5;
    if(!estadoJogo.finalizando){
        estadoJogo.finalizando = true
        explosao = setInterval(function(){
            document.getElementById('retorno').innerHTML = `
                <p>${tempo}</p>
            `
            tempo--
            if(tempo < 1){
                clearInterval(explosao);
                document.getElementById('retorno').innerHTML = `
                <p>BOOOOOOOOOOMMMM!!!</p>
                `
                clearInterval(timer);
                let textoFinal;
                if(document.getElementById('painelPortaPopUp').classList.contains('painel-porta-aberto')){
                    textoFinal = `
                        <p>Você conseguiu contruir a bomba relógio, a fuga parecia imediata. Porém, você se esqueceu de fechar o compartimento em que a bomba foi colocada, explodindo você e tudo que estava dentro da sala...</p>
                    `
                } else{
                    textoFinal = `
                        <p>Construindo e explodindo a bomba relógio, você conseguiu arrebentar o circuito que trancava a porta. Dessa forma, você fugiu do prédio velho e úmido, mas nunca irá saber com certeza quem ou o que trancou você ali... </p>
                    `
                }
                document.getElementById('fim').classList.remove('escondida');
                document.getElementById('qualFinal').innerHTML = textoFinal;
                document.getElementById('tempoFinal').innerHTML = document.getElementById('timer-universal').innerHTML;
            }
        }, 1000)
    } else{
        clearInterval(explosao);
        estadoJogo.finalizando = false
        document.getElementById('retorno').innerHTML = `
            <p>Bomba pausada.</p>
        `
    }
}

document.onkeydown = function(event){
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
                marcarSlot(document.getElementById('slot1'))
            break;
            case '2':
                marcarSlot(document.getElementById('slot2'))
            break;
            case '3':
                marcarSlot(document.getElementById('slot3'))
            break;
            case '4':
                marcarSlot(document.getElementById('slot4'))
            break;
            case '5':
                marcarSlot(document.getElementById('slot5'))
            break;
        }
    }
};

const campoCodigo = document.getElementById('input_terminal')
campoCodigo.onkeydown = function(event){
    if(event.key === 'Tab'){
        event.preventDefault(); //evita passar para o próximo elemento do navegador

        const cursor = this.selectionStart; //posição do cursor OU começo da seleção
        const fim = this.selectionEnd; //fim da seleção

        this.value = this.value.substring(0, cursor) + "\t" + this.value.substring(fim); //substring pega do 0 até a posição do cursor ou a metade da direita

        this.selectionStart = cursor + 1;
        this.selectionEnd = cursor + 1; //coloca o cursor após o tab
    }
};

/*const campoCodigo = document.getElementById('input_terminal')
campoCodigo.addEventListener('keydown', function(event){
    if(event.key === 'Tab'){
        event.preventDefault(); //evita passar para o próximo elemento do navegador

        const cursor = this.selectionStart; //posição do cursor OU começo da seleção
        const fim = this.selectionEnd; //fim da seleção

        this.value = this.value.substring(0, cursor) + "\t" + this.value.substring(fim); //substring pega do 0 até a posição do cursor ou a metade da direita

        this.selectionStart = cursor + 1;
        this.selectionEnd = cursor + 1; //coloca o cursor após o tab
    }
});*/


/*document.addEventListener('keydown', (event) =>{
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
})*/

let seg=0, min=0;
const timer = setInterval(function(){
    seg++
    if(seg>59){
        min++
        seg=0
    }
    if(min>9 && seg>9){
        document.getElementById('timer-universal').innerHTML = `
        <p>${min}:${seg}</p>
    `
    }
    else if(min>9){
        document.getElementById('timer-universal').innerHTML = `
        <p>${min}:0${seg}</p>
    `
    }
    else if(seg>9){
        document.getElementById('timer-universal').innerHTML = `
        <p>0${min}:${seg}</p>
    `
    }
    else{
        document.getElementById('timer-universal').innerHTML = `
        <p>0${min}:0${seg}</p>
    `
    }
}, 1000)