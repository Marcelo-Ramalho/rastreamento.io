document.addEventListener('DOMContentLoaded', () => {
    // Garantir que o botão funcione apenas quando o DOM estiver completamente carregado
    const osInput = document.getElementById('osNumber');
    const button = document.querySelector('button');
    
    // Função para buscar o status
    async function buscarStatus() {
        const osNumber = osInput.value;  // Obter o número da O.S.
        const responseElement = document.querySelector('#Gerador, #Polidora, #Gravador, #Montagem');

        try {
            // Fazendo a requisição para a API com Axios
            const response = await axios.get(`${cleanedApiUrl}/status/${osNumber}`);

            // Verificando a resposta
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
                console.error('Status não encontrado na resposta:', response);
                alert('Status não encontrado para a O.S. ' + osNumber);
            }
        } catch (error) {
            console.error("Erro ao buscar o status:", error);
            alert(error.message);  // Exibir o erro se ocorrer
        }
    }

    // Adiciona o evento de clique ao botão
    button.addEventListener('click', buscarStatus);
});
