class Personagem {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
        this.saude = 10;
        this.sono = 10;
        this.fome = 10;
        this.sede = 10;
        this.diversao = 10;
        this.dinheiro = 0;
        this.vivo = true;
    }

    comer(valor) {
        if (!this.vivo) return;
        if (this.dinheiro < 14) {
            alert(`${this.nome} não tem dinheiro suficiente para comer! Precisa de R$14.`);
            return;
        }
        this.dinheiro -= 14; // Dedução de dinheiro para comida
        this.fome += valor;
        if (this.fome > 10) this.fome = 10;
        alert(`${this.nome} comeu.`);
    }

    dormir() {
        if (!this.vivo) return;
        this.sono += 3;
        if (this.sono > 10) this.sono = 10;
        this.saude += 1;
        if (this.saude > 10) this.saude = 10;
        alert(`${this.nome} dormiu e recuperou sono e saúde.`);
    }

    beber() {
        if (!this.vivo) return;
        if (this.dinheiro < 5) {
            alert(`${this.nome} não tem dinheiro suficiente para beber! Precisa de R$5.`);
            return;
        }
        this.dinheiro -= 5; // Dedução de dinheiro para bebida
        this.sede += 3;
        if (this.sede > 10) this.sede = 10;
        alert(`${this.nome} bebeu água.`);
    }

    trabalhar() {
        if (!this.vivo) return;
        this.dinheiro += 20;
        this.sono -= 2;
        this.fome -= 2;
        this.diversao -= 1;
        this.saude -= 1;

        this.limitarStatus();
        alert(`${this.nome} trabalhou e ganhou R$20.`);
    }

    limitarStatus() {
        this.saude = Math.max(0, Math.min(10, this.saude));
        this.sono = Math.max(0, Math.min(10, this.sono));
        this.fome = Math.max(0, Math.min(10, this.fome));
        this.sede = Math.max(0, Math.min(10, this.sede));
        this.diversao = Math.max(0, Math.min(10, this.diversao));
    }
}

class PersonagemAtleta extends Personagem {
    constructor(nome, idade) {
        super(nome, idade);
        this.saude = 12;
    }
}

class PersonagemIntelectual extends Personagem {
    constructor(nome, idade) {
        super(nome, idade);
        this.fome = 12;
        this.sede = 12;
    }
}

class PersonagemFesteiro extends Personagem {
    constructor(nome, idade) {
        super(nome, idade);
        this.diversao = 12;
    }
}

let personagem;
let jogoInicializado = false;

function atualizarStatus() {
    document.getElementById('nome').textContent = personagem.nome;
    document.getElementById('dinheiro').textContent = personagem.dinheiro.toFixed(2);
    atualizarBarra('barraSaude', personagem.saude);
    atualizarBarra('barraSono', personagem.sono);
    atualizarBarra('barraFome', personagem.fome);
    atualizarBarra('barraSede', personagem.sede);
    atualizarBarra('barraDiversao', personagem.diversao);
}

function atualizarBarra(id, valor) {
    const valorParaBarra = Math.min(valor, 10);
    const porcentagem = (valorParaBarra / 10) * 100;
    document.getElementById(id).style.width = porcentagem + '%';
}

const botaoSobre = document.getElementById('btn-sobre');
const balaoSobre = document.getElementById('balao-sobre');
const quartelOptions = document.getElementById('quartel-options');
const gameOverScreen = document.getElementById('game-over-screen');
const deathMessage = document.getElementById('death-message');
const actionButtonsDiv = document.getElementById('action-buttons');

function mostrarBalao() {
    balaoSobre.style.display = 'block';
}

function fecharBalao() {
    balaoSobre.style.display = 'none';
}

botaoSobre.addEventListener('click', mostrarBalao);

