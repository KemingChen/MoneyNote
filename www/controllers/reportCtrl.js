app.controller('ReportCtrl',
	function($scope, MNDB, google) {
	var className;
		$scope.init = function() {
			$scope.ControlName = "產生報表";
		};
		MNDB.selectClasses(onSelectClassQueryCallback);
		
		function onSelectClassQueryCallback(array){
			className = array;
		}
		console.log(className);
	}	
)
.directive("drawing", function(){
  return {
    restrict: "A",
    link: function($scope, $element, MNDB){
		var ctx = $element[0].getContext('2d');
		
		var data = [75,68,32,95,20,51];
		var className;
		var colors = ["#7E3817", "#C35817", "#EE9A4D", "#A0C544", "#348017", "#307D7E"];
		var center = [$element[0].width / 2, $element[0].height / 2];
		var radius = Math.min($element[0].width, $element[0].height) / 2.5;
		var lastPosition = 0, total = 0;
		console.log(MNDB);
		MNDB.selectClasses(onSelectClassQueryCallback);
		
		function onSelectClassQueryCallback(array){
			className = array;

			if($stateParams.action != "new"){
				console.log($stateParams.action);
				MNDB.selectItems(onSelectItemQueryCallback, {ikey: "=" + $stateParams.action});
			}
		}
		console.log(className);
		for(var i in data) { total += data[i]; }
		
		for (var i = 0; i < data.length; i++) {
			ctx.fillStyle = colors[i];
			ctx.beginPath();
			ctx.moveTo(center[0],center[1]);
			ctx.arc(center[0],center[1],radius,lastPosition,lastPosition+(Math.PI*2*(data[i]/total)));
			ctx.lineTo(center[0],center[1]);
			ctx.fill();
			lastPosition += Math.PI*2*(data[i]/total);
		}
      /*element.bind('mousedown', function(event){
        if(event.offsetX!==undefined){
          lastX = event.offsetX;
          lastY = event.offsetY;
        } else {
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }
        
        // begins new line
        ctx.beginPath();
        
        drawing = true;
      });
      element.bind('mousemove', function(event){
        if(drawing){
          // get current mouse position
          if(event.offsetX!==undefined){
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }
          
          draw(lastX, lastY, currentX, currentY);
          
          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
        
      });
      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
      });
        
      // canvas reset
      function reset(){
       //element[0].width = element[0].width; 
      }
      
      function draw(lX, lY, cX, cY){
        // line from
        /*ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = "#4bf";
        // draw it
        ctx.stroke();
      }*/
    }
  };
});


