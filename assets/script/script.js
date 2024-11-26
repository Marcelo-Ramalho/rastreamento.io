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
        
        // Verifica se a resposta é válida
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
            // Adicionando detalhes sobre a resposta não JSON
            const text = await response.text();
            console.error('Erro: A resposta não é JSON, mas HTML ou outro formato:', text);
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
