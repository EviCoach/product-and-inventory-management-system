function newProduct() { }
function readAllProducts() { }
function updateProducts() { }
function deleteProducts() { }
function fetchOne() { }

$(document).ready(function () {
    
    let updated = false;

    const $viewAll = $("#view-all");

    // view all products
    $viewAll.on('click', e => {
        if (!updated) {
            $.get('http://localhost:3000/products', function (data, status) {
                for (let index = 0; index < data.length; index++) {
                    let eachRow = $('<tr><th scope="row">' + data[index].id + '</th><td>' + data[index].name + '</td><td>' + data[index].quantity + '</td><td>' + data[index].price + '</td><td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#deleteModal">Delete</button></td></tr>');
                    $("#table-body").append(eachRow);
                }

            });
            updated = !updated;
        }

    });

    // update product

});