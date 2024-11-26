async function buscarStatus() {
    const osNumber = document.getElementById("osNumber").value.trim();

    // Verifica se o número da O.S. foi inserido
    if (!osNumber) {
        alert("Por favor, insira um número de O.S.");
        return;
    }

    // Define a URL da API com base no ambiente
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://127.0.0.1:5000' // URL local
        : 'https://rare-bats-vanish.loca.lt'; // URL pública

    try {
        // Fazendo a requisição à API com autenticação básica
        const response = await fetch(`${apiUrl}/status/${osNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('username:password') // Substitua com suas credenciais
            },
        });

        // Verifica se a resposta da API é bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao acessar a API.');
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
