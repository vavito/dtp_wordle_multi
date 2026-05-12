import { TEXTOS } from "../data/palavras.js";

export class JogoView {
  constructor() {
    this.telaInicio = document.getElementById("tela-inicio");
    this.telaJogo = document.getElementById("tela-jogo");
    this.msgInstr = document.getElementById("msg-instr");
    this.scoreVal = document.getElementById("score-val");
    this.roundVal = document.getElementById("round-val");
    this.board = document.getElementById("board");
    this.mensagem = document.getElementById("mensagem");
    this.btnReiniciar = document.getElementById("btn-reiniciar");
    this.botoesIdioma = document.querySelectorAll("[data-idioma]");
  }

  mostrarJogo(idioma) {
    this.telaInicio.classList.add("oculto");
    this.telaJogo.classList.add("ativo");
    this.atualizarInstrucao(idioma);
  }

  atualizarInstrucao(idioma) {
    this.msgInstr.innerText = TEXTOS[idioma].instrucao;
    this.btnReiniciar.innerText = TEXTOS[idioma].reiniciar;
  }

  inicializarTabuleiro(maxTentativas, tamanhoPalavra) {
    this.board.innerHTML = "";

    for (let linha = 0; linha < maxTentativas; linha++) {
      const elementoLinha = document.createElement("div");
      elementoLinha.className = "linha";

      for (let coluna = 0; coluna < tamanhoPalavra; coluna++) {
        const tile = document.createElement("div");

        tile.className = "tile";
        tile.id = `t-${linha}-${coluna}`;

        elementoLinha.appendChild(tile);
      }

      this.board.appendChild(elementoLinha);
    }
  }

  renderizarTabuleiro(tabuleiro) {
    this.limparCores();

    tabuleiro.forEach((linha, indiceLinha) => {
      linha.forEach((letra, indiceColuna) => {
        this.atualizarTile(indiceLinha, indiceColuna, letra);
      });
    });
  }

  atualizarTile(linha, coluna, letra) {
    const tile = document.getElementById(`t-${linha}-${coluna}`);

    if (!tile) {
      return;
    }

    tile.innerText = letra;
  }

  pintarAvaliacao(linha, avaliacao) {
    avaliacao.forEach((resultado, coluna) => {
      const tile = document.getElementById(`t-${linha}-${coluna}`);

      if (!tile) {
        return;
      }

      tile.classList.add(resultado);
    });
  }

  limparCores() {
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
      tile.classList.remove("correto", "tem", "erro");
    });
  }

  atualizarStatus(estado) {
    this.scoreVal.innerText = estado.pontuacao;
    this.roundVal.innerText = estado.rodada;
  }

  mostrarMensagem(texto) {
    this.mensagem.innerText = texto;
  }

  limparMensagem() {
    this.mensagem.innerText = "";
  }

  aoSelecionarIdioma(callback) {
    this.botoesIdioma.forEach((botao) => {
      botao.addEventListener("click", () => {
        callback(botao.dataset.idioma);
      });
    });
  }

  aoPressionarTecla(callback) {
    window.addEventListener("keydown", callback);
  }

  aoClicarReiniciar(callback) {
    this.btnReiniciar.addEventListener("click", callback);
  }
}
