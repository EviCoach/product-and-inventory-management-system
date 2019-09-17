$(document).ready(function () {

    let updated = false;

    const $viewAll = $("#view-all");
    const $updateBtn = $("#update-btn");
    const $updateId = $("#update-id");
    const $updateName = $("#update-name");
    const $updatePrice = $("#update-price");
    const $updateQty = $("#update-quantity");
    const $deleteBtn = $("#delete-btn");
    const $del = $("#del");
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
            $.get('http://localhost:3000/products', function (data, status) {
                for (let index = 0; index < data.length; index++) {
                    let eachRow = $('<tr><th scope="row" id="' + data[index].id + '">' + data[index].id + '</th><td>' + data[index].name + '</td><td>' + data[index].quantity + '</td><td>' + data[index].price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                    $("#table-body").append(eachRow);
                }

            });
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
        idToDelete = $(e.relatedTarget).parent().parent().children(0).attr("id");
        console.log("Hi");
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
        return e.preventDefault();
    });




    // button to add products
    $addBtn.on('click', e => {
        console.log("add button working");
    })

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


        $viewAll.trigger('click');
        throw "Error";

    });


    $search.on('click', e => {
        let searchOptions = $('#search-options').val();
        switch (searchOptions) {
            case 'ID':
                let searchId = $searchBar.val();
                $.get('http://localhost:3000/products/' + searchId, (data, status) => {
                    let searchResult = $('<tr><th scope="row" id="' + data.id + '">'
                        + data.id
                        + '</th><td>'
                        + data.name + '</td><td>' + data.quantity + '</td><td>'
                        + data.price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                    $("#table-body").append(searchResult);

                });
                break;
            case 'Name':
                let searchName = $searchBar.val();

                $.get('http://localhost:3000/products?name=' + searchName, (data, status) => {
                    for (let index = 0; index < data.length; index++) {
                        let eachRow = $('<tr><th scope="row" id="' + data[index].id
                            + '">' + data[index].id
                            + '</th><td>' + data[index].name + '</td><td>'
                            + data[index].quantity + '</td><td>' + data[index].price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                        $("#table-body").append(eachRow);
                    }

                });
                break;
            case 'Price':
                let searchPrice = $searchBar.val();
                $.get('http://localhost:3000/products?price=' + searchPrice, (data, status) => {
                    for (let index = 0; index < data.length; index++) {
                        let eachRow = $('<tr><th scope="row" id="' + data[index].id + '">' + data[index].id + '</th><td>' + data[index].name + '</td><td>' + data[index].quantity + '</td><td>' + data[index].price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                        $("#table-body").append(eachRow);
                    }
                });
                break;
            case 'Quantity':
                let searchQuantity = $searchBar.val();
                $.get('http://localhost:3000/products?quantity=' + searchQuantity, (data, status) => {
                    for (let index = 0; index < data.length; index++) {
                        let eachRow = $('<tr><th scope="row" id="' + data[index].id + '">' + data[index].id + '</th><td>' + data[index].name + '</td><td>' + data[index].quantity + '</td><td>' + data[index].price + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
                        $("#table-body").replaceWidth(eachRow);
                    }
                });
                break;
        }
    });
});
