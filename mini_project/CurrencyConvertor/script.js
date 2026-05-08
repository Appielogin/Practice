const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".submit");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const icon = document.querySelector("#change");


for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOpt.selected = "selected";
        }else if(select.name === "to" && currCode === "INR") {
            newOpt.selected = "selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

icon.addEventListener("click", change)

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchange();
});

updateExchange = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value

    const URL = `${BASE_URL}/${from.value.toLowerCase()}.json`;
    try {
        let response = await fetch(URL);
        if(!response.ok) throw new Error("Failed to fetch Data. Try again later.");

        let data = await response.json();

        let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
        let finalAmt = amtVal * rate;
        msg.innerText = `${amtVal} ${from.value} = ${finalAmt} ${to.value}`
    } catch(err) {
        msg.innerText = "Failed to fetch exchange rate. Try again later. "
    }
}

window.addEventListener("load", () => {
    updateExchange();
});