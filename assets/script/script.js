async function buscarStatus() {
    const osNumber = document.getElementById('osNumberInput').value;  // Obtendo o número da O.S.
    const apiUrl = 'https://0dd1-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app' + osNumber;

    try {
        // Autenticação básica com Axios
        const authHeader = 'Basic ' + btoa('Marcelo:360380');  // Codificando 'Marcelo:360380' em Base64

        // Fazendo a requisição para a API
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': authHeader  // Enviando o cabeçalho de autenticação
            }
        });

        // Verificando a resposta no console
        console.log('Resposta da API:', response.data);  // Log da resposta

        // Verificando se a resposta contém 'status' e 'os_number'
        if (response.data && response.data.status && response.data.os_number) {
            console.log("Status encontrado:", response.data.status);

            // Atualizando os elementos da interface com o status retornado
            const status = response.data.status;
            const statusElement = document.getElementById('statusElement'); // Elemento para exibir o status

            // Exibindo o status na tela
            statusElement.textContent = `Status da O.S. ${osNumber}: ${status}`;

            // Atualizando os ícones de acordo com o status
            updateIcons(status);  // Função para atualizar os ícones com a cor

        } else {
            console.error('Status ou O.S. não encontrados na resposta.');
            alert('Status não encontrado para a O.S. ' + osNumber);
        }
    } catch (error) {
        // Se ocorrer um erro durante a requisição ou processamento
        console.error('Erro ao buscar o status:', error);
        alert('Erro ao buscar o status: ' + error.message);
    }
}

// Função para atualizar os ícones com base no status
function updateIcons(status) {
    const icons = {
        'Gerador': document.getElementById('Gerador'),
        'Polidora': document.getElementById('Polidora'),
        'Gravadora': document.getElementById('Gravadora'),
        'Montagem': document.getElementById('Montagem')
    };

    // Resetando todos os ícones para cor padrão (branco)
    Object.keys(icons).forEach(icon => {
        icons[icon].style.fill = 'white';
    });

    // Alterando a cor do ícone correspondente ao status atual
    if (icons[status]) {
        icons[status].style.fill = 'green';  // Alterar para verde quando no setor correto
    }
}
