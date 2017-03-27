angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope)
    {
    $scope.$root.tabsHidden = "tabs-hide";
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
    $scope.$root.tabsHidden = "tabs-hide";
    
    updateCarte()
        {
        setTimeout(function()
            {
            //code
            },500);
        }
                      
    function InitialiserCarte()
        {
        var map = L.map('map').setView([45.0401373, 3.8798617], 16);
        var tuileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        var osm = L.tileLayer(tuileUrl, {
            minZoom: 8, 
            maxZoom: 17
        });
        osm.addTo(map);
        var marker = L.marker([45.0401373, 3.8798617]).addTo(map);
            
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