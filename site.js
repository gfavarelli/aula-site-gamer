const setLocalStorage = (jogo) => localStorage.setItem('jogo', JSON.stringify(jogo));
const getLocalStorage = () => JSON.parse(localStorage.getItem('jogo')) ?? [];

function salvarEAbrirNovaPagina(elementoDivCard) {
    setLocalStorage({
        nome: elementoDivCard.dataset.nome,
        qtd_imagem: elementoDivCard.dataset.qtd_imagem,
        imagem: elementoDivCard.dataset.imagem,
        descricao: elementoDivCard.dataset.descricao
    });

    window.location.href="jogo.html";
}

function carregarPaginaJogo() {
    
    if (window.location.pathname.indexOf('jogo.html') > 0) {

        var jogoSelecionado = getLocalStorage();

        document.getElementById('url-jogo').innerHTML  = `https://www.${jogoSelecionado.imagem}.com`;
        document.getElementById('texto-jogo').innerHTML = jogoSelecionado.descricao;
        document.getElementById('banner-jogo').appendChild(elementoImagem(jogoSelecionado.imagem, true));
        
        
        for(var index = 1; index <= parseInt(jogoSelecionado.qtd_imagem); index++) {
            var nomeImagem = jogoSelecionado.imagem + index + '.jpg';
            console.log('nome imagem: ', nomeImagem);

            //Criar div que contem imagens lado a lado
            var divImagem = document.createElement('div');
            divImagem.classList.add('col-md-4');

            //Adicionar as imagens na div 
            divImagem.appendChild(elementoImagem(nomeImagem));
            document.getElementById('galeria-jogo').appendChild(divImagem);
        }
    }
}

function elementoImagem(nomeImagem, isBanner = false) {
    var imagem = document.createElement('img');
    imagem.alt = nomeImagem;

    if(isBanner) {
        imagem.src = `./img/banner/${nomeImagem}-1920x600.jpg`;
        imagem.classList.add('d-block', 'w-100'); 
    } else  {
        imagem.src = `./img/games/${nomeImagem}`;
        imagem.classList.add('rounded', 'img-jogo-descricao');
    }

    return imagem;
}

carregarPaginaJogo();