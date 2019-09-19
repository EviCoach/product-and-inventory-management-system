function viewAll() {
    let $tableBody = $('<tbody id="table-body"></tbody>');
    $.get('http://localhost:3000/products', function (data, status) {
        for (let index = 0; index < data.length; index++) {
            let eachRow = $('<tr><th scope="row" id="' + data[index].id + '">'
                + data[index].id + '</th><td>' + data[index].name
                + '</td><td>' + data[index].price + '</td><td>'
                + data[index].quantity
                + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
            $tableBody.append(eachRow);
        }
    });

    $("#table-body").replaceWith($tableBody);
}

$(window).on('load', (e) => {
    viewAll();
});

$(document).ready(function () {

    let updated = false;

    const $viewAll = $("#view-all");
    const $updateBtn = $("#update-btn");
    const $updateId = $("#update-id");
    const $updateName = $("#update-name");
    const $updatePrice = $("#update-price");
    const $updateQty = $("#update-quantity");
    const $deleteBtn = $("#delete-btn");
    const $addBtn = $("#add-btn");
    const $dialogAdd = $("#add-pr");
    const $addName = $("#add-name");
    const $addQty = $("#add-quantity");
    const $addPrice = $("#add-price")
    const $search = $("#search");
    const $searchBar = $("#search-bar");
    const $deleteModal = $("#deleteModal");
    let idToDelete = 0;


    // view all products
    $viewAll.on('click', e => {
        if (!updated) {
            viewAll();
            updated = !updated;
        }
    });

    // update product
    $updateBtn.on('click', e => {
        let id = $updateId.attr("name");
        let name = $updateName.attr("name");
        let price = $updatePrice.attr("name");
        let quantity = $updateQty.attr("name");

        let obj = {};
        obj[id] = $updateId.val();
        obj[name] = $updateName.val();
        obj[price] = $updatePrice.val();
        obj[quantity] = $updateQty.val();

        // issue: how to update only values that are given
        $.ajax({
            url: 'http://localhost:3000/products/' + obj[id],
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
    });


    // boosttrap show.bs.modal event
    $('#deleteModal').on('show.bs.modal', function (e) {
        idToDelete = $(e.relatedTarget)
            .parent().parent().children(0).attr("id");
    });

    // delete products
    $deleteBtn.on('click', e => {
        $.ajax({
            url: 'http://localhost:3000/products/' + idToDelete,
            error: function () {
                console.log('Error');
            },
            dataType: 'json',
            success: function (data) {
                console.log('success');
            },
            type: 'DELETE'
        });
    });


    // add products
    $dialogAdd.on('click', e => {

        let obj = {};
        let name = $addName.attr("name");
        let price = $addPrice.attr("name");
        let quantity = $addQty.attr("name");

        obj[name] = $addName.val();
        obj[price] = $addPrice.val();
        obj[quantity] = $addQty.val();

        $.ajax({
            url: 'http://localhost:3000/products',
            data: obj,
            error: function () {
                console.log('Error');
            },
            dataType: 'json',
            success: function (data) {
                console.log('success');
            },
            type: 'POST'
        });
        updated = false;
    });


    $search.on('click', e => {
        let searchOptions = $('#search-options').val();
        switch (searchOptions) {
            case 'ID':
                let searchId = $searchBar.val();
                let $searchResultBody = $('<tbody id="table-body"></tbody>');

                $.get('http://localhost:3000/products/' + searchId, (data, status) => {
                    let searchResult = $('<tr><th scope="row" id="' + data.id + '">'
                        + data.id
                        + '</th><td>'
                        + data.name + '</td><td>' + data.quantity + '</td><td>'
                        + data.price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                    $searchResultBody.append(searchResult);
                    $("#table-body").replaceWith($searchResultBody);

                });
                break;
            case 'Name':
                let searchName = $searchBar.val();
                let $searchByNameResultBody = $('<tbody id="table-body"></tbody>');
                $.get('http://localhost:3000/products?name=' + searchName, (data, status) => {
                    for (let index = 0; index < data.length; index++) {
                        let eachRow = $('<tr><th scope="row" id="' + data[index].id
                            + '">' + data[index].id
                            + '</th><td>' + data[index].name + '</td><td>'
                            + data[index].quantity + '</td><td>' + data[index].price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                        $searchByNameResultBody.append(eachRow);
                    }
                    $("#table-body").replaceWith($searchByNameResultBody);


                });
                break;
            case 'Price':
                let searchPrice = $searchBar.val();
                let $searchByPriceResultBody = $('<tbody id="table-body"></tbody>');

                $.get('http://localhost:3000/products?price=' + searchPrice, (data, status) => {
                    for (let index = 0; index < data.length; index++) {
                        let eachRow = $('<tr><th scope="row" id="' + data[index].id + '">' + data[index].id + '</th><td>' + data[index].name + '</td><td>' + data[index].quantity + '</td><td>' + data[index].price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                        $searchByPriceResultBody.append(eachRow);
                    }
                    $("#table-body").replaceWith($searchByPriceResultBody);

                });
                break;
            case 'Quantity':
                let searchQuantity = $searchBar.val();
                let $searchByQuantityResultBody = $('<tbody id="table-body"></tbody>');

                $.get('http://localhost:3000/products?quantity=' + searchQuantity, (data, status) => {
                    for (let index = 0; index < data.length; index++) {
                        let eachRow = $('<tr><th scope="row" id="' + data[index].id + '">' + data[index].id + '</th><td>' + data[index].name + '</td><td>' + data[index].quantity + '</td><td>' + data[index].price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                        $searchByQuantityResultBody.append(eachRow);
                    }
                    $("#table-body").replaceWidth($searchByQuantityResultBody);

                });
                break;
        }
    });
});
