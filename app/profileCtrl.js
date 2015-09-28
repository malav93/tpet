app.controller('profileCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.sidemenu = true;
    $scope.userProfile = {uid:'',user_email:'',user_education:'',display_name:'',user_category:'',user_designation:''};
    $scope.userProfile = $routeParams;
    
    $scope.userProfile = function () {
        Data.post('userProfile', {
        }).then(function (results) {
            if (results.uid) {
                $scope.userProfile.display_name = results.display_name;
                $scope.userProfile.uid = results.uid;
                $scope.userProfile.user_email = results.user_email;
                $scope.userProfile.user_education = results.user_education;
                $scope.userProfile.user_category = results.user_category;
                $scope.userProfile.user_designation = results.user_designation;
                $scope.userProfile.user_employment_history = results.user_employment_history;
                $scope.userProfile.user_about_me = results.user_about_me;
                $scope.userProfile.user_profile_pic = results.user_profile_pic;
            }else{
            console.log("error");
            }
        });
    };

    $scope.profileEdit = function () { 
        userData ={
                    'ID' : $scope.userProfile.uid,
                    'user_designation' : $scope.userProfile.user_designation,
                    'user_education' : $scope.userProfile.user_education,
                    'user_category' : $scope.userProfile.user_category,
                    'user_employment_history' : $scope.userProfile.user_employment_history,
                    'user_about_me' : $scope.userProfile.user_about_me,
                    'user_profile_pic' : $scope.user_profile_pic
                };
        Data.post('profileEdit', {
            userData: userData
        }).then(function (results) {
            if (results.status == "success") {
                $location.path('profile');
            }
        });
    };
    
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            $location.path('login');
        });
    }
    $scope.menuToggle = function () {  
        if( $scope.sidemenu == false ){
            $scope.sidemenu = true;
        }else
            $scope.sidemenu = false;
    }
    $scope.userProfile();

});