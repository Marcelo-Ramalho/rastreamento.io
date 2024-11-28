// Função para buscar o status
async function buscarStatus() {
  const osNumber = document.getElementById("osNumber").value.trim();
  console.log(`Buscando status para a OS: ${osNumber}`);

  if (!osNumber) {
    alert("Por favor, insira um número de O.S.");
    return;
  }

  try {
    const response = await axios.get(`https://891f-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app/status/${osNumber}`);
    
    // A resposta está no formato `data` do Axios
    const data = response.data;
    atualizarTexto(data.status);
  } catch (error) {
    console.error("Erro:", error);

    // Tratamento de erro detalhado
    if (error.response) {
      // Erro de resposta do servidor
      alert(`Erro ao buscar status: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      alert("Erro ao buscar status: Nenhuma resposta recebida do servidor.");
    } else {
      // Outro tipo de erro
      alert(`Erro ao buscar status: ${error.message}`);
    }
  }
}

// Função para atualizar o texto e os ícones
function atualizarTexto(status) {
  console.log(`Atualizando cor para o status: ${status}`);

  function limparStatus() {
    document.querySelectorAll("footer p, footer span").forEach(element => {
      element.classList.remove("active");
      element.style.color = '';
    });
  }

  limparStatus();

  const paragraphs = document.querySelectorAll("footer p");
  const icons = document.querySelectorAll("footer span");

  paragraphs.forEach((p, index) => {
    if (p.textContent.trim().toUpperCase() === status.toUpperCase()) {
      p.classList.add("active");
      p.style.color = '#00ff06';
      icons[index].classList.add("active");
      icons[index].style.color = '#00ff06';
    }
  });
}

// Adiciona evento de tecla para verificar "Enter"
document.getElementById("osNumber").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const osNumber = document.getElementById("osNumber").value.trim();
    if
