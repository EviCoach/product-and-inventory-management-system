$(document).ready(function () {

    let updated = false;

    const $viewAll = $("#view-all");
    const $updateBtn = $("#update-btn");
    const $updateId = $("#update-id");
    const $updateName = $("#update-name");
    const $updatePrice = $("#update-price");
    const $updateQty = $("#update-quantity");


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
    $updateBtn.on('click', e => {
        let id = $updateId.attr("id");
        let name = $updateName.attr("name");
        let price = $updatePrice.attr("price");
        let quantity = $updateQty.val("quantity");

        let obj = {};
        obj[id] = $updateId.val();
        obj[name] = $updateName.val();
        obj[price] = $updatePrice.val();
        obj[quantity] = $updatedQty.val();

        // $.post('http://localhost:3000/products/1', obj, (data, status) => {
        //     console.log(data);
        // });
        $.ajax({
            url: 'http://localhost:3000/products/1',
            data: obj,
            error: function () {
                console.log('Error');
            },
            dataType: 'json',
            success: function (data) {
                console.log('success');
            },
            type: 'PUT'
        });
        updated = false;
        e.preventDefault();
        e.stopPropagation();
    });


});