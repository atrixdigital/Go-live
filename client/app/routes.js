

app.config( function ($routeProvider,$locationProvider) {
	
	$routeProvider
//------------------------------------------
		//Teacher
		.when('/broadcast',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/broadcast/test_teacher.html'
	})	
		.when('/view',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/view/test_student.html'
	})	
	.otherwise({ redirectTo: '/broadcast' });

    $locationProvider.hashPrefix(''); 
})