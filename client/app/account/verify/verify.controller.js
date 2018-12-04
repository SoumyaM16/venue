'use strict';

export default class VerifyAccountCtrl {

  /*@ngInject*/
  constructor($scope, $routeParams, User, $location, appConfig, Auth) {
    $scope.loggedIn = true;
    $scope.isSignedUp = true;
    $scope.isVerified = false;
    $scope.tryVerify = true;
    $scope.isStudent = true;
    $scope.isInstructor = false;
    if ($routeParams.id == "emailVerification"){
      $scope.tryVerify = false;
    }
    else{
      User.verify({controller: $routeParams.id}, (res)=>{
        $scope.isVerified = res.isVerified;
        Auth.getCurrentUser((user) => {
          $scope.user = user;
          $scope.loggedIn = Auth.isLoggedInSync();
          if ($scope.loggedIn){
            $scope.isStudent = Auth.isStudentSync();
            $scope.isInstructor = Auth.isInstructorSync();
          }
        });
      });
      $scope.getLogin = function(){
        return "/login";
      };
      $scope.getDashboard = function(){
        if ($scope.isStudent){
          return "/student/dashboard"
        }
        else if ($scope.isInstructor) {
          return "/instructor/dashboard"
        }
      };
      $scope.getResendEmail = function(){
        return "/verify/resendEmail";
      };
    }
  }
}
