myApp.controller('calculateCtrl', function($scope,igg) {
	$scope.input={'number':100};
	$scope.se="愛神";
	$(".select_1").select2({});
	$(".select_2").select2({minimumResultsForSearch: -1});
	$(".select_3").select2({minimumResultsForSearch: -1});
	$scope.check ={'status':false};
	$scope.btn_status = "計算數值";
	$scope.name_d = '??';
	$scope.at ='??';
	$scope.at_up = '??';
	$scope.life = '??';
	$scope.life_up = '??';
	$scope.re_life = '??';
	$scope.re_at = '??';
	$scope.star_d = '??';
	$scope.is_show = false;
	$scope.Calculate=function(){
		$scope.check ={'status':true};
		$scope.btn_status = "計算中...";
		if($scope.input.number<=0 || $scope.input.number>200){
			$scope.is_show = false;
			$scope.check ={'status':false};
			$scope.btn_status = "計算數值";
			alert('請輸入正確的等級範圍');
		}else if(typeof($scope.input.number)==undefined||typeof($scope.input.number)=='undefined'){
			$scope.is_show = false;
			$scope.check ={'status':false};
			$scope.btn_status = "計算數值";
			alert('等級請輸入數字');			
		}
		else{
			var name_type = $('.select_1').val();
			var class_type = parseInt($('.select_2').val());
			var star_type = parseInt($('.select_3').val());
			igg.get_hero_data(name_type,class_type,star_type).then(function(res){
				console.log(res);
				$scope.check ={'status':false};
				$scope.btn_status = "計算數值";
				$scope.name_d = res.data.results[0].name_2;
				$scope.at = res.data.results[0].attack;
				$scope.at_up = res.data.results[0].attack_up;
				$scope.life = res.data.results[0].life;
				$scope.life_up = res.data.results[0].life_up;
				$scope.star_d = res.data.results[0].star;
				// 星級生命值+生命成長X（英雄等級-1）
				$scope.re_life = $scope.life + $scope.life_up*($scope.input.number-1);
				// 星級攻擊力+攻擊成長X（英雄等級-1）
				$scope.re_at = $scope.at + $scope.at_up*($scope.input.number-1);
				$scope.is_show = true;
			});			
		}


	}



});

myApp.controller('calculate2Ctrl', function($scope) {

});

myApp.controller('aboutCtrl', function($scope) {

});