angular.module('productApp', ['ui.bootstrap', 'ngResource']).controller('productController', function ($scope, $http) {
    $scope.getProducts = function () {
        $http.get('/api/Products')
        .then(function successCallback(response) {
            $scope.products = response.data;
            $scope.totalItems = $scope.products.length;
            $scope.currentPage = 1;
            $scope.numPerPage = 10;

            $scope.paginate = function (value) {
                var begin, end, index;
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.products.indexOf(value);
                return (begin <= index && index < end);
            };
            $scope.orderByField = "ProductId";
            $scope.reverseSort = false;
        })
        .catch(function errorCallback(response) {
            console.log('An error occurred loading products');
        });
    };

    $scope.getProduct = function (id) {
        $http.get('/api/Products/' + id)
        .then(function successCallback(response) {
            $scope.product = response.data;
        })
        .catch(function (response) {
            console.log('An error occurred loading product');
        });
    };

    $scope.addProduct = function (product) {
        $http.post('/api/Products',
            {
                'Category': product.Category,
                'Name': product.Name,
                'UnitsInStock': product.UnitsInStock,
                'UnitPrice': product.UnitPrice,
            })
        .then(function (data) {

            $('#addModal').modal('hide');
            $scope.products.push(product);
            $http.get('/api/Products')
            .then(function (response) {
                $scope.products = response.data;
            })
            .catch(function (data) {
                console.log('An error occurred adding product');
            });
        });
        alert('Product added successfully');
    };

    $scope.editProduct = function (product) {
        $http.get('/api/Products/' + product.ProductId)
        .then(function (response) {
            $scope.product = response.data;
        })
        .catch(function (response) {
            console.log('An error occurred loading product');
        });
        $scope.Category = product.Category;
        $scope.Name = product.Name;
        $scope.UnitPrice = product.UnitPrice;
        $scope.UnitsInStock = product.UnitsInStock;
    };

    $scope.updateProduct = function (id, product) {
        $scope.ProductId = id;
        $scope.Category = product.Category;
        $scope.Name = product.Name;
        $scope.UnitPrice = product.UnitPrice;
        $scope.UnitsInStock = product.UnitsInStock;

        $http.put('/api/Products/' + id, {
            'ProductId': product.ProductId,
            'Category': product.Category,
            'Name': product.Name,
            'UnitPrice': product.UnitPrice,
            'UnitsInStock': product.UnitsInStock,
        })
        .then(function (response) {
            $('#editModal').modal('hide');
            $http.get('/api/Products')
                .then(function (response) {
                    $scope.products = response.data;
                    $scope.refresh();
                })
            .catch(function (response) {
                $scope.error('An error occurred updating product');
            });
        });
        $scope.product.Category = '';
        $scope.product.Name = '';
        $scope.product.UnitPrice = '';
        $scope.product.units = '';
        $scope.product.UnitsInStock = '';
        alert('Update successful');
    };

    $scope.deleteProduct = function (id) {
        $http.delete('/api/Products/' + id)
            .then(function (response) {
                $scope.refresh();
                $('#deleteModal').modal('hide');
            })
        .error(function (response) {
            console.log('An error occurred deleting product');
        });
        $scope.product.Category = '';
        $scope.product.Name = '';
        $scope.product.UnitPrice = '';
        $scope.product.UnitsInStock = '';
        alert('Product Deleted Successfully');
    };

    $scope.refresh = function () {
        $http.get('/api/Products/')
            .then(function (data) { $scope.products = response.data; })
    };

    $scope.cancelAdd = function () {
        $('#addModal').modal('hide');
    };

    $scope.cancelEdit = function () {
        $('#editModal').modal('hide');
        $scope.product.Category = '';
        $scope.product.Name = '';
        $scope.product.UnitPrice = '';
        $scope.product.UnitsInStock = '';
    };

    $scope.cancelDelete = function () {
        $('#deleteModal').modal('hide');
        $scope.product.Category = '';
        $scope.product.Name = '';
        $scope.product.UnitPrice = '';
        $scope.product.UnitsInStock = '';
    };
});