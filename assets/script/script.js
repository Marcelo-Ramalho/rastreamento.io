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
        const response = await fetch(`${apiUrl}/status/${osNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Marcelo:360380') // Certifique-se de que as credenciais estão corretas
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao acessar a API. Status: ' + response.status);
        }

        const data = await response.json();
        console.log("Resposta da API:", data);

        if (data.status) {
            atualizarCores(data.status);
        } else {
            throw new Error('O.S. não encontrada.');
        }

    } catch (error) {
        console.error("Erro ao buscar o status:", error);
        alert(error.message);
    }
}

function atualizarCores(status) {
    // Resetando todos os ícones para branco
    const setores = ['Gerador', 'Polidora', 'Gravadora', 'Montagem'];
    setores.forEach(setor => {
        const elemento = document.getElementById(setor);
        if (elemento) {
            elemento.style.color = 'white';
        }
    });

    // Agora, vamos alterar a cor para verde conforme o status
    switch (status) {
        case 'On Surface Blocker':
            document.getElementById('Gerador').style.color = 'green';
            break;
        case 'On Surface Generator':
            document.getElementById('Polidora').style.color = 'green';
            break;
        case 'On Surface Polisher':
            document.getElementById('Gravadora').style.color = 'green';
            break;
        case 'On Surface Engraver':
            document.getElementById('Montagem').style.color = 'green';
            break;
        default:
            alert("Status não encontrado.");
    }
}
