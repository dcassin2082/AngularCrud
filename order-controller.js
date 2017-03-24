angular.module('orderApp', ['ui.bootstrap', 'ngResource']).controller('orderController', ['$scope', '$http', function ($scope, $http) {
    $scope.getOrders = function () {
        $http.get('/api/Orders')
        .then(function (response) {
            $scope.orders = response.data;
            $scope.totalItems = $scope.orders.length;
            $scope.currentPage = 1;
            $scope.numPerPage = 10;

            $scope.paginate = function (value) {
                var begin, end, index;
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.orders.indexOf(value);
                return (begin <= index && index < end);
            };
            $scope.orderByField = "orderId";
            $scope.reverseSort = false;
        })
        .catch(function (response) {
            console.log('An error occurred loading orders');
        });
    };

    $scope.getOrder = function (id) {
        $http.get('/api/Orders/' + id)
        .then(function (response) {
            $scope.order = response.data;
        })
        .catch(function (response) {
            console.log('An error occurred loading order');
        });
    };
    $scope.addOrder = function (order) {
        $http.post('/api/Orders',
            {
                'CustomerId': order.CustomerId,
                'OrderDate': order.OrderDate,
                'ShipDate': order.ShipDate,
                'Street': order.Street,
                'City': order.City,
                'State': order.State,
                'ZIP': order.Zip,
            })
        .then(function (response) {
            $('#addModal').modal('hide');
            $scope.orders.push(order);
            $http.get('/api/Orders')
            .then(function (response) {
                $scope.orders = response.data;
            })
            .catch(function (response) {
                console.log('An error occurred adding order');
            });
            $scope.CustomerId = '';
            $scope.OrderDate = '';
            $scope.ShipDate = '';
            $scope.Street = '';
            $scope.City = '';
            $scope.State = '';
            $scope.Zip = '';
            $scope.editorderform.$setPristine();
            $scope.editorderform.$setUntouched();
            $scope.currentRecord = {};
        });
        alert('Order added successfully');
    };
    $scope.editOrder = function (order) {
        $http.get('/api/Orders/' + order.OrderId)
        .then(function (response) {
            $scope.order = response.data;
        })
        .catch(function (data) {
            console.log('An error occurred loading order');
        });
        $scope.CustomerId = order.CustomerId;
        $scope.OrderDate = order.OrderDate;
        $scope.ShipDate = order.ShipDate;
        $scope.Street = order.Street;
        $scope.City = order.City;
        $scope.State = order.State;
        $scope.Zip = order.Zip;

    };
    $scope.updateOrder = function (id, order) {
        $scope.OrderId = id;
        $scope.CustomerId = order.CustomerId;
        $scope.OrderDate = order.OrderDate;
        $scope.ShipDate = order.ShipDate;
        $scope.Street = order.Street;
        $scope.City = order.City;
        $scope.State = order.State;
        $scope.Zip = order.Zip;
        $http.put('/api/Orders/' + id, {
            'OrderId': id,
            'CustomerId': order.CustomerId,
            'OrderDate': order.OrderDate,
            'ShipDate': order.ShipDate,
            'Street': order.Street,
            'City': order.City,
            'State': order.State,
            'ZIP': order.Zip,
        })
        .then(function (response) {
            $('#editModal').modal('hide');
            $http.get('/api/Orders')
                .then(function (response) {
                    $scope.orders = response.data;
                    $scope.refresh();
                })
            .catch(function (response) {
                console.log('An error occurred updating order');
            });
        });
        $scope.CustomerId = '';
        $scope.OrderDate = '';
        $scope.ShipDate = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.Zip = '';
        alert('Update successful');
    };
    $scope.deleteOrder = function (id) {
        $http.delete('/api/Orders/' + id)
            .then(function (response) {
                $scope.refresh();
                $('#deleteModal').modal('hide');
            })
        .catch(function (response) {
            console.log('An error occurred deleting order');
        });
        $scope.CustomerId = '';
        $scope.OrderDate = '';
        $scope.ShipDate = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.Zip = '';
        alert('Order Deleted Successfully');
    };
    $scope.refresh = function () {
        $http.get('/api/Orders/')
            .then(function (response) { $scope.orders = response.data; })
    };

    $scope.cancelAdd = function () {
        $('#addModal').modal('hide');
        $scope.CustomerId = '';
        $scope.OrderDate = '';
        $scope.ShipDate = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.Zip = '';
        $scope.editorderform.$setPristine();
        $scope.editorderform.$setUntouched();
        $scope.currentRecord = {};
    };
    $scope.cancelEdit = function () {
        $('#editModal').modal('hide');
        $scope.CustomerId = '';
        $scope.OrderDate = '';
        $scope.ShipDate = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.Zip = '';
        $scope.editorderform.$setPristine();
        $scope.editorderform.$setUntouched();
        $scope.currentRecord = {};
    };

    $scope.cancelDelete = function () {
        $('#deleteModal').modal('hide');
        $scope.CustomerId = '';
        $scope.OrderDate = '';
        $scope.ShipDate = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.Zip = '';
    };
}]);
