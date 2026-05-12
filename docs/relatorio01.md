RELATORIO DTP 01 - ARQUITETURA E PADRAO MVC

Projeto: Wordle Eng
Tema: Refatoracao do codigo base para o padrao Model-View-Controller (MVC)

1. Objetivo da refatoracao

O codigo original do jogo estava concentrado em poucos arquivos e misturava responsabilidades diferentes, como regra de negocio, controle de estado, manipulacao direta do HTML e tratamento de eventos do usuario.

A refatoracao teve como objetivo organizar o projeto utilizando o padrao MVC, separando o sistema em camadas com responsabilidades bem definidas. Essa separacao facilita a leitura, manutencao, evolucao e teste do codigo.

2. Estrutura modular adotada

O projeto foi dividido em arquivos distintos, mantendo o HTML, o CSS e os scripts JavaScript separados

DTP
|-- index.html
|-- assets
|   |-- css
|       |-- styles.css
|-- js
|   |-- scripts.js
|   |-- data
|   |   |-- palavras.js
|   |-- models
|   |   |-- JogoModel.js
|   |-- views
|   |   |-- JogoView.js
|   |-- controllers
|       |-- JogoController.js
|-- legado
|   |-- indexOld.html

3. Aplicacao do MVC

3.1 Model

O Model foi implementado no arquivo:

js/models/JogoModel.js

Essa camada ficou responsavel por gerenciar os dados e as regras principais do jogo. Nela ficam as informacoes sobre o estado da partida e a logica de negocio.

Responsabilidades do Model:

- armazenar o idioma escolhido pelo usuario;
- armazenar a palavra secreta da rodada;
- controlar a pontuacao;
- controlar a rodada atual;
- controlar a linha e a coluna atual do tabuleiro;
- armazenar o tabuleiro em memoria;
- sortear palavras validas do dicionario;
- validar se a palavra possui o tamanho esperado;
- adicionar letras no estado do jogo;
- remover letras do estado do jogo;
- processar o envio de um palpite;
- avaliar letras corretas, letras existentes em posicao errada e letras incorretas;
- calcular a pontuacao da jogada;
- indicar se o jogador venceu, perdeu ou deve continuar jogando.

Com isso, o Model nao depende diretamente do HTML, CSS ou eventos do navegador. Ele representa somente a regra do jogo e o estado da partida.

3.2 View

A View foi implementada no arquivo:

js/views/JogoView.js

Essa camada ficou responsavel pela parte visual do sistema. Ela manipula a interface, renderiza o tabuleiro e exibe mensagens ao usuario.

Responsabilidades da View:

- mostrar a tela inicial;
- mostrar a tela do jogo;
- atualizar a instrucao conforme o idioma escolhido;
- criar visualmente as linhas e celulas do tabuleiro;
- atualizar o conteudo de cada celula;
- pintar as celulas conforme a avaliacao do palpite;
- exibir mensagens ao usuario;
- atualizar placar e rodada na tela;
- capturar visualmente os botoes de idioma;
- disponibilizar metodos para o Controller registrar eventos.

A View nao contem regra de negocio. Ela nao decide se uma letra esta correta, se a pontuacao deve aumentar ou se a partida acabou. Essas decisoes pertencem ao Model e sao coordenadas pelo Controller.

3.3 Controller

O Controller foi implementado no arquivo:

js/controllers/JogoController.js

Essa camada atua como mediadora entre o Model e a View. Ela recebe os eventos do usuario, chama os metodos corretos do Model e solicita que a View atualize a interface.

Responsabilidades do Controller:

- iniciar o jogo;
- responder ao clique nos botoes de idioma;
- receber eventos de teclado;
- identificar letras digitadas;
- tratar Backspace;
- tratar Enter;
- solicitar ao Model a inclusao ou remocao de letras;
- enviar o palpite para avaliacao no Model;
- solicitar que a View pinte o resultado da jogada;
- controlar o fluxo em caso de vitoria;
- controlar o fluxo em caso de derrota;
- coordenar o reinicio da partida.

O Controller nao guarda a regra principal do jogo nem manipula diretamente o estado interno da partida. Ele apenas coordena o fluxo entre as outras camadas.

4. Arquivo de entrada dos scripts

O arquivo:

js/scripts.js

foi mantido como ponto de entrada da aplicacao JavaScript. Ele importa os dados, cria as instancias do Model, View e Controller e inicia o sistema.

Esse arquivo tem a funcao de montar a aplicacao, mantendo a inicializacao simples e organizada.

5. Melhorias no HTML

O arquivo index.html foi simplificado e deixou de possuir chamadas diretas de JavaScript nos botoes, como onclick.

Antes, o HTML chamava diretamente a funcao comecar('pt') ou comecar('en'). Depois da refatoracao, os botoes passaram a usar o atributo data-idioma, e os eventos sao registrados pela View e tratados pelo Controller.

Essa alteracao melhora a separacao entre estrutura HTML e comportamento JavaScript.

6. Melhorias no CSS

O CSS foi mantido em arquivo separado:

assets/css/styles.css

Foram criadas classes para estados visuais, como:

- correto;
- tem;
- erro;
- oculto;
- ativo.

Com isso, o JavaScript deixou de aplicar estilos diretamente com style.background e passou a usar classes CSS, deixando a camada visual centralizada no CSS.

7. Comprovacao da separacao de responsabilidades

A aplicacao do MVC pode ser comprovada pela divisao das responsabilidades:

Model:
- conhece as regras do jogo;
- conhece o estado da partida;
- nao conhece o HTML.

View:
- conhece os elementos visuais;
- renderiza a interface;
- nao calcula pontuacao nem avalia palavras.

Controller:
- recebe eventos;
- chama o Model;
- atualiza a View;
- nao armazena diretamente a regra principal do jogo.

Essa separacao reduz acoplamento e evita que uma unica funcao faca muitas tarefas diferentes.

8. Beneficios obtidos

Com a refatoracao para MVC, o projeto ficou mais organizado e mais facil de manter.

Principais beneficios:

- melhor organizacao dos arquivos;
- separacao clara entre regra de negocio, interface e controle de eventos;
- maior legibilidade do codigo;
- facilidade para adicionar novos idiomas futuramente;
- facilidade para alterar pontuacao ou quantidade de tentativas;
- facilidade para alterar o layout sem mexer na regra do jogo;
- reducao de codigo acoplado;
- base mais profissional para evolucao do projeto.
