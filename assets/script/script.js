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
        
        if (!response.ok) {
            if (response.status === 404) {
                alert('O.S. não encontrada.');
                return;
            } else {
                alert('Erro ao acessar a API.');
                return;
            }
        }

        const responseClone = response.clone(); // 1
        const contentType = responseClone.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log("Resposta da API:", data); // Debug

            if (data.status) {
                atualizarTexto(data.status);
            } else {
                alert("Nenhuma O.S encontrada: Status desconhecido");
            }
        } else {
            const bodyText = await responseClone.text();
            console.log('Resposta não JSON:', bodyText); // Debug
            alert('Resposta inválida da API. Esperado JSON, mas obtido outro formato.');
        }

    } catch (error) {
        // Verifica se o erro tem a propriedade 'message'
        const errorMessage = error && error.message ? error.message : 'Ocorreu um erro inesperado. Tente novamente.';
        alert(errorMessage); // Exibe a mensagem de erro
    }
}
