var myApp = angular.module('myApp');

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams',
    function ($scope, $http, $location, $routeParams) {

        $scope.getBooks = function () {
            $http.get('/api/books').success(function (response) {
                $scope.books = response;
                console.log($scope.books);
            });
        }
        $scope.getBook = function () {
            console.log("GetBook Loaded...")
            var id = $routeParams.id;
            $http.get('/api/books/' + id).success(function (response) {
                $scope.book = response;            })
        }

        $scope.addBook = function(){
            $http.post('/api/books', $scope.book).success(function(response){
                window.location.href='#/books';
            });
        }

        $scope.updateBook = function(){
            var id = $routeParams.id; 
            console.log("Update Book Loaded" + id);
            $http.put('/api/books/' +id, $scope.book).success(function(response){
                window.location.href='#/books';
                updateBook
            });
        }

        $scope.removeBook = function(id){
            $http.delete('/api/books/'+id).success(function(response){
                window.location.href='#/books';
            });
        }
    }
]);



