angular.module('starter.controllers', [])

.controller('RegisterCtrl', function($scope, $state, $http, $ionicPopup)
    {
    $scope.register = function(user)
        {
        $http({
            method: "post",
            url: "http://upway-app.fr/app/register.php",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param(
                {
                usernom: user.nom,
                userprenom: user.prenom,
                usermail: user.mail,
                userpassword: user.password
                })
            }).success(function(result)
                {
                if (result.reponse == "oui")
                    {
                    $ionicPopup.alert(
                        {
                         title:'Inscription',
                         template:'Votre inscription est pris en compte!'
                        });
                    $state.go('tab.accueil');
                    }
                else
                    {
                    $ionicPopup.alert(
                        {
                            title:'Inscription',
                            template:'Veuillez remplir tous les champs !'
                        });
                    }
                })
            .error(function(data)
                {
                $ionicPopup.alert(
                    {
                        title:'Réseau',
                        template:'Problème d\'accès réseau !'
                    });
                }
            );
        }
    })

.controller('LoginCtrl', function($scope, $state, $http, $ionicPopup, $ionicHistory)
    {
    $scope.login = function(user)
        {
        $http({
            method: "post",
            url: "http://upway-app.fr/app/login.php",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param(
                {
                e: user.mail,
                p: user.password
                })
            }).success(function(result)
                {
                //alert("data = " + result.status + "<br/>" + $scope.userdata.user_id + "<br/>" + $scope.userdata.user_nom + "<br/>" + $scope.userdata.user_prenom);
                if (result.status == "logged")
                    {
                    sessionStorage.setItem('user_id', result.user_id);
                    sessionStorage.setItem('user_nom', result.user_nom);
                    sessionStorage.setItem('user_prenom', result.user_prenom);
                    $ionicPopup.alert(
                        {
                            title:'Connexion',
                            template:'Vous êtes connecté'
                        });
                    $state.go('tab.accueil');
                    }
                else
                    {
                    $ionicPopup.alert(
                        {
                            title:'Connexion',
                            template:'Mauvais identifiant/mot de passe !'

                        });
                    }
                })
            .error(function(data)
                {
                $ionicPopup.alert(
                    {
                        title:'Réseau',
                        template:'Problème d\'accès réseau !'
                    });
                }
            );
        }
    })

.controller('AccueilCtrl', function($scope, $state, $http, $ionicPopup, $ionicHistory)
    {
    $(document).ready(function()
        {
        //alert("id = " + sessionStorage.getItem('user_id'));
        $http({
            method: "post",
            url: "http://upway-app.fr/app/dataload.php",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param(
                {
                id_user: sessionStorage.getItem('user_id')
                })
            }).success(function(result)
                {
                if (result.status == "logged")
                    {
                    //alert("logged");
                    $scope.statistiques = result;
                    sessionStorage.setItem('user_statistiques', $scope.statistiques);
                    }
                })
            .error(function(error)
                {
                alert("erreur = " + error);
                }
            );
        });
    })

.controller('FintrajetCtrl', function($scope, $state)
    {
    $(document).ready(function()
        {
        $('.box-end-trajet').click(function()
            {
            $(this).toggleClass("box-checked");
            });
        
        $('#ctp-manoeuvres-decrem').click(function()
            {
            if ($('#cpt-manoeuvres').text() > 0)
                {
                $('#cpt-manoeuvres').text(parseInt($('#cpt-manoeuvres').text()) - 1);
                }
            });
        $('#ctp-manoeuvres-increm').click(function()
            {
            $('#cpt-manoeuvres').text(parseInt($('#cpt-manoeuvres').text()) + 1);
            });
        });

        $scope.temps = function(user)
        {
            $http({
                method: "post",
                url: "http://upway-app.fr/app/temps.php",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(
                    {
                        usernom: user.nom,
                        userprenom: user.prenom,
                        usermail: user.mail,
                        userpassword: user.password
                    })
            }).success(function(result)
            {
                if (result.reponse == "oui")
                {
                    $ionicPopup.alert(
                        {
                            title:'Inscription',
                            template:'Votre inscription est pris en compte!'
                        });
                    $state.go('tab.accueil');
                }
                else
                {
                    $ionicPopup.alert(
                        {
                            title:'Inscription',
                            template:'Veuillez remplir tous les champs !'
                        });
                }
            })
                .error(function(data)
                    {
                        $ionicPopup.alert(
                            {
                                title:'Réseau',
                                template:'Problème d\'accès réseau !'
                            });
                    }
                );
        }

    })

.controller('TrajetcurrentCtrl', function($scope)
    {
    var map;
    var control;

    function updateCarte()
        {
        var onSuccess = function(position)
            {
            control.spliceWaypoints(control.getWaypoints().length, 1, L.latLng(position.coords.latitude, position.coords.longitude));
            map.setView(L.latLng(position.coords.latitude, position.coords.longitude), 15);
            setTimeout(function()
                {
                updateCarte();
                }, 2000);
            };
            
        navigator.geolocation.getCurrentPosition(onSuccess);
        }
                      
    function InitialiserCarte()
        {
        map = L.map('map').setView(L.latLng(45.0441373, 3.8658617), 15);
        var tuileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        var osm = L.tileLayer(tuileUrl, {
            minZoom: 8, 
            maxZoom: 17
        });
        osm.addTo(map);
            
        navigator.geolocation.getCurrentPosition(function(position)
            {
            control = L.Routing.control({
                waypoints: [L.latLng(position.coords.latitude, position.coords.longitude), L.latLng(position.coords.latitude, position.coords.longitude)],
                routeWhileDragging: false,
                reverseWaypoints: true,
                showAlternatives: false
                }).addTo(map);
            });
            
        updateCarte();
        }
    
    $(document).ready(function()
        {
        InitialiserCarte();
        })

    })

.controller('FichCtrl', function($scope,$rootScope)
    {
        $scope.$on('$ionicView.beforeEnter', function() {
            $rootScope.viewColor = '#fff ';
        });
    })

.controller('StaticCtrl', function($scope)
    {

    });