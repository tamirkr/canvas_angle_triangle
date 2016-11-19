/**
 * Created by Tamir on 14/11/2016.
 */
app.controller('HomeCtrl',['pointsService', function (pointsService) {
    var ctrl = this;




    ctrl.submit = function () {
        var sets = {
            a: ctrl.a,
            b: ctrl.b,
            c: ctrl.c,
            d: ctrl.d,
            e: ctrl.e,
            f: ctrl.f
        };
        
        pointsService.setPoints(sets);

        
    }

}])