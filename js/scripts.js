// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
];

//Seleção de elementos
const imcTable = document.querySelector("#imc-table"); //buscamos a tabela de dados com imc.

const heigthInput = document.querySelector("#height"); //buscamos a altura.
const weightInput = document.querySelector("#weight"); //buscamos o peso.
const calcBtn = document.querySelector("#calc-btn"); //buscamos o botao.
const clearBtn = document.querySelector("#clear-btn"); //para limpar.

const calcContainer = document.querySelector("#calc-container")
const resultContainer = document.querySelector("#result-container")

const imcNumber = document.querySelector("#imc-number span")
const imcInfo = document.querySelector("#imc-info span")

const backBtn = document.querySelector("#back-btn");

//Funções
function createTable(data) {
    data.forEach((item) => {

        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
}

function cleanInputs() {
    heigthInput.value = "";
    weightInput.value = "";
}

function validDigits(text) { //replace funciona a base de uma expressão regular.
  return text.replace(/[^0-9,]/g, ""); //verifica se os digitos estão entre 0 e 9 e se tem virgulas...g = global...se não for igual o que ele quer, vai ser substituido por "" = vazio.
}

function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1); //usamos toFixed para arredondar uma casa depois da virgula.

  return imc;
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide") //tem hide tira, nao tem coloca.
  resultContainer.classList.toggle("hide")
}

//Inicialização
createTable(data); //dentro da func.createTable estou passando os dados do meu array = data.

//Eventos
[heigthInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updateValue = validDigits(e.target.value);

    e.target.value = updateValue;
  })  
});//input = quando alguem digita alguma coisa ele é ativado, evento para detectar modificações.


calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const weight = weightInput.value.replace(",",".");
  const height = heigthInput.value.replace(",",".");

  if (!weight || !height) return; //bloqueia pra proxima tela.

  const imc = calcImc(weight, height);

  let info;

  data.forEach((item) => {
    if(imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  console.log(info);

  if(!info) return; //bloqueio caso não venha a informação que eu quero.

  imcNumber.innerText = imc
  imcInfo.innerText = info

  switch(info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();  //mostra os resultados.
})


clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cleanInputs(); 
});


backBtn.addEventListener("click", () => {

  cleanInputs(); //limpa os inputs para resetar os formularios.
  showOrHideResults(); //retorno a tela inicial.

})