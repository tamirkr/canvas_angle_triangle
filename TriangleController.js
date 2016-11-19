/**
 * Created by Tamir on 14/11/2016.
 */
app.controller('TriangleCtrl', function (pointsService, $q) {
    var ctrl = this;

    var pointsPromise = pointsService.getPoints();

    $q.when(pointsPromise)
        .then(getAllPoints)
        .catch(errMessage)

    function getAllPoints(data) {
        ctrl.points = data;
        draw();

    }

    function errMessage(err) {
        console.log(err);
    }

    function draw() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.moveTo(ctrl.points.a, ctrl.points.b);
            ctx.lineTo(ctrl.points.c, ctrl.points.d);
            ctx.lineTo(ctrl.points.e,ctrl.points.f);
            ctx.closePath();
            ctx.stroke();

            //draw the intersection points
            ctx.fillText('A', ctrl.points.a, ctrl.points.b);
            ctx.fillText('B', ctrl.points.c, ctrl.points.d);
            ctx.fillText('C', ctrl.points.e, ctrl.points.f);



            //calculate distances
            ctrl.points.AB = Math.sqrt(Math.pow(ctrl.points.d - ctrl.points.b,2) + Math.pow(ctrl.points.c - ctrl.points.a,2));
            ctrl.points.AC = Math.sqrt(Math.pow(ctrl.points.f - ctrl.points.b,2) + Math.pow(ctrl.points.e - ctrl.points.a,2));
            ctrl.points.BC = Math.sqrt(Math.pow(ctrl.points.f - ctrl.points.d,2) + Math.pow(ctrl.points.e - ctrl.points.c,2));

            //calculate angles

            ctrl.points.angleA = (Math.pow(ctrl.points.BC, 2) + Math.pow(ctrl.points.AC, 2) - Math.pow(ctrl.points.AB, 2)) / (2 * ctrl.points.BC * ctrl.points.AC);
            ctrl.points.angleA = Math.acos(ctrl.points.angleA) * (180/Math.PI);

            ctrl.points.angleB = (Math.pow(ctrl.points.AB, 2) + Math.pow(ctrl.points.AC, 2) - Math.pow(ctrl.points.BC, 2)) / (2 * ctrl.points.AB * ctrl.points.AC);
            ctrl.points.angleB = Math.acos(ctrl.points.angleB) * (180/Math.PI);

            ctrl.points.angleC = (Math.pow(ctrl.points.AB, 2) + Math.pow(ctrl.points.BC, 2) - Math.pow(ctrl.points.AC, 2)) / (2 * ctrl.points.AB * ctrl.points.BC);
            ctrl.points.angleC = Math.acos(ctrl.points.angleC) * (180/Math.PI);

            function drawAngle(x, y, dirA, dirB){
                dirB += Math.PI;              // revers second direction
                var sweepAng = dirB - dirA;   // angle between lines
                var startAng = dirA;          // angle to start the sweep of the arc
                if(Math.abs(sweepAng) > Math.PI){  // if the angle us greater the 180
                    sweepAng = Math.PI * 2 - sweepAng;  // get the smaller angle
                    startAng = dirB;          // and change the start angle
                }
                ctx.beginPath();
                if(sweepAng < 0){                  // if the angle is sweeping anticlockwise
                    ctx.arc(x, y, minDist ,startAng + sweepAng , startAng);
                }else{                        // draw clockwise angle
                    ctx.arc(x, y, minDist, startAng, startAng + sweepAng);
                }
                ctx.lineWidth = 3;               // draw the lines of the triangle
                ctx.strokeStyle = "red";
                ctx.stroke();                 // all done

                // Draw the angle values on screen
                ctx.fillText(ctrl.points.angleB, ctrl.points.a + 20, ctrl.points.b)
                ctx.fillText(ctrl.points.angleC, ctrl.points.c + 20, ctrl.points.d)
                ctx.fillText(ctrl.points.angleA, ctrl.points.e + 20, ctrl.points.f);


            }
            // get the 3 directions of the lines
            var dir1 = direction(ctrl.points.a, ctrl.points.b, ctrl.points.c, ctrl.points.d);
            var dir2 = direction(ctrl.points.c, ctrl.points.d, ctrl.points.e, ctrl.points.f);
            var dir3 = direction(ctrl.points.e, ctrl.points.f, ctrl.points.a, ctrl.points.b);
            var minDist = Math.min(ctrl.points.AB, ctrl.points.AC, ctrl.points.BC); // get the min dist;
            if(minDist === 0){
                return;
            }
            minDist /= 5;


            drawAngle(ctrl.points.a, ctrl.points.b, dir1, dir3);
            drawAngle(ctrl.points.c, ctrl.points.d, dir2, dir1);
            drawAngle(ctrl.points.e, ctrl.points.f, dir3, dir2);



        }

        console.log(ctrl.points)
    }

    function direction(x, y, xx, yy) {
        var angV = Math.acos( (xx - x) / Math.sqrt( Math.pow(x - xx, 2) + Math.pow(y - yy, 2) ) );

        if (y - yy > 0) angV = - angV; // check the sign

        return (angV + Math.PI * 2) % (Math.PI * 2); 
    }

})

