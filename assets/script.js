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
        <td class="amount">0.00</td><br><br>
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
    const sgst = parseFloat(row.cells[3].children[0].value);
    const cgst = parseFloat(row.cells[4].children[0].value);
    const cess = parseFloat(row.cells[5].children[0].value);
    const amount = qty * rate + (qty * rate * sgst / 100) + (qty * rate * cgst / 100) + (qty * rate * cess / 100);
    row.cells[6].innerText = amount.toFixed(2);
    updateTotal();
}

function updateTotal() {
    let subTotal = 0;
    const amounts = document.querySelectorAll('.amount');
    amounts.forEach(amount => {
        subTotal += parseFloat(amount.innerText);
    });
    document.getElementById('sub-total').innerText = subTotal.toFixed(2);
    document.getElementById('total').innerText = subTotal.toFixed(2);
}

document.addEventListener('DOMContentLoaded', addItem);
