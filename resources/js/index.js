const importButton = document.querySelector('#import');
const selectElement = document.querySelector('#filter-select');
const tableWrapper = document.querySelector('.index-table-wrapper');
const tableBody = tableWrapper.querySelector('.index-table tbody');
const prevButton = tableWrapper.querySelector('.prev');
const nextButton = tableWrapper.querySelector('.next');
const rowsPerPage = 5;
let totalPages = 5;

importButton.addEventListener('click', function () {
    fetch('/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const dataset = data.data;
            let currentPage = 0;

            renderRows(dataset, currentPage, selectElement.value);


            prevButton.addEventListener('click', function () {
                if (currentPage > 0) {
                    currentPage--;
                    renderRows(dataset, currentPage, selectElement.value);
                }
            });

            nextButton.addEventListener('click', function () {
                if (currentPage < totalPages - 1) {
                    currentPage++;
                    renderRows(dataset, currentPage, selectElement.value);
                }
            });

            selectElement.addEventListener('change', function () {
                currentPage = 0;
                renderRows(dataset, currentPage, selectElement.value);
            });


        })
        .catch(error => console.error(error));
});

function renderRows(dataset, currentPage, filterValue) {
    let filteredDataset = dataset;

    if (filterValue.trim() !== 'all') {
        filteredDataset = dataset.filter(function (item) {
            return item.fulfillment_status.includes(filterValue);
        });
    }

    totalPages = Math.ceil(filteredDataset.length / rowsPerPage);

    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    if (startIndex === 0) {
        prevButton.setAttribute("disabled", true);
    } else {
        prevButton.removeAttribute("disabled");
    }
    if (endIndex >= filteredDataset.length) {
        nextButton.setAttribute("disabled", true);
    } else {
        nextButton.removeAttribute("disabled");
    }

    const itemsPerPage = tableWrapper.querySelector('.items-per-page');
    itemsPerPage.innerHTML = endIndex >= filteredDataset.length ? filteredDataset.length : endIndex;

    const totalItems = tableWrapper.querySelector('.total-items');
    totalItems.innerHTML = filteredDataset.length;

    tableBody.innerHTML = '';

    for (let i = startIndex; i < endIndex; i++) {
        const item = filteredDataset[i];
        if (item !== undefined) {
            const row = document.createElement('tr');
            row.innerHTML = `
          <td>${item.customer_name}</td>
          <td>${item.customer_email}</td>
          <td>${item.total_price}</td>
          <td>${item.financial_status}</td>
          <td>${item.fulfillment_status}</td>
        `;
            tableBody.appendChild(row);
        }
    }
}
