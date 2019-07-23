// Instancia todos os cards
const cardList = document.querySelectorAll('.card');

let virouAlgumaCarta = false;
let cartaUm, cartaDois;

// Muitos cliques seguidos podem travar a lógica do jogo. Ao longo do código, essa variavel será true, 
// então, se o usuário clicar, não retornará nada, 
let bloquearClick = false;


function viraCarta() {

  if (bloquearClick) return ; // O clique não retornará nada

  if (this === cartaUm) return;// Bloquear a comparação caso duas vezes no mesmo card

  // Aplicar a classe showCard, que devolve o brilho 100% à imagem 
  this.classList.add('showCard');

  if (!virouAlgumaCarta) {
    virouAlgumaCarta = true;
    cartaUm = this;
  } 
  
  else {
    virouAlgumaCarta = false;
    cartaDois = this;
    saoIguais();
  }
}

function saoIguais() {
  // Se o src das imagens forem iguais, remover o evento de click para fixa-las
  if (cartaUm.style.backgroundImage === cartaDois.style.backgroundImage) {
    console.log('encontrou');
    cartaUm.removeEventListener('click', viraCarta);
    cartaDois.removeEventListener('click', viraCarta);
  } 
  
  else {
    console.log('errou')
    bloquearClick = true;
    esconderCarta();
  }
}

function resetarJogo() {
  [virouAlgumaCarta] = [false]
  [cartaUm, cartaDois] = [null, null]
}

function esconderCarta() {
  setTimeout(() => {
    cartaUm.classList.remove('showCard');
    cartaDois.classList.remove('showCard');
    bloquearClick = false; 
  }, 1000)
}

// Para cada card, adicionar um evento de click, que retornará a função viraCarta
cardList.forEach(card => card.addEventListener('click', viraCarta))


//Lista com caminho para imagens dos gatos
let Imgs = [
    "./assets2/peni.png", 
    "./assets2/noir.png", 
    "./assets2/peter.png",
    "./assets2/porco.png",
    "./assets2/gwen.png", 
    "./assets2/miles.png",
    ]; 


//Duplico a lista de imagens de gatos (imagensGatos)
let imagens = Imgs.concat(Imgs);

const cartasEmbaralhadas = embaralhar(imagens);

//Função que insere as imagens embaralhadas nas cartas
inserirImagemNaCarta();

function embaralhar(listaImagens) {
  // criei duas variaveis indefinidas
  let imagemSelecionada;
  let posicaoAleatoria;
  // Faz um LOOP na lista para embaralhar
  for (let posicao = listaImagens.length - 1; posicao !== 0; posicao--) {
    posicaoAleatoria = Math.floor(Math.random() * posicao);

    imagemSelecionada = listaImagens[posicao];
    listaImagens[posicao] = listaImagens[posicaoAleatoria];
    listaImagens[posicaoAleatoria] = imagemSelecionada;
  }

  return listaImagens;
}
// Faço um LOOP nas divs e insiro as imagens em cada uma, usando o style e backGroundImage
function inserirImagemNaCarta() {
  for (let carta of cardList) {
    carta.style.backgroundImage = `url('${
      cartasEmbaralhadas[Number(carta.id)]
    }')`;
  }
}