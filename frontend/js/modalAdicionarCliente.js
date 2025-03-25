const btnAdicionar = document.getElementById("btn-adicionar");

// Abre o modal ao clicar no botão
btnAdicionar.addEventListener("click", () => {
    const modalAdicionar = document.getElementById("cliente-modal");

    modalAdicionar.innerHTML = `
            <div class="modal-content">
                <div class="header-modal">
                    <span class="close">&times;</span>
                    <h2 id="titulo-modal">Adicionar Cliente</h2>
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
                <button id="btn-cadastrar">Cadastrar</button>
            </div>
    `

    const closeBtn = document.querySelector(".close");
    const btnCadastrar = document.getElementById("btn-cadastrar");

    modalAdicionar.style.display = "block";
    document.getElementById("nome").focus();
    btnCadastrar.addEventListener("click", cadastrarCliente);

    closeBtn.addEventListener("click", () => {
        modalAdicionar.style.display = "none";
    });

});

async function cadastrarCliente() {
    let nome = document.getElementById('nome').value
    let cpf = document.getElementById('cpf').value
    let dataNascimento = document.getElementById('data-nascimento').value
    let endereco = document.getElementById('endereco').value

    if (!nome || !cpf) {
        alert('Preencha os campos')
        document.getElementById("nome").focus();
        return
    }

    if (dataNascimento) {
        dataNascimento = new Date(dataNascimento).toISOString().split('T')[0]
    }

    let novoCliente = { nome, cpf, dataNascimento, endereco }

    let res = await fetch('http://localhost:8080/clientes/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente)
    });

    if (res.status == 200) {
        alert("Cliente cadastrado");
        const modalAdicionar = document.getElementById("cliente-modal");
        modalAdicionar.style.display = "none";
        loadData()
    }

    if (res.status == 400) {
        alert('Os campos nome e CPF devem ser preenchidos');
    }

    if (res.status == 500) {
        alert('CPF já cadastrado');
    }
}

