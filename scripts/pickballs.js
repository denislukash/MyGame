"use strict";

function pickTheBall (event) {
    var target = event.target;
    var x = target.parentElement.getAttribute("data-x");
    var y = target.parentElement.getAttribute("data-y");

    matrix[y][x] = createBallObject(matrix[y][x].color);
    AddBallToFieldFromMatrix(y, x, "picked");
}

function pickAnotherBall(event) {
    var target = event.target;

    if ( target.hasAttribute("src") ){

        forEachCellandColor(function (row, column) {

            if( matrix[row][column].status === "picked" ){
                AddBallToFieldFromMatrix(row, column, "unpicked");
            }
        });
        pickTheBall(event);
    }
}

function moveBall(event) {
    var target = event.target;
    var x = target.getAttribute("data-x");
    var y = target.getAttribute("data-y");

    if( !target.hasAttribute("src") ) {

        forEachCellandColor(function (row, column) {

            if (matrix[row][column].status == "picked") {
                info.textContent = "Шар перемещается";

                matrix[y][x] = createBallObject(matrix[row][column].color);
                AddBallToFieldFromMatrix(y, x, "unpicked");

                matrix[row][column] = getObjForEmptyCell();
                AddBallToFieldFromMatrix(row, column);

                steps.textContent = counterForSteps(1);

                if(findOneColorBalls() || findOneColorBalls1()){
                    return;
                }else {
                    setTimeout(addRandomBallToField, 1000, 3);
                }
            }
        });
    }
}

function forEachCellandColor(callback) {
    for (var row = 0; row < matrix.length; row++){
        for (var column = 0; column < matrix[row].length; column++){
            callback(row, column);
        }
    }
}

parentOfGame_matrix.addEventListener("click", pickAnotherBall);

parentOfGame_matrix.addEventListener("click", moveBall);