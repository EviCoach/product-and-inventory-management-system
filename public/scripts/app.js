var updated = false;
function viewAll() {
    let $tableBody = $('<tbody id="table-body"></tbody>');
    $.get('http://localhost:3000/products', function (data, status) {
        for (let index = 0; index < data.length; index++) {
            let eachRow = $('<tr><th scope="row" id="' + data[index].id + '">'
                + data[index].id + '</th><td>' + data[index].name
                + '</td><td>&#8358;' + data[index].price + '</td><td>'
                + data[index].quantity
                + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
            $tableBody.append(eachRow);
        }
    });

    $("#table-body").replaceWith($tableBody);
}

async function deleteProduct(idToDelete) {
    await $.ajax({
        url: 'http://localhost:3000/products/' + idToDelete,
        error: function () {
            console.log('Error');
        },
        dataType: 'json',
        success: function (data) {
            console.log('deleted');
        },
        type: 'DELETE'
    });

    await viewAll();
}

function toUI() {
    updated = false;
    let searchOption = $('#search-options').val();
    let searchItem = $("#search-bar").val();
    let $searchResultBody = $('<tbody id="table-body"></tbody>');
    $.get('http://localhost:3000/products?' + searchOption + '=' + searchItem, (data, status) => {
        for (let index = 0; index < data.length; index++) {
            let eachRow = $('<tr><th scope="row" id="' + data[index].id
                + '">' + data[index].id
                + '</th><td>' + data[index].name + '</td><td>&#8358;'
                + data[index].price + '</td><td>'
                + data[index].quantity
                + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
            $searchResultBody.append(eachRow);
        }
    });

    $("#table-body").replaceWith($searchResultBody);

} // end of toUI

function toIDsearchUI() {
    updated = false;
    let searchItem = $("#search-bar").val();
    let $searchResultBody = $('<tbody id="table-body"></tbody>');

    $.get('http://localhost:3000/products/' + searchItem, (data, status) => {
        let searchResult = $('<tr><th scope="row" id="' + data.id + '">'
            + data.id
            + '</th><td>'
            + data.name + '</td><td>&#8358;' + data.price + '</td><td>'
            + data.quantity + '</td><td><button type="button" class="btn btn-sm btn-dark" data-toggle="modal" data-target="#deleteModal" id="del">Delete Product</button></td></tr>');
        $searchResultBody.append(searchResult);
        $("#table-body").replaceWith($searchResultBody);
    });
} // end of toIDsearchUI


// $(window).on('load', (e) => {
//     viewAll();
// });

$(document).ready(function () {
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

    const $deleteModal = $("#deleteModal");
    const $logOut = $("#log-out");
    var idToDelete = 0;


    // view all products
    $viewAll.on('click', e => {
        if (!updated) {
            viewAll();
            updated = true;
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
        viewAll();
    });


    // boosttrap show.bs.modal event
    $('#deleteModal').on('show.bs.modal', function (e) {
        idToDelete = $(e.relatedTarget)
            .parent().parent().children(0).attr("id");
    });

    // delete products
    $deleteBtn.on('click', e => {
        deleteProduct(idToDelete);
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
        viewAll();
        alert(obj[name] + ' added');
    });


    $search.on('click', e => {
        let searchOptions = $('#search-options').val();
        switch (searchOptions) {
            case 'id':
                toIDsearchUI();
                break;
            case 'name':
                toUI();
                break;
            case 'price':
                toUI();
                break;
            case 'quantity':
                toUI();
                break;
        }
    });
    $logOut.on('click', e => {
        location.replace("index.html");
        e.preventDefault();
    });
});
