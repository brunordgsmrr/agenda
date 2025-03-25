const btnAdicionar = document.getElementById("btn-adicionar");

// Abre o modal ao clicar no botão
btnAdicionar.addEventListener("click", () => {
    const modalAdicionar = document.getElementById("contato-modal");

    modalAdicionar.innerHTML = `
            <div class="modal-content">
                <div class="header-modal">
                    <span class="close">&times;</span>
                    <h2 id="titulo-modal">Adicionar contato</h2>
                </div>
                <div class="input-box">
                    <div class="input-radio">
                        <label for="selecao-email">E-mail</label>
                        <input type="radio" name="selecao-tipo" id="selecao-email" value="E-mail" checked>
                    </div>
                    <div class="input-radio">
                        <label for="selecao-telefone">Telefone</label>
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
                <button id="btn-salvar-contato">Adicionar</button>
            </div>
    `

    const closeBtn = document.querySelector(".close");
    const btnSalvarContato = document.getElementById("btn-salvar-contato");

    modalAdicionar.style.display = "block";
    document.getElementById("valor").focus();
    btnSalvarContato.addEventListener("click", adicionarContato);

    closeBtn.addEventListener("click", () => {
        modalAdicionar.style.display = "none";
    });

    document.getElementById('selecao-email').addEventListener('change', () => {
        document.getElementById('selecao-email').toggleAttribute('checked')
        document.getElementById('selecao-telefone').removeAttribute('checked')
    })
    document.getElementById('selecao-telefone').addEventListener('change', () => {
        document.getElementById('selecao-email').removeAttribute('checked')
        document.getElementById('selecao-telefone').toggleAttribute('checked')
    })

});

async function adicionarContato() {
    const params = new URLSearchParams(window.location.search);
    const clienteId = params.get("clienteId");
    let tipo;
    let valor;
    let observacao = document.getElementById('observacao').value

    if (document.getElementById('selecao-email').hasAttribute('checked')) {
        tipo = "E-Mail"
        valor = document.getElementById('valor').value
    }

    if (document.getElementById('selecao-telefone').hasAttribute('checked')) {
        tipo = "Telefone"
        valor = document.getElementById('valor').value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")
    }

    const novosDados = { tipo, valor, observacao }
    console.log(novosDados)

    const res = await fetch(`http://localhost:8080/contatos/cadastrar?clienteId=${clienteId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(novosDados)
    })

    if (res.status == 200) {
        alert("Contato adicionado com sucesso!");
        const modalEditarContato = document.getElementById("contato-modal");;
        modalEditarContato.style.display = "none";
        loadDataContact()
    }

    if (res.status != 200) {
        alert('Erro ao adicionar o caontato');
    }
}

