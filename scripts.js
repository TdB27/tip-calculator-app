let inputBill = document.querySelector('#bill')
let buttonDataPercent = document.querySelectorAll('[data-percent]')
let buttonCustom = document.getElementById('custom')
let inputNumberPeople = document.querySelector('#people')
const hidden = document.querySelector('.number-people #hidden')

const resetTip = document.getElementById('tip-amountDisplay')
const resetTotal = document.getElementById('totalDisplay')
const resetButton = document.querySelector('.reset')

/* pegar os values dos elementos */
const getEl = {
  bill() {
    inputBill.onkeyup = function () {
      let inputBilly = Number(this.value)
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
      ValidationNumberPeolple.validateInputForTip()
    })
  },

  people() {
    inputNumberPeople.onkeyup = function () {
      let numberPeople = Number(this.value)
      ValidationNumberPeolple.validateInput()
      return numberPeople
    }

    inputNumberPeople.addEventListener('click', () => {
      inputNumberPeople.value = ''
    })
  }
}

/* validar o campo inputNumberPeople */
const ValidationNumberPeolple = {
  validateInput() {
    inputNumberPeople.onkeyup = function () {
      let inputNumber = inputNumberPeople.value
      let count = 0
      let input = inputNumber.indexOf('.')

      while (input !== -1) {
        count++
        input = inputNumber.indexOf('.', input + 1)
      }
      if (count > 0) {
        hidden.innerText = 'Only whole numbers'
        ValidationNumberPeolple.callIdHidden()
      } else if (inputNumber < 1) {
        hidden.innerText = "Can't be zero or less"
        ValidationNumberPeolple.callIdHidden()
      } else {
        inputNumberPeople.classList.remove('no-validated')
        hidden.classList.add('hidden')
      }

      return
    }
  },

  validateInputForTip() {
    if (inputNumberPeople.value === '') {
      hidden.innerText = 'Enter a number'
      ValidationNumberPeolple.callIdHidden()
    } else if (inputNumberPeople.value < 1) {
      hidden.innerText = "Can't be zero or less"
      ValidationNumberPeolple.callIdHidden()
    } else {
      inputNumberPeople.classList.remove('no-validated')
      hidden.classList.add('hidden')
    }
  },

  callIdHidden() {
    inputNumberPeople.classList.add('no-validated')
    hidden.classList.remove('hidden')
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

    ValidationNumberPeolple.validateInputForTip()

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

    ValidationNumberPeolple.validateInputForTip()

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

getEl.tip()
getEl.people()
