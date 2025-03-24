const btnPesquisar = document.getElementById('btn-pesquisar')
const inputPesquisar = document.getElementById('input-pesquisar')
btnPesquisar.addEventListener('click', buscarCliente)

async function buscarCliente() {
    let valor = inputPesquisar.value

    if (valor === "") {
        console.log('vazio')
        loadData()
        return
    }

    const res = await fetch(`http://localhost:8080/clientes/consultar?nome=${valor}&cpf=${valor}`)
    const clientes = await res.json();
    createTableViewClientes(clientes);
}

