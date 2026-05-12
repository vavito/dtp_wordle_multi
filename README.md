# Wordle Eng

Projeto web de um jogo no estilo Wordle, refatorado para melhorar a organização, legibilidade e manutenção do código. A refatoração teve como foco a aplicação do padrão **Model-View-Controller (MVC)** e boas práticas de construção de software.

## Objetivo do projeto

O objetivo principal foi reorganizar o código original do jogo, que concentrava responsabilidades em poucos arquivos, misturando regra de negócio, controle de estado, manipulação do HTML e tratamento de eventos.

Com a refatoração, o sistema passou a ter responsabilidades mais bem separadas, facilitando a leitura, manutenção, testes e futuras evoluções do projeto.

## Estrutura de pastas

```text
DTP/
├── index.html
├── assets/
│   └── css/
│       └── styles.css
├── js/
│   ├── scripts.js
│   ├── data/
│   │   └── palavras.js
│   ├── models/
│   │   └── JogoModel.js
│   ├── views/
│   │   └── JogoView.js
│   └── controllers/
│       └── JogoController.js
└── legado/
    └── indexOld.html
```

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Módulos ES6
- Padrão arquitetural MVC

## Como executar o projeto

Como o projeto utiliza módulos JavaScript ES6, o ideal é executá-lo por meio de um servidor local, e não apenas abrindo o arquivo diretamente pelo navegador.

### Opção 1: usando a extensão Live Server no VS Code

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão **Live Server**, caso ainda não tenha instalado.
3. Clique com o botão direito no arquivo `index.html`.
4. Selecione a opção **Open with Live Server**.
5. O jogo será aberto automaticamente no navegador.

### Opção 2: usando Python

Na pasta raiz do projeto, execute:

```bash
python -m http.server 5500
```

Depois, acesse no navegador:

```text
http://localhost:5500
```

Caso o projeto esteja dentro de uma pasta chamada `DTP`, entre nela antes de executar o comando:

```bash
cd DTP
python -m http.server 5500
```

## Como jogar

1. Escolha o idioma do jogo.
2. Digite uma palavra com 5 letras.
3. Pressione `Enter` para enviar o palpite.
4. Use `Backspace` para apagar letras.
5. O jogo indicará quais letras estão corretas, quais existem na palavra em posição diferente e quais não pertencem à palavra secreta.

## Relatório de Code Smells encontrados e soluções aplicadas

### 1. Código com muitas responsabilidades

**Problema encontrado:**  
O código original misturava regra de negócio, manipulação da interface, controle de eventos e estado do jogo em poucos arquivos e funções.

**Code Smell relacionado:**  
Funções com responsabilidades demais, baixa coesão e alto acoplamento.

**Solução aplicada:**  
O projeto foi reorganizado no padrão MVC:

- `JogoModel.js` passou a cuidar das regras e do estado do jogo;
- `JogoView.js` passou a cuidar da interface;
- `JogoController.js` passou a coordenar os eventos e a comunicação entre Model e View.

Essa separação tornou o código mais organizado, fácil de entender e mais simples de manter.

### 2. Nomes pouco expressivos

**Problema encontrado:**  
O código original usava nomes abreviados e pouco claros, como `r_a`, `c_a`, `sc`, `rd`, `p_s`, `m`, `dic` e `u_w`.

**Code Smell relacionado:**  
Nomes enigmáticos, que dificultam a leitura e exigem esforço extra para entender o significado das variáveis.

**Solução aplicada:**  
Os nomes foram substituídos por identificadores mais descritivos, como:

- `linhaAtual`;
- `colunaAtual`;
- `pontuacao`;
- `rodada`;
- `palavraSecreta`;
- `tabuleiro`;
- `palavrasPorIdioma`;
- `palpite`.

Com isso, o código passou a revelar melhor sua intenção e ficou mais legível.

### 3. Números mágicos espalhados pelo código

**Problema encontrado:**  
Valores importantes, como tamanho da palavra, quantidade de tentativas e pontuação, estavam fixos diretamente na lógica.

**Code Smell relacionado:**  
Magic Numbers, pois os valores aparecem soltos no código sem explicar claramente seu significado.

**Solução aplicada:**  
Esses valores foram centralizados em constantes, como:

```js
TAMANHO_PALAVRA = 5;
MAX_TENTATIVAS = 6;
```

Assim, futuras alterações nas regras do jogo podem ser feitas em um único local, sem precisar procurar o mesmo valor em várias partes do código.

### 4. Manipulação visual misturada com JavaScript

**Problema encontrado:**  
O JavaScript aplicava estilos diretamente nos elementos da tela, por exemplo alterando propriedades como `style.background`.

**Code Smell relacionado:**  
Mistura entre lógica de comportamento e apresentação visual.

**Solução aplicada:**  
Foram criadas classes CSS para representar os estados das células:

- `correto`;
- `tem`;
- `erro`;
- `oculto`;
- `ativo`.

Agora o JavaScript apenas adiciona ou remove classes, enquanto o CSS fica responsável pela aparência visual.

### 5. Validação frágil dos dados

**Problema encontrado:**  
O dicionário original possuía palavras com tamanhos incompatíveis com a grade de 5 letras, como palavras com 4 ou 6 letras.

**Code Smell relacionado:**  
Dados inconsistentes e ausência de validação adequada antes do uso.

**Solução aplicada:**  
A escolha da palavra secreta passou a filtrar apenas palavras com o tamanho esperado, definido pela constante `TAMANHO_PALAVRA`.

Caso não exista palavra válida para determinado idioma, o sistema gera um erro controlado, evitando comportamentos inesperados durante o jogo.

### 6. Lógica incorreta para letras repetidas

**Problema encontrado:**  
A versão original usava apenas `includes` para verificar se uma letra existia na palavra secreta. Essa abordagem pode gerar resultado incorreto quando há letras repetidas.

**Code Smell relacionado:**  
Lógica de regra de negócio frágil e pouco precisa.

**Solução aplicada:**  
A avaliação do palpite passou a ser feita em duas etapas:

1. primeiro são marcadas as letras corretas na posição correta;
2. depois são analisadas as letras existentes em posição errada, respeitando a quantidade restante de cada letra.

Essa solução deixa o comportamento mais próximo de jogos do estilo Wordle.

## Melhorias obtidas

Com a refatoração, o projeto passou a apresentar os seguintes benefícios:

- melhor organização dos arquivos;
- separação clara entre regra de negócio, interface e controle de eventos;
- código mais legível;
- nomes de variáveis mais claros;
- redução de acoplamento;
- eliminação de números mágicos espalhados;
- validação mais segura das palavras usadas no jogo;
- melhor tratamento de letras repetidas;
- maior facilidade para alterar regras do jogo;
- maior facilidade para adicionar novos idiomas futuramente;
- base mais adequada para manutenção e evolução do projeto.

## Considerações finais

A refatoração melhorou a qualidade interna do projeto sem alterar sua proposta principal. O código ficou mais simples de entender, mais organizado e mais próximo de uma estrutura profissional.

A aplicação do MVC permitiu separar responsabilidades e reduzir o acoplamento entre as partes do sistema. Além disso, as melhorias de nomenclatura, validação, uso de constantes e separação entre JavaScript e CSS contribuíram para um código mais limpo e manutenível.
