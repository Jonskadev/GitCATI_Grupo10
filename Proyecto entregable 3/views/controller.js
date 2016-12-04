var app = angular.module("App", []).config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|skype):/);
}]);

app.controller("UserController", function($scope, $http, $window) {
    /*INDEX*/
    /*poner aca (en http.get/post) lista de usuarios/proyectos extraida de BD*/
    $scope.listofusers = [];
    $scope.newUser = {};
    $scope.usertodelete = {};
    $scope.usertoupdate = {};

    $http.get('/api/usuarios')
        .success(function(data) {
            $scope.listofusers = data;
        })
        .error(function(data) {
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

    $scope.addUser = function() {
        $http.post('/api/usuarios', {
                username: $scope.newUser.username,
                password: $scope.newUser.password,
                email: $scope.newUser.email,
                permiso: 0
            })
            .success(function(data) {
                $scope.listofusers.push(data);
                $scope.addUser = {};
                $window.location.reload()
            })
            .error(function(err) {
                console.log(err);
            });
    };

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

    $scope.deleteUser = function(usertodelete) {
        $http.delete("/api/usuarios/" + usertodelete.username)
            .success(function(data) {
                $scope.listofusers = data;
                usertodelete = {};
                $window.location.reload();
            })
            .error(function(err) {})
    };

    $scope.updateUser = function(usertoupdate) {
        $http.put("api/usuarios/" + usertoupdate.username, usertoupdate)
            .success(function(data) {
                $scope.listofusers = data;
                usertoupdate = {};
                $window.location.reload();
            })
            .error(function(err) {})


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

app.controller("ProyectController", function($scope, $http, $window) {

    $scope.listofproyects = [];
    $scope.newProyect = {};
    $scope.proyecttodelete = {};
    $scope.proyecttoupdate = {};


    $http.get('/api/proyectos')
        .success(function(data) {
            $scope.listofproyects = data;
            console.log(data);
        })
        .error(function(err) {
            console.log(err);
        });

    $scope.addProyect = function() {

        var f = document.getElementById('file_').files[0],
            r = new FileReader();
        console.log(f);
        r.onloadend = function(e) {
            var data = e.target.result;
            console.log(data);
            $window.location.reload();
            $http.post('/api/proyectos', {
                    idProyecto: $scope.listofproyects.length + 1,
                    nombre: $scope.newProyect.nombre,
                    link: $scope.newProyect.link,
                    activo: 0,
                    archivo: data
                })
                .success(function(data) {
                    $scope.listofproyects.push(data);
                    $scope.addProyect = {};
                    $window.location.reload();
                    console.log(data);
                })
                .error(function(err) {
                    console.log(err);
                })
        };
        r.readAsBinaryString(f);
    };

    $scope.deleteProyect = function(proyecttodelete) {
        $http.delete("/api/proyectos/" + proyecttodelete.idProyecto)
            .success(function(data) {
                $scope.listofproyects = data;
                proyecttodelete = {};
                $window.location.reload();
            })
            .error(function(err) {})
    };

    $scope.updateProyect = function(proyecttoupdate) {
        $http.put("/api/proyectos/" + proyecttoupdate.idProyecto, proyecttoupdate)
            .success(function(data) {
                $scope.listofproyects = data;
                proyecttoupdate = {};
                $window.location.reload();
            })
            .error(function(err) {})


    };
});

app.controller("StatusController", function($scope, $http, $window) {
    $scope.listofstates = [];
    $scope.newState = {};
    $scope.statetodelete = {};

    $http.get("/api/estados")
        .success(function(data) {
            $scope.listofstates = data;
        })
        .error(function(err) {
            console.log(err)
        })

    $scope.addState = function() {
        $http.post("/api/estados", {
                state_name: $scope.newState.state_name
            })
            .success(function(data) {
                $scope.listofstates.push(data);
                $scope.newState = {};
                $window.location.reload();
            })
            .error(function(err) {
                console.log(err);
            })
    };
    $scope.deleteState = function(statetodelete) {
        $http.delete("/api/estados/" + $scope.statetodelete.state_name)
            .success(function(data) {
                $scope.listofstates = data;
                $scope.statetodelete = {};
                $window.location.reload();
            })
            .error(function(err) {})

    };
});

app.controller("epController", function($scope, $http, $window, $sce) {

    $scope.listofcalls = [];
    $scope.listofrespondents = [];
    $scope.eptoupdate = {};
    $scope.listofproyects = [];
    $scope.observaciones = "";
    $scope.state = "";
    i = 0;

    $http.get('/api/llamada')
        .success(function(data) {
            $scope.listofcalls = data;
            console.log(data);
        })
        .error(function(err) {
            console.log(err);
        });

    $http.get('/api/proyectos')
        .success(function(data) {
            $scope.listofproyects = data;
            console.log(data);
        })
        .error(function(err) {
            console.log(err);
        });

    $http.get('/api/encuestadoproyecto')
        .success(function(data) {
            $scope.listofrespondents = data;
            console.log(data);
        })
        .error(function(err) {
            console.log(err);
        });

    $scope.addcall = function() {
        $http.post('/api/llamada', {
                idLlamada: $scope.listofcalls.length + 1,
                observaciones: $scope.observaciones,
                username: "juan",
                telefono: $scope.listofrespondents[$scope.index].telefono
            })
            .success(function(data) {
                $scope.listofcalls.push(data);
                $window.location.reload();
            })
            .error(function(err) {
                console.log(err);
            });
    };


    $scope.getrespondent = function() {
        while (i != $scope.listofrespondents.length && $scope.listofrespondents[i].estado == "Llamado") {
            i = i + 1;
        }
        $scope.index = i;
        $scope.eptoupdate = {
            idProyecto: $scope.listofrespondents[$scope.index].idProyecto,
            telefono: $scope.listofrespondents[$scope.index].telefono,
            estado: ""
        };
        $scope.addcall();
        $scope.updateStatus($scope.eptoupdate);
        $window.location.reload();
        return $scope.index
    };

    $scope.updateindex = function() {
        i = 0;
        while (i != $scope.listofrespondents.length && $scope.listofrespondents[i].estado == "Llamado") {
            i = i + 1;
        }
        $scope.index = i;
        return $scope.index;
    };



    $scope.updateStatus = function(eptoupdate) {
        /*$scope.eptoupdate = {idProyecto: $scope.listofrespondents[$scope.index].idProyecto,
            telefono: $scope.listofrespondents[$scope.index].telefono,
            estado: ""};*/

        $http.put("/api/encuestadoproyecto/" + $scope.eptoupdate.idProyecto + "/" + $scope.eptoupdate.telefono, {
                estado: "Llamado"
            })
            .success(function(data) {
                $scope.listofrespondents = data;
                eptoupdate = {};
            })
            .error(function(err) {})


    };
    /*
        $scope.getproyectlink = function(){
            for(i = 0; i < $scope.listofproyects.length; i++){
                if ($scope.listofproyects[i].idProyecto == $scope.listofrespondents[$scope.index].idProyecto){
                    $scope.URL = $sce.trustAsResourceUrl($scope.listofproyects[i].link);
                    return $scope.URL;
                }
                else if(i == $scope.listofproyects.length){
                    return "https://d1sui4xqepm0ps.cloudfront.net/categories/shrek-memes?image=cdn"
                }
            }
        };*/

});