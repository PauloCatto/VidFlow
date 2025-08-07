const containerVideos = document.querySelector(".videos__container");

async function buscarVideos() {
  try {
    const apiUrl = await fetch('/api/videos.json');
    const data = await apiUrl.json();
    const videos = data.videos;

    videos.forEach((video) => {
      containerVideos.innerHTML += `
                <li class="video__item">
                    <iframe class="video-iframe" src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <div class="itens">
                            <h3 class="titulo-video">${video.titulo}</h3>
                            <p class="titulo-canal">${video.descricao}</p>
                            <p class="categoria">${video.categoria}</p>
                        </div>
                    </div>
                </li>
            `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos. ${error}</p>`;
  }
}

buscarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const videos = document.querySelectorAll(".video__item");

  for (let video of videos) {
    let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
    let valorFiltro = barraDePesquisa.value.toLowerCase();

    if (!titulo.includes(valorFiltro)) {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}

const botaoCategoria = document.querySelectorAll(".superior__item");
botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name");
  botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".video__item");

  for (let video of videos) {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    if (!categoria.includes(valorFiltro) && valorFiltro !== "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}
