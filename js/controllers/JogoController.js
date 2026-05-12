import { TEXTOS } from "../data/palavras.js";

export class JogoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  iniciar() {
    this.view.aoSelecionarIdioma(this.selecionarIdioma.bind(this));
    this.view.aoPressionarTecla(this.processarTecla.bind(this));
    this.view.aoClicarReiniciar(this.reiniciarJogo.bind(this));
  }

  selecionarIdioma(idioma) {
    try {
      this.model.iniciar(idioma);

      const estado = this.model.getEstado();

      this.view.mostrarJogo(idioma);
      this.view.inicializarTabuleiro(
        estado.maxTentativas,
        estado.tamanhoPalavra
      );
      this.view.renderizarTabuleiro(estado.tabuleiro);
      this.view.atualizarStatus(estado);
      this.view.limparMensagem();
    } catch (erro) {
      this.view.mostrarMensagem(erro.message);
    }
  }

  processarTecla(evento) {
    const estado = this.model.getEstado();

    if (!estado.emAndamento || estado.finalizado) {
      return;
    }

    const tecla = evento.key;
    const letra = tecla.toUpperCase();

    if (tecla === "Backspace") {
      evento.preventDefault();
      this.apagarLetra();
      return;
    }

    if (tecla === "Enter") {
      evento.preventDefault();
      this.enviarPalpite();
      return;
    }

    if (/^[A-Z]$/.test(letra)) {
      this.adicionarLetra(letra);
    }
  }

  adicionarLetra(letra) {
    const posicao = this.model.adicionarLetra(letra);

    if (!posicao) {
      return;
    }

    this.view.atualizarTile(posicao.linha, posicao.coluna, letra);
    this.view.limparMensagem();
  }

  apagarLetra() {
    const posicao = this.model.removerLetra();

    if (!posicao) {
      return;
    }

    this.view.atualizarTile(posicao.linha, posicao.coluna, "");
    this.view.limparMensagem();
  }

  enviarPalpite() {
    const resultado = this.model.enviarPalpite();
    const estado = this.model.getEstado();
    const idioma = estado.idioma;

    if (resultado.status === "incompleto") {
      this.view.mostrarMensagem(TEXTOS[idioma].palavraIncompleta);
      return;
    }

    if (resultado.status === "parado") {
      return;
    }

    this.view.pintarAvaliacao(resultado.linha, resultado.avaliacao);
    this.view.atualizarStatus(estado);

    if (resultado.status === "acertou") {
      this.tratarVitoria(resultado);
      return;
    }

    if (resultado.status === "perdeu") {
      this.tratarDerrota(resultado);
    }
  }

  tratarVitoria(resultado) {
    const idioma = this.model.getEstado().idioma;

    setTimeout(() => {
      alert(TEXTOS[idioma].acertou);

      this.model.proximaRodada();

      const novoEstado = this.model.getEstado();

      this.view.inicializarTabuleiro(
        novoEstado.maxTentativas,
        novoEstado.tamanhoPalavra
      );
      this.view.renderizarTabuleiro(novoEstado.tabuleiro);
      this.view.atualizarStatus(novoEstado);
      this.view.limparMensagem();
    }, 250);
  }

  tratarDerrota(resultado) {
    const idioma = this.model.getEstado().idioma;
    const mensagem = `${TEXTOS[idioma].perdeu} ${resultado.palavraSecreta}`;

    setTimeout(() => {
      alert(mensagem);
      this.view.mostrarMensagem(mensagem);
    }, 250);
  }

  reiniciarJogo() {
    this.model.reiniciar();

    const estado = this.model.getEstado();

    this.view.inicializarTabuleiro(
      estado.maxTentativas,
      estado.tamanhoPalavra
    );
    this.view.renderizarTabuleiro(estado.tabuleiro);
    this.view.atualizarStatus(estado);
    this.view.limparMensagem();
  }
}