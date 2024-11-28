async function buscarStatus() {
    const osNumber = document.getElementById('osNumber').value;  // Pega o valor da O.S.

    const cleanedApiUrl = 'https://c5a6-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app'; // Sua URL
    const responseElement = document.querySelector('#Gerador, #Polidora, #Gravador, #Montagem');

    try {
        // Fazendo a requisição para a API
        const response = await axios.get(`${cleanedApiUrl}/status/${osNumber}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Marcelo:360380') // Credenciais, caso necessário
            }
        });

        // Verificando se a resposta foi bem-sucedida
        if (response.data && response.data.status) {
            const status = response.data.status;
            // Aqui, altere a cor dos ícones com base no status
            atualizarIcones(status);
        } else {
            console.error("Status não encontrado na resposta:", response);
            alert("Status não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao buscar o status:", error);
        alert("Erro ao buscar o status. Verifique a O.S. ou a conexão.");
    }
}

function atualizarIcones(status) {
    // Reseta os ícones
    const iconElements = document.querySelectorAll('.material-symbols-outlined');
    iconElements.forEach(icon => {
        icon.style.color = 'white'; // Cor padrão
    });

    // Atualiza a cor do ícone correspondente
    if (status === 'Gerador') {
        document.getElementById('Gerador').style.color = 'green';
    } else if (status === 'Polidora') {
        document.getElementById('Polidora').style.color = 'green';
    } else if (status === 'Gravadora') {
        document.getElementById('Gravador').style.color = 'green';
    } else if (status === 'Montagem') {
        document.getElementById('Montagem').style.color = 'green';
    }
}
