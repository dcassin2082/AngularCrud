angular.module('supplierApp', ['ui.bootstrap', 'ngResource']).controller('supplierController', function ($scope, $http) {
    $scope.getSuppliers = function () {
        $http.get('/api/Suppliers')
        .then(function (response) {
            $scope.suppliers = response.data;
            $scope.totalItems = $scope.suppliers.length;
            $scope.currentPage = 1;
            $scope.numPerPage = 10;

            $scope.paginate = function (value) {
                var begin, end, index;
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.suppliers.indexOf(value);
                return (begin <= index && index < end);
            };
            $scope.orderByField = "SupplierId";
            $scope.reverseSort = false;
        })
        .catch(function (response) {
            console.log('An error occurred loading suppliers');
        });
    };

    $scope.getSupplier = function (id) {
        $http.get('/api/Suppliers/' + id)
        .then(function (response) {
            $scope.supplier = response.data;
        })
        .catch(function (response) {
            console.log('An error occurred loading supplier');
        });
    };

    $scope.addSupplier = function (supplier) {

        $http.post('/api/Suppliers',
            {
                'SupplierName': supplier.SupplierName,
                'Country': supplier.Country,
                'Street': supplier.Street,
                'City': supplier.City,
                'State': supplier.State,
                'ZIP': supplier.ZIP,
            })
        .then(function (response) {

            $('#addModal').modal('hide');
            $scope.suppliers.push(supplier);
            $http.get('/api/Suppliers')
            .then(function (response) {
                $scope.suppliers = response.data;
            })
            .catch(function (response) {
                console.log('An error occurred adding supplier');
            });
        });
        alert('Supplier added successfully');
    };

    $scope.editSupplier = function (supplier) {
        $http.get('/api/Suppliers/' + supplier.SupplierId)
        .then(function (response) {
            $scope.supplier = response.data;
        })
        .catch(function (response) {
            console.log('An error occurred loading supplier');
        });
        $scope.SupplierName = supplier.SupplierName;
        $scope.Country = supplier.Country;
        $scope.Street = supplier.Street;
        $scope.City = supplier.City;
        $scope.State = supplier.State;
        $scope.ZIP = supplier.ZIP;
    };

    $scope.updateSupplier = function (id, supplier) {
        $scope.SupplierId = id;
        $scope.SupplierName = supplier.SupplierName;
        $scope.Country = supplier.Country;
        $scope.Street = supplier.Street;
        $scope.City = supplier.City;
        $scope.State = supplier.State;
        $scope.ZIP = supplier.ZIP;

        $http.put('/api/Suppliers/' + id, {
            'SupplierId': supplier.SupplierId,
            'SupplierName': supplier.SupplierName,
            'Country': supplier.Country,
            'Street': supplier.Street,
            'City': supplier.City,
            'State': supplier.State,
            'ZIP': supplier.ZIP,
        })
        .then(function (response) {
            $('#editModal').modal('hide');
            $http.get('/api/Suppliers')
                .then(function (response) {
                    $scope.suppliers = response.data;
                    $scope.refresh();
                })
            .catch(function (response) {
                console.log('An error occurred updating supplier');
            });
        });
        $scope.SupplierName = '';
        $scope.Country = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.ZIP = '';
        alert('Update successful');
    };

    $scope.deleteSupplier = function (id) {
        $http.delete('/api/Suppliers/' + id)
            .then(function (data) {
                $scope.refresh();
                $('#deleteModal').modal('hide');
            })
        .catch(function (response) {
            console.log('An error occurred deleting supplier');
        });
        $scope.SupplierName = '';
        $scope.Country = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.ZIP = '';
        alert('Supplier Deleted Successfully');
    };

    $scope.refresh = function () {
        $http.get('/api/Suppliers/')
            .then(function (response) { $scope.suppliers = response.data; })
    };

    $scope.cancelAdd = function () {
        $('#addModal').modal('hide');
    };

    $scope.cancelEdit = function () {
        $('#editModal').modal('hide');
        $scope.SupplierName = '';
        $scope.Country = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.ZIP = '';
        $scope.editsupplierform.$setPristine();
        $scope.editsupplierform.$setUntouched();
    };

    $scope.cancelDelete = function () {
        $('#deleteModal').modal('hide');
        $scope.SupplierName = '';
        $scope.Country = '';
        $scope.Street = '';
        $scope.City = '';
        $scope.State = '';
        $scope.ZIP = '';
    };
});