function irParaFesta() {
    if (!personagem.vivo) return;

    const eventoAleatorio = Math.floor(Math.random() * 5);

    switch (eventoAleatorio) {
        case 0:
            alert(`${personagem.nome} foi a uma festa e dançou a noite toda!`);
            personagem.diversao += 3;
            personagem.sono -= 2;
            personagem.saude -= 1;
            personagem.dinheiro -= 5;
            break;
        case 1:
            alert(`${personagem.nome} encontrou um amigo na festa e se divertiu muito!`);
            personagem.diversao += 4;
            personagem.fome -= 1;
            personagem.sede -= 1;
            personagem.dinheiro -= 3;
            break;
        case 2:
            alert(`${personagem.nome} exagerou na comida e bebida da festa...`);
            personagem.fome += 2;
            personagem.sede += 2;
            personagem.saude -= 2;
            personagem.diversao += 1;
            personagem.dinheiro -= 7;
            break;
        case 3:
            alert(`${personagem.nome} foi a uma festa chata e voltou cedo.`);
            personagem.diversao -= 3;
            personagem.sono += 1;
            personagem.dinheiro -= 2;
            break;
        case 4:
            alert(`${personagem.nome} participou de um concurso de dança na festa e ganhou um prêmio!`);
            personagem.diversao += 5;
            personagem.dinheiro += 15;
            personagem.sono -= 3;
            personagem.fome -= 1;
            break;
        default:
            alert(`${personagem.nome} foi a uma festa. Nada de muito especial aconteceu.`);
            personagem.diversao += 1;
            break;
    }

    personagem.limitarStatus();
    atualizarStatus();
    verificarMorte();
}

function SairPorAi() {
    if (!personagem.vivo) return;

    const eventoAleatorio = Math.floor(Math.random() * 6);
    quartelOptions.style.display = 'none';

    switch (eventoAleatorio) {
        case 0:
            alert('Nada demais aconteceu, a vizinhança continua a mesma...');
            break;
        case 1:
            alert('Ao Andar pela cidade você encontrou sua Ex namorada e saiu correndo!');
            personagem.saude -= 4;
            personagem.fome -= 1;
            personagem.sede -= 2;
            personagem.sono -= 3;
            break;
        case 2:
            alert('Você achou uma moeda na rua!');
            personagem.dinheiro += 1;
            break;
        case 3:
            alert('Dois caras em uma moto...');
            personagem.dinheiro -= 20;
            break;
        case 4:
            alert('Você viu uma capivara, Que sorte a sua!!');
            personagem.saude += 2;
            break;
        case 5:
            alert('Você viu um pessoal acampando em um quartel:');
            quartelOptions.style.display = 'block';
            break;
        default:
            alert('Nada demais aconteceu, a vizinhança continua a mesma...');
            break;

    }

    personagem.limitarStatus();
    atualizarStatus();
    verificarMorte();
}

function escolherParticipar() {
    if (!personagem.vivo) return;
    alert('Você se juntou ao acampamento e fez novos amigos! (+3 Diversão, -1 Fome)');
    personagem.diversao += 3;
    personagem.fome -= 1;
    personagem.limitarStatus();
    atualizarStatus();
    quartelOptions.style.display = 'none';
    verificarMorte();
}

function escolherPonderar() {
    if (!personagem.vivo) return;
    alert('Você passou um tempo refletindo sobre o sistema. (+2 Saúde Mental, -1 Sono)');
    personagem.saude += 2;
    personagem.sono -= 1;
    personagem.limitarStatus();
    atualizarStatus();
    quartelOptions.style.display = 'none';
    verificarMorte();
}

function escolherTwittar() {
    if (!personagem.vivo) return;
    alert('Sua foto viralizou! (+10 Dinheiro, +1 Diversão, -1 Saúde)');
    personagem.dinheiro += 10;
    personagem.diversao += 1;
    personagem.saude -= 1;
    personagem.limitarStatus();
    atualizarStatus();
    quartelOptions.style.display = 'none';
    verificarMorte();
}

