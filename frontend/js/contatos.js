//window.document.addEventListener('onload', loadData())

async function getDataContacts() {
    const params = new URLSearchParams(window.location.search)
    const clienteId = parseInt(params.get("clienteId"));

    let res = await fetch(`http://localhost:8080/contatos/listar?clienteId=${clienteId}`);
    let data = await res.json()
    return data;
}

function createTableViewContatos(contatos) {
    const tbody = document.querySelector('tbody');
    tbody.textContent = "";
    contatos.forEach((contato) => {
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `
            <td><button id="btn-editar-contato" contatoId="${contato.id}"><img src="img/editar.png" alt="" class="icon"></button></td>
            <td class="show412">${contato.id}</td>
            <td>${contato.tipo}</td>
            <td>${contato.valor}</td>
            <td class="show412">${contato.observacao}</td>
            <td><button id="btn-excluir"><img src="img/excluir.png" alt="" class="icon"></button></td>
        `
        tbody.appendChild(tableRow)
    })

    assignEditarContato();
}

async function loadDataContact() {
    const data = await getDataContacts();
    const titulo = document.getElementById('titulo');
    titulo.textContent = `Contatos - ${data[0].cliente.nome}`
    createTableViewContatos(data)
}

loadDataContact()