$(function () {

    //giving objects name to variables
    var container = $('#container');
    var copter = $('#copter');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    // initial values
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var copter_left = parseInt(copter.css('left'));
    var copter_height = parseInt(copter.height());
    var speed = 10;

    //some other declarations for controls
    var go_up = false;
    var score_updated = false;
    var game_over = false;


    var the_game = setInterval(function () {											

        if (collision(copter, pole_1) || collision(copter, pole_2) || parseInt(copter.css('top')) <= 0 || parseInt(copter.css('top')) > container_height - copter_height) {

            stop_the_game();

        } else {

            var pole_current_position = parseInt(pole.css('right'));
 
            //update the score when the poles have passed the copter successfully
            if (pole_current_position > container_width - copter_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }

            //check whether the poles went out of the container
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);

                //change the pole's height
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);

                //increase speed
                speed = speed + 5;
                speed_span.text(speed);			//display speed

                score_updated = false;

                pole_current_position = pole_initial_position;      //for reoccurance of pole
            } 

            //move the poles
            pole.css('right', pole_current_position + speed);

            if (go_up === false) {
                go_down();
            }
        }

    }, 35);										//40 states the difference btw 2 consecutive bar
// easy medium hard kar dena
    $(document).on('keydown', function (e) {	// declaring space bar as go up key
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function (e) {				
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });


    function go_down() {
        copter.css('top', parseInt(copter.css('top')) + 5);
    }

    function up() {
        copter.css('top', parseInt(copter.css('top')) - 10);
    }

    function stop_the_game() {
        clearInterval(the_game);
        game_over = true;
        restart_btn.slideDown();
    }

    restart_btn.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



});