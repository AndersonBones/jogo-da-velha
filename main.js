let square_list = document.querySelectorAll('.square');
let restart_btn = document.querySelector(".reset-btn");

restart_btn.addEventListener("click", restart)

for(var square of square_list){
    square.addEventListener('click', set_square);
}


function Show_square(square_value, square){
    if(square.innerText == ''){
        square.innerHTML = square_value;
        square.style.visibility = 'visible';
    }

}

function set_square(){

    let squareValues = ['&#11093;','&#10060;','&#11093;','&#10060;','&#11093;','&#10060;'];
    let sort_value = Math.floor(Math.random() * 6);
    let square_value = squareValues[sort_value];

    Show_square(square_value, this); // mostra os squares
    
    let row_position = this.parentElement.dataset.position_row;
    let square_position = this.dataset.position_square;

    Check_equality(row_position, square_position);
}


function Check_equality(row_position, square_position){
    let rows = document.querySelectorAll('.row');

    // Verifica a igualdade das peças na horizontal
    let horizontal_equal = rows[row_position].children[0].innerText == rows[row_position].children[1].innerText && 
    rows[row_position].children[2].innerText == rows[row_position].children[0].innerText;
    

    // Verifica a igualdade das peças na vertical
    let vertical_equal = false;

    if(square_position == 0){
        vertical_equal = rows[0].children[square_position].innerText == rows[1].children[square_position].innerText && 
        rows[2].children[square_position].innerText == rows[0].children[square_position].innerText;
    }
    
    else if(square_position == 1){
        vertical_equal = rows[0].children[square_position].innerText == rows[1].children[square_position].innerText && 
        rows[2].children[square_position].innerText == rows[0].children[square_position].innerText;
    }

    else if(square_position == 2){
        vertical_equal = rows[0].children[square_position].innerText == rows[1].children[square_position].innerText && 
        rows[2].children[square_position].innerText == rows[0].children[square_position].innerText;
    }


    // Verifica a igualdade das peças na diagonal
    let diagonal_equal = false;

    if(row_position == 0 && square_position == 0 || row_position == 2 && square_position == 2){
        diagonal_equal = rows[0].children[0].innerText === rows[1].children[1].innerText &&  
        rows[2].children[2].innerText === rows[0].children[0].innerText

    }

    else if(row_position == 0 && square_position == 2 || row_position == 2 && square_position == 0){
        diagonal_equal = rows[0].children[2].innerText === rows[1].children[1].innerText &&  
        rows[2].children[0].innerText === rows[0].children[2].innerText
    }

    
    if(diagonal_equal == true || vertical_equal == true || horizontal_equal == true){ // 
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
        for(var square of row.children){
            square.innerHTML = '';
        }
    }
}

