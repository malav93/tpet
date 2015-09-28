app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.isloginbtn = $scope.issignupbtn = false;
    $scope.sidemenu = true;
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {            
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.signup = {user_email:'',user_pass:'',display_name:'',user_profile_pic:''};
    $scope.signUp = function (customer) {        
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            //Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            $location.path('login');
        });
    }
    $scope.loginpopup = function () {        
        $scope.isloginbtn = true;
    }
    $scope.signuppopup = function () {        
        $scope.issignupbtn = true;
    }
    $scope.menuToggle = function () {  
        if( $scope.sidemenu == false ){
            $scope.sidemenu = true;
        }else
            $scope.sidemenu = false;
    }
    $scope.closeloginpopup = function () {        
        $scope.isloginbtn = false;
        $scope.issignupbtn = false;
    }
    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
});