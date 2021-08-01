let inputBill = document.querySelector('#bill')
const button5 = document.getElementById('5%')
const button10 = document.getElementById('10%')
const button15 = document.getElementById('15%')
const button25 = document.getElementById('25%')
const button50 = document.getElementById('50%')
let buttonCustom = document.getElementById('custom')
let inputNumberPeople = document.querySelector('#people')
let hidden = document.querySelector('.number-people #hidden')

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
  },

  people() {
    inputNumberPeople.onkeyup = function () {
      let numberPeople = Number(this.value)
      //console.log(numberPeople)
      ValidationNumberPeolple.validateInput()
      return numberPeople
    }
  }
}

/* validar o campo inputNumberPeople */
const ValidationNumberPeolple = {
  validateInput() {
    inputNumberPeople.onkeydown = function (e) {
      /* const keyNumber =  e.keyCode > 47 && e.keyCode < 58 || e.keyCode > 95 && e.keyCode < 106
            const deleteNumber = e.keyCode == 8 || e.keyCode == 46
            const otherSignals = e.keyCode == 110 || e.keyCode == 194 */

      // filtrar os sinais de pontuação ( ',' ou '.' ) dentro do input
      // no console a ',' = '.'
      // e verificar se o valor do input é maior que 0
      let inputNumber = inputNumberPeople.value
      let count = 0
      let input = inputNumber.indexOf('.')

      while (input !== -1) {
        count++
        input = inputNumber.indexOf('.', input + 1)
      }
      if (count > 0) {
        hidden.innerText = 'Only whole numbers'
        inputNumberPeople.classList.add('no-validated')
        hidden.classList.remove('hidden')
      } else if (inputNumber < 1) {
        hidden.innerText = "Can't be zero"
        inputNumberPeople.classList.add('no-validated')
        hidden.classList.remove('hidden')
      } else {
        inputNumberPeople.classList.remove('no-validated')
        hidden.classList.add('hidden')
      }

      return
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

    if (peopleValue > 0) {
      document.getElementById('tip-amountDisplay').innerHTML =
        Input.formatCurrency(percentTip)
      document.getElementById('totalDisplay').innerHTML =
        Input.formatCurrency(totalPerPersona)

      document.querySelectorAll('[data-percent]').forEach(item => {
        const itemPercentage = Number(item.getAttribute('data-percent'))

        if (itemPercentage === value) {
          item.classList.add('active')
        } else {
          item.classList.remove('active')
        }
      })

      buttonCustom.value = ''
      document.querySelector('.reset').classList.remove('empty')
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

    if (peopleValue >= 1) {
      document.getElementById('tip-amountDisplay').innerHTML =
        Input.formatCurrency(percentTip)
      document.getElementById('totalDisplay').innerHTML =
        Input.formatCurrency(totalPerPersona)
      button5.classList.remove('active')
      button10.classList.remove('active')
      button15.classList.remove('active')
      button25.classList.remove('active')
      button50.classList.remove('active')
      document.querySelector('.reset').classList.remove('empty')
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
    document.getElementById('5%').classList.remove('active')
    document.getElementById('10%').classList.remove('active')
    document.getElementById('15%').classList.remove('active')
    document.getElementById('25%').classList.remove('active')
    document.getElementById('50%').classList.remove('active')
  },

  reset() {
    let resetTip = document.getElementById('tip-amountDisplay')
    let resetTotal = document.getElementById('totalDisplay')

    inputBill.value = ''
    inputNumberPeople.value = ''
    button5.classList.remove('active')
    button10.classList.remove('active')
    button15.classList.remove('active')
    button25.classList.remove('active')
    button50.classList.remove('active')
    buttonCustom.value = ''

    resetTip.innerHTML = '$0.00'
    resetTotal.innerHTML = '$0.00'

    document.querySelector('.reset').classList.add('empty')

    return
  }
}

//getEl.bill()
getEl.tip()
getEl.people()
