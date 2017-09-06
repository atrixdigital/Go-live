
app.controller('teacherCtrl', function ($scope,$route,$location,$rootScope,$http,$routeParams,$document,$window){

var vm =this;
$scope.hidex = false;



console.log('Teacher dashboard');
$scope.chatEnabled = false;





  //web RTC Shit
      
            var connection = new RTCMultiConnection();
          $scope.roomUrls = '';


            connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

            connection.socketMessageEvent = 'audio-plus-screen-sharing-demo';
            connection.session = {
                audio: 'two-way', // merely audio will be two-way, rest of the streams will be oneway
                video: true,
                oneway: true
                 };
            connection.sdpConstraints.mandotory = {
            	OfferToReceiveAudio:false,
            	OfferToReceiveVideo:true
            };
                 var local = angular.element(document.getElementById('local-container'));
                var remote = angular.element(document.getElementById('remote-container'));
                  
                    // Using getScreenId.js to capture screen from any domain
            // You do NOT need to deploy Chrome Extension YOUR-Self!!
            connection.getScreenConstraints = function(callback) {
                getScreenConstraints(function(error, screen_constraints) {
                    if (!error) {
                        screen_constraints = connection.modifyScreenConstraints(screen_constraints);
                        callback(error, screen_constraints);
                        return;
                    }
                    throw error;
                });
            };
            connection.onstream = function(event){
            
            	if(event.type === 'local'){
                    local.append(event.mediaElement);
                }
                
        
                
            
             }

$scope.messages = [''];
$scope.setroomId = function(){
    if($routeParams.roomid){
      $rootScope.roomId = $routeParams.roomid;
      $rootScope.rId = $routeParams.roomid;
    }else{
      console.log('set roomId not working! no $routeParams exists.')
    }
}


            var afterStarting= function(){
                             $scope.chatEnabler = true;
                             $scope.openRoomBtn = true;
                             console.log('roomid is '+$scope.roomId);
                            


            }            
//open a room 
            $scope.openRoom = function(id){
              if(id){
                              $scope.roomId = id;

              }
              console.log('final roomId , starting room with' +$scope.roomId)
            
                 connection.open($scope.roomId);
                  afterStarting();
                
          
        }
$scope.leaveRoom = function(){
    connection.disconnectWith($scope.roomId);
    $window.location.reload();
   // $scope.stopStream ='stop';
    console.log('stop'+$scope.rId);
    local.innerHTML = '';
    local.empty();
    $scope.rId = '';   

	// connection.streams.stop('local');
	$scope.openRoomBtn = !$scope.openRoomBtn;

}
$scope.replaceScreen = function(){
	 connection.replaceTrack({
                    screen: true,
                    oneway: true
                });
}


});
