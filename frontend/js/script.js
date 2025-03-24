async function getData() {
    let res = await fetch('http://localhost:8080/clientes/listar');
    let data = await res.json()
    return data;
}

function createTableViewClientes(clientes) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ""

    clientes.forEach((cliente) => {
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `
            <td><button id="btn-editar" clienteid="${cliente.id}"><img src="img/editar.png" class="icon"></button></td>
            <td class="show412">${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td class="show412">${new Date(cliente.dataNascimento).toLocaleDateString()}</td>
            <td class="show412">${cliente.endereco}</td>
            <td id="btn-contato"><a href="contatos.html?clienteId=${cliente.id}">Ver contatos</a></td>
            <td><button id="btn-excluir-cliente" clienteid="${cliente.id}"><img src="img/excluir.png" class="icon"></button></td>
        `
        tbody.appendChild(tableRow)
    })

    assignFunction();
    assignDeleteFunction();
}

async function loadData() {
    const data = await getData();
    createTableViewClientes(data)
}

loadData()
