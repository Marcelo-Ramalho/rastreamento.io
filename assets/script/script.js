async function buscarStatus() {
  const osNumber = document.getElementById("osNumber").value.trim();
  console.log(`Buscando status para a OS: ${osNumber}`);

  if (!osNumber) {
    alert("Por favor, insira um número de O.S.");
    return;
  }

  try {
    const response = await axios.get(`https://0dd1-2804-14c-5bd8-40fc-f53c-941b-7def-789.ngrok-free.app/status/${osNumber}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar status: ${response.status}`);
    }

    const data = response.data;
    atualizarTexto(data.status);
  } catch (error) {
    console.error("Erro:", error);
    document.getElementById("mensagemStatus").textContent = `Erro ao buscar status: ${error.message}`;
  }
}

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
