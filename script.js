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
const transactions = [
  // Aqui nós colocamos os dados no JS
  {
    id: 1, 
    description: 'Luz', 
    amount: -50000, 
    date: '20/01/2021',
  },
  {
    id: 2, 
    description: 'Website', 
    amount: 5000000, 
    date: '23/01/2021',
  },
  {
    id: 1, 
    description: 'Internet', 
    amount: -20000, 
    date: '26/01/2021',
  },

]
const Transaction = {
  incomes(){
    // Somar as entradas
  },
  expenses(){
    // Somar as saídas
  },
  total(){
    // Entradas menos saídas
  }
}
// Substituir os dados do HTML com os dados do JS
const DOM = {
  addTransaction(transaction, index){
    const tr = document.createElement("tr")
    tr.innerHTML = DOM.innerHTMLTransaction(transaction) 
  },
  innerHTMLTransaction(transaction){
    
    const html = `
      <td class="description">Luz</td>
      <td class="expense">-R$ 500,00</td>
      <td class="date">20/01/2021</td>
      <td><img src="assets/minus.svg" alt=transação"></td>
    `
    return html
  }
}
DOM.addTransaction(transactions[0])