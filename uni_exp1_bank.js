let balance = 1000;

function deposit() {
    const amount = Number(document.getElementById("amount").value);
    const message = document.getElementById("message");

    if (amount <= 0) {
        message.style.color = "red";
        message.textContent = "Enter a valid deposit amount";
        return;
    }

    balance += amount;
    document.getElementById("balance").textContent = balance;
    message.style.color = "green";
    message.textContent = `₹${amount} deposited successfully`;
}

function withdraw() {
    const amount = Number(document.getElementById("amount").value);
    const message = document.getElementById("message");

    if (amount <= 0) {
        message.style.color = "red";
        message.textContent = "Enter a valid withdrawal amount";
        return;
    }

    if (amount > balance) {
        message.style.color = "red";
        message.textContent = "Insufficient balance";
        return;
    }

    balance -= amount;
    document.getElementById("balance").textContent = balance;
    message.style.color = "green";
    message.textContent = `₹${amount} withdrawn successfully`;
}
