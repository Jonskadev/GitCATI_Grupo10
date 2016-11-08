var app = angular.module("App",[]);
app.controller("UserController",function($scope, $http){
    /*INDEX*/
    /*poner aca (en http.get/post) lista de usuarios/proyectos extraida de BD*/
    $scope.listofusers = [];
    $scope.newUser = {};
    $scope.usertodelete = {};
    $scope.usertoupdate = {};

    $http.get('/api/usuarios')
        .success(function(data){
            $scope.listofusers = data;
        })
        .error(function(data){
            console.log("Error: " + data);
        });


    $scope.verifyUser = function() {
        for (i = 0; i < $scope.listofusers.length; i++) {
            if (!($scope.userpasswrtn.username.localeCompare($scope.listofusers[i].username)) && !($scope.userpasswrtn.password.localeCompare($scope.listofusers[i].password))) {
                $scope.userpasswrtn = {};
                console.log("acceso aceptado");
                return "Acceso aceptado."
            }
        }
        $scope.userpasswrtn = {};
        console.log("acceso denegado");
        return "Acceso denegado, intente nuevamente."
    };

    $scope.addUser = function(){
        $http.post('/api/usuarios',{
            username: $scope.newUser.username,
            password: $scope.newUser.password,
            email: $scope.newUser.email,
            permiso: 0
            })
            .success(function(data){
                $scope.listofusers.push(data);
                $scope.addUser = {};
                locatiion.reload()
            })
            .error(function(err){
                console.log(err);
            });
    }

    /*$scope.deleteUser = function(){
        /*$http.post(JSON USUARIO,{
            username: $scope.newUser.username,
            })
            .success(function(data){
                var index = listofusers.indexOf(data)
                $scope.addUser = {};
            })
            .error(function(err){
                console.log(err);
            });
    }*/

    $scope.deleteUser = function (usertodelete) {
        $http.delete("/api/usuarios/" + usertodelete.username)
            .success(function (data) {
                $scope.listofusers = data;
                usertodelete = {};
            })
            .error(function (err) {
            })
    };

    $scope.updateUser= function (usertoupdate){
        $http.put("api/usuarios/" + usertoupdate.username, usertoupdate)
            .success(function(data) {
                $scope.listofusers = data;
                usertoupdate = {};
            })
            .error(function(err){
            })


    };
    /*$scope.deleteUser = function ($index,id) {
        $scope.listofusers.splice($index, 1 );
        $http.delete("/api/usuario/" + id)
            .success(function (data) {
                $scope.listofusers = data;
            })
            .error(function (err) {
            })
    }*/
});

app.controller("ProyectController",function($scope,$http){
    $scope.listofproyects = [];
    $scope.newProyect = {};
    $scope.proyecttodelete = {};
    $scope.proyecttoupdate = {};

    /*$scope.listofproyects = [
        {
            idproyecto:1,
            nombre:"deckss",
            idencuesta:22
        },
        {
            idproyecto:2,
            nombre:"vagss",
            idencuesta:22
        },
        {
            idproyecto:3,
            nombre:"deksvags",
            idencuesta:69
        },
        {
            id:4,
            nombre:"pito",
        },



        ];*/

    $http.get('/api/proyectos')
        .success(function(data){
            $scope.listofproyects = data;
            console.log(data);
        })
        .error(function(err){
            console.log(err);
        });

    $scope.addProyect = function(){
        $http.post('/api/proyectos',{
            idProyecto: $scope.newProyect.idProyecto,
            nombre: $scope.newProyect.nombre
             })
             .success(function(data){
                 $scope.listofproyects.push(data);
                 $scope.addProyect = {};
                 console.log(data);
             })
             .error(function(err){
                console.log(err);
        })};

    $scope.deleteProyect = function (proyecttodelete) {
        $http.delete("/api/proyectos/" + proyecttodelete.idProyecto)
            .success(function (data) {
                $scope.listofproyects = data;
                proyecttodelete = {};
            })
            .error(function (err) {
            })
    };

    $scope.updateProyect= function (proyecttoupdate){
        $http.put("/api/proyectos/" + proyecttoupdate.idProyecto, proyecttoupdate)
            .success(function(data) {
                $scope.listofproyects = data;
                proyecttoupdate = {};
            })
            .error(function(err){
            })


    };
});
