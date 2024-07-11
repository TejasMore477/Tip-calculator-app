const bill = document.querySelector('#bill');
const people = document.querySelector("#people");
const tipButtons = document.querySelectorAll("button[id^='tip']");
const total = document.querySelector("#total");
const ppAmount = document.querySelector("#perPerson");
const customTip = document.querySelector("#tipcustom");


let billVal = 0.00;
let pepNo = 1;
let tipValue = 0.00;

bill.placeholder = billVal.toFixed(2);
people.placeholder = pepNo;

bill.addEventListener("input", billInpFn);
people.addEventListener("input", pepInpFn);
tipButtons.forEach(function (button) {
    button.addEventListener("click", handleClick);
});
customTip.addEventListener("input", tipInpFn);

function billInpFn() {
    billVal = parseFloat(bill.value);
    if (isNaN(billVal) || billVal <= 0) {
        billVal = 0.00;
    }
    calculateTip();
}

function pepInpFn() {
    pepNo = parseFloat(people.value);
    if (isNaN(pepNo) || pepNo <= 0) {
        pepNo = 1;
    }
    calculateTip();
}

function handleClick(event) {
    tipButtons.forEach(function (button) {
        button.style.backgroundColor = "";
        button.style.color = "";
    });

    event.target.style.backgroundColor = "hsl(172, 67%, 45%)";
    event.target.style.color = "rgb(57, 56, 56)";

    tipValue = parseFloat(event.target.innerText) / 100;
    customTip.value = ''; 
    calculateTip();
}

function tipInpFn() {
    tipButtons.forEach(function (button) {
        button.style.backgroundColor = "";
        button.style.color = "";
    });

    customTip.style.border = "1px solid hsl(172, 67%, 45%)";
    customTip.style.color = "rgb(57, 56, 56)";
    tipValue = parseFloat(customTip.value) / 100;
    calculateTip();
}

function calculateTip() {
    if (pepNo >= 1) {
        let totalTip = tipValue * billVal;
        let tipPerPerson = totalTip / pepNo;
        total.innerText = "$" + totalTip.toFixed(2);
        ppAmount.innerText = "$" + tipPerPerson.toFixed(2);
    }
}

function reset() {
    bill.value = '';
    customTip.value = '';
    people.value = '';
    total.innerText = "$" + (0.0).toFixed(2);
    ppAmount.innerText = "$" + (0.0).toFixed(2);
    tipButtons.forEach(function (button) {
        button.style.backgroundColor = "";
        button.style.color = "";
    });
    customTip.style.border = "";
    customTip.style.color = "";
    billVal = 0.00;
    pepNo = 1;
    tipValue = 0.00;
}








































