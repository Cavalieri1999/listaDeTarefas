const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')


function criaLi() {
  const li = document.createElement('li')
  return li
}

function criaTarefa(textoInput) {
  if (inputTarefa.value === "") {
    alert('Insira uma tarefa no campo de tarefas')
  }
  else {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    botaoApagar(li);
    salvaTarefas();
  }
}


function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

btnTarefa.addEventListener('click', function () {
  criaTarefa(inputTarefa.value)

});

inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    criaTarefa(inputTarefa.value)
  }
});

function botaoApagar(li) {
  li.innerText += ' '
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  li.appendChild(botaoApagar);
}

document.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvaTarefas();
  }
});

function salvaTarefas() {
  const liTarefas = tarefas.querySelectorAll('li')
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', ' ')
    listaDeTarefas.push(tarefaTexto); 4
  }

  const tarefasJson = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJson);
}

function adcionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas)

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa)
  }
}
adcionaTarefasSalvas();