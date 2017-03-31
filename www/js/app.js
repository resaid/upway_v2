// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  
  /* LOGIN + INSCRIPTION */
  
  
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html'
      }
    }
  })
  
  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  
  .state('tab.inscription', {
    url: '/inscription',
    views: {
      'tab-inscription': {
        templateUrl: 'templates/tab-inscription.html',
        controller: 'RegisterCtrl'
      }
    }
  })
  
  /* PAGES STATIC */
  
  .state('tab.accueil', {
    url: '/accueil',
    views: {
      'tab-accueil': {
        templateUrl: 'templates/tab-accueil.html',
        controller: 'AccueilCtrl'
      }
    }
  })
  
  .state('tab.statistiques', {
    url: '/statistiques',
    views: {
      'tab-statistiques': {
        templateUrl: 'templates/tab-statistiques.html',
        controller: 'AccueilCtrl'
        }
      }
    })
  
  .state('tab.anciens_trajets', {
    url: '/anciens_trajets',
    views: {
      'tab-anciens_trajets': {
        templateUrl: 'templates/tab-anciens_trajets.html',
        controller: 'StaticCtrl'
      }
    }
  })
  
  .state('tab.fiches', {
    url: '/fiches',
    views: {
      'tab-fiches': {
        templateUrl: 'templates/tab-fiches.html',
        controller: 'FichCtrl'
      }
    }
  })
  
  /* TRAJET */
  
  .state('tab.trajet_current', {
    url: '/trajet_current',
    views: {
      'tab-trajet_current': {
        templateUrl: 'templates/tab-trajet_current.html',
          controller: 'TrajetcurrentCtrl'
      }
    }
  })
  
  .state('tab.day_night', {
    url: '/day_night',
    views: {
      'tab-day_night': {
        templateUrl: 'templates/tab-day_night.html',
        controller: 'FintrajetCtrl'
      }
    }
  })
  
  .state('tab.meteo', {
    url: '/meteo',
    views: {
      'tab-meteo': {
        templateUrl: 'templates/tab-meteo.html',
        controller: 'FintrajetCtrl'
      }
    }
  })
  
  .state('tab.manoeuvres', {
    url: '/manoeuvres',
    views: {
      'tab-manoeuvres': {
        templateUrl: 'templates/tab-manoeuvres.html',
        controller: 'FintrajetCtrl'
      }
    }
  })
  
  .state('tab.recap_trajet', {
    url: '/recap_trajet',
    views: {
      'tab-recap_trajet': {
        templateUrl: 'templates/tab-recap_trajet.html',
        controller: 'FintrajetCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});