function verificarMorte() {
    if (!personagem || !personagem.vivo) return;

    if (!jogoInicializado) {
        return;
    }

    let mensagem = "";
    let morreu = false;

    if (personagem.saude <= 0) {
        mensagem = `${personagem.nome} desmaiou por exaustão e não resistiu. Fim de jogo!`;
        morreu = true;
    } else if (personagem.fome <= 0) {
        mensagem = `${personagem.nome} não aguentou a fome e partiu dessa para melhor.`;
        morreu = true;
    } else if (personagem.sede <= 0) {
        mensagem = `${personagem.nome} desidratou completamente. Fim da linha!`;
        morreu = true;
    } else if (personagem.sono <= 0) {
        mensagem = `${personagem.nome} não dormiu por dias e seu corpo falhou. RIP.`;
        morreu = true;
    } else if (personagem.diversao <= 0) {
        mensagem = `${personagem.nome} morreu de tédio. Que vida sem graça!`;
        morreu = true;
    }

    if (morreu) {
        personagem.vivo = false;
        deathMessage.textContent = mensagem;
        gameOverScreen.style.display = 'flex';
        desabilitarBotoesAcao();
        quartelOptions.style.display = 'none';
    }
}

function desabilitarBotoesAcao() {
    const buttons = actionButtonsDiv.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
    document.getElementById('sidebar').querySelectorAll('button').forEach(button => {
        if (button.id !== 'btn-sobre') {
            button.disabled = true;
        }
    });
}

function reiniciarJogo() {
    let nomeEscolhido = prompt("Seu personagem faleceu! Escolha um novo nome para ele:");
    if (!nomeEscolhido) {
        nomeEscolhido = "Novo Personagem";
    }

    let tipoEscolhido = prompt("Escolha o tipo do seu novo personagem:\n1. Atleta (Saúde extra)\n2. Intelectual (Fome e Sede extra)\n3. Festeiro (Diversão extra)\n\nDigite 1, 2 ou 3:");

    switch (tipoEscolhido) {
        case "1":
            personagem = new PersonagemAtleta(nomeEscolhido, 22);
            alert(`${nomeEscolhido} é um(a) Atleta!`);
            break;
        case "2":
            personagem = new PersonagemIntelectual(nomeEscolhido, 22);
            alert(`${nomeEscolhido} é um(a) Intelectual!`);
            break;
        case "3":
            personagem = new PersonagemFesteiro(nomeEscolhido, 22);
            alert(`${nomeEscolhido} é um(a) Festeiro(a)!`);
            break;
        default:
            personagem = new Personagem(nomeEscolhido, 22);
            alert(`${nomeEscolhido} é um(a) Personagem Padrão.`);
            break;
    }

    personagem.vivo = true;
    atualizarStatus();
    gameOverScreen.style.display = 'none';
    habilitarBotoesAcao();
    quartelOptions.style.display = 'none';
}

function habilitarBotoesAcao() {
    const buttons = actionButtonsDiv.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
    });
    document.getElementById('sidebar').querySelectorAll('button').forEach(button => {
        if (button.id !== 'btn-sobre') {
            button.disabled = false;
        }
    });
}

function iniciarJogo() {
    let nomeInicial = prompt("Bem-vindo(a) ao MicroLife! Escolha o nome do seu personagem:");
    if (!nomeInicial) {
        nomeInicial = "Estela";
    }

    let tipoEscolhido = prompt("Escolha o tipo do seu personagem:\n0. Padrão (apenas comum)\n1. Atleta (Saúde extra)\n2. Intelectual (Fome e Sede extra)\n3. Festeiro (Diversão extra)\n\nDigite 1, 2 ou 3:");

    switch (tipoEscolhido) {
        case "1":
            personagem = new PersonagemAtleta(nomeInicial, 22);
            alert(`${nomeInicial} é um(a) Atleta!`);
            break;
        case "2":
            personagem = new PersonagemIntelectual(nomeInicial, 22);
            alert(`${nomeInicial} é um(a) Intelectual!`);
            break;
        case "3":
            personagem = new PersonagemFesteiro(nomeInicial, 22);
            alert(`${nomeInicial} é um(a) Festeiro(a)!`);
            break;
        default:
            personagem = new Personagem(nomeInicial, 22);
            alert(`${nomeInicial} é um(a) Personagem Padrão.`);
            break;
    }

    atualizarStatus();
    jogoInicializado = true;
    gameOverScreen.style.display = 'none';
    habilitarBotoesAcao();
    quartelOptions.style.display = 'none';
}

window.onload = iniciarJogo;