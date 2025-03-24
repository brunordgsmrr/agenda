window.document.addEventListener('onload', loadData())

async function getData() {
    const params = new URLSearchParams(window.location.search)
    const clienteId = parseInt(params.get("clienteId"));

    let res = await fetch(`http://localhost:8080/contatos/listar?clienteId=${clienteId}`);
    let data = await res.json()
    return data;
}

function createTableView(contatos) {
    const tbody = document.querySelector('tbody');
    contatos.forEach((contato) => {
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `
            <td><button id="btn-editar"><img src="img/editar.png" alt="" class="icon"></button></td>
            <td class="show412">${contato.id}</td>
            <td>${contato.tipo}</td>
            <td>${contato.valor}</td>
            <td class="show412">${contato.observacao}</td>
            <td><button id="btn-excluir"><img src="img/excluir.png" alt="" class="icon"></button></td>
        `
        tbody.appendChild(tableRow)
    })
}

async function loadData() {
    const data = await getData();
    const titulo = document.getElementById('titulo');
    titulo.textContent = `Contatos - ${data[0].cliente.nome}`
    createTableView(data)
}