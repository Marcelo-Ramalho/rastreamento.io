async function buscarStatus() {
    const osNumber = document.getElementById("osNumber").value.trim();
    console.log(`Buscando status para a O.S. número: ${osNumber}`); // Debug

    if (!osNumber) {
        alert("Por favor, insira um número de O.S.");
        return;
    }

    try {
        // Enviando a requisição com autenticação
        const response = await axios.get(`https://891f-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app/status/${osNumber}`, {
            auth: {
                username: 'Marcelo', // Usuário da autenticação
                password: '360380'   // Senha da autenticação
            }
        });

        console.log("Resposta da API:", response.data); // Debug

        // Verifica se a resposta contém um status válido
        if (response.data.status) {
            atualizarTexto(response.data.status);
            document.getElementById("mensagemStatus").textContent = ''; // Limpa a mensagem
        } else {
            // Caso a O.S. não tenha um status
            alert("O.S. não encontrada ou não possui status.");
        }

    } catch (error) {
        console.error("Erro ao buscar o status:", error);
        
        // Verifica o tipo de erro e exibe uma mensagem adequada
        if (error.response && error.response.status === 404) {
            alert("O.S. não encontrada.");
        } else {
            alert(error.response?.data?.message || error.message || "Erro desconhecido.");
        }
    }
}

// Função para adicionar o evento de 'Enter' no campo de O.S.
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
        alert("Nenhuma O.S. encontrada com o status: " + status); // Alerta para status não encontrado
    }
}
