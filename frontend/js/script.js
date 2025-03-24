const modalEditar = document.getElementById("cliente-modal");

async function getData() {
    let res = await fetch('http://localhost:8080/cliente/todos');
    let data = await res.json()
    return data;
}

async function createTableView(clientes) {
    const tbody = document.querySelector('tbody');
    clientes.forEach((cliente) => {
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `
            <td id="table-col-editar"><button id="btn-editar" clienteid="${cliente.id}"><img src="img/editar.png" alt="" class="icon"></button></td>
            <td class="show412">${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td class="show412">${new Date(cliente.dataNascimento).toLocaleDateString()}</td>
            <td class="show412">${cliente.endereco}</td>
            <td id="btn-contato"><a href="contatos.html?clienteId=${cliente.id}">Ver contatos</a></td>
            <td id="table-col-excluir"><button id="btn-excluir"><img src="img/excluir.png" alt="" class="icon"></button></td>
        `
        tbody.appendChild(tableRow)

    })
}

async function editarHandler() {
    const btnEditar = document.querySelectorAll("#btn-editar");
    const closeEditar = document.querySelector(".close");
    const data = await getData();

    btnEditar.forEach((element) => {
        element.addEventListener("click", async () => {
            let clienteId = element.getAttribute('clienteid')

            const cliente = await data.find((item) => item.id == clienteId)

            console.log(cliente)

            document.getElementById('nome').value = cliente.nome;
            document.getElementById('cpf').value = cliente.cpf;
            document.getElementById('dt-nasc').value = cliente.dataNascimento;
            document.getElementById('endereco').value = cliente.endereco;
            modalEditar.style.display = "block";

        });
    });

    // Fecha o modal ao clicar no botão de fechar
    closeEditar.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    // Fecha o modal ao clicar fora da caixa de conteúdo
    window.addEventListener("click", (event) => {
        if (event.target === modalEditar) {
            modalEditar.style.display = "none";
        }
    });
}

async function loadData() {
    const data = await getData();
    await createTableView(data)
    await editarHandler();
}

loadData()
