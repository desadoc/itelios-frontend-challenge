![Itelios](http://www.itelios.com.br/images/logo_itelios_orange@2x.png)

# Implementacao do Itelios Frontend Challenge

Minha implementação utilizando Javascript ES5.

## Instruções

Execute "yarn setup && yarn start" na pasta raiz do projeto. A aplicação estará disponível em http://localhost:8080/.

## Detalhamento da Solução

Eu tentei evitar ao máximo a utilização de bibliotecas, frameworks e ferramentas. Segue a lista de tecnologias utilizadas:

* Node.js/Express: Para servir os arquivos
* Mustache-js: Engine de templates
* Node-sass: Compilador Sass/CSS
* UglifyJS2: Para gerar um único arquivo JS, foi utilizada versão ES5.

Eu decidi não utilizar ferramentas de build (Webpack, Gulp) pois julguei que teriam um impacto razoável no tempo de desenvolvimento, e seriam soluções desproporcionais para o escopo da aplicação.

Estruturei os arquivos na forma de uma aplicação Node.js, mas o lado server side é mínimo e recebeu pouquíssima atenção,
pois é responsável apenas por servir os arquivos e uma API Rest muito simples

Quanto ao layout, eu priorizei implementar uma abordagem mobile first (incluvise como é requerido na descrição do teste), e
não adicionei transição para layout desktop (o design de referência) ou tablet, pois fugiria do escopo de 8h do teste, e
impediriam a execução melhor de outros aspectos da aplicação.

A versão atual do código não utiliza bibliotecas Javascript para o carrossel. Foi utilizado o padrão BEM de CSS.

## Postmortem

O primeiro engano que cometi foi utilizar jQuery, pois julguei que seria muito necessário ou ao menos facilitaria uma
prototipagem mais rápida do componente. No final das contas, seu uso foi limitado, não compensando mantê-lo como
dependência. Em um patch posterior ao cerne da codificação eu o removi.

O segundo erro foi inicialmente ter codificado o HTML do componente diretamente no arquivo Javascript. Esta decisão foi
motivada por querer evitar a adição de bibliotecas mas, eu percebi que seja mantendo o markup junto do código, em um elemento
script ou como arquivo carregado assincronicamente, nenhuma destas possibilidades justificava não usar uma engine de
templates. A tecnologia de template escolhida não adiciona complexidade, lógica, necessidade de configuração ou uma
quantidade expressiva de linhas de código.

## Trabalho Futuro

Considerei as seguintes possibilidades de melhorias, levando em consideração o desenvolvimento de um aplicativo maior:

* Adicionar uma ferramenta de build
* Refinar código de exports/require para permitir utilização de um mesmo arquivo no frontend e backend
* Construir middleware JS para tarefas recorrentes (fiz apenas um código simples para XHR com promises)
* Definir interface e middleware comum para componentes
* Utilizar flexbox para lista de recomendações
* Adicionar transição para layout tablet/desktop
