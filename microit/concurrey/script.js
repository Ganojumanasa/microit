const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const swapButton = document.getElementById("swap");

const currencies = ["USD", "EUR", "INR", "JPY", "GBP", "CAD", "AUD", "CNY"];

// Populate dropdowns
currencies.forEach(curr => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = curr;
  option1.text = option2.text = curr;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    result.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    result.innerText = "Error fetching exchange rates.";
    console.error(err);
  }
}

swapButton.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
});
