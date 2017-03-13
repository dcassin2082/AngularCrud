angular.module('customerApp', ['ui.bootstrap', 'ngResource']).controller('customerController', function ($scope, $http) {
    $scope.getCustomers = function () {
        $http.get('/api/Customers')
        .then(function successCallback(response) {
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
        .catch(function errorCallback(response) {
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
});





//angular.module('customerApp', ['ui.bootstrap', 'ngResource']).controller('customerController', function ($scope, $http) {
//    $scope.getCustomers = function () {
//        $http.get('/api/Customers')
//        .success(function (data) {
//            $scope.customers = data;
//            $scope.totalItems = $scope.customers.length;
//            $scope.currentPage = 1;
//            $scope.numPerPage = 10;

//            $scope.paginate = function (value) {
//                var begin, end, index;
//                begin = ($scope.currentPage - 1) * $scope.numPerPage;
//                end = begin + $scope.numPerPage;
//                index = $scope.customers.indexOf(value);
//                return (begin <= index && index < end);
//            };
//            $scope.orderByField = "CustomerID";
//            $scope.reverseSort = false;

//            $scope.sortInfo = { fields: ['CustomerID'], directions: ['asc'] };
//            // sort over all data
//            function sortData(field, direction) {
//                if (!$scope.allData) return;
//                $scope.allData.sort(function (a, b) {
//                    if (direction == "asc") {
//                        return a[field] > b[field] ? 1 : -1;
//                    } else {
//                        return a[field] > b[field] ? -1 : 1;
//                    }
//                })
//            }
//            // sort over all data, not only the data on current page
//            $scope.$watch('sortInfo', function (newVal, oldVal) {
//                sortData(newVal.fields[0], newVal.directions[0]);
//                $scope.pagingOptions.currentPage = 1;
//                setPagingData($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize)
//            }, true);
//            $scope.gridOptions = {
//                sortInfo: $scope.sortInfo,
//                useExternalSorting: true,
//            }

//            // pick the slice we currently want to see
//            function setPagingData(page, pageSize) {
//                if (!$scope.allData) return;
//                $scope.totalServerItems = $scope.allData.length;
//                $scope.myData = $scope.allData.slice((page - 1) * pageSize, page * pageSize);;
//            };
//        })
//        .error(function (data) {
//            $scope.error('An error occurred loading customers');
//        });
//    };

//    $scope.getCustomer = function (id) {
//        $http.get('/api/Customers/' + id)
//        .success(function (data) {
//            $scope.customer = data;
//        })
//        .error(function (data) {
//            $scope.error('An error occurred loading customer');
//        });
//    };

//    $scope.addCustomer = function (customer) {

//        $http.post('/api/Customers',
//            {
//                'Street': 'test street',
//                'City': customer.City,
//                'State': customer.State,
//                'Zip': customer.Zip,
//                'Phone': customer.Phone,
//                'Name': customer.Name,
//                'Region': customer.Region,
//                'Orders': customer.Orders
//            })
//        .success(function (data) {

//            $('#addModal').modal('hide');
//            $scope.customers.push(customer);
//            $http.get('/api/Customers')
//            .success(function (data) {
//                $scope.customers = data;
//                alert('Customer added successfully');
//            })
//            .error(function (data) {
//                $scope.error('An error occurred adding customer');
//            });
//            $scope.customer.Street = '';
//            $scope.customer.Name = '';
//            $scope.customer.City = '';
//            $scope.customer.State = '';
//            $scope.customer.Zip = '';
//            $scope.customer.Phone = '';
//            $scope.customer.Region = '';
//            $scope.customer.Orders = '';
//            $scope.addcustomerform.$setPristine();
//            $scope.addcustomerform.$setUntouched();
//            $scope.currentRecord = {};
//        });
//    };

//    $scope.editCustomer = function (customer) {
//        $http.get('/api/Customers/' + customer.CustomerId)
//        .success(function (data) {
//            $scope.customer = data;
//        })
//        .error(function (data) {
//            $scope.error('An error occurred loading customer');
//        });
//        $scope.Name = customer.Name;
//        $scope.Street = customer.Street;
//        $scope.City = customer.City;
//        $scope.State = customer.State;
//        $scope.Zip = customer.Zip;
//        $scope.Phone = customer.Phone;
//        $scope.Region = customer.Region;
//        $scope.Orders = customer.Orders;
//    };

//    $scope.updateCustomer = function (id, customer) {
//        $scope.CustomerId = id;
//        $scope.Name = customer.Name;
//        $scope.Street = customer.Street;
//        $scope.City = customer.City;
//        $scope.State = customer.State;
//        $scope.Zip = customer.Zip;
//        $scope.Phone = customer.Phone;
//        $http.put('/api/Customers/' + id, {
//            'CustomerId': customer.CustomerId,
//            'Street': customer.Street,
//            'City': customer.City,
//            'State': customer.State,
//            'Zip': customer.Zip,
//            'Phone': customer.Phone,
//            'Name': customer.Name,
//            'Region': customer.Region,
//            'Orders': customer.Orders
//        })
//        .success(function (data) {
//            $('#editModal').modal('hide');
//            $http.get('/api/Customers')
//                .success(function (data) {
//                    $scope.customers = data;
//                    $scope.refresh();

//                })
//            .error(function (data) {
//                $scope.error('An error occurred updating customer');
//            });
//        });
//        $scope.customer.Street = '';
//        $scope.customer.Name = '';
//        $scope.customer.City = '';
//        $scope.customer.State = '';
//        $scope.customer.Zip = '';
//        $scope.customer.Phone = '';
//        $scope.customer.Region = '';
//        $scope.customer.Orders = '';
//        $scope.editcustomerform.$setPristine();
//        $scope.editcustomerform.$setUntouched();
//        $scope.currentRecord = {};
//        alert('Update successful');
//    };

//    $scope.deleteCustomer = function (id) {
//        $http.delete('/api/Customers/' + id)
//            .success(function (data) {
//                $scope.refresh();
//                $('#deleteModal').modal('hide');
//            })
//        .error(function (data) {
//            $scope.error('An error occurred deleting customer');
//        });
//        $scope.customer.Street = '';
//        $scope.customer.Name = '';
//        $scope.customer.City = '';
//        $scope.customer.State = '';
//        $scope.customer.Zip = '';
//        $scope.customer.Phone = '';
//        $scope.customer.Region = '';
//        $scope.customer.Orders = '';
//        alert('Deleted Successfully');
//    };

//    $scope.refresh = function () {
//        $http.get('/api/Customers/')
//            .success(function (data) { $scope.customers = data; })
//    };

//    $scope.cancelAdd = function () {
//        $('#addModal').modal('hide');
//    };

//    $scope.cancelEdit = function () {
//        $('#editModal').modal('hide');
//        $scope.customer.Street = '';
//        $scope.customer.Name = '';
//        $scope.customer.City = '';
//        $scope.customer.State = '';
//        $scope.customer.Zip = '';
//        $scope.customer.Phone = '';
//        $scope.customer.Region = '';
//        $scope.customer.Orders = '';
//        $scope.editcustomerform.$setPristine();
//        $scope.editcustomerform.$setUntouched();
//        $scope.currentRecord = {};
//    };

//    $scope.cancelAdd = function () {
//        $('#addModal').modal('hide');
//        $scope.customer.Street = '';
//        $scope.customer.Name = '';
//        $scope.customer.City = '';
//        $scope.customer.State = '';
//        $scope.customer.Zip = '';
//        $scope.customer.Phone = '';
//        $scope.customer.Region = '';
//        $scope.customer.Orders = '';
//        $scope.addcustomerform.$setPristine();
//        $scope.addcustomerform.$setUntouched();
//        $scope.currentRecord = {};
//    };

//    $scope.cancelDelete = function () {
//        $('#deleteModal').modal('hide');
//        $scope.customer.Street = '';
//        $scope.customer.Name = '';
//        $scope.customer.City = '';
//        $scope.customer.State = '';
//        $scope.customer.Zip = '';
//        $scope.customer.Phone = '';
//        $scope.customer.Region = '';
//        $scope.customer.Orders = '';
//    };

//    $scope.phoneNumberPattern = (function () {
//        var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
//        return {
//            test: function (value) {
//                if ($scope.requireTel === false) {
//                    return true;
//                }
//                return regexp.test(value);
//            }
//        };
//    })();
//});
