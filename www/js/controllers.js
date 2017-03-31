angular.module('starter.controllers', ['ionic','ngCordova'])

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
                    $('.niveau').css('width', ($scope.statistiques.user_point_xp * 100 / 450) + '%');
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
            if ($(this).hasClass("box-checked"))
                {
                $(this).next('input').val(0);
                $(this).removeClass("box-checked");
                }
            else
                {
                $(this).next('input').val(1);
                $(this).addClass("box-checked");
                }
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

.controller('TrajetcurrentCtrl', function($scope, $ionicPopup, $ionicPlatform, $cordovaGeolocation)
    {
    var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
        };
    var map;
    var control;

    function updateCarte()
        {
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position)
            {
            alert("POSITION OK CORDOVA PLUGIN");
            control.spliceWaypoints(control.getWaypoints().length, 1, L.latLng(position.coords.latitude, position.coords.longitude));
            map.setView(L.latLng(position.coords.latitude, position.coords.longitude), 15);
            });
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
            
        $cordovaGeolocation.getCurrentPosition().then(function (position)
            {
            control = L.Routing.control({
                waypoints: [L.latLng(position.coords.latitude, position.coords.longitude), L.latLng(position.coords.latitude, position.coords.longitude)],
                routeWhileDragging: false,
                reverseWaypoints: true,
                showAlternatives: false
                }).addTo(map);
            $ionicPopup.alert(
                {
                title:'Lancement du trajet'
                });
            }, function(error)
            {
            alert('error geolocation');
            });
            
        setTimeout(function()
            {
            updateCarte();
            }, 2000);
        }
    
    $(document).ready(function()
        {
        InitialiserCarte();
        })

    })

.controller('ProfilCtrl', function($scope)
    {
    
    })

.controller('StaticCtrl', function($scope)
    {
    })