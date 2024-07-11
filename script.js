const bill = document.querySelector('#bill');
const people = document.querySelector("#people");
const tipButtons = document.querySelectorAll("button[id^='tip']");
const total = document.querySelector("#total");
const ppAmount = document.querySelector("#perPerson");
const customTip = document.querySelector("#tipcustom");
const resetbtn = document.querySelector("#resetbtn");
const billParent = document.querySelector("#bill").parentElement;
const peopleParent = document.querySelector("#people").parentElement;
const billError = billParent.querySelector("#error");
const peopleError = peopleParent.querySelector("#error");

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

function showSuccess(parent, errorElement) {
    parent.classList.add("success");
    parent.classList.remove("failure");
    errorElement.style.opacity = "0";
}

function showError(parent, errorElement) {
    parent.classList.add("failure");
    parent.classList.remove("success");
    errorElement.style.opacity = "1";
}

function validate() {
    if (billVal <= 0) {
        showError(billParent, billError);
    } else {
        showSuccess(billParent, billError);
    }

    if (pepNo <= 0) {
        showError(peopleParent, peopleError);
    } else {
        showSuccess(peopleParent, peopleError);
    }
}

function billInpFn() {
    billVal = parseFloat(bill.value);
    if (isNaN(billVal) || billVal <= 0) {
        billVal = 0.00;
    }
    validate();
    calculateTip();
}

function pepInpFn() {
    pepNo = parseFloat(people.value);
    if (isNaN(pepNo) || pepNo <= 0) {
        pepNo = 1;
    }
    validate();
    calculateTip();
}

function handleClick(event) {
    // Resetting styles of tip buttons
    tipButtons.forEach(function (button) {
        button.style.backgroundColor = "";
        button.style.color = "";
    });

    // styles clicked button
    event.target.style.backgroundColor = "hsl(172, 67%, 45%)";
    event.target.style.color = "rgb(57, 56, 56)";

    tipValue = parseFloat(event.target.innerText) / 100;
    customTip.value = '';

    validate();
    calculateTip();
}

function tipInpFn() {
    // Reset styles buttons
    tipButtons.forEach(function (button) {
        button.style.backgroundColor = "";
        button.style.color = "";
    });

    // styles custom
    customTip.style.border = "1px solid hsl(172, 67%, 45%)";
    customTip.style.color = "rgb(57, 56, 56)";

    tipValue = parseFloat(customTip.value) / 100;
    validate();
    calculateTip();
}

function calculateTip() {
    if (pepNo >= 1) {
        let totalTip = tipValue * billVal;
        let tipPerPerson = totalTip / pepNo;

        total.innerText = "$" + totalTip.toFixed(2);
        ppAmount.innerText = "$" + tipPerPerson.toFixed(2);
    }

    resetbtn.style.backgroundColor = "hsl(172, 67%, 45%)";
}

function reset() {
    // Clear values
    bill.value = '';
    customTip.value = '';
    people.value = '';

    total.innerText = "$" + (0.0).toFixed(2);
    ppAmount.innerText = "$" + (0.0).toFixed(2);

    //clear styles
    tipButtons.forEach(function (button) {
        button.style.backgroundColor = "";
        button.style.color = "";
    });
    customTip.style.border = "";
    customTip.style.color = "";

    //reset display
    billVal = 0.00;
    pepNo = 1;
    tipValue = 0.00;
    resetbtn.style.backgroundColor = "";

    // Reset error/success
    billParent.classList.remove("success", "failure");
    peopleParent.classList.remove("success", "failure");
    billError.style.opacity = "0";
    peopleError.style.opacity = "0";
}
