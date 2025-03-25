async function assignDeleteContactFunction() {
    const btnDeletar = document.querySelectorAll('#btn-excluir-contato');
    btnDeletar.forEach(async (element) => {
        const contatoId = parseInt(element.getAttribute('contatoId'))
        console.log(contatoId)

        element.addEventListener('click', async () => {

            let res = await fetch(`http://localhost:8080/contatos/excluir?contatoId=${contatoId}`, {
                method: "DELETE"
            })

            if (res.status == 200) {
                alert('Contato excluido com sucesso')
                loadDataContact()
                return
            }
            if (res.status == 500) {
                alert('Erro ao excluir contato')
                return
            }
        })
    })
}