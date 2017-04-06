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
                    $state.go('tab.login');
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
                if (result.status == "logged")
                    {
                    $scope.user = result;
                    sessionStorage.setItem('user', JSON.stringify($scope.user));
                    $ionicPopup.alert(
                        {
                        title:'Correct ! '
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
            $scope.user = JSON.parse(sessionStorage.getItem('user'));
            $http({
                method: "post",
                url: "http://upway-app.fr/app/dataload.php",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(
                    {
                    id_user: $scope.user.user_id
                    })
                }).success(function(result)
                    {
                    if (result.status == "logged")
                        {
                        $scope.statistiques = result;
                        sessionStorage.setItem('user_statistiques', JSON.stringify(result));
                        $('.niveau').css('width', ($scope.statistiques.user_point_xp * 100 / 450) + '%');
                        }
                    })
                .error(function(error)
                    {
                    alert("erreur = " + error);
                    }
                );
            });


        //////////////////////////// Page profil ////////////////////////////////////////

        //$scope.user = JSON.parse(sessionStorage.getItem('user'));
        $scope.inactive= true;
        $scope.editEmail= true;
        $scope.updatep = function(dataup)
        {
            $http({
                method: "post",
                url: "http://upway-app.fr/app/updateProfil.php",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(
                    {
                        id_user: $scope.user.user_id,

                        usermail: dataup.mail,
                        userpassword: dataup.password
                    })
            }).success(function(result)
            {
                if (result.reponse == "oui")
                {
                    $ionicPopup.alert(
                        {
                            title:'Modification !',
                            template:'Votre adresse mail et le mot de passe ont été mise à jour'
                        });
                    $state.go('tab.accueil');
                }
                else
                {
                    $ionicPopup.alert(
                        {
                            title:'Nouveau Email & mot de passe',
                            template:'Veuillez remplir l\'adresse mail et le mot de passe'
                        });
                }
            })
                .error(function(data)
                    {
                        $ionicPopup.alert(
                            {
                                title:'Accès réseau',
                                template:'Problème d\'accès réseau !'
                            });
                    }
                );
        };
        $scope.logout = function() {
            $state.go('tab.login');
            $scope.$on('$ionicView.enter', function(event, viewData) {
                $ionicHistory.clearCache();
            });
        }
    })

.controller('FintrajetCtrl', function($scope, $state, $http, $ionicPopup, $ionicHistory)
    {

    })

