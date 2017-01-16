"use strict";

function pickTheBall (event) {
    var target = event.target;
    var x = target.parentElement.getAttribute("data-x");
    var y = target.parentElement.getAttribute("data-y");
    var colorOfBall = matrix[y][x].ball.color;

    for (var i = 1; i < allBalls.length+1; i++){

        if (colorOfBall == i){
            matrix[y][x].ball = pickedBalls[i-1];
            AddBallToFieldFromMatrix(y, x);
            info.textContent = "Шар выбран";
        }
    }
}


function SameCode(event, callback) {

    for (var row = 0; row < matrix.length; row++){

        for (var column = 0; column < matrix[row].length; column++){

            for (var colorOfBall = 1; colorOfBall < pickedBalls.length+1; colorOfBall++){

                callback(row, column, colorOfBall, event)
            }
        }

    }
}

function pickAnotherBall(row, column, colorOfBall, event) {

    var target = event.target;

    if( matrix[row][column].ball.color == getColorForPickedBall(colorOfBall) && target.hasAttribute("src")){
        matrix[row][column].ball = allBalls[colorOfBall-1];
        AddBallToFieldFromMatrix(row, column);
    }

    pickTheBall(event);
}

function intermediateFNForEVENT(event, callbackFn) {

    return SameCode(event, callbackFn)
}

function moveBall(row, column, colorOfBall, event) {

    var target = event.target;
    var x = target.getAttribute("data-x");
    var y = target.getAttribute("data-y");

    if ( matrix[row][column].ball.color == getColorForPickedBall(colorOfBall) && !target.hasAttribute("src")) {

        info.textContent = "Шар перемещается";

        matrix[y][x].ball = allBalls[colorOfBall-1];
        AddBallToFieldFromMatrix(y, x);

        matrix[row][column].ball = "empty";
        AddBallToFieldFromMatrix(row, column);

        steps.textContent = counterForSteps(1);

        if(findOneColorBalls() || findOneColorBalls1()){
            return;
        }else {
            setTimeout(addRandomBallToField, 700);
        }


    }

}


function getColorForPickedBall(index) {

    return index + "a";
}


parentOfGame_matrix.addEventListener("click", intermediateFNForEVENT(event, pickAnotherBall));

parentOfGame_matrix.addEventListener("click", intermediateFNForEVENT(event, moveBall));