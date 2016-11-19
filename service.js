/**
 * Created by Tamir on 14/11/2016.
 */
app.service("pointsService", function ($q, $timeout) {
    var sets;
    var setPoints = function (set) {
        sets = set;
    }
    
    var getPoints = function () {
        var dfd = $q.defer();

        $timeout(function () {
            var success = true;

            if(success) {
                dfd.resolve(sets);
            } else {
                dfd.reject("Error retrieving points");
            }
        }, 3000)

        return dfd.promise;
    }
    
    return {
        setPoints: setPoints,
        getPoints: getPoints
    }
})