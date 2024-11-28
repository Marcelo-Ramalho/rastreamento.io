async function buscarStatus() {
    const osNumber = document.getElementById("osNumber").value.trim();
    console.log(`Buscando status para a OS: ${osNumber}`); // Debug

    if (!osNumber) {
        alert("Por favor, insira um número de O.S.");
        return;
    }

    // Faz a requisição com Axios para a URL especificada
    const response = await axios.get(`https://891f-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app/status/${osNumber}`);

    // Verifica se a resposta foi bem-sucedida
    if (response && response.data && response.data.status) {
        atualizarTexto(response.data.status);
    } else {
        alert("O.S. não encontrada ou não possui status.");
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
        alert("Nenhum status encontrado para: " + status); // Alerta para status não encontrado
    }
}
