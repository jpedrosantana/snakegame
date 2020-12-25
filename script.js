//Imagem retirada de
// https://www.pexels.com/pt-br/foto/animal-arrepiante-assustador-balanca-53478/

//Variáveis
let canvas = document.getElementById('snake'); //cria parte gráfica da página
let context = canvas.getContext("2d"); //renderiza o desenho
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let velocidade;
let jogo;
let emAndamento = false; //para impedir que a velocidade incremente caso o botão Start seja apertado multiplas vezes
let pontuacao = 0;


function criarBG(){
    context.fillStyle = "lightgreen"; //trabalha com o estilo do context
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    context.fillStyle = "green";
    context.fillRect(snake[0].x, snake[0].y, box, box); //cabeça da cobra na cor verde

    for(i=1; i < snake.length; i++){
        //Corpo da cobra na cor amarela
        context.fillStyle = "yellow";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update); //pega o evento de click e chama a função update

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left"; // Botão 37 = esquerda
    if(event.keyCode == 38 && direction != "down") direction = "up";// Botão 38 = cima
    if(event.keyCode == 39 && direction != "left") direction = "right";// Botão 39 = direita
    if(event.keyCode == 40 && direction != "up") direction = "down";// Botão 40 = baixo
}

//Função define 3 níveis de dificuldade representando cada um dos botões
function dificuldade(evento){
    if(evento.value=="EASY") velocidade = 250;
    if(evento.value=="NORMAL") velocidade = 100;
    if(evento.value=="HARD") velocidade = 50;
}


//Função para iniciar o jogo apenas com o acionamento do botão START
function comecar(){
    if(velocidade != null && emAndamento == false){
        emAndamento = true;
        jogo = setInterval(iniciarJogo, velocidade);    

    }
    else if(emAndamento == true){
        alert("O jogo já está em andamento!")
    }
    else{
        alert("Selecione uma dificuldade!")
        document.location.reload();
    }
}

//Função para a página já ser carregada com o layout do jogo
function iniciar(){
    criarBG();
    criarCobrinha();
    drawFood();
}

function iniciarJogo(){
    iniciar(); //Vai sobrepor a função anterior e dar andamento ao jogo
    
    //Instruções para a cobra atravessar as bordas do jogo
    if(snake[0].x > 15 * box){
        snake[0].x = 0;
        direction = "right";
    } 
    if(snake[0].x < 0) {
        direction = "left";
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15 * box) {
        direction = "down";
        snake[0].y = 0;
    }
    if(snake[0].y < 0) {
        direction = "up";
        snake[0].y = 16 * box;
    }
    
    //Instrução para o término do jogo caso a cabeça da cobra se encontre com o corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over. \nSua pontuação foi de " + pontuacao + " pontos.")
            document.location.reload();
        }
    }
    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Instruções de movimento da cobra
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //retira a última posição do array
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        pontuacao += 5;
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método que acrescenta sempre no primeiro elemento
}