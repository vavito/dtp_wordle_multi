let dic = {
  pt: ["TESTE", "CLASSE", "DADOS", "LOGIC", "PILHA", "SUITE"],
  en: ["CLEAN", "SMELL", "PRINT", "CODE", "FILES", "STACK"], // CODE tem 4 letras, vai dar erro no grid de 5! (Desafio extra)
};

let i_escolhido = "";
let p_s = "";
let r_a = 0;
let c_a = 0;
let sc = 0;
let rd = 1;
let end = false;
let m = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// Função que mistura controle de fluxo com UI
function comecar(idioma) {
  i_escolhido = idioma;
  document.getElementById("tela-inicio").style.display = "none";
  document.getElementById("tela-jogo").style.display = "flex";

  if (idioma === "pt") {
    document.getElementById("msg-instr").innerText =
      "Tente adivinhar a palavra de 5 letras.";
  } else {
    document.getElementById("msg-instr").innerText = "Guess the 5-letter word.";
  }

  p_s =
    dic[i_escolhido][
      Math.floor(Math.random() * dic[i_escolhido].length)
    ].toUpperCase();
  desenhar();
}

function desenhar() {
  const b = document.getElementById("board");
  b.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("div");
    row.className = "linha";
    for (let j = 0; j < 5; j++) {
      let t = document.createElement("div");
      t.className = "tile";
      t.id = "t-" + i + "-" + j;
      row.appendChild(t);
    }
    b.appendChild(row);
  }
}

window.onkeydown = function (e) {
  if (end || i_escolhido === "") return;
  let k = e.key.toUpperCase();

  if (k === "BACKSPACE" && c_a > 0) {
    c_a--;
    m[r_a][c_a] = "";
    document.getElementById("t-" + r_a + "-" + c_a).innerText = "";
  } else if (k === "ENTER" && c_a === 5) {
    let u_w = m[r_a].join("");

    // Lógica de cores e pontuação (Tudo acoplado)
    for (let i = 0; i < 5; i++) {
      let tile = document.getElementById("t-" + r_a + "-" + i);
      if (u_w[i] === p_s[i]) {
        tile.style.background = "#538d4e";
        sc += 10;
      } else if (p_s.includes(u_w[i])) {
        tile.style.background = "#b59f3b";
        sc += 5;
      } else {
        tile.style.background = "#3a3a3c";
      }
      tile.style.borderColor = "transparent";
    }

    document.getElementById("score-val").innerText = sc;

    if (u_w === p_s) {
      alert(i_escolhido === "pt" ? "Acertou!" : "Correct!");
      rd++;
      document.getElementById("round-val").innerText = rd;
      r_a = 0;
      c_a = 0;
      p_s =
        dic[i_escolhido][
          Math.floor(Math.random() * dic[i_escolhido].length)
        ].toUpperCase();
      m = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ];
      desenhar();
    } else {
      r_a++;
      c_a = 0;
      if (r_a === 6) {
        alert("Fim/End! Word: " + p_s);
        end = true;
      }
    }
  } else if (/^[A-Z]$/.test(k) && c_a < 5) {
    m[r_a][c_a] = k;
    document.getElementById("t-" + r_a + "-" + c_a).innerText = k;
    c_a++;
  }
};
