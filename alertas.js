const alertas = [
    { id: 1, titulo: "Alagamento", descricao: "Alagamento na Rua das Flores", prioridade: "Alta", horario: "10:30" },
    { id: 2, titulo: "Acidente", descricao: "Acidente na Avenida Central", prioridade: "Média", horario: "11:00" },
    { id: 3, titulo: "Falta de Energia", descricao: "Bairro Jardim sem energia elétrica", prioridade: "Baixa", horario: "12:15" },
];


function renderizarAlertas(lista) {
    const container = document.querySelector("#alertas-container");
    container.innerHTML = ""; 

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum alerta encontrado.</p>";
        return;
    }

    lista.forEach(alerta => {
        const alertaDiv = document.createElement("div");
        alertaDiv.classList.add("alerta");

        alertaDiv.innerHTML = `
            <h3>${alerta.titulo}</h3>
            <p>${alerta.descricao}</p>
            <p><strong>Prioridade:</strong> ${alerta.prioridade}</p>
            <p><strong>Horário:</strong> ${alerta.horario}</p>
        `;

        container.appendChild(alertaDiv);
    });
}

function buscarAlertas(termo) {
    return alertas.filter(alerta =>
        alerta.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        alerta.descricao.toLowerCase().includes(termo.toLowerCase())
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const campoBusca = document.querySelector("#campo-busca");
    const botaoBusca = document.querySelector("#botao-busca");

    renderizarAlertas(alertas);

    botaoBusca.addEventListener("click", () => {
        const termo = campoBusca.value;
        const resultados = buscarAlertas(termo);
        renderizarAlertas(resultados);
    });
});