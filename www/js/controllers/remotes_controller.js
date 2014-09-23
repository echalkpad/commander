commander.controller('RemotesController', ['$scope', '$http', '$ionicNavBarDelegate', function($scope, $http, $ionicNavBarDelegate) {
  $scope.configuration = JSON.parse(localStorage.commander);
  $scope.commands = $scope.configuration.commands;
  $scope.remotes_config = $scope.configuration.remote_address || {url: "http://localhost:8080"};
  $scope.message = 'Import Commands';
  $scope.remotes = [];

  $scope.getRemoteCommands = function() {
    var url = $scope.remotes_config.url || "http://localhost:8080";

    $http({method: 'GET', url: url}).
      success(function (data, status, headers, config) {
        $scope.remotes = data.commands;
        $scope.message = 'Commands imported from: ' + url;
      }).
      error(function (data, status, headers, config) {
        $scope.message = 'Error: No Remote Commands available...';
      });
  };

  $scope.getRemoteCommands();

  $scope.saveRemotes = function(remotes) {
    angular.forEach(remotes, function(remote, index){
      if(remote.selected == true) {
        $scope.addRemote(remote);
      }
    });
  };

  $scope.findCommand = function(command) {
    for (var i = 0; i < $scope.commands.length; i++) {
      if ($scope.commands[i].label === command.label) {
        return true;
      }
    }
    return false;
  };

  $scope.addRemote = function(remote) {
    delete(remote.selected);
    if(!$scope.findCommand(remote)){
      $scope.configuration.commands.push(remote);
      $scope.saveConfiguration();
    }
  };

  $scope.editRemotesAPI = function(remotes_config) {
    $scope.configuration.remote_address = remotes_config;
    $scope.saveConfiguration();
  };

  $scope.saveConfiguration = function() {
    localStorage.commander = JSON.stringify($scope.configuration);
  };

  $scope.goBack = function() {
    $ionicNavBarDelegate.back();
  };

  $scope.remotesEndpointAvailable = function() {
    if (!$scope.remotes_config.url){
      return(true);
    }
    else{
      return(false);
    }
  };
}]);

