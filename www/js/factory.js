var $parse_key
$parse_key = '90AEj0V5L6WtvPLdHn6aQdIlWZxMYRDWmkpYEoMg';  


myApp.factory('igg',  [
	'$http','$rootScope','$state','$q', function($http,$rootScope,$state,$q) {
		return {
			get_hero_data: function(name_type,class_type,star_type){
				return $http({ 		
					url:('https://api.parse.com/1/classes/hero_wake_data'),
					method: 'get',
					headers: 
					{ 
					'X-Parse-Application-Id':'BJL8MveoYwCrk1vogQXy8r8MhQvEpvQEdq0A5j0c', 
					'X-Parse-REST-API-Key':'kJhjlP4lLpNOFrgZ1hVlINACTZwOAprM0QAWFV9j',
					}
					,
					params:{
					where:{"name":name_type,"class":class_type,"star":star_type}	
					}
				}).then(function(res) {
					return res;
				});
			},
			get_hero_skill: function(){
				return $http({ 		
					url:('https://api.parse.com/1/classes/hero_skill'),
					method: 'get',
					headers: 
					{ 
					'X-Parse-Application-Id':'BJL8MveoYwCrk1vogQXy8r8MhQvEpvQEdq0A5j0c', 
					'X-Parse-REST-API-Key':'kJhjlP4lLpNOFrgZ1hVlINACTZwOAprM0QAWFV9j',
					},
					params:{
						// where:{"page":page}
						limit:1000,
						skip:0,
						order:'createdAt',	
					}
					// ,
					// params:{
					// where:{"name":name_type,"class":class_type,"star":star_type}	
					// }
				}).then(function(res) {
					return res;
				});
			}			
		};
	}

]);




