let player_list = document.querySelectorAll('.player');
let restart_btn = document.querySelector(".reset-btn");

restart_btn.addEventListener("click", restart)

for(var player of player_list){
    player.addEventListener('click', set_player);
}


function Show_player(player_value, player){
    if(player.innerText == ''){
        player.innerHTML = player_value;
        player.style.visibility = 'visible';
    }

}

function set_player(){

    let playerValues = ['&#11093;','&#10060;','&#11093;','&#10060;','&#11093;','&#10060;'];
    let sort_value = Math.floor(Math.random() * 6);
    let player_value = playerValues[sort_value];

    Show_player(player_value, this); // mostra os players
    
    let row_position = this.parentElement.dataset.position_row;
    let player_position = this.dataset.position_player;

    Check_equality(row_position, player_position); // checa se "deu velha"
}


function Check_equality(row_position, player_position){
    let rows = document.querySelectorAll('.row');

    // Verifica a igualdade das peças na horizontal
    let horizontal_equal = rows[row_position].children[0].innerText == rows[row_position].children[1].innerText && 
    rows[row_position].children[2].innerText == rows[row_position].children[0].innerText;
    

    // Verifica a igualdade das peças na vertical
    let vertical_equal = false;

    if(player_position == 0){
        vertical_equal = rows[0].children[player_position].innerText == rows[1].children[player_position].innerText && 
        rows[2].children[player_position].innerText == rows[0].children[player_position].innerText;
    }
    
    else if(player_position == 1){
        vertical_equal = rows[0].children[player_position].innerText == rows[1].children[player_position].innerText && 
        rows[2].children[player_position].innerText == rows[0].children[player_position].innerText;
    }

    else if(player_position == 2){
        vertical_equal = rows[0].children[player_position].innerText == rows[1].children[player_position].innerText && 
        rows[2].children[player_position].innerText == rows[0].children[player_position].innerText;
    }


    // Verifica a igualdade das peças na diagonal
    let diagonal_equal = false;

    if(row_position == 0 && player_position == 0 || row_position == 2 && player_position == 2){
        diagonal_equal = rows[0].children[0].innerText === rows[1].children[1].innerText &&  
        rows[2].children[2].innerText === rows[0].children[0].innerText

    }

    else if(row_position == 0 && player_position == 2 || row_position == 2 && player_position == 0){
        diagonal_equal = rows[0].children[2].innerText === rows[1].children[1].innerText &&  
        rows[2].children[0].innerText === rows[0].children[2].innerText
    }

    
    if(diagonal_equal == true || vertical_equal == true || horizontal_equal == true){ // caso "dê velha"
        setTimeout(function(){
            game_over();
        }, 1000)
    }

}

function game_over(){ // mostra a mensagem de "fim de jogo"
    document.querySelector('.game_over').classList.add('active');

    setTimeout(()=>{
        restart();
        document.querySelector('.game_over').classList.remove('active');

    }, 3000)
}


function restart(){ // reinicia o jogo
    let rows = document.querySelectorAll(".row");

    for(var row of rows){
        for(var player of row.children){
            player.innerHTML = '';
        }
    }
}

