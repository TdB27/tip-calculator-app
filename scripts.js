let inputBill = document.querySelector('#bill')
let buttonDataPercent = document.querySelectorAll('[data-percent]')
let buttonCustom = document.getElementById('custom')
let inputNumberPeople = document.querySelector('#people')
const hiddenBill = document.querySelector('#hiddenBill')
const hiddenPeople = document.querySelector('#hiddenPeople')

const resetTip = document.getElementById('tip-amountDisplay')
const resetTotal = document.getElementById('totalDisplay')
const resetButton = document.querySelector('.reset')

/* pegar os values dos elementos */
const getEl = {
  bill() {
    inputBill.onkeyup = function () {
      let inputBilly = Number(this.value)
      Validation.validateInput('bill')
      return inputBilly
    }
  },

  tip() {
    buttonCustom.onkeyup = function () {
      let buttonCustomPercent = this.value / 100
      return Res.totalCustom()
    }
    buttonCustom.addEventListener('click', () => {
      buttonCustom.value = ''
      Validation.validateInputForTip()
    })
  },

  people() {
    inputNumberPeople.onkeyup = function () {
      let numberPeople = Number(this.value)
      Validation.validateInput('people')
      return numberPeople
    }

    inputNumberPeople.addEventListener('click', () => {
      inputNumberPeople.value = ''
    })
  }
}

/* validar o campo inputNumberPeople */
const Validation = {
  validationField(value, index) {
    let count = 0
    let input = value.indexOf('.')

    while (input !== -1) {
      count++
      input = value.indexOf('.', input + 1)
    }

    if (index === 0) {
      if (count > 0) {
        hiddenBill.innerText = 'Only whole numbers'
        Validation.callIdHidden(index)
      } else if (value < 1) {
        hiddenBill.innerText = "Can't be zero or less"
        Validation.callIdHidden(index)
      } else {
        inputBill.classList.remove('no-validated')
        hiddenBill.classList.add('hidden')
      }
    }

    if (index === 1) {
      if (count > 0) {
        hiddenPeople.innerText = 'Only whole numbers'
        Validation.callIdHidden(index)
      } else if (value < 1) {
        hiddenPeople.innerText = "Can't be zero or less"
        Validation.callIdHidden(index)
      } else {
        inputNumberPeople.classList.remove('no-validated')
        hiddenPeople.classList.add('hidden')
      }
    }
  },

  validateInput(value) {
    if (value == 'bill') {
      let billInput = inputBill.value
      const index = 0
      Validation.validationField(billInput, index)
    }

    inputNumberPeople.onkeyup = function () {
      let inputNumber = inputNumberPeople.value
      const index = 1
      Validation.validationField(inputNumber, index)
    }
  },

  validateInputForTip() {
    if (inputBill.value === '') {
      hiddenBill.innerText = 'Enter a number'
      Validation.callIdHidden(0)
    } else if (inputBill.value < 1) {
      hiddenBill.innerText = "Can't be zero or less"
      Validation.callIdHidden(0)
    } else {
      inputBill.classList.remove('no-validated')
      hiddenBill.classList.add('hidden')
    }

    if (inputNumberPeople.value === '') {
      hiddenPeople.innerText = 'Enter a number'
      Validation.callIdHidden(1)
    } else if (inputNumberPeople.value < 1) {
      hiddenPeople.innerText = "Can't be zero or less"
      Validation.callIdHidden(1)
    } else {
      inputNumberPeople.classList.remove('no-validated')
      hiddenPeople.classList.add('hidden')
    }
  },

  callIdHidden(value) {
    if (value === 0) {
      inputBill.classList.add('no-validated')
      hiddenBill.classList.remove('hidden')
    }

    if (value === 1) {
      inputNumberPeople.classList.add('no-validated')
      hiddenPeople.classList.remove('hidden')
    }
  }
}

/* calcular os elementos */
const Res = {
  totalPercent(value) {
    let billValue = Number(inputBill.value)
    let peopleValue = Number(inputNumberPeople.value)
    const buttonPercent = value / 100

    // total por pessoa sem gorjeta
    let divisionBill = billValue / peopleValue

    // quantia da gorjeta
    let percentTip = divisionBill * buttonPercent
    let totalPerPersona = divisionBill + percentTip

    Validation.validateInputForTip()

    if (peopleValue > 0) {
      document.getElementById('tip-amountDisplay').innerHTML =
        Input.formatCurrency(percentTip)
      document.getElementById('totalDisplay').innerHTML =
        Input.formatCurrency(totalPerPersona)

      buttonDataPercent.forEach(item => {
        const itemPercentage = Number(item.getAttribute('data-percent'))

        if (itemPercentage === value) {
          item.classList.add('active')
        } else {
          item.classList.remove('active')
        }
      })

      buttonCustom.value = ''
      resetButton.classList.remove('empty')
    }
    return
  },

  totalCustom() {
    let billValue = Number(inputBill.value)
    let peopleValue = Number(inputNumberPeople.value)
    let inputCustomPercent = Number(buttonCustom.value) / 100

    // total por pessoa sem gorjeta
    let divisionBill = billValue / peopleValue
    // quantia da gorjeta
    let percentTip = divisionBill * inputCustomPercent
    // total por pessoa com a gorjeta
    let totalPerPersona = divisionBill + percentTip

    Validation.validateInputForTip()

    if (peopleValue >= 1) {
      resetTip.innerHTML = Input.formatCurrency(percentTip)
      resetTotal.innerHTML = Input.formatCurrency(totalPerPersona)

      Clean.cleanButton()
      resetButton.classList.remove('empty')
    }
    return
  }
}

const Input = {
  // formatar a moeda para dólar
  formatCurrency(value) {
    value = value.toLocaleString('en', {
      style: 'currency',
      currency: 'USD'
    })
    return value
  }
}

const Clean = {
  cleanButton() {
    buttonDataPercent.forEach(i => {
      i.classList.remove('active')
    })
  },

  reset() {
    inputBill.value = ''
    inputNumberPeople.value = ''
    this.cleanButton()
    buttonCustom.value = ''

    resetTip.innerHTML = '$0.00'
    resetTotal.innerHTML = '$0.00'

    resetButton.classList.add('empty')
  }
}

const App = {
  init() {
    getEl.bill()
    getEl.tip()
    getEl.people()
  }
}

App.init()
