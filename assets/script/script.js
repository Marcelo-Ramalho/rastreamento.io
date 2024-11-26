async function buscarStatus() {
    const osNumber = document.getElementById("osNumber").value.trim();
    console.log(`Buscando status para a OS: ${osNumber}`); // Debug

    if (!osNumber) {
        alert("Por favor, insira um número de O.S.");
        return;
    }

    // Define a URL da API com base no ambiente
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://127.0.0.1:5000' // URL local
        : 'https://69ef-2804-14c-5bd8-40fc-4114-f864-eef1-2566.ngrok-free.app'; // URL pública (ngrok)

    try {
        const response = await fetch(`${apiUrl}/status/${osNumber}`);
        
        // Verifica o tipo de conteúdo da resposta antes de tentar processá-la
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log("Resposta da API:", data); // Debug

            // Verifica se o status é válido na resposta da API
            if (data.status) {
                atualizarTexto(data.status);
            } else {
                throw new Error('O.S. não encontrada.'); // Caso o status não esteja presente
            }
        } else {
            throw new Error('Resposta inválida da API, esperava-se JSON.');
        }
    } catch (error) {
        console.error("Erro ao buscar o status:", error);
        alert(error.message); // Alerta com a mensagem de erro
    }
}

// Adiciona o evento de teclado para o campo de entrada
document.getElementById("osNumber").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarStatus(); // Chama a função ao pressionar Enter
    }
});

function atualizarTexto(status) {
    console.log(`Atualizando cor para o status: ${status}`); // Debug

    // Remove a classe 'active' de todos os parágrafos e ícones
    document.querySelectorAll("footer p").forEach((p) => {
        p.classList.remove("active");
        p.style.color = ''; // Reseta a cor do texto
    });
    document.querySelectorAll("footer span").forEach((span) => {
        span.classList.remove("active");
        span.style.color = ''; // Reseta a cor dos ícones
    });

    // Procura o parágrafo e ícone correspondente ao status retornado
    const paragraphs = document.querySelectorAll("footer p");
    const icons = document.querySelectorAll("footer span");
    let statusEncontrado = false;

    paragraphs.forEach((p, index) => {
        if (p.textContent.trim().toUpperCase() === status.toUpperCase()) {
            p.classList.add("active");
            p.style.color = '#00ff06'; // Muda a cor do texto para verde
            icons[index].classList.add("active"); // Adiciona a classe 'active' ao ícone correspondente
            icons[index].style.color = '#00ff06'; // Muda a cor do ícone para verde
            statusEncontrado = true;
            console.log(`Parágrafo e ícone ${status} ativados!`); // Debug
        }
    });

    if (!statusEncontrado) {
        console.warn(`Nenhum parágrafo encontrado para o status: ${status}`); // Debug
        alert("Nenhuma O.S encontrada: " + status); // Alerta para status não encontrado
    }
}
