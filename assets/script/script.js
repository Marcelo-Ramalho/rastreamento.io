async function buscarStatus() {
    const osNumber = document.getElementById('osNumber').value.trim();

    if (!osNumber) {
        alert("Por favor, insira o número da O.S.");
        return;
    }

    const cleanedApiUrl = 'https://c5a6-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app'; // Substitua pela URL da sua API
    const responseElement = document.querySelector('#Gerador, #Polidora, #Gravador, #Montagem');
    
    try {
        // Fazendo a requisição para a API
        const response = await fetch(`${cleanedApiUrl}/status/${osNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Marcelo:360380') // Certifique-se de que as credenciais estão corretas
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const data = await response.json();
            const status = data.status;
            console.log(data); // Para debug, pode remover depois

            // Reseta as cores dos ícones
            resetarCores();

            // Atualiza os ícones com base no status
            if (status === 'Gerador') {
                document.getElementById('Gerador').style.color = 'green';
            } else if (status === 'Polidora') {
                document.getElementById('Polidora').style.color = 'green';
            } else if (status === 'Gravadora') {
                document.getElementById('Gravador').style.color = 'green';
            } else if (status === 'Montagem') {
                document.getElementById('Montagem').style.color = 'green';
            } else {
                alert('Status não reconhecido.');
            }

        } else {
            console.error("Erro ao obter dados da API", response.status);
            alert(`Erro: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao buscar o status:", error);
        alert(error.message);
    }
}

function resetarCores() {
    document.getElementById('Gerador').style.color = 'white';
    document.getElementById('Polidora').style.color = 'white';
    document.getElementById('Gravador').style.color = 'white';
    document.getElementById('Montagem').style.color = 'white';
}
