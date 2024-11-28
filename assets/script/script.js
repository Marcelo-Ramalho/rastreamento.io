// Função para buscar o status da O.S. usando Axios
async function buscarStatus() {
    const osNumber = document.getElementById('osNumberInput').value;  // Obtendo o número da O.S.
    const apiUrl = 'https://c5a6-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app/status/' + osNumber;

    try {
        // Autenticação básica com Axios
        const authHeader = 'Basic ' + btoa('Marcelo:360380');  // Codificando 'Marcelo:360380' em Base64

        // Fazendo a requisição para a API
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': authHeader  // Enviando o cabeçalho de autenticação
            }
        });

        // Verificando se a resposta tem os dados esperados
        if (response.data && response.data.status) {
            console.log("Status encontrado:", response.data.status);

            // Atualizando os elementos da interface com o status retornado
            // Exemplo: atualizando os ícones ou texto no frontend conforme o status
            const status = response.data.status;
            const statusElement = document.getElementById('statusElement'); // Elemento para exibir o status

            // Aqui você pode fazer o que for necessário com o status, como mudar cores de ícones ou texto
            statusElement.textContent = `Status da O.S. ${osNumber}: ${status}`;
            
            // Atualize a interface do usuário com a cor dos ícones, por exemplo
            updateIcons(status);  // Suponha que você tenha essa função para atualizar os ícones
        } else {
            console.error('Status não encontrado');
            alert('Status não encontrado para a O.S. ' + osNumber);
        }
    } catch (error) {
        console.error('Erro ao buscar o status:', error);
        alert('Erro ao buscar o status: ' + error.message);
    }
}

// Função para atualizar os ícones com base no status
function updateIcons(status) {
    // Aqui você pode adicionar lógica para trocar os ícones dependendo do status
    const icons = {
        'Gerador': '#GeradorIcon',
        'Polidora': '#PolidoraIcon',
        'Gravadora': '#GravadorIcon',
        'Montagem': '#MontagemIcon'
    };

    // Resetando a cor de todos os ícones (ficando branca, por exemplo)
    Object.keys(icons).forEach((statusName) => {
        const icon = document.querySelector(icons[statusName]);
        if (icon) {
            icon.style.color = 'white';  // Resetando para cor padrão
        }
    });

    // Mudando a cor do ícone correspondente ao status atual
    const activeIcon = document.querySelector(icons[status]);
    if (activeIcon) {
        activeIcon.style.color = 'green';  // Mudando a cor do ícone para verde
    }
}
