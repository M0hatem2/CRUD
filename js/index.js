// DOM Elements
var title = document.getElementById('title');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var Discount = document.getElementById('Discount');
var count = document.getElementById('count');
var Category = document.getElementById('Category');
var total = document.getElementById('total');
var submit = document.getElementById('submit');

// Get Total
function getTotal() {
     if (price.value && taxes.value && ads.value && Discount.value) {
          var priceValue = parseFloat(price.value);
          var taxesValue = parseFloat(taxes.value);
          var adsValue = parseFloat(ads.value);
          var discountValue = parseFloat(Discount.value);

          var result = (priceValue + taxesValue + adsValue) - discountValue;
          total.innerHTML = `Total: ${result}`;
          total.style.color = 'green';
     } else {
          total.innerHTML = "Please fill all fields!";
          total.style.color = 'red';
     }
}
function validation(element) {
     var regex = {
          title: /^[A-Z][a-zA-Z]{1,100}/, // Alphanumeric and spaces, max length 100
          price: /^(?:[1-9]\d{0,5}|0)(?:\.\d{1,2})?$/, // Decimal number, max 6 digits before decimal, 2 after
          taxes: /^(?:[1-9]\d{0,5}|0)(?:\.\d{1,2})?$/, // Same as price
          ads: /^(?:[1-9]\d{0,5}|0)(?:\.\d{1,2})?$/, // Same as price
          discount: /^(?:[1-9]\d{0,5}|0)(?:\.\d{1,2})?$/, // Same as price
          count: /^(?:[1-9]|[1-9]\d{0,2})$/, // Positive integers, max 3 digits
          category: /^[a-zA-Z\s]{1,50}$/ // Alphabetic and spaces, max length 50
     };

     if (regex[element.id].test(element.value)) {
          element.classList.add('is-valid')
          element.classList.remove('is-invalid')
     }
     else {
          element.classList.remove('is-valid')
          element.classList.add('is-invalid')
     }


}
// Initialize Data
var dataproduct = localStorage.product ? JSON.parse(localStorage.product) : [];

// Create Product
submit.onclick = function () {
     if (!title.value || !price.value || !taxes.value || !ads.value || !Discount.value || !Category.value || !count.value || validation(title) && validation(price) && validation(taxes) && validation(ads) && validation(discount) && validation(count) && validation(category)) {
          alert("Please fill in all fields!");
          return;
     }


     var newProduct = {
          title: title.value,
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: Discount.value,
          count: count.value,
          category: Category.value,
          total: total.innerHTML
     };

     for (let i = 0; i < count.value; i++) {
          dataproduct.push(newProduct);
     }

     localStorage.setItem('product', JSON.stringify(dataproduct));
     clearInputs();
     showData();
     deleteAll();
};

// Show Data
function showData() {
     var tableContent = '';

     if (dataproduct.length === 0) {
          tableContent = `
        <tr>
            <td colspan="9" class="text-center fw-bolder text-warning">No data available</td>
        </tr>`;
     } else {
          for (var i = 0; i < dataproduct.length; i++) {
               tableContent += `
            <tr class="text-center">
                <td>${i + 1}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].taxes}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].category}</td>
                <td>
                    <button type="button" onclick="updateProduct(${i})" class="btn btn-warning btn-sm">Update</button>
                </td>
                <td>
                    <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>`;
          }
     }

     document.getElementById('tbody').innerHTML = tableContent;
}

// Update Product
function updateProduct(i) {
     var product = dataproduct[i];

     title.value = product.title;
     price.value = product.price;
     taxes.value = product.taxes;
     ads.value = product.ads;
     Discount.value = product.discount;
     Category.value = product.category;
     getTotal();

     submit.textContent = 'Update';
     submit.classList.add('btn-success');
     submit.classList.remove('btn-warning');

     submit.onclick = function () {
          dataproduct[i] = {
               title: title.value,
               price: price.value,
               taxes: taxes.value,
               ads: ads.value,
               discount: Discount.value,
               category: Category.value,
               total: total.innerHTML
          };

          localStorage.setItem('product', JSON.stringify(dataproduct));
          clearInputs();
          submit.textContent = 'Create';
          submit.classList.add('btn-warning');
          submit.classList.remove('btn-success');
          submit.onclick = this.onclick;
          showData();
     };
}

// Delete Product
function deleteProduct(i) {
     dataproduct.splice(i, 1);
     localStorage.setItem('product', JSON.stringify(dataproduct));
     showData();
     deleteAll();
}

// Delete All Products
function deleteAll() {
     if (dataproduct.length > 0) {
          document.getElementById('deleteAll').classList.add('d-block');
          document.getElementById('deleteAll').classList.remove('d-none');
     } else {
          document.getElementById('deleteAll').classList.remove('d-block');
          document.getElementById('deleteAll').classList.add('d-none');
     }
}

function deleteAllProduct() {
     dataproduct = [];
     localStorage.removeItem('product');
     showData();
     deleteAll();
}

// Clear Inputs
function clearInputs() {
     title.value = '';
     price.value = '';
     taxes.value = '';
     ads.value = '';
     Discount.value = '';
     count.value = '';
     Category.value = '';
     total.innerHTML = '';
}

// Search by Title
function searchDataTitle(value) {
     var tableContent = '';
     for (let i = 0; i < dataproduct.length; i++) {
          if (dataproduct[i].title.toLowerCase().includes(value.toLowerCase())) {
               tableContent += `
            <tr class="text-center">
                <td>${i + 1}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].taxes}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].category}</td>
                <td>
                    <button type="button" onclick="updateProduct(${i})" class="btn btn-warning btn-sm">Update</button>
                </td>
                <td>
                    <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>`;
          }
     }
     document.getElementById('tbody').innerHTML = tableContent || `<tr><td colspan="9" class="text-center fw-bolder text-warning">No matching data found</td></tr>`;
}

// Search by Category
function searchDataCategory(value) {
     var tableContent = '';
     for (let i = 0; i < dataproduct.length; i++) {
          if (dataproduct[i].category.toLowerCase().includes(value.toLowerCase())) {
               tableContent += `
            <tr class="text-center">
                <td>${i + 1}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].taxes}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].category}</td>
                <td>
                    <button type="button" onclick="updateProduct(${i})" class="btn btn-warning btn-sm">Update</button>
                </td>
                <td>
                    <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>`;
          }
     }
     document.getElementById('tbody').innerHTML = tableContent || `<tr><td colspan="9" class="text-center fw-bolder text-warning">No matching data found</td></tr>`;
}

// Event Listeners
document.getElementById('searchByTitle').addEventListener('keyup', function () {
     searchDataTitle(this.value);
});

document.getElementById('searchByCategory').addEventListener('keyup', function () {
     searchDataCategory(this.value);
});

// Initialize Table
showData();
deleteAll();