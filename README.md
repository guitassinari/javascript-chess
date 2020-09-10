# javascript-chess

Esse projeto foi construído com foco em uma capacitação em desenvolvimento web básico oferecida à membros de Empresas Juniores da Universidade Federal do Rio Grande do Sul.

O projeto consiste em um simples servidor Node escrito com [express.js](https://expressjs.com/pt-br/) responsável por controlar jogos de Xadrez


### Arquitetura do projeto
- Projeto simples composto por servidor + biblioteca de Xadrez
- Aplicação é stateless, ou seja, não usa nenhum tipo de armazenamento para guardar informações de partidas em andamento. Dessa forma, todas as requisições devem enviar a situação atual do jogo para que o servidor possa realizar movimentos.

#### Servidor
O servidor é estritamente responsável por receber requisições, tratar seus parâmetros e repassá-las a biblioteca de Xadrez do projeto.
Sendo mais específico, o servidor é definido pelo arquivo `index.js`, que define 4 endpoints:

- `GET /`: Retorna a página HTML inicial que exibe o tabuleiro de Xadrez em tela
- `GET /new`: Retorna uma nova partida de Xadrez, representada por um objeto contendo todas as posições iniciais das peças do jogo de Xadrez.
- `PUT /new`: Realiza um movimento de peças no tabuleiro de Xadrez, que deve ser enviado juntamente na requisição. Deveria ser implementado pelos estudantes da capacitação rota `POST /move`, o que acabou não acontecendo.
- `POST /move`: Endpoint que seria trabalhada durante a capacitação. Entretanto, por questão de tempo, acabou não sendo feita.

#### Biblioteca de Xadrez
A biblioteca de Xadrez é responsável por todas as lógicas relacionadas à uma partida de Xadrez.
É composta 3 classes principais + Classes das peças de Xadrez.

- `ChessBoard`: Representa um tabuleiro de Xadrez e é responsável por saber das peças no tabuleiro, suas posições, e movimentar/adicionar/remover peças.
- `ChessGame`: Representa um jogo de Xadrez. Possui um tabuleiro e duas equipes. Pode exportar e importar um jogo de xadrez em formato de objeto Javascript. Além disso, quando é solicitado o movimento de uma peça, verifica as regras para saber se é possível movimentá-la, lançando erros se necessário.
- `Position`: Representa uma posição no tabuleiro de Xadrez no formato padrão letra + número (ex: H1, B2, C3). Utilizado para encapsular cálculos e comportamentos úteis de posicionamento, principalmente para o tabuleiro e movimentação de peças.
- Classes de peças: Dentro de `js/pieces/` temos todas as classes de peças do tabuleiro de Xadrez. Essas classes são responsáveis por definir o comportamento de movimentação de cada peça e armazenar informações como a equipe da peça em questão. Deveriam ser implementadas pelas equipes durante a capacitação, o que só ocorreu para a Torre.
