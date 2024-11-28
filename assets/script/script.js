const cleanedApiUrl = 'https://c5a6-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app'; // Substitua pela URL do seu ngrok
const responseElement = document.querySelector('#Gerador, #Polidora, #Gravador, #Montagem');

async function buscarStatus() {
    try {
        // Fazendo a requisição para a API usando Axios
        const response = await axios.get(`${cleanedApiUrl}/status/${osNumber}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Marcelo:360380') // Certifique-se de que as credenciais estão corretas
            }
        });

        const status = response.data.status;
        console.log(status);

        // Atualizar o front-end com o status recebido
        if (status === 'Gerador') {
            responseElement.classList.add('gerador');
        } else if (status === 'Polidora') {
            responseElement.classList.add('polidora');
        } else if (status === 'Gravadora') {
            responseElement.classList.add('gravadora');
        } else if (status === 'Montagem') {
            responseElement.classList.add('montagem');
        }
    } catch (error) {
        console.error("Erro ao buscar status:", error);
        alert("Erro ao buscar status: " + error.message);
    }
}

// Chamada da função (por exemplo, no clique do botão)
document.querySelector("button").addEventListener("click", buscarStatus);
