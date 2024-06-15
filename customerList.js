document.addEventListener("DOMContentLoaded",async(event)=>{
    event.preventDefault();
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = 'login.html';
    }
    const url = "http://localhost:8080/customer/getAll"
    const response = await fetch(url,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    function editRow(rowIndex) {
        const table = document.getElementById('myTable');
        const row = table.querySelector(`tr[data-row-index='${rowIndex}']`);
        const cells = row.querySelectorAll('td');

        cells.forEach(cell => {
            if (cell.dataset.header !== 'Actions' && cell.dataset.header !== 'uuid') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = cell.innerText;
                input.dataset.header = cell.dataset.header;
                cell.innerText = '';
                cell.appendChild(input);
            }
        });

        const actionCell = row.querySelector('td:last-child');
        actionCell.innerHTML = '';

        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.onclick = () => saveRow(rowIndex);

        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancel';
        cancelButton.onclick = () => cancelEdit(rowIndex);

        actionCell.appendChild(saveButton);
        actionCell.appendChild(cancelButton);
    }

    function saveRow(rowIndex) {
        const table = document.getElementById('myTable');
        const row = table.querySelector(`tr[data-row-index='${rowIndex}']`);
        const inputs = row.querySelectorAll('input');

        inputs.forEach(input => {
            const header = input.dataset.header;
            const cell = row.querySelector(`td[data-header='${header}']`);
            cell.innerText = input.value;
        });

        resetActionButtons(row, rowIndex);
    }

    function cancelEdit(rowIndex) {
        const table = document.getElementById('myTable');
        const row = table.querySelector(`tr[data-row-index='${rowIndex}']`);
        const inputs = row.querySelectorAll('input');

        inputs.forEach(input => {
            const cell = row.querySelector(`td[data-header='${input.dataset.header}']`);
            cell.innerText = input.value;
        });

        resetActionButtons(row, rowIndex);
    }

    function resetActionButtons(row, rowIndex) {
        const actionCell = row.querySelector('td:last-child');
        actionCell.innerHTML = '';

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = () => editRow(rowIndex);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteRow(rowIndex);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
    }

    async function deleteRow(rowIndex) {
        const table = document.getElementById('myTable');
        const row = table.querySelector(`tr[data-row-index='${rowIndex}']`);
        const id = row.cells[0].innerText;
        const url = `http://localhost:8080/customer/delete/${id}`;
        const response =await fetch(url,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        // const data = await response.json();
        // console.log(response);
        row.remove();
        alert(`Customer Deleted Successfully`);
    }

    // console.log(response);
    const body = await response.json();
    // console.log(body);
    const tableHeader = document.getElementById('tableHeader');
    
    const headers = Object.keys(body[0]);
    headers.push('Actions');
    // console.log(headers);
    headers.forEach(header =>{
        const th = document.createElement('th');
        th.innerText = header;
        tableHeader.appendChild(th);
    })
    body.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        tr.dataset.rowIndex = rowIndex;

        headers.forEach(header => {
            const td = document.createElement('td');
            td.dataset.header = header;

            if (header === 'Actions') {
                // Create edit and delete buttons
                const editButton = document.createElement('button');
                editButton.innerText = 'Edit';
                editButton.onclick = () => editRow(rowIndex);

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.onclick = () => deleteRow(rowIndex);

                td.appendChild(editButton);
                td.appendChild(deleteButton);
            } else {
                td.innerText = row[header] || ''; // Fill cell with data or empty string
            }
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
    const createTable = function(body){
        const tableBody = document.getElementById('tableBody');
       tableBody.innerHTML = '';
       const tableHeader = document.getElementById('tableHeader');
       tableHeader.innerHTML = '';

        const headers = Object.keys(body[0]);
        headers.push('Actions');
        console.log(headers);
        headers.forEach(header =>{
            const th = document.createElement('th');
            th.innerText = header;
            tableHeader.appendChild(th);
        });
        body.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            tr.dataset.rowIndex = rowIndex;
    
            headers.forEach(header => {
                const td = document.createElement('td');
                td.dataset.header = header;
    
                if (header === 'Actions') {
                    // Create edit and delete buttons
                    const editButton = document.createElement('button');
                    editButton.innerText = 'Edit';
                    editButton.onclick = () => editRow(rowIndex);
    
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Delete';
                    deleteButton.onclick = () => deleteRow(rowIndex);
    
                    td.appendChild(editButton);
                    td.appendChild(deleteButton);
                } else {
                    td.innerText = row[header] || ''; // Fill cell with data or empty string
                }
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    const items = document.querySelectorAll("a");
    // console.log(items);
    items.forEach((item)=>(
        item.addEventListener('click',()=>{
            let btn = document.getElementById('dropbtn');
            btn.innerText = item.innerText;
        })
    ))
    const search = document.getElementById('search');
    search.addEventListener('click',async (event)=>{
        event.preventDefault();
        const btn = document.getElementById('dropbtn').innerText;
        
        const input = document.getElementById('searchbar').value;
        
        if(btn === 'Dropdown'){
            const url = "http://localhost:8080/customer/getById/"+input;
            const response = await fetch(url,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            createTable(data);
            // console.log(data);
        }
        else{
            const url = `http://localhost:8080/customer/getBy${btn}/${input}`;
            const response = await fetch(url,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            console.log(data);
            createTable(data);
        }

    })
    const add = document.getElementById('add');
    add.addEventListener('click',()=>{
        window.location.href = 'addCustomer.html'
    });
    const sync = document.getElementById('sync');
    sync.addEventListener('click',async(event)=>{
        event.preventDefault();
        const table = document.getElementById('myTable');
        const headers = table.querySelectorAll('thead th');
        const rows = table.querySelectorAll('tbody tr');
        const data = [];
        rows.forEach(row =>{
            const cells = row.querySelectorAll('td');
            const rowObject = {};
            headers.forEach((header,index) =>{
                const key = header.innerText;
                const data = cells[index].innerText;
                rowObject[key] = data;
            })
            data.push(rowObject)
            
        })
      
        const url = 'http://localhost:8080/customer/updateList';
        const response = await fetch(url,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(data)
        })
        
       if(response.ok){
        alert("Customer List Saved");
       }
    })
});