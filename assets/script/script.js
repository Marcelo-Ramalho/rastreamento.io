const osInput = document.getElementById('osNumberInput'); // Input para número da O.S.

const cleanedApiUrl = 'https://c5a6-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app'; // Substitua pela URL da sua API

async function buscarStatus() {
    const osNumber = osInput.value;  // Obter o número da O.S.
    const responseElement = document.querySelector('#Gerador, #Polidora, #Gravador, #Montagem');

    try {
        // Fazendo a requisição para a API com Axios
        const response = await axios.get(`${cleanedApiUrl}/status/${osNumber}`);

        // Verificando a resposta completa no console
        console.log('Resposta da API:', response);

        // Verificando se a resposta contém 'status'
        if (response.data && response.data.status) {
            console.log("Status encontrado:", response.data.status);
            // Atualizar o DOM de acordo com o status recebido
            const status = response.data.status.toLowerCase();
            if (responseElement) {
                responseElement.classList.remove('green');  // Remover cor anterior
                if (status === 'gerador') {
                    document.getElementById('Gerador').classList.add('green');
                } else if (status === 'polidora') {
                    document.getElementById('Polidora').classList.add('green');
                } else if (status === 'gravadora') {
                    document.getElementById('Gravador').classList.add('green');
                } else if (status === 'montagem') {
                    document.getElementById('Montagem').classList.add('green');
                }
            }
        } else {
            // Se não encontrar o status, mostrar um alerta com o erro
            console.error('Status não encontrado na resposta:', response);
            alert('Status não encontrado para a O.S. ' + osNumber);
        }
    } catch (error) {
        // Exibindo o erro no console e mostrando o alerta para o usuário
        console.error("Erro ao buscar o status:", error);
        alert(error.message);  // Exibir o erro se ocorrer
    }
}
