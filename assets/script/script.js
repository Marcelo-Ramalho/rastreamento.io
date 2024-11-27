async function buscarStatus() {
    const osNumber = document.getElementById("osNumber").value.trim();

    // Verifica se o número da O.S. foi inserido
    if (!osNumber) {
        alert("Por favor, insira um número de O.S.");
        return;
    }

    // Define a URL da API com base no ambiente
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://192.168.0.169:5000' // Substitua pelo seu IP local
        : 'https://5e48-2804-14c-5bd8-40fc-cb0a-bce1-959f-e997.ngrok-free.app'; // URL pública (ajuste conforme necessário)

    try {
        // Fazendo a requisição à API com autenticação básica
        const response = await fetch(`${apiUrl}/status/${osNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Marcelo:360380') // Substitua com suas credenciais reais
            },
        });

        // Verifica se a resposta da API é bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao acessar a API. Status: ' + response.status);
        }

        // Verifica se o tipo de conteúdo da resposta é JSON
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Resposta inválida. Esperado JSON.');
        }

        // Obtém os dados no formato JSON
        const data = await response.json();
        console.log("Resposta da API:", data); // Debug

        // Verifica se o status existe na resposta da API
        if (data.status) {
            atualizarTexto(data.status); // Atualiza o texto com o status
        } else {
            throw new Error('O.S. não encontrada.');
        }

    } catch (error) {
        // Exibe o erro no console e em um alerta
        console.error("Erro ao buscar o status:", error);
        alert(error.message); // Exibe a mensagem de erro em um alerta
    }
}

// Função para atualizar o texto com o status
function atualizarTexto(status) {
    const statusElement = document.getElementById("status");
    statusElement.textContent = `Status da O.S.: ${status}`;
}
