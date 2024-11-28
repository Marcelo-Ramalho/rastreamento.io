const cleanedApiUrl = 'https://c5a6-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app'; // URL da API do Ngrok
const responseElement = document.querySelector('#Gerador, #Polidora, #Gravador, #Montagem');

async function buscarStatus() {
    const osNumber = document.querySelector('#osNumber').value;
    if (!osNumber) {
        alert('Por favor, insira um número de O.S.');
        return;
    }

    try {
        // Fazendo a requisição para a API
        const response = await fetch(`${cleanedApiUrl}/status/${osNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Marcelo:360380') // Certifique-se de que as credenciais estão corretas
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao consultar o status');
        }

        const data = await response.json();
        const status = data.status;

        // Alterando a cor dos ícones com base no status
        const icons = {
            'Gerador': document.getElementById('Gerador'),
            'Polidora': document.getElementById('Polidora'),
            'Gravadora': document.getElementById('Gravador'),
            'Montagem': document.getElementById('Montagem')
        };

        // Resetando as cores (tornando todos os ícones brancos)
        Object.values(icons).forEach(icon => {
            icon.style.color = 'white';
        });

        // Mudando para verde o ícone do status atual
        if (status && icons[status]) {
            icons[status].style.color = 'green';
        }

    } catch (error) {
        console.error("Erro ao buscar o status:", error);
        alert(error.message);
    }
}
