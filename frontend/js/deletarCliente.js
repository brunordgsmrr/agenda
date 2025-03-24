async function assignDeleteFunction() {
    const btnDeletar = document.querySelectorAll('#btn-excluir-cliente');
    btnDeletar.forEach(async (element) => {
        let clienteId = element.getAttribute('clienteId')

        element.addEventListener('click', async () => {

            let res = await fetch(`http://localhost:8080/clientes/excluir?id=${clienteId}`, {
                method: "DELETE"
            })

            if (res.status == 200) {
                alert('Excluido com sucesso')
                loadData()
                return
            }
            if (res.status == 500) {
                alert('Erro ao excluir')
                return
            }
        })
    })
}