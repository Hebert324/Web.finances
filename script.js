const Modal = {
  open(){
    // Abrir modal
    // Adiciona a class active no modal
    document.querySelector('.modal-overlay')

    .classList.add('active')
  },

  close(){
    // Fechar modal
    // Remove a class active no modal
    document.querySelector('.modal-overlay')

    .classList.remove('active')
  }
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("Web.finances:transactions")) || []
},

set(transactions) {
    localStorage.setItem("Web.finances:transactions", JSON.stringify(transactions))
}
}
const Transaction = {
  all: Storage.get(),

  add(transaction){
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index){
    Transaction.all.splice(index, 1)
    
    App.reload()
  },

  incomes(){
    let income = 0
    //pegar todas as transações
    Transaction.all.forEach(function(transaction){
      //se ela for maior que zero
      if (transaction.amount > 0){
        //somar a uma variavel e retornar a variavel
        income += transaction.amount
      }
    })

    return income
  },

  expenses(){
    let expense = 0
    Transaction.all.forEach(function(transaction){
      if (transaction.amount < 0){
        expense += transaction.amount
      }
    })

    return expense
  },

  total(){
    return Transaction.incomes() + Transaction.expenses()
  }
}

// Substituir os dados do HTML com os dados do JS
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index){
    const tr = document.createElement('tr')

    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)

    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction, index){
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class=${CSSclass}>${amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img class="excluir" onclick="Transaction.remove(${index})" src="assets/minus.svg" alt=transação"></td>
    `
    return html
  },
  updateBalance(){
    document.getElementById("incomeDisplay")
    .innerHTML = Utils.formatCurrency(Transaction.incomes())

    document.getElementById("expenseDisplay")
    .innerHTML = Utils.formatCurrency(Transaction.expenses())

    document.getElementById("totalDisplay")
    .innerHTML = Utils.formatCurrency(Transaction.total())
  },
  clearTransactions(){
    DOM.transactionsContainer.innerHTML = ""
  }
}

//fazendo a formatacão do texto para o format BR: R$10,00
const Utils = {
  formatAmount(value){
    value = Number(value) * 100
    return Math.round(value)
  },

  formatDate(date){
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR",{
      style: "currency",
      currency:"BRL"
    })

    return signal + value
  }
}

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields(){
    const { description, amount, date } = Form.getValues()
    if(description.trim() === "" || amount.trim() === "" ||date.trim() === "" ){
      throw new Error("Por favor preencha todos os campos")
    }
  },

  formatValues(){
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  saveTransaction(transaction){
    Transaction.add(transaction)
  },

  clearFields(){
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event){
    event.preventDefault()
    try {
    //verificar se todas as informações foram preenchidas
    Form.validateFields()
    //formatar os dados para salvar
    const transaction = Form.formatValues()
    //salvar
    Form.saveTransaction(transaction)
    //apagar os dados do formulario
    Form.clearFields()
    //fechar modal
    Modal.close()
    //atualizar a aplicação
    } catch (error){
      alert(error.message)
    }
  }
}

const App = {
  init() {
    //for each significa para cada no inglês
    Transaction.all.forEach(DOM.addTransaction)

    DOM.updateBalance()
    
    Storage.set(Transaction.all)
  },

  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()

const tranformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

//dark mode 
const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window.getComputedStyle(element).getPropertyValue(style)


const initialColors = {
    bg: getStyle(html, "--bg"),
    bgTable: getStyle(html, "--bg-table"),
    bgText: getStyle(html, "--bg-text"),
    bgCard: getStyle(html, "--bg-card-white"),
    azul: getStyle(html, "--azul"),
    green: getStyle(html, "--green"),
    black: getStyle(html, "--black"),
}

const darkMode = {
    bg: "#222222",
    bgTable: "#434343",
    bgText: "white",
    bgCard: "#444444",
    azul:"#484848",
    green: "black",
    black: "#49AA26",
}
const changeColors = (colors) =>{
  Object.keys(colors).map(key =>
      html.style.setProperty(tranformKey(key),colors[key]))
}

checkbox.addEventListener("change", ({target}) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})