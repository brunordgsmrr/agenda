window.addEventListener('load', editarHandler())

async function editarHandler2() {
    const modalEditar = document.getElementById("cliente-modal");
    const btnEditar = document.querySelector(".btn-editar");
    const closeEditar = document.querySelector(".close");

    console.log(btnEditar)

    // Abre o modal ao clicar no botão
    btnEditar.addEventListener("click", () => {
        modalEditar.style.display = "block";
    });

    // Fecha o modal ao clicar no botão de fechar
    closeEditar.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    // Fecha o modal ao clicar fora da caixa de conteúdo
    window.addEventListener("click", (event) => {
        if (event.target === modalEditar) {
            modalEditar.style.display = "none";
        }
    });
}

