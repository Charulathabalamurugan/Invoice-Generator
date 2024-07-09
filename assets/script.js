function addItem() {
    const table = document.getElementById('invoice-items');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Enter item name/description"></td>
        <td><input type="number" value="1" onchange="updateAmount(this)"></td>
        <td><input type="number" value="0.00" onchange="updateAmount(this)"></td>
        <td><input type="number" value="0" onchange="updateAmount(this)"></td>
        <td><input type="number" value="0" onchange="updateAmount(this)"></td>
        <td><input type="number" value="0" onchange="updateAmount(this)"></td>
        <td class="amount">0.00</td>
        <td><span class="remove-item" onclick="removeItem(this)">&#x2716;</span></td>
    `;
    table.appendChild(row);
    updateTotal();
}

function removeItem(element) {
    const row = element.parentElement.parentElement;
    row.remove();
    updateTotal();
}

function updateAmount(element) {
    const row = element.parentElement.parentElement;
    const qty = parseFloat(row.cells[1].children[0].value);
    const rate = parseFloat(row.cells[2].children[0].value);
    const sgstRate = parseFloat(row.cells[3].children[0].value);
    const cgstRate = parseFloat(row.cells[4].children[0].value);
    const cessRate = parseFloat(row.cells[5].children[0].value);

    const amount = qty * rate;
    row.cells[6].innerText = amount.toFixed(2);

    updateTotal();
}

function updateTotal() {
    let subTotal = 0;
    let totalSGST = 0;
    let totalCGST = 0;
    let totalCess = 0;
    const amounts = document.querySelectorAll('.amount');
    amounts.forEach(amount => {
        const row = amount.parentElement;
        const qty = parseFloat(row.cells[1].children[0].value);
        const rate = parseFloat(row.cells[2].children[0].value);
        const sgstRate = parseFloat(row.cells[3].children[0].value);
        const cgstRate = parseFloat(row.cells[4].children[0].value);
        const cessRate = parseFloat(row.cells[5].children[0].value);

        const amountValue = qty * rate;
        subTotal += amountValue;

        totalSGST += (amountValue * sgstRate) / 100;
        totalCGST += (amountValue * cgstRate) / 100;
        totalCess += (amountValue * cessRate) / 100;
    });

    document.getElementById('sub-total').innerText = subTotal.toFixed(2);
    document.getElementById('total-sgst').innerText = totalSGST.toFixed(2);
    document.getElementById('total-cgst').innerText = totalCGST.toFixed(2);
    document.getElementById('total-cess').innerText = totalCess.toFixed(2);
    document.getElementById('total').innerText = (subTotal + totalSGST + totalCGST + totalCess).toFixed(2);
}

document.addEventListener('DOMContentLoaded', addItem);