.controller('TrajetcurrentCtrl', function($scope, $state, $http, $ionicPopup, $ionicPlatform, $cordovaGeolocation, $ionicHistory)
    {
    $scope.trajet = {};
    
    $scope.user = JSON.parse(sessionStorage.getItem('user'));
    
    var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
        };
    var map;
    var control;
    var routeArray = new Array();

    function updateCarte()
        {
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position)
            {
            $ionicPopup.alert(
                {
                title:'POSITION OK CORDOVA PLUGIN'
                });
            control.spliceWaypoints(control.getWaypoints().length, 1, L.latLng(position.coords.latitude, position.coords.longitude));
            map.setView(L.latLng(position.coords.latitude, position.coords.longitude), 15);

            if (sessionStorage.getItem('trajet') == null)
                {
                setTimeout(function()
                    {
                    updateCarte();
                    }, 2000);
                }
            });
        }
                      
    function InitialiserCarte()
        {
        map = L.map('map').setView(L.latLng(45.0441373, 3.8658617), 15);
        var tuileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        var osm = L.tileLayer(tuileUrl, {
            minZoom: 8, 
            maxZoom: 15
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
            setTimeout(function()
                {
                updateCarte();
                }, 2000);
            }, function(error)
            {
            alert('error geolocation');
            });
        }
    
    function savePoints()
        {
        $scope.trajet.points = control.getWaypoints();
        }
    
    $scope.fintraj0 = function()
        {
        savePoints();
        $scope.trajet.fin = true;
        sessionStorage.setItem('trajet', JSON.stringify($scope.trajet));
        $state.go('tab.day_night');
        }
    $scope.fintraj1 = function()
        {
        $scope.trajet = JSON.parse(sessionStorage.getItem('trajet'));
        $scope.trajet.jour = $('input[name=jour]').prop('checked');
        
        sessionStorage.setItem('trajet', JSON.stringify($scope.trajet));
        $state.go('tab.meteo');
        }
    $scope.fintraj2 = function()
        {
        $scope.trajet = JSON.parse(sessionStorage.getItem('trajet'));
        $scope.trajet.tempsclair = $('input[name=tempsclair]').prop('checked');
        $scope.trajet.pluie = $('input[name=pluie]').prop('checked');
        $scope.trajet.neige = $('input[name=neige]').prop('checked');
        $scope.trajet.brouillard = $('input[name=brouillard]').prop('checked');
        
        sessionStorage.setItem('trajet', JSON.stringify($scope.trajet));
        $state.go('tab.manoeuvres');
        }
    $scope.fintraj3 = function()
        {
        $scope.trajet = JSON.parse(sessionStorage.getItem('trajet'));
        $scope.trajet.man = $('#cpt-manoeuvres').text();
        var pointsArray = new Array();
        routeArray = $scope.trajet.points;
        for (var i = 0; i < $scope.trajet.points.length; i++)
            {
            pointsArray[i] = "L.latLng(" + routeArray[i]['latLng']['lat'] + ", " + routeArray[i]['latLng']['lng'] + ")";
            //alert(pointsArray[i]);
            }
        $http({
            method: "post",
            url: "http://upway-app.fr/app/saveTrajet.php",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param(
                {
                id_user: $scope.user.user_id,
                    
                jour: $scope.trajet.jour,
                tempsclair: $scope.trajet.tempsclair,
                pluie: $scope.trajet.pluie,
                neige: $scope.trajet.neige,
                brouillard: $scope.trajet.brouillard,
                man: $scope.trajet.man,
                    
                "points_array[]": pointsArray
                })
            }).success(function(result)
                {
                alert(result.reponse);
                if (result.reponse == "oui")
                    {
                    $ionicPopup.alert(
                        {
                        title:'Trajet enregistré !'
                        });
                    $state.go('tab.recap_trajet');
                    }
                else
                    {
                    $ionicPopup.alert(
                        {
                        title:'Erreur'
                        });
                    }
                })
            .error(function(data)
                {
                $ionicPopup.alert(
                    {
                    title:'Problème de réseau !'
                    });
                }
            );
        }

    $(document).ready(function()
        {
        if (sessionStorage.getItem('trajet') == null)
            {
            InitialiserCarte();
            }
        else
            {
            $('.box-end-trajet').click(function()
                {
                var checkbox = $(this).children('.box-end-trajet-content').children('.box-end-trajet-check').children();
                if  (checkbox.prop('checked') == true)
                    {
                    checkbox.prop('checked', false);
                    $(this).removeClass("box-checked");
                    }
                else
                    {
                    checkbox.prop('checked', true);
                    $(this).addClass("box-checked"); 
                    }
                });

            $('.box-daynight').click(function()
                {
                $('.box-daynight').not($(this)).children('.box-end-trajet-content').children('.box-end-trajet-check').children().prop('checked', false)
                $('.box-daynight').removeClass("box-checked");
                $(this).addClass("box-checked");
                $('#input-daynight').val($(this).attr('name'));
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
            }
        });
    })

// .controller('ProfilCtrl', function($scope,$ionicPopup,$state, $ionicHistory, $http)
//     {
//
//
//     })
//
.controller('StaticCtrl', function($scope, $state, $http, $ionicPopup, $ionicHistory)
    {
        $scope.GoBack = function () {
            $ionicHistory.goBack();
        }
    });