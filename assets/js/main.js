/*==================== SHOW NAVBAR ====================*/
const showMenu = (headerToggle, navbarId) => {
    const toggleBtn = document.getElementById(headerToggle),
        nav = document.getElementById(navbarId);
    
    // Validate that variables exist
    if (headerToggle && navbarId) {
        toggleBtn.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu');
            // change icon
            toggleBtn.classList.toggle('bi-x');
        });
    }
};
showMenu('header-toggle', 'navbar');

/*==================== LINK ACTIVE ====================*/
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav__dropdown-item');
    const tabsList = document.getElementById('tabs-list');
    const tabsContent = document.getElementById('tabs-content');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('close-button');
    const carouselImages = document.querySelectorAll('.carousel-image');
    let currentImageIndex = 0;
    let tabsOpen = 0; // Variável para controlar o número de guias abertas

    const contentMap = {
        'Quality': 'quality.html',
        'Build': 'build.html',
        'Monitoring': 'monitoring.html',
        'Mappings': 'mapeamento.html',
        'Logs&Folders': 'caminhos.html',
        'Tools': 'ferramentas.html',
    };

    // Função para mostrar a próxima imagem no carrossel
    function showNextImage() {
        carouselImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        carouselImages[currentImageIndex].classList.add('active');
    }

    // Iniciar o carrossel de imagens
    function startCarousel() {
        setInterval(showNextImage, 3000); // Troca a cada 3 segundos
    }

    // Mostrar a primeira imagem como ativa ao iniciar
    carouselImages[currentImageIndex].classList.add('active');
    startCarousel();

    // Função para carregar conteúdo das guias
    function loadContent(targetContent, tabId) {
        if (contentMap[targetContent]) {
            fetch(contentMap[targetContent])
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    const tabContent = document.createElement('div');
                    tabContent.id = `content-${tabId}`;
                    tabContent.classList.add('tab-content-item');
                    tabContent.innerHTML = data;
                    tabsContent.appendChild(tabContent);
                    tabsOpen++; // Incrementar o número de guias abertas
                    hideImages(); // Esconde as imagens ao abrir uma guia
                })
                .catch(error => {
                    console.error('Erro ao carregar o conteúdo:', error);
                    const tabContent = document.createElement('div');
                    tabContent.id = `content-${tabId}`;
                    tabContent.classList.add('tab-content-item');
                    tabContent.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
                    tabsContent.appendChild(tabContent);
                    tabsOpen++; // Incrementar o número de guias abertas
                    hideImages(); // Esconde as imagens ao abrir uma guia
                });
        } else {
            const tabContent = document.createElement('div');
            tabContent.id = `content-${tabId}`;
            tabContent.classList.add('tab-content-item');
            tabContent.innerHTML = '<p>Conteúdo não encontrado.</p>';
            tabsContent.appendChild(tabContent);
            tabsOpen++; // Incrementar o número de guias abertas
            hideImages(); // Esconde as imagens ao abrir uma guia
        }
    }

    const MAX_TABS = 10; // Definindo o número máximo de guias abertas

    function createTab(content, contentId) {
        // Verificar se a guia já está aberta
        const existingTab = Array.from(tabsList.children).find(tab => tab.textContent.includes(content));
        if (existingTab) {
            // Se a guia existir, torná-la ativa e exibir seu conteúdo
            const tabId = existingTab.id.split('-')[1];
            showTab(tabId);
            return;
        }
    
        if (tabsList.children.length >= MAX_TABS) {
            // Se o número máximo de guias já estiver aberto, mostrar o modal
            modal.style.display = 'block';
            return;
        }
    
        // Se não houver guia existente com o mesmo conteúdo, criar uma nova guia
        const tabId = Date.now(); // Unique ID for each tab
        const tabItem = document.createElement('div');
        tabItem.classList.add('tabs__list-item');
        tabItem.id = `tab-${tabId}`;
        tabItem.draggable = true; // Enable dragging
        tabItem.innerHTML = `${content} <i class='bi bi-up-arrow-alt' onclick="moveTabToFirst(${tabId})"></i> <i class='bi bi-x' onclick="closeTab(${tabId})"></i>`;
        tabItem.addEventListener('click', () => showTab(tabId));
        tabItem.addEventListener('dragstart', dragStart);
        tabItem.addEventListener('dragover', dragOver);
        tabItem.addEventListener('drop', drop);
        tabsList.appendChild(tabItem);
        loadContent(contentId, tabId);
        showTab(tabId);
    }

    function showTab(tabId) {
        const tabItems = document.querySelectorAll('.tabs__list-item');
        const tabContents = document.querySelectorAll('.tab-content-item');
        tabItems.forEach(item => item.classList.remove('active'));
        tabContents.forEach(content => content.style.display = 'none');
        
        document.getElementById(`tab-${tabId}`).classList.add('active');
        document.getElementById(`content-${tabId}`).style.display = 'block';
    }

    function closeTab(tabId) {
        const tabItem = document.getElementById(`tab-${tabId}`);
        const tabContent = document.getElementById(`content-${tabId}`);
        const isActive = tabItem.classList.contains('active');
        
        tabItem.parentNode.removeChild(tabItem);
        tabContent.parentNode.removeChild(tabContent);

        tabsOpen--; // Decrementar o número de guias abertas
        if (isActive && tabsList.children.length > 0) {
            // Se a guia fechada estava ativa, ativar a última guia na lista
            const lastTabId = tabsList.lastChild.id.split('-')[1];
            showTab(lastTabId);
        } else if (tabsList.children.length === 0) {
            // Se não houver guias restantes, exibir o carrossel de imagens
            showImages();
        }
    }

    function moveTabToFirst(tabId) {
        const tabItem = document.getElementById(`tab-${tabId}`);
        tabsList.insertBefore(tabItem, tabsList.firstChild);
    }

    window.closeTab = closeTab; // Make closeTab accessible globally
    window.moveTabToFirst = moveTabToFirst; // Make moveTabToFirst accessible globally

    // Funções para controlar a exibição do carrossel de imagens
    function hideImages() {
        const carousel = document.getElementById('bg-carousel');
        if (carousel) {
            carousel.style.display = 'none';
        }
    }

    function showImages() {
        const carousel = document.getElementById('bg-carousel');
        if (carousel) {
            carousel.style.display = 'block';
        }
    }

    // Drag and drop handlers
    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target.closest('.tabs__list-item');
        if (dropzone && dropzone !== draggableElement) {
            const dropzoneParent = dropzone.parentNode;
            dropzoneParent.insertBefore(draggableElement, dropzone.nextSibling);
        }
    }

    // Close modal when clicking on the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetContent = this.getAttribute('data-content');
            createTab(targetContent, targetContent);
        });
    });

    // Inicialize o carrossel ao carregar a página
    showImages();
});



/* FUNÇÃO DE COPIAR AO CLIQUE*/
function copyToClipboard(element) {
    var link = element.getAttribute("data-link");
    var tempInput = document.createElement("input");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-9999px";
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Exibir a mensagem de link copiado
    var copiedMessage = document.getElementById("copied-message");
    var copiedLink = document.getElementById("copied-link");
    copiedLink.textContent = link;
    copiedMessage.style.display = "block";

    // Esconder a mensagem após alguns segundos (aqui definido como 3 segundos)
    setTimeout(function() {
        copiedMessage.style.display = "none";
    }, 6000);
}

