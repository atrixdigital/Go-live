
app.controller('studentCtrl', function ($scope,$rootScope,$http,$location,$routeParams,$document){


$scope.hidex = false;
var vm =this;


console.log('Student dashboard');
$scope.chatEnabled = false;





  //web RTC Shit      
            var connection = new RTCMultiConnection();
          $scope.roomUrls = '';

//Setting up roomid 
          if(!$scope.roomId){
  console.log('no room id found');
  console.log($scope.roomId);
}



console.log($scope.roomId);

    // comment-out below line if you do not have your own socket.io server
            connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

            connection.socketMessageEvent = 'audio-plus-screen-sharing-demo';
            connection.session = {
                audio: 'two-way', // merely audio will be two-way, rest of the streams will be oneway
                video: true,
                oneway: true
                 };
            connection.sdpConstraints.mandotory = {
            	OfferToReceiveAudio:true,
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
            	if(event.type === 'remote'){
            		remote.append(event.mediaElement);
               $scope.hidex = true;

            	}
            	if(event.type === 'local'){
            		local.append(event.mediaElement);
            	}
            
             }



           //once stream has started and connection is estalbished.
       

            var afterJoining = function(){
                   $scope.chatEnabler = true;
                   $scope.joinRoomBtn = true;
                             console.log('roomid is '+$scope.roomId);
                             
                           }
             $scope.joinRoom = function(){
                  $scope.roomId = $scope.rId;
            connection.checkPresence($scope.roomId, function(isRoomExist, roomid) {
             if (isRoomExist === true) {
                 connection.join($scope.roomId);
                  afterJoining();


                } else {
                  $scope.connError = 'Error! Room Id not found!'
                }
            });

              }
$scope.leaveRoom = function(){
	connection.disconnectWith($scope.roomId);
	//connection.streams.stop('remote');
	$scope.openRoomBtn = !$scope.openRoomBtn;

}
$scope.replaceScreen = function(){
	 connection.replaceTrack({
                    screen: true,
                    oneway: true
                });
}


});
