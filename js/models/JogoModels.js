export class JogoModel {
  constructor(palavrasPorIdioma, tamanhoPalavra, maxTentativas) {
    this.palavrasPorIdioma = palavrasPorIdioma;
    this.tamanhoPalavra = tamanhoPalavra;
    this.maxTentativas = maxTentativas;

    this.idioma = "";
    this.palavraSecreta = "";
    this.pontuacao = 0;
    this.rodada = 1;
    this.linhaAtual = 0;
    this.colunaAtual = 0;
    this.emAndamento = false;
    this.finalizado = false;
    this.tabuleiro = this.criarTabuleiro();
  }

  iniciar(idioma) {
    this.idioma = idioma;
    this.pontuacao = 0;
    this.rodada = 1;
    this.emAndamento = true;

    this.iniciarRodada();
  }

  iniciarRodada() {
    this.palavraSecreta = this.sortearPalavra();
    this.linhaAtual = 0;
    this.colunaAtual = 0;
    this.finalizado = false;
    this.tabuleiro = this.criarTabuleiro();
  }

  proximaRodada() {
    this.rodada++;
    this.iniciarRodada();
  }

  reiniciar() {
    if (!this.idioma) {
      return;
    }

    this.iniciar(this.idioma);
  }

  adicionarLetra(letra) {
    if (!this.podeReceberEntrada()) {
      return null;
    }

    if (!/^[A-Z]$/.test(letra)) {
      return null;
    }

    if (this.colunaAtual >= this.tamanhoPalavra) {
      return null;
    }

    const posicao = {
      linha: this.linhaAtual,
      coluna: this.colunaAtual,
    };

    this.tabuleiro[this.linhaAtual][this.colunaAtual] = letra;
    this.colunaAtual++;

    return posicao;
  }

  removerLetra() {
    if (!this.podeReceberEntrada()) {
      return null;
    }

    if (this.colunaAtual <= 0) {
      return null;
    }

    this.colunaAtual--;

    const posicao = {
      linha: this.linhaAtual,
      coluna: this.colunaAtual,
    };

    this.tabuleiro[this.linhaAtual][this.colunaAtual] = "";

    return posicao;
  }

  enviarPalpite() {
    if (!this.podeReceberEntrada()) {
      return {
        status: "parado",
      };
    }

    if (this.colunaAtual < this.tamanhoPalavra) {
      return {
        status: "incompleto",
      };
    }

    const linhaAvaliada = this.linhaAtual;
    const palpite = this.tabuleiro[this.linhaAtual].join("");
    const avaliacao = this.avaliarPalpite(palpite);
    const pontos = this.calcularPontos(avaliacao);

    this.pontuacao += pontos;

    if (palpite === this.palavraSecreta) {
      this.finalizado = true;

      return {
        status: "acertou",
        linha: linhaAvaliada,
        palpite,
        avaliacao,
        pontos,
        palavraSecreta: this.palavraSecreta,
      };
    }

    this.linhaAtual++;
    this.colunaAtual = 0;

    if (this.linhaAtual >= this.maxTentativas) {
      this.finalizado = true;
      this.emAndamento = false;

      return {
        status: "perdeu",
        linha: linhaAvaliada,
        palpite,
        avaliacao,
        pontos,
        palavraSecreta: this.palavraSecreta,
      };
    }

    return {
      status: "continua",
      linha: linhaAvaliada,
      palpite,
      avaliacao,
      pontos,
      palavraSecreta: this.palavraSecreta,
    };
  }

  avaliarPalpite(palpite) {
    const resultado = Array(this.tamanhoPalavra).fill("erro");
    const letrasRestantes = {};

    for (let i = 0; i < this.tamanhoPalavra; i++) {
      const letraPalpite = palpite[i];
      const letraSecreta = this.palavraSecreta[i];

      if (letraPalpite === letraSecreta) {
        resultado[i] = "correto";
      } else {
        letrasRestantes[letraSecreta] =
          (letrasRestantes[letraSecreta] || 0) + 1;
      }
    }

    for (let i = 0; i < this.tamanhoPalavra; i++) {
      const letraPalpite = palpite[i];

      if (resultado[i] === "correto") {
        continue;
      }

      if (letrasRestantes[letraPalpite] > 0) {
        resultado[i] = "tem";
        letrasRestantes[letraPalpite]--;
      }
    }

    return resultado;
  }

  calcularPontos(avaliacao) {
    return avaliacao.reduce((total, item) => {
      if (item === "correto") {
        return total + 10;
      }

      if (item === "tem") {
        return total + 5;
      }

      return total;
    }, 0);
  }

  sortearPalavra() {
    const palavras = this.palavrasPorIdioma[this.idioma] || [];

    const palavrasValidas = palavras.filter(
      (palavra) => palavra.length === this.tamanhoPalavra,
    );

    if (palavrasValidas.length === 0) {
      throw new Error("Nenhuma palavra válida encontrada para este idioma.");
    }

    const indice = Math.floor(Math.random() * palavrasValidas.length);

    return palavrasValidas[indice].toUpperCase();
  }

  criarTabuleiro() {
    return Array.from({ length: this.maxTentativas }, () =>
      Array(this.tamanhoPalavra).fill(""),
    );
  }

  podeReceberEntrada() {
    return this.emAndamento && !this.finalizado;
  }

  getEstado() {
    return {
      idioma: this.idioma,
      pontuacao: this.pontuacao,
      rodada: this.rodada,
      linhaAtual: this.linhaAtual,
      colunaAtual: this.colunaAtual,
      emAndamento: this.emAndamento,
      finalizado: this.finalizado,
      tamanhoPalavra: this.tamanhoPalavra,
      maxTentativas: this.maxTentativas,
      tabuleiro: this.tabuleiro.map((linha) => [...linha]),
    };
  }
}
