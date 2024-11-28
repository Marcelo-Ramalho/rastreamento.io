async function buscarStatus() {
    const osNumber = document.querySelector('#osNumber').value; // Pegando o número da O.S. do campo de input

    if (!osNumber) {
        alert("Por favor, insira um número de O.S.");
        return;
    }

    const cleanedApiUrl = 'https://c5a6-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app'; // Substitua pela URL do Ngrok
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

        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao buscar status. Status: ${response.status}`);
        }

        // Tente obter o JSON da resposta
        const data = await response.json();
        
        // Verifique se o JSON contém os campos esperados
        if (data && data.status) {
            const status = data.status;
            console.log("Status obtido:", status); // Exibe o status no console para depuração

            // Mostrar a cor do ícone de acordo com o status
            if (status === 'Gerador') {
                responseElement.forEach(item => item.style.color = 'green'); // Exemplo de troca de cor
            } else if (status === 'Montagem') {
                responseElement.forEach(item => item.style.color = 'blue'); // Outra cor para o status 'Montagem'
            } else {
                responseElement.forEach(item => item.style.color = 'gray'); // Resetar cor
            }
        } else {
            throw new Error('Status não encontrado no JSON da resposta.');
        }

    } catch (error) {
        // Exibir detalhes do erro
        console.error("Erro ao buscar o status:", error);
        alert("Erro ao buscar o status: " + error.message); // Mensagem de erro mais detalhada
    }
}
