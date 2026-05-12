RELATORIO DTP 02 - CONSTRUCAO DE SOFTWARE, CODE COMPLETE E KENT BECK

Projeto: Wordle Eng
Tema: Melhoria da qualidade interna do codigo, legibilidade e manutenibilidade

1. Objetivo da refatoracao

O codigo original do jogo possuia problemas comuns em sistemas em fase inicial de desenvolvimento, como variaveis com nomes pouco claros, funcoes com muitas responsabilidades, numeros magicos espalhados e ausencia de validacoes mais robustas sobre os dados.

A refatoracao teve como objetivo melhorar a qualidade interna do codigo, aplicando boas praticas de construcao de software inspiradas em ideias presentes em Code Complete e nos principios defendidos por Kent Beck, principalmente clareza, simplicidade, intencao revelada e facilidade de manutencao.

2. Melhoria de nomenclatura

Um dos principais problemas do codigo original era o uso de nomes abreviados e pouco expressivos, como:

- r_a;
- c_a;
- sc;
- rd;
- p_s;
- m;
- dic;
- u_w.

Esses nomes foram substituidos por nomes que revelam melhor a intencao do dado.

Exemplos de melhorias:

- r_a virou linhaAtual;
- c_a virou colunaAtual;
- sc virou pontuacao;
- rd virou rodada;
- p_s virou palavraSecreta;
- m virou tabuleiro;
- dic virou palavrasPorIdioma;
- u_w virou palpite.

Essa mudanca melhora a leitura do codigo e reduz a necessidade de comentarios explicando o significado das variaveis.

3. Separacao de responsabilidades

O codigo original possuia funcoes que misturavam controle de fluxo, regras do jogo, pontuacao e manipulacao visual.

Apos a refatoracao, cada parte do sistema passou a ter uma responsabilidade clara:

- JogoModel: regras do jogo e estado da partida;
- JogoView: exibicao visual e atualizacao da interface;
- JogoController: coordenacao dos eventos e comunicacao entre Model e View;
- palavras.js: constantes, textos e dicionarios;
- scripts.js: inicializacao da aplicacao.

Essa separacao evita funcoes faz-tudo e facilita futuras alteracoes.

4. Eliminacao de numeros magicos

No codigo original, valores como quantidade de tentativas, tamanho da palavra e pontuacao estavam fixos diretamente na logica.

Na refatoracao, esses valores foram centralizados em constantes de configuracao.

Exemplos:

- TAMANHO_PALAVRA = 5;
- MAX_TENTATIVAS = 6;
- pontuacao para letra correta;
- pontuacao para letra existente na palavra.

Ao centralizar esses valores, fica mais facil alterar o comportamento do jogo sem procurar o mesmo numero em varias partes do codigo.

5. Tratamento e validacao dos dados

Foi identificada uma inconsistencia nos dicionarios do codigo original: algumas palavras tinham tamanho diferente do esperado pela grade de 5 letras.

Exemplos de problema:

- CLASSE possui 6 letras;
- CODE possui 4 letras;
- LOGIC esta em ingles dentro do dicionario em portugues.

Para corrigir esse problema, a selecao de palavras passou a filtrar apenas palavras com o tamanho esperado, definido pela constante TAMANHO_PALAVRA.

A validacao garante que somente palavras compativeis com a grade sejam sorteadas. Caso nao exista nenhuma palavra valida para um idioma, o sistema gera um erro controlado, evitando comportamento inesperado no jogo.

6. Melhoria na logica de avaliacao das letras

A avaliacao do palpite foi melhorada para lidar melhor com letras repetidas.

No codigo original, era usado apenas includes para verificar se uma letra existia na palavra secreta. Esse metodo pode gerar resultados incorretos quando existem letras repetidas, pois nao controla a quantidade real de ocorrencias da letra.

Na nova versao, a avaliacao e feita em duas etapas:

1. Primeiro, sao marcadas as letras corretas na posicao correta.
2. Depois, sao analisadas as letras existentes em posicao errada, considerando a quantidade restante de cada letra.

Essa abordagem deixa o comportamento mais proximo de jogos no estilo Wordle.

7. Remocao de estilos inline no JavaScript

No codigo original, as cores das celulas eram aplicadas diretamente pelo JavaScript usando propriedades como tile.style.background.

Na refatoracao, foram criadas classes CSS especificas:

- correto;
- tem;
- erro.

O JavaScript agora apenas adiciona classes aos elementos, e o CSS fica responsavel pela aparencia visual.

Essa pratica melhora a separacao entre comportamento e apresentacao.

8. Reducao de acoplamento

O acoplamento foi reduzido porque as regras do jogo nao dependem mais diretamente dos elementos HTML.

O Model nao acessa document.getElementById, nao altera a tela e nao conhece a estrutura visual do projeto. Ele apenas processa dados e retorna resultados.

A View manipula o DOM, mas nao calcula pontuacao nem decide se o jogador ganhou ou perdeu.

O Controller coordena o processo, sem concentrar toda a logica do sistema em uma unica funcao.

9. Aplicacao de boas praticas de construcao de software

A refatoracao aplicou boas praticas importantes para codigo limpo e manutenivel:

- nomes claros e descritivos;
- funcoes com responsabilidades menores;
- constantes para configuracoes importantes;
- separacao entre regra de negocio e interface;
- organizacao em modulos ES6;
- remocao de codigo duplicado;
- validacao de dados de entrada;
- tratamento de estados do jogo;
- reducao de efeitos colaterais;
- melhoria na legibilidade geral.

Essas praticas seguem a ideia de escrever codigo simples, expressivo e facil de alterar.

10. Relacao com Code Complete

A obra Code Complete valoriza a clareza, a organizacao e a construcao cuidadosa do codigo.

No projeto, esses principios aparecem nas seguintes decisoes:

- nomes de variaveis mais expressivos;
- modularizacao do codigo;
- reducao de complexidade em funcoes grandes;
- criacao de constantes para evitar valores soltos;
- validacao de dados antes do uso;
- organizacao em arquivos com responsabilidades claras.

Essas mudancas tornam o codigo mais facil de entender, revisar e manter.

11. Relacao com Kent Beck

Kent Beck defende simplicidade, comunicacao clara no codigo e melhorias incrementais.

Na refatoracao, esses principios aparecem em decisoes como:

- manter o codigo simples para o nivel do projeto;
- usar nomes que comuniquem a intencao;
- separar responsabilidades para facilitar mudancas;
- evitar solucoes excessivamente complexas;
- melhorar o design sem alterar a proposta principal do jogo.

O resultado e um codigo mais limpo, mas ainda compreensivel para um desenvolvedor junior.

12. Beneficios obtidos

A refatoracao trouxe os seguintes beneficios:

- codigo mais legivel;
- manutencao mais simples;
- reducao de bugs causados por palavras invalidas;
- maior facilidade para mudar regras do jogo;
- maior facilidade para adicionar novos idiomas;
- melhor separacao entre dados, regra e interface;
- melhor organizacao do projeto;
- eliminacao de variaveis enigmaticas;
- codigo mais adequado para versionamento e apresentacao academica.
