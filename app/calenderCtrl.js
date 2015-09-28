app.controller('calenderCtrl', function ($scope, $timeout, $rootScope, $routeParams, $location, $http, Data) {
        $scope.$on('$viewContentLoaded', function() {
            //var myEl = angular.element( window.self );
            //myEl.triggerHandler( "resize" );
        });
                    $scope.events = [];
                    $scope.sidemenu = true;
                    $scope.menuToggle = function () {  
                        if( $scope.sidemenu == false ){
                            $scope.sidemenu = true;
                        }else
                            $scope.sidemenu = false;
                    }

                    $scope.navigatorConfig = {
                        selectMode: "day",
                        showMonths: 1,
                        skipMonths: 1,
                        onTimeRangeSelected: function(args) {
                            $scope.weekConfig.startDate = args.day;
                            $scope.dayConfig.startDate = args.day;                            
                            loadEvents();
                        }
                    };

                    $scope.dayConfig = {
                        viewType: "Day",
                        onTimeRangeSelected: function(args) {
                            var params = {
                                start: args.start.toString(),
                                end: args.end.toString(),
                                text: "New Activity"
                            };

                            /*$http.post("createEvent", params).success(function(data) {
                                $scope.events.push({
                                    start: args.start,
                                    end: args.end,
                                    text: "New event",
                                    id: data.id
                                });
                            });*/
                            Data.post('createActivity', params).then(function (results) {
                                $scope.events.push({
                                    start: args.start,
                                    end: args.end,
                                    text: "New Activity",
                                    id: results.id
                                });
                                console.log(results);
                            });
                        },
                        onEventMove: function(args) {
                            var params = {
                                id: args.e.id(),
                                newStart: args.newStart.toString(),
                                newEnd: args.newEnd.toString()
                            };
                            Data.post('updateActivity', params);

                            //$http.post("backend_move.php", params);
                        },
                        onEventResize: function(args) {
                            var params = {
                                id: args.e.id(),
                                newStart: args.newStart.toString(),
                                newEnd: args.newEnd.toString()
                            };
                            Data.post('updateActivity', params);

                            //$http.post("backend_move.php", params);
                        },
                        onEventClick: function(args) {
                            var modal = new DayPilot.Modal({
                                onClosed: function(args) {
                                    if (args.result) {  // args.result is empty when modal is closed without submitting
                                        loadEvents();
                                    }
                                }
                            });
                            
                            modal.showUrl("edit.php?id=" + args.e.id());
                        }
                    };

                    $scope.weekConfig = {
                        visible: false,
                        viewType: "Week",
                        onTimeRangeSelected: function(args) {
                            var params = {
                                start: args.start.toString(),
                                end: args.end.toString(),
                                text: "New Activity"
                            };
                            
                            Data.post('createActivity', params).then(function (results) {
                                $scope.events.push({
                                    start: args.start,
                                    end: args.end,
                                    text: "New Activity",
                                    id: results.id
                                });
                                console.log(results);
                            });
                        },
                        onEventMove: function(args) {
                            var params = {
                                id: args.e.id(),
                                newStart: args.newStart.toString(),
                                newEnd: args.newEnd.toString()
                            };
                            Data.post('updateActivity', params);
                            //$http.post("backend_move.php", params);
                        },
                        onEventResize: function(args) {
                            var params = {
                                id: args.e.id(),
                                newStart: args.newStart.toString(),
                                newEnd: args.newEnd.toString()
                            };

                            $http.post("backend_move.php", params);
                        },
                        onEventClick: function(args) {
                            var modal = new DayPilot.Modal({
                                onClosed: function(args) {
                                    if (args.result) {  // args.result is empty when modal is closed without submitting
                                        loadEvents();
                                    }
                                }
                            });
                            modal.showUrl("edit.php?id=" + args.e.id());
                        }                      
                    };

                    $scope.showDay = function() {
                        $scope.dayConfig.visible = true;
                        $scope.weekConfig.visible = false;  
                        $scope.navigatorConfig.selectMode = "day";
                    };

                    $scope.showWeek = function() {
                        $scope.dayConfig.visible = false;
                        $scope.weekConfig.visible = true;                    
                        $scope.navigatorConfig.selectMode = "week";
                    };

                    loadEvents();

                    function loadEvents() {
                        // using $timeout to make sure all changes are applied before reading visibleStart() and visibleEnd()
                        $timeout(function() {
                            var params = {
                                start: $scope.week.visibleStart().toString(),
                                end: $scope.week.visibleEnd().toString()
                            }
                            /*Data.post("getEvents", params).success(function(data) {
                                $scope.events = data;
                                console.log(data);
                            });*/

                            Data.post('getActivity', params).then(function (results) {
                                $scope.events = results;
                                console.log(results);
                            });
                        });
                    }
                });