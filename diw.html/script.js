var videos = [];

function carregarJSON(callback) {
  fetch("http://localhost:3000/videos")
    .then((response) => response.json())
    .then((data) => {
      videos = data;
      callback();
    })
    .catch((error) => console.error("Erro ao carregar dados:", error));
}

function carregarCarousel() {
  var carouselInner = document.getElementById("carousel-inner");
  for (var i = 0; i < videos.length; i++) {
    var ativo = i === 0 ? "active" : "";
    var item = document.createElement("div");
    item.className = "carousel-item " + ativo;
    item.innerHTML =
      '<img src="' +
      videos[i].imagem +
      '" class="d-block w-100" alt="' +
      videos[i].titulo +
      '">' +
      '<div class="carousel-caption d-none d-md-block"><h5>' +
      videos[i].titulo +
      "</h5></div>";
    carouselInner.appendChild(item);
  }
}

function carregarVideos() {
  var lista = document.getElementById("lista-videos");
  for (var i = 0; i < videos.length; i++) {
    var col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    var card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    card.innerHTML =
      '<img src="' +
      videos[i].imagem +
      '" class="card-img-top" alt="' +
      videos[i].titulo +
      '">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' +
      videos[i].titulo +
      "</h5>" +
      '<p class="card-text">' +
      videos[i].descricao +
      "</p>" +
      '<a href="detalhes.html?id=' +
      videos[i].id +
      '" class="btn btn-primary">Ver mais</a>' +
      "</div>";

    col.appendChild(card);
    lista.appendChild(col);
  }
}

function pegarParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

function carregarDetalhes() {
  var id = pegarParametro("id");
  var videoSelecionado = null;

  for (var i = 0; i < videos.length; i++) {
    if (videos[i].id == id) {
      videoSelecionado = videos[i];
      break;
    }
  }

  if (videoSelecionado) {
    var info = document.getElementById("info-video");
    info.innerHTML = `
      <div class="card shadow-sm">
        <img src="${videoSelecionado.imagem}" class="card-img-top" alt="${videoSelecionado.titulo}">
        <div class="card-body">
          <h2 class="card-title text-primary">${videoSelecionado.titulo}</h2>
          <p class="card-text">${videoSelecionado.descricao}</p>
        </div>
      </div>
    `;

    var galeria = document.getElementById("fotos-lista");
    for (var j = 0; j < videoSelecionado.fotos.length; j++) {
      var col = document.createElement("div");
      col.className = "col-md-4 mb-3";
      col.innerHTML = `
        <div class="card shadow-sm">
          <img src="${videoSelecionado.fotos[j]}" class="card-img-top" alt="Foto relacionada">
        </div>
      `;
      galeria.appendChild(col);
    }
  } else {
    document.getElementById("info-video").innerHTML =
      "<p>Vídeo não encontrado.</p>";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  if (
    document.getElementById("carousel-inner") ||
    document.getElementById("lista-videos") ||
    document.getElementById("info-video")
  ) {
    carregarJSON(() => {
      if (document.getElementById("carousel-inner")) carregarCarousel();
      if (document.getElementById("lista-videos")) carregarVideos();
      if (document.getElementById("info-video")) carregarDetalhes();
    });
  }
});