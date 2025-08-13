let selectedBillId = null;
// Global variable to use when we need to update a bill.

// This event is to use a form to create a bill.
const modalForm = document.getElementById('modalForm');
modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Fetch to get all bills.
    const billsResponse = await fetch(`http://localhost:9000/api/bills`);
    const bills = await billsResponse.json();

    let id = 'FAC' + bills.length + '00';
    // Create a new id using a format.

    const formData = new FormData(modalForm);
    let data = {};
    // Crate an data object so save all the form inputs.
    data['id'] = id;

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    
    // Fetch to get all customers.
    const customerResponse = await fetch(`http://localhost:9000/api/customers/${data.id_customer}`);
    const customer = await customerResponse.json();

    data['id_customer'] = customer.id;

    // POST to create a new bill.
    try {
        const response = await fetch(`http://localhost:9000/api/bills`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        renderTable();
        modalForm.reset();

    } catch (error) {
        console.error('Error creating appointment:', error);
    }
});

// This event is to use a form to update a bill, only Amount Billed and Amount Paid.

const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const billResponse = await fetch (`http://localhost:9000/api/bills/${selectedBillId}`);
    const bill = await billResponse.json();

    const formData = new FormData(updateForm);
    let data = {};

    data['id'] = bill.id;
    data['billing_period'] = bill.billing_period;

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    data['id_customer'] = bill.id_customer;
    
    try {
        const response = await fetch(`http://localhost:9000/api/bills`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        renderTable();

    } catch (error) {
        console.error('Error updating bill:', error);
    }
});

// This event is to obtain dataset id to use that to, delete and update.

document.addEventListener("click", async (e) => {

    const deleteBtn = e.target.closest("button[title='Delete']");
    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        if (confirm("¿Are you sure to delete the appointment?")) {
            try {
                const response = await fetch(`http://localhost:9000/api/bills/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                renderTable();
            } catch (error) {
                console.error('Error deleting bill:', error);
            }
        }
    }


    const editBtn = e.target.closest("button[title='Edit']");
    if (editBtn) {
        const id = editBtn.dataset.id;
        
        selectedBillId = id; 
        // With the id we can give the values to the form.
        try {
            
            const responseBill = await fetch(`http://localhost:9000/api/bills/${id}`);
            const bill = await responseBill.json();
            
            document.getElementById('updateAmount_billed').value = bill.amount_billed;
            document.getElementById('UpdateAmount_paid').value = bill.amount_paid;

        } catch (error) {
            console.error('Error loading appointment:', error);
        }
    }
});

// This function is to render the dashboard table about bills adding the buttons to delete and update and giving the dataset id to use it

async function renderTable() {
    const tableBody = document.getElementById('tableBody');

    tableBody.innerHTML = ``;

    const response = await fetch(`http://localhost:9000/api/bills`);
    const bills = await response.json();

    bills.forEach(bill => {
        tableBody.innerHTML += `
            <tr>
                <td>${bill.id}</td>
                <td>${bill.billing_period.substring(0,7)}</td>
                <td>${bill.amount_billed}</td>
                <td>${bill.amount_paid}</td>
                <td>${bill.customer_name}</td>
                <td>${bill.email}</td>
                <td>
                    <button class="btn btn-sm btn-warning" title="Edit" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="${bill.id}">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" title="Delete" data-id="${bill.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `
    });
}

renderTable();