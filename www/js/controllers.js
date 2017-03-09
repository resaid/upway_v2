angular.module('starter.controllers', [])

.controller('FintrajetCtrl', function($scope)
    {

    $scope.$root.tabsHidden = "tabs-hide";
    
    function match_bg_images()
        {
        $('.box-end-trajet').each(function()
            {
            $(this).children('.box-end-trajet-bg').attr("src", "img/end-trajet/" + $(this).attr('name') + ".jpg");
            });
        }
    
    $(document).ready(function()
        {
        match_bg_images();
        $('.box-end-trajet').click(function()
            {
            $(this).toggleClass("box-checked");
            });
        });
    });