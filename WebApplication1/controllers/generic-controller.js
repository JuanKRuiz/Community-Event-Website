function gup(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}

function GenericController($scope, $http) {
    var week = gup('datasrc');

    $http.get('/data/' + week + '.json').success(function (data) {
        $scope.week = data;
    }).error(function (data, status, headers, config) {
        $http.get('/data/week1.json').success(function (data) {
            $scope.week = data;
        });
    });
}