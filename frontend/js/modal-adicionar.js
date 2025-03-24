const modalAdicionar = document.getElementById("cliente-modal");
const btnAdicionar = document.getElementById("btn-adicionar");
const closeBtn = document.querySelector(".close");
const btnSalvar = document.getElementById("btn-salvar");

// Abre o modal ao clicar no botão
btnAdicionar.addEventListener("click", () => {
    modalAdicionar.style.display = "block";
});

// Fecha o modal ao clicar no botão de fechar
closeBtn.addEventListener("click", () => {
    modalAdicionar.style.display = "none";
});

// Fecha o modal ao clicar fora da caixa de conteúdo
window.addEventListener("click", (event) => {
    if (event.target === modalAdicionar) {
        modalAdicionar.style.display = "none";
    }
});

btnSalvar.addEventListener("click", (event) => {
    console.log('ok')
});



function cadastrarCliente() {

}

