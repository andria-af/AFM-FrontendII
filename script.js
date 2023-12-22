
const containerCards = document.getElementById('containerCards')
const botoes= document.getElementById('botoes')
const textoFooter1= document.getElementById("texto-footer1")
const textoFooter2= document.getElementById("texto-footer2")
const textoFooter3= document.getElementById("texto-footer3")

let pagina = 1
let quantidadeDePaginas;

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
});

function aumentarPagina() {
  if (pagina !== quantidadeDePaginas) {
    pagina++
    carregarPagina()
  }
}

function diminuirPagina() {
  if (pagina > 1) {
    pagina--
    carregarPagina()
  }
}

function selecionarPagina(novaPagina) {
  pagina = novaPagina
  carregarPagina()
}

async function carregamentoInicialPagina() {
  await carregarPagina()

  try {
    const response = await instance.get(`https://rickandmortyapi.com/api/character`)

    quantidadeDePaginas= response.data.info.pages

    for (let i = 0; i < quantidadeDePaginas; i++) {
      let botaoPaginaEl = document.createElement("button");
      botaoPaginaEl.className= "botoes"
      botaoPaginaEl.innerHTML = i + 1
      botaoPaginaEl.addEventListener('click', () => { selecionarPagina(i + 1) })
  
      botoes.appendChild(botaoPaginaEl)
    }
    
  } catch (error) {
    console.log(error)
  }
}
  
  async function carregarPagina() {
    try {
      const response = await instance.get(`https://rickandmortyapi.com/api/character?page=${pagina}`)

        const results = response.data.results
        quantidadeDePaginas= response.data.info.pages
        containerCards.innerHTML= ""

        for (let index = 0; index < results.length; index++) {
          const personagem = results[index];

          const card = document.createElement("div");
          card.className= "card";

          const divImage = document.createElement("div");
          divImage.className= "divImage";

          const imageCard = document.createElement("img")
          imageCard.src= results[index].image
          imageCard.className= "imageCard"
          imageCard.innerHTML

          const infoCard = document.createElement("div")
          infoCard.className= "infoCard"

          const nameCard = document.createElement("h3");
          nameCard.innerHTML= results[index].name
          nameCard.className= "nameCard"
  
          const statusSpecies = document.createElement("p");
          statusSpecies.innerHTML=`${results[index].status} - ${results[index].species}`

          const ultimaLocalizacao = document.createElement("p");
          ultimaLocalizacao.innerHTML=`Gênero: ${results[index].gender}`

          const ultimoEpisodio = document.createElement("p");
          ultimoEpisodio.innerHTML=`Número de episódios que apareceu: ${results[index].episode.length}`
  
          card.appendChild(imageCard)

          infoCard.appendChild(nameCard)
          infoCard.appendChild(statusSpecies)
          infoCard.appendChild(ultimaLocalizacao)
          infoCard.appendChild(ultimoEpisodio)

          card.appendChild(divImage)
          card.appendChild(infoCard)
          containerCards.appendChild(card)

         const personagens= response.data.info.count
         textoFooter1.innerHTML= `PERSONAGENS: ${personagens}`
        }

    } catch (error) {
      console.log(error)
    }
  }


async function carregarLocalizacoes() {
    await carregarPagina()
  
    try {
      const response = await instance.get(`https://rickandmortyapi.com/api/location`)

      const localizacoes= response.data.info.count
      textoFooter2.innerHTML= `LOCALIZAÇÕES: ${localizacoes}`
    } catch (error) {
      console.log(error)
    }
}
carregarLocalizacoes()

async function carregarEpisodios() {
  await carregarPagina()

  try {
    const response = await instance.get(`https://rickandmortyapi.com/api/episode`)

    const episodios= response.data.info.count
    textoFooter3.innerHTML= `EPISÓDIOS: ${episodios}`
  } catch (error) {
    console.log(error)
  }
}
carregarEpisodios()

carregamentoInicialPagina()
