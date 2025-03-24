const btnPesquisar = document.getElementById('btn-pesquisar')
const inputPesquisar = document.getElementById('input-pesquisar')
btnPesquisar.addEventListener('click', buscarCliente)

function createTableView(clientes) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ""
    clientes.forEach((cliente) => {
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `
            <td id="table-col-editar"><button id="btn-editar"><img src="img/editar.png" alt="" class="icon"></button></td>
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


async function buscarCliente() {
    let valor = inputPesquisar.value
    if (valor === "") {
        console.log('vazio')
        return
    }
    const res = await fetch(`http://localhost:8080/cliente/consultar?nome=${valor}&cpf=${valor}`)
    const clientes = await res.json();
    createTableView(clientes);
}

