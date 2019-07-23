// Todos os cards são instanciados
const cardList = document.querySelectorAll('.card');
i = 0
// O vetor que vai guardar as cartas clicadas inicia com 2 indices vazios


function init(){
  let  selecionados = Array(2) ;
  
  for (let card of cardList) {
    card.onclick = function (){
      mostrarCard(event);
      selecionarCartas(event, selecionados);
    }
  }
}

function mostrarCard(ev) {
  ev.target.classList.add('showCard');
}

function esconderCarta(){
  cardList.forEach(element => {
    element.classList.remove('showCard')
  });
}


function compararCartas(srcList){
  if(srcList[0].src == srcList[1].src){
    if(srcList[0].id === srcList[1].id) return esconderCarta() ;
    console.log('ENCONTROU O PAR')
    return init() ;
    console.log(selecionados)
  }

  else{
    console.log('ERROU')    
    setTimeout(esconderCarta, 1000)
    return  init()

  }

}


// Selecionar dois cards clicados no vetor 'selecionados', guardando os SRC DA IMAGEM
function selecionarCartas(ev,selecionados){
  if(!!selecionados[1] == false){
    selecionados[i] = ev.target;
    i++;
    
    if(!!selecionados[1] == true) {
      compararCartas(selecionados,ev);
    }
  }
  
}

// Para cada evento de clique em um card, retornar as seguintes funções
window.onload = init

