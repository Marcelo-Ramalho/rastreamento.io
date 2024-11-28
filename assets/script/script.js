async function buscarStatus() {
    const osNumber = document.getElementById("osNumber").value.trim();
    console.log(`Buscando status para a OS: ${osNumber}`); // Debug

    if (!osNumber) {
        alert("Por favor, insira um número de O.S.");
        return;
    }

    try {
        // Requisição com autenticação básica
        const response = await axios.get(`https://891f-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app/status/${osNumber}`, {
            auth: {
                username: 'Marcelo', // Nome de usuário
                password: '360380'   // Senha
            }
        });

        console.log("Resposta da API:", response.data); // Debug

        // Verifica se o status é válido na resposta da API
        if (response.data.status) {
            atualizarTexto(response.data.status);
            document.getElementById("mensagemStatus").textContent = ''; // Limpa a mensagem
        } else {
            throw new Error('O.S. não encontrada ou não possui status.'); // Caso o status não esteja presente
        }

    } catch (error) {
        console.error("Erro ao buscar o status:", error);

        // Exibe o erro ao usuário
        alert(error.response?.data?.message || error.message || "Erro desconhecido.");
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
    let statusEncontrad
