const pagesData = [
    { image: './src/assets/images/1.jpeg', text: 'A palavra "banana" tem origem no termo africano "banema" ou "banaana", usado para se referir à fruta.' },
    { image: './src/assets/images/1.jpeg', text: 'A palavra "banana" tem origem no termo africano "banema" ou "banaana", usado para se referir à fruta.' },
    { image: './src/assets/images/2.jpeg', text: 'A palavra "quindim" tem origem no termo africano "kandim", utilizado nas línguas bantas da África, e foi adaptado para o português durante o período colonial, referindo-se a uma sobremesa doce feita com coco, açúcar e gemas de ovos.' },
    { image: './src/assets/images/3.jpeg', text: 'A palavra "cochilo" tem origem no latim "cucullus", que significa "capô" ou "capinha", e passou a ser associada ao ato de dormir brevemente, fazendo uma analogia ao ato de se esconder ou cobrir a cabeça, como quando alguém se reclina para descansar.' },
    { image: './src/assets/images/4.jpeg', text: 'A palavra "bunda" tem origem do termo africano "mbunda", utilizado em algumas línguas bantu, como o kimbundu, para se referir à parte do corpo. No contexto brasileiro, passou a ser usada para se referir de maneira informal e popular às nádegas.' },
    { image: './src/assets/images/5.jpeg', text: 'A palavra "miçanga" tem origem no termo africano "missanga", proveniente de línguas bantu, como o quimbundo e o kimbundu, que designavam pequenas contas usadas em adornos e bijuterias' },
    { image: './src/assets/images/6.jpeg', text: 'A palavra "bagunça" tem origem no termo africano "bagunço", que se refere a uma confusão ou desordem.' },
    { image: './src/assets/images/7.jpeg', text: 'A palavra "moleque" tem origem no termo africano "muleke", que é uma variação da palavra "mulato", usada para se referir a uma criança ou jovem. ' },
    { image: './src/assets/images/8.jpeg', text: 'No iorubá, a palavra "kàfúnè" ou "kàfúnè" refere-se ao ato de afagar ou acariciar suavemente a cabeça de outra pessoa.' },
    { image: './src/assets/images/9.jpeg', text: 'A palavra "ginga" tem origem no idioma africano, mais especificamente no quimbundo, uma das línguas bantu faladas em Angola. No quimbundo, "genga" ou "ginga" refere-se a um movimento sinuoso ou flexível.' },
    { image: './src/assets/images/10.jpeg', text: 'A palavra "camundongo" tem origem no termo africano "kamundongo", da língua quimbundo, falada em Angola. ' },
    { image: './src/assets/images/11.jpeg', text: 'A palavra (farofa) tem origem no termo (farofa) na língua tupi, que significa (farinha de mandioca torrada).' },
    { image: './src/assets/images/12.jpeg', text: 'A palavra "xodó" tem origem no tupi-guarani. Ela deriva de "xodó", que significava "carinho" ou "afeto". ' },
    { image: './src/assets/images/contracapa.jpeg', text: 'O legado da luta e da resistência.' } // A contracapa
    
];
let currentPage = 0;
let isBookOpen = false;

const book = document.querySelector('.book');
const cover = document.querySelector('.cover');
const pagesContainer = document.getElementById('pages-container');

// Criação da página (incluindo contracapa como última página)
function createPage(data, index) {
    const page = document.createElement('div');
    page.className = 'page';
    page.style.zIndex = pagesData.length - index;

    const content = document.createElement('div');
    content.className = 'page-content';

    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.text;
    img.loading = 'lazy';

    const text = document.createElement('p');
    text.className = 'page-text';
    text.textContent = data.text;

    content.appendChild(img);
    content.appendChild(text);
    page.appendChild(content);

    return page;
}

// Função para inicializar o livro
function initializeBook() {
    pagesContainer.innerHTML = '';

    pagesData.forEach((data, index) => {
        const page = createPage(data, index);
        pagesContainer.appendChild(page);
    });

    // Adicionando contracapa como a última "página"
    const backCover = document.createElement('div');
    backCover.className = 'back-cover';
    const backCoverContent = document.createElement('div');
    backCoverContent.className = 'page-content';
    

    const text = document.createElement('p');
    text.className = 'page-text';
    text.textContent = 'A contracapa do nosso livro, com o legado da luta e da resistência.';
    
    backCoverContent.appendChild(img);
    backCoverContent.appendChild(text);
    backCover.appendChild(backCoverContent);
    pagesContainer.appendChild(backCover);
}

// Função para abrir o livro
function openBook() {
    isBookOpen = true;
    cover.classList.add('opened');
}

// Função para fechar o livro
function closeBook() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('turned'));
    cover.classList.remove('opened');
    currentPage = 0;
    isBookOpen = false;
}

function turnPage(direction) {
    const pages = document.querySelectorAll('.page');

    // Lógica para virar a página
    if (direction === 'next' && currentPage < pages.length - 1) {
        pages[currentPage].classList.add('turned');
        currentPage++;
    } else if (direction === 'prev' && currentPage > 0) {
        currentPage--;
        pages[currentPage].classList.remove('turned');
    } else if (direction === 'prev' && currentPage === 0) {
        closeBook();
    }
}

// Ação ao clicar na capa
cover.addEventListener('click', () => {
    if (!isBookOpen) openBook();
});

// Ação ao clicar no livro para virar a página
document.addEventListener('click', (e) => {
    if (!isBookOpen) return;

    const bookRect = book.getBoundingClientRect();
    const clickX = e.clientX;
    const bookCenter = bookRect.left + bookRect.width / 2;

    if (clickX > bookCenter) {
        turnPage('next');
    } else {
        turnPage('prev');
    }
});

// Inicializa o livro
initializeBook();