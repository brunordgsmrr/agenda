
function assignFunction() {
    const btnEditar = document.querySelectorAll("#btn-editar");

    btnEditar.forEach((element) => {
        let clienteId = element.getAttribute('clienteid')
        element.addEventListener("click", () => showEditModal(clienteId));
    });

}

async function showEditModal(clienteId) {

    const modalEditar = document.getElementById("cliente-modal");

    modalEditar.innerHTML = `
            <div class="modal-content">
                <div class="header-modal">
                    <span class="close">&times;</span>
                    <h2 id="titulo-modal">Editar Cliente</h2>
                </div>
                <div class="input-box">
                    <label for="id">ID:</label>
                    <input id="id" type="text" value="${clienteId} "disabled>
                </div>
                <div class="input-box">
                    <label for="nome">Nome:</label>
                    <input id="nome" type="text" placeholder="Digite o nome">
                </div>
                <div class="input-box">
                    <label for="cpf">CPF:</label>
                    <input id="cpf" type="text" placeholder="Digite seu CPF">
                </div>
                <div class="input-box">
                    <label for="data-nascimento">Data de nascimento:</label>
                    <input id="data-nascimento" type="date" placeholder="Digite sua data de nascimento">
                </div>
                <div class="input-box">
                    <label for="endereco">Endereço:</label>
                    <input id="endereco" type="text" placeholder="Digite se endereço">
                </div>
                <br>
                <button id="btn-salvar">Salvar</button>
            </div>
    `
    modalEditar.style.display = "block";

    const data = await getData();

    const cliente = await data.find((item) => item.id == clienteId)

    document.getElementById('id').value = cliente.id;
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('cpf').value = cliente.cpf;
    document.getElementById('data-nascimento').value = cliente.dataNascimento;
    document.getElementById('endereco').value = cliente.endereco;

    // Fecha o modal ao clicar no botão de fechar
    const closeEditar = document.querySelector(".close");
    closeEditar.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    const btnSalvar = document.getElementById("btn-salvar");
    btnSalvar.addEventListener("click", editarCliente);
}

async function editarCliente() {
    let clienteId = document.getElementById('id').value
    let dataNascimento = new Date(document.getElementById('data-nascimento').value).toISOString().split("T")[0];

    const novosDados = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        dataNascimento: dataNascimento,
        endereco: document.getElementById('endereco').value
    }

    const res = await fetch(`http://localhost:8080/clientes/editar?id=${parseInt(clienteId)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(novosDados)
    })

    if (res.status == 200) {
        alert("Alteração feita");
        const modalEditar = document.getElementById("cliente-modal");
        modalEditar.style.display = "none";
        loadData()
    }

    if (res.status == 400) {
        alert('Os campos nome e CPF devem ser preenchidos');
    }
}


