myApp.controller('calculateCtrl', function($scope,igg,$ionicPopup) {
	$scope.input={'number':100};
	$scope.se="愛神";
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
	$scope.lv ='';

	$.ajax({
    type: "get",
    url: "https://spreadsheets.google.com/feeds/list/1GBuyuOr4jHvUEQSZf2OirHONKc58Hm241jRgdJoHJ4k/od6/public/values?alt=json-in-script&callback=?",
    dataType: "jsonp",
	    success: function(json){
	    	// console.log(json);
	        $scope.hero_data =[];
	        _(json.feed.entry).each(function (item) {
	        	var d = {'name':item.gsx$name.$t,'name_2':item.gsx$name2.$t,'class':item.gsx$class.$t,'star':item.gsx$star.$t,'attack':item.gsx$attack.$t,'life':item.gsx$life.$t,'attack_up':item.gsx$attackup.$t,'life_up':item.gsx$lifeup.$t}
	        	$scope.hero_data.push(d);
	        });
	        // console.log($scope.hero_data);
	    }
    });

	$scope.get_name='';
	$scope.select_name =  [
		{name:'愛神'},
		{name:'不死領主'},
		{name:'德魯伊'},
		{name:'法老'},
		{name:'海盜船長'},
		{name:'花妖'},
		{name:'毀滅之王'},
		{name:'混沌騎士'},
		{name:'火焰之翼'},
		{name:'雷神'},
		{name:'烈焰術士'},
		{name:'鱗甲毒蠍'},
		{name:'魅魔'},
		{name:'娜迦祭司'},
		{name:'南瓜公爵'},
		{name:'牛頭酋長'},
		{name:'森林之王'},
		{name:'山丘之王'},
		{name:'聖誕老人'},
		{name:'聖誕女郎'},
		{name:'聖騎士'},
		{name:'死神'},
		{name:'死亡騎士'},
		{name:'邪眼惡靈'},
		{name:'雪人'},
		{name:'血斧'},
		{name:'血族親王'},
		{name:'鷹身女王'},
		{name:'影舞者'},
		{name:'幽靈法師'},
		{name:'蒼藍之翼'},
		{name:'甜心女皇'},
		{name:'幽靈之王'}
	  ];

	$scope.get_class='';
	$scope.select_class =  [
		{name:'未覺醒',class_d:0},
		{name:'一轉',class_d:1},
		{name:'二轉',class_d:2},
	  ];

	$scope.get_star='';
	$scope.select_star =  [
		{name:'一星 [ 001 ~ 020 等]',star:1},
		{name:'二星 [ 020 ~ 040 等]',star:2},
		{name:'三星 [ 040 ~ 060 等]',star:3},
		{name:'四星 [ 060 ~ 080 等]',star:4},
		{name:'五星 [ 080 ~ 100 等]',star:5},
		{name:'六星 [ 100 ~ 120 等]',star:6},
		{name:'七星 [ 120 ~ 140 等]',star:7},
		{name:'八星 [ 140 ~ 160 等]',star:8},
		{name:'九星 [ 160 ~ 180 等]',star:9},
		{name:'十星 [ 180 ~ 200 等]',star:10},
	  ];

	$scope.getOpt = function(option){
		$scope.get_name = option;
	};  
	$scope.getOpt2 = function(option){
		$scope.get_class = option;
	}; 
	$scope.getOpt3 = function(option){
		$scope.get_star = option;
	};  
		
	var res = {Messages:''};
	$scope.Calculate=function(){
		$scope.lv=$scope.input.number;
		$scope.check ={'status':true};
		$scope.btn_status = "計算中...";
		if($scope.input.number<=0 || $scope.input.number>200){
			$scope.is_show = false;
			$scope.check ={'status':false};
			$scope.btn_status = "計算數值";
			res.Messages = '請輸入正確的等級範圍';
			$ionicPopup.alert({title: '<p class="Fs_1_5 Fw_900 no-margin">提示</p>',template: '<p class="text-center">' + res.Messages + '</p>',buttons: [{ text: '确定',type: 'button-positive' }]});
		}
		else if(typeof($scope.input.number)==undefined||typeof($scope.input.number)=='undefined'){
			$scope.is_show = false;
			$scope.check ={'status':false};
			$scope.btn_status = "計算數值";
			res.Messages = '等級請輸入數字';
			$ionicPopup.alert({title: '<p class="Fs_1_5 Fw_900 no-margin">提示</p>',template: '<p class="text-center">' + res.Messages + '</p>',buttons: [{ text: '确定',type: 'button-positive' }]});		
		}
		else{
			var input_value = $scope.input.number;
			if($scope.get_star.star==1){
				var start_value = $scope.get_star.star;
				var end_value = ($scope.get_star.star)*10*2;
			}else{
				var start_value =  ($scope.get_star.star-1)*20;
				var end_value = ($scope.get_star.star)*10*2;
			}
			if($scope.get_name=='' || $scope.get_class =='' || $scope.get_star==''){
				$scope.is_show = false;
				$scope.check ={'status':false};
				$scope.btn_status = "計算數值";
				res.Messages = '尚有項目未選取';
				$ionicPopup.alert({title: '<p class="Fs_1_5 Fw_900 no-margin">提示</p>',template: '<p class="text-center">' + res.Messages + '</p>',buttons: [{ text: '确定',type: 'button-positive' }]});
			}else{
				if(start_value > input_value || end_value < input_value){
					$scope.is_show = false;
					$scope.check ={'status':false};
					$scope.btn_status = "計算數值";
					res.Messages = '請輸入正確星級範圍內的等級';
					$ionicPopup.alert({title: '<p class="Fs_1_5 Fw_900 no-margin">提示</p>',template: '<p class="text-center">' + res.Messages + '</p>',buttons: [{ text: '确定',type: 'button-positive' }]});
				}else{
					var name_type = $scope.get_name.name;
					var class_type = $scope.get_class.class_d;
					var star_type = $scope.get_star.star;
					var d2 = _.where($scope.hero_data, {name:name_type, star:star_type.toString(), class:class_type.toString()});	
					$scope.check ={'status':false};
					$scope.btn_status = "計算數值";
					$scope.name_d = d2[0].name_2;
					$scope.at = d2[0].attack;
					$scope.at_up = d2[0].attack_up;
					$scope.life = d2[0].life;
					$scope.life_up = d2[0].life_up;
					$scope.star_d = d2[0].star;
					// 星級生命值+生命成長X（英雄等級-1）
					$scope.re_life = parseInt($scope.life) + parseInt($scope.life_up)*($scope.input.number-1);
					// 星級攻擊力+攻擊成長X（英雄等級-1）
					$scope.re_at = parseInt($scope.at) + parseInt($scope.at_up)*($scope.input.number-1);
					$scope.is_show = true;					
				}				
			}

		}
	}

});

myApp.controller('calculate2Ctrl', function($scope,igg,$timeout,$ionicLoading,$ionicScrollDelegate) {
	$scope.hero_skill_list = '';
	$ionicLoading.show({
      template: '載入資料中...'
    });

	$.ajax({
    type: "get",
    url: "https://spreadsheets.google.com/feeds/list/1Y295CQka_-c4SzN_18Nxliw040WlHlYzFNgMjvPKqZY/od6/public/values?alt=json-in-script&callback=?",
    dataType: "jsonp",
	    success: function(json){
	        $scope.hero_skill_list =[];
	        _(json.feed.entry).each(function (item) {
	        	var d = {'name':item.gsx$name.$t,'skill':item.gsx$skill.$t,'des':item.gsx$des.$t}
	        	$scope.hero_skill_list.push(d);

	        });
	        $ionicLoading.hide();
	        // console.log($scope.hero_skill_list);
	    }
    });
	
	$scope.gotop = function(){
		$ionicScrollDelegate.resize();
    	$ionicScrollDelegate.anchorScroll(false); //回顶部2
	}	

});

myApp.controller('aboutCtrl', function($scope) {

});