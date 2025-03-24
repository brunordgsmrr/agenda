function assignEditarContato() {
    const btnEditarContato = document.querySelectorAll("#btn-editar-contato");

    btnEditarContato.forEach((element) => {
        let contatoId = element.getAttribute('contatoId')
        element.addEventListener("click", () => showEditarContatoModal(contatoId));
    });
}

async function showEditarContatoModal(contatoId) {
    const modalEditarContato = document.getElementById("contato-modal");

    modalEditarContato.innerHTML = `
            <div class="modal-content">
                <div class="header-modal">
                    <span class="close">&times;</span>
                    <h2 id="titulo-modal">Editar contato</h2>
                </div>
                <div class="input-box">
                    <label for="id">ID:</label>
                    <input id="id" type="text" disabled>
                </div>
                <div class="input-box">
                    <div class="input-radio">
                        <label for="email">E-mail</label>
                        <input type="radio" name="selecao-tipo" id="selecao-email" value="E-mail" checked>
                    </div>
                    <div class="input-radio">
                        <label for="telefone">Telefone</label>
                        <input type="radio" name="selecao-tipo" id="selecao-telefone" value="Telefone">
                    </div>
                </div>
                <div class="input-box">
                    <label for="valor">Valor:</label>
                    <input id="valor" type="text" placeholder="Digite seu E-mail ou Telefone">
                </div>
                <div class="input-box">
                    <label for="observacao">Observação:</label>
                    <input id="observacao" type="text" placeholder="Observação">
                </div>
                <br>
                <button id="btn-salvar-contato">Salvar</button>
            </div>
    `
    modalEditarContato.style.display = "block";

    let contatos = await getDataContacts();

    let contato = await contatos.find((item) => item.id == contatoId);

    const { id, tipo, valor, observacao } = contato;

    if (tipo == "E-mail") {
        document.getElementById('selecao-email').setAttribute("checked")
    } else {
        document.getElementById('selecao-email').removeAttribute("checked")
        document.getElementById('selecao-telefone').toggleAttribute("checked")
    }

    document.getElementById('id').value = id;
    document.getElementById('valor').value = valor;
    document.getElementById('observacao').value = observacao;

    // Fecha o modal ao clicar no botão de fechar
    const closeEditar = document.querySelector(".close");
    closeEditar.addEventListener("click", () => {
        modalEditarContato.style.display = "none";
    });

    const btnSalvar = document.getElementById("btn-salvar-contato");
    btnSalvar.addEventListener("click", editarContato);
}

async function editarContato() {
    let contatoId = document.getElementById('id').value
    let tipo;
    let valor;
    let observacao = document.getElementById('observacao').value

    if ((document.getElementById('selecao-email').hasAttribute('checked'))) {
        tipo = "E-Mail"
        valor = document.getElementById('valor')

    } else {
        tipo = "Telefone"
        valor = document.getElementById('valor').value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }

    const novosDados = { tipo, valor, observacao }

    const res = await fetch(`http://localhost:8080/contatos/editar?contatoId=${parseInt(contatoId)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(novosDados)
    })

    if (res.status == 200) {
        alert("Alteração feita");
        const modalEditarContato = document.getElementById("contato-modal");;
        modalEditarContato.style.display = "none";
        loadDataContact()
    }

    if (res.status == 400) {
        alert('Os campos nome e CPF devem ser preenchidos');
    }


}


