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
                $scope.data = result;
                //alert("data = " + $scope.data.reponse);
                if ($scope.data.reponse == "oui")
                    {
                    $ionicPopup.alert(
                        {
                        title:'Correct !'
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
                    title:'Problème d\'accès réseau !'
                    });
                }
            );
        }
    })

.controller('LoginCtrl', function($scope, $state, $http, $ionicPopup)
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
                $scope.data = result;
                //alert("data = " + $scope.data.reponse);
                if ($scope.data.reponse == "oui")
                    {
                    $ionicPopup.alert(
                        {
                        title:'Correct !'
                        });
                    $state.go('tab.accueil');
                    }
                else
                    {
                    $ionicPopup.alert(
                        {
                        title:'Mauvais identifiant/mot de passe !'
                        });
                    }
                })
            .error(function(data)
                {
                $ionicPopup.alert(
                    {
                    title:'Problème d\'accès réseau !'
                    });
                }
            );
        }
    })

.controller('FintrajetCtrl', function($scope, $state)
    {
    $scope.$root.tabsHidden = "tabs-hide";
    
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
    })

.controller('TrajetcurrentCtrl', function($scope)
    {
    var map;
    var control;
    
    $scope.$root.tabsHidden = "tabs-hide";
    
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

.controller('StaticCtrl', function($scope)
    {
    $scope.$root.tabsHidden = "";
    })