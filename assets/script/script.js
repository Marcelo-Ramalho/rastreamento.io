async function buscarStatus() {
    const osNumber = document.getElementById("osNumber").value.trim();

    if (!osNumber) {
        alert("Por favor, insira um número de O.S.");
        return;
    }

    // Define a URL da API com base no ambiente
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://192.168.0.169:5000' // IP local
        : 'https://c5a6-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app'; // URL pública do Ngrok

    try {
        // Remove espaços e assegura que a URL está correta
        const cleanedApiUrl = apiUrl.trim();
        const response = await fetch(`${cleanedApiUrl}/status/${osNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Marcelo:360380') // Certifique-se de que as credenciais estão corretas
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao acessar a API. Status: ' + response.status);
        }

        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Resposta inválida. Esperado JSON.');
        }

        const data = await response.json();
        console.log("Resposta da API:", data); // Debug

        if (data.status) {
            atualizarTexto(data.status);
        } else {
            throw new Error('O.S. não encontrada.');
        }

    } catch (error) {
        console.error("Erro ao buscar o status:", error);
        alert(error.message);
    }
}

function atualizarTexto(status) {
    // Alteração da cor dos ícones
    const statusElements = {
        'Gerador': document.getElementById("Gerador"),
        'Polidora': document.getElementById("Polidora"),
        'Gravadora': document.getElementById("Gravador"),
        'Montagem': document.getElementById("Montagem")
    };

    // Resetando a cor dos ícones
    for (let key in statusElements) {
        statusElements[key].style.color = "white";
    }

    // Mudando a cor do ícone do status ativo
    if (statusElements[status]) {
        statusElements[status].style.color = "green";
    }
}
