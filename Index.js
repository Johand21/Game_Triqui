const d_status = document.querySelector(".game_notification"),
    game_status = ["","","","","","","","",""],
    win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    win_msg = () => 'El jugador ' + current_player + ' a Ganado',
    draw_msg = () => 'El juego a termina en Empate'
    turn_player = () => 'Turno del jugador '+ current_player;

let game_active = true,
    current_player = "X"


function main() {
    display(turn_player())
    listeners()
}
main()

function display(message) {
    d_status.innerHTML = message
}

function listeners() {
    document.querySelector(".game_container").addEventListener("click", hand_cell_click)
    document.querySelector(".restart").addEventListener("click",restart_game)
}

function hand_cell_click(clickedevent) {
    const click_cell = clickedevent.target
    if(click_cell.classList.contains("game_cell")){
        const click_index = Array.from(click_cell.parentNode.children).indexOf(click_cell)
        console.log(click_index)
        if(game_status[click_index] !== "" || !game_active){
            return
        }

        cell_player(click_cell, click_index)
        result_validation()
    }
    console.log(click_cell  )
}

function restart_game() {
    game_active = true
    current_player = "X",
    restart_game_state()
    display(turn_player())
    document.querySelectorAll(".game_cell").forEach(cell => cell.innerText = "")}

function restart_game_state() {
    let i = game_status.length
    while(i--){
        game_status[i] = ""
    }
}


function cell_player(click_cell, click_index) {
    game_status[click_index] = current_player
    click_cell.innerText = current_player
}

function result_validation() {
    let round_Won = false
    for(let i = 0; i < win.length; i++){
        const win_condtion = win[i]
        let position1 = game_status[win_condtion[0]],
            position2 = game_status[win_condtion[1]],
            position3 = game_status[win_condtion[2]]
        if(position1 === "" || position2 === "" || position3 === ""){
            continue;
        }
        if(position1 == position2 && position2 == position3){
            round_Won = true;
            break;
        }
    }
    if(round_Won){
        display(win_msg())
        game_active = false
        return;
    }
    let round_draw = !game_status.includes("")

    if(round_draw){
        display(draw_msg())
        game_active = false
        return;
    }

    player_change()

}

function player_change() {
     current_player = (current_player === "X") ? "O" : "X"
     display(turn_player())
 }