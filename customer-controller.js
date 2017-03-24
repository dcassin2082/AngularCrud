angular.module('customerApp', ['ui.bootstrap', 'ngResource']).controller('customerController', ['$scope', '$http', function ($scope, $http) {
    $scope.getCustomers = function () {
        $http.get('/api/Customers')
        .then(function (response) {
            $scope.customers = response.data;
            $scope.totalItems = $scope.customers.length;
            $scope.currentPage = 1;
            $scope.numPerPage = 10;

            $scope.paginate = function (value) {
                var begin, end, index;
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.customers.indexOf(value);
                return (begin <= index && index < end);
            };
            $scope.orderByField = "CustomerID";
            $scope.reverseSort = false;
        })
        .catch(function (response) {
            console.log('An error occurred loading customers');
        });
    };
    $scope.getCustomer = function (id) {
        $http.get('/api/Customers/' + id)
        .then(function (response) {
            $scope.customer = response.data;
        })
        .catch(function (response) {
            console.log('An error occurred loading customer');
        });
    };
    $scope.addCustomer = function (customer) {
        $http.post('/api/Customers',
            {
                'Street': 'test street',
                'City': customer.City,
                'State': customer.State,
                'Zip': customer.Zip,
                'Phone': customer.Phone,
                'Name': customer.Name,
                'Region': customer.Region,
                'Orders': customer.Orders
            })
        .then(function (response) {
            $('#addModal').modal('hide');
            $scope.customers.push(customer);
            $http.get('/api/Customers')
            .then(function (response) {
                $scope.customers = response.data;
                alert('Customer added successfully');
            })
            .catch(function (response) {
                console.log('An error occurred adding customer');
            });
            $scope.customer.Street = '';
            $scope.customer.Name = '';
            $scope.customer.City = '';
            $scope.customer.State = '';
            $scope.customer.Zip = '';
            $scope.customer.Phone = '';
            $scope.customer.Region = '';
            $scope.customer.Orders = '';
            $scope.addcustomerform.$setPristine();
            $scope.addcustomerform.$setUntouched();
            $scope.currentRecord = {};
        });
    };
    $scope.editCustomer = function (customer) {
        $http.get('/api/Customers/' + customer.CustomerId)
        .then(function (response) {
            $scope.customer = response.data;
        })
        .error(function (response) {
            console.log('An error occurred loading customer');
        });
        $scope.Name = customer.Name;
        $scope.Street = customer.Street;
        $scope.City = customer.City;
        $scope.State = customer.State;
        $scope.Zip = customer.Zip;
        $scope.Phone = customer.Phone;
        $scope.Region = customer.Region;
        $scope.Orders = customer.Orders;
    };
    $scope.updateCustomer = function (id, customer) {
        $scope.CustomerId = id;
        $scope.Name = customer.Name;
        $scope.Street = customer.Street;
        $scope.City = customer.City;
        $scope.State = customer.State;
        $scope.Zip = customer.Zip;
        $scope.Phone = customer.Phone;
        $http.put('/api/Customers/' + id, {
            'CustomerId': customer.CustomerId,
            'Street': customer.Street,
            'City': customer.City,
            'State': customer.State,
            'Zip': customer.Zip,
            'Phone': customer.Phone,
            'Name': customer.Name,
            'Region': customer.Region,
            'Orders': customer.Orders
        })
        .then(function (response) {
            $('#editModal').modal('hide');
            $http.get('/api/Customers')
                .success(function (response) {
                    $scope.customers = response.data;
                    $scope.refresh();

                })
            .catch(function (data) {
                console.log('An error occurred updating customer');
            });
        });
        $scope.customer.Street = '';
        $scope.customer.Name = '';
        $scope.customer.City = '';
        $scope.customer.State = '';
        $scope.customer.Zip = '';
        $scope.customer.Phone = '';
        $scope.customer.Region = '';
        $scope.customer.Orders = '';
        $scope.editcustomerform.$setPristine();
        $scope.editcustomerform.$setUntouched();
        $scope.currentRecord = {};
        alert('Update successful');
    };
    $scope.deleteCustomer = function (id) {
        $http.delete('/api/Customers/' + id)
            .then(function (response) {
                $scope.refresh();
                $('#deleteModal').modal('hide');
            })
        .catch(function (response) {
            console.log('An error occurred deleting customer');
        });
        $scope.customer.Street = '';
        $scope.customer.Name = '';
        $scope.customer.City = '';
        $scope.customer.State = '';
        $scope.customer.Zip = '';
        $scope.customer.Phone = '';
        $scope.customer.Region = '';
        $scope.customer.Orders = '';
        alert('Deleted Successfully');
    };
    $scope.refresh = function () {
        $http.get('/api/Customers/')
            .then(function (response) { $scope.customers = response.data; })
    };

    $scope.cancelAdd = function () {
        $('#addModal').modal('hide');
    };
    $scope.cancelEdit = function () {
        $('#editModal').modal('hide');
        $scope.customer.Street = '';
        $scope.customer.Name = '';
        $scope.customer.City = '';
        $scope.customer.State = '';
        $scope.customer.Zip = '';
        $scope.customer.Phone = '';
        $scope.customer.Region = '';
        $scope.customer.Orders = '';
        $scope.editcustomerform.$setPristine();
        $scope.editcustomerform.$setUntouched();
        $scope.currentRecord = {};
    };
    $scope.cancelAdd = function () {
        $('#addModal').modal('hide');
        $scope.customer.Street = '';
        $scope.customer.Name = '';
        $scope.customer.City = '';
        $scope.customer.State = '';
        $scope.customer.Zip = '';
        $scope.customer.Phone = '';
        $scope.customer.Region = '';
        $scope.customer.Orders = '';
        $scope.addcustomerform.$setPristine();
        $scope.addcustomerform.$setUntouched();
        $scope.currentRecord = {};
    };
    $scope.cancelDelete = function () {
        $('#deleteModal').modal('hide');
        $scope.customer.Street = '';
        $scope.customer.Name = '';
        $scope.customer.City = '';
        $scope.customer.State = '';
        $scope.customer.Zip = '';
        $scope.customer.Phone = '';
        $scope.customer.Region = '';
        $scope.customer.Orders = '';
    };
    $scope.phoneNumberPattern = (function () {
        var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
        return {
            test: function (value) {
                if ($scope.requireTel === false) {
                    return true;
                }
                return regexp.test(value);
            }
        };
    })();
}]);
