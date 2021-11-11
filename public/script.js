let celdas;
let posGanador = [];

let jugadorActual;

let jug1;
let jug2;

let tj1;
let tj2;

let estado;

let checkBot;

let turno = true;
let enJuego = false;

let bot = new jugador("Bot", "O");
let turnoBot = false;


document.getElementById("play").addEventListener("click",registrar,false);
document.getElementById("reset").addEventListener("click",reset,false);

function jugador(nombre, signo) {
    this.nombre = nombre;
    this.signo = signo;
}

function registrar(){
	enJuego = true;
	let nameJug1=document.getElementById("jug1");
	let nameJug2=document.getElementById("jug2");
	
	if(nameJug2.value=="" && checkBot.checked && nameJug1.value != ""){
		jug1 = new jugador(nameJug1.value,"X");
		jug2 = bot;
		jugadorActual = jug1;
		    
		tj1.style.backgroundColor ="green";
		tj2.style.backgroundColor ="white";
	}else{	
		checkBot.checked = false;		
		if(nameJug1.value == "" || nameJug2.value==""){
			alert("llene los espacios");
		}else{
			jug1 = new jugador(nameJug1.value,"X");
		    jug2 = new jugador(nameJug2.value,"O");
		    jugadorActual = jug1;
		    
		    tj1.style.backgroundColor ="green";
		    tj2.style.backgroundColor ="white";
	   	}
	 }
   	document.getElementById("j1").innerHTML="Jugador 1: "+jug1.nombre+" ("+jug1.signo+")";

	document.getElementById("j2").innerHTML="Jugador 2: "+jug2.nombre+" ("+jug2.signo+")";
	turno = true;
	cleanTablero();
}

function cleanTablero(){
	for(i of celdas){
		var childs = i.childNodes;
		childs[0].innerHTML="";
	}
	for(i of celdas){
		i.style.backgroundColor = "rgba(128,128,128,0.5)";
	}

	estado.innerHTML = "";
}

function init(){
    celdas = document.getElementsByClassName("celdas");
    for(i of celdas){
        i.addEventListener("click", marcar,false);
    }
    
 	tj1 = document.getElementById("tj1");
 	tj2 = document.getElementById("tj2");

 	estado = document.getElementById("estado");

 	checkBot = document.getElementById("bot");
}

function marcar(){
    var childs = this.childNodes;
    if(childs[0].innerHTML == "" && enJuego){
    	if(!turnoBot){
        	childs[0].innerHTML = jugadorActual.signo;
        }
        turno = !turno;
        control();                 
        if (enJuego) {
        	controlTurno();
    	}
    	
    	if (turnoBot) {
    		jugarBot();
    	}
    }
}

function jugarBot(){
	let pos_jugada = jugadaBot();
	//console.log("Pos Jugada: "+pos_jugada);
	celdas[pos_jugada].childNodes[0].innerHTML = bot.signo;
	turno = !turno;
    control();  
    turnoBot = false;               
    if (enJuego) {
       	controlTurno();
   	}
}


function controlTurno(){
	if(turno){
		jugadorActual = jug1;
		tj1.style.backgroundColor ="green";
		tj2.style.backgroundColor ="white";
	}else{
		jugadorActual = jug2;
		tj1.style.backgroundColor ="white";
		tj2.style.backgroundColor ="green";
	}
	if(jugadorActual == bot){
		//console.log("Bot");
		turnoBot = true;
	}
}

function control(){
	let emp = empate();
	let gan = ganador();
	enJuego = emp || gan ? false:true;

	if(gan){
		for(i of posGanador){
			celdas[i].style.backgroundColor = "rgba(0, 150, 10, 0.5)";
		}
		estado.innerHTML = "GANÓ "+jugadorActual.nombre;
	}else if(emp){
		estado.innerHTML = "EMPATE";
		for(i of celdas){
			i.style.backgroundColor = "rgba(100, 100, 10, 0.5)";
		}
	}
	
}

function ganador(){
	return hor() || ver() || dig();
}

function hor(){
	let cont = 0;
	
	for(let i=0; i<celdas.length; i++){	
		if(celdas[i].childNodes[0].innerHTML==jugadorActual.signo){
			posGanador.push(i);
			cont++;
		}
		if(cont==3){
			return true;
		}
		if(i==2 || i==5){
			posGanador = []; 
			cont = 0;
		}
	}
	posGanador = [];
	return false;
}

function ver(){
	let cont = 0;
	for(let i=0; i<celdas.length; i+=3){
		if(celdas[i].childNodes[0].innerHTML==jugadorActual.signo){
			posGanador.push(i);
			cont++;
		}
		if(cont==3){
			return true;
		}
		if(i==6){
			i=-2;
			posGanador = [];
			cont=0;
		}
		if(i==7){
			i=-1;
			posGanador = [];
			cont=0;
		}
	}
	posGanador = [];
	return false;
}

function dig(){
	for(let i=0; i<celdas.length;i+=4){
		if(celdas[i].childNodes[0].innerHTML!=jugadorActual.signo){
			break;
		}else{
			posGanador.push(i);
			if(i==8){
				return true;
			}
		}
	}
	posGanador = [];
	for(let i=2;i<celdas.length;i+=2){
		if(celdas[i].childNodes[0].innerHTML!=jugadorActual.signo){
			break;
		}else{
			posGanador.push(i);
			if(i==6){
				return true;
			}
		}
	}
	posGanador = [];
	return false;
}

function empate(){
	for(i of celdas){
		var childs = i.childNodes;
		if(childs[0].innerHTML==""){
			return false;
		}
	}
	return true;
}

function reset(){
	for(i of celdas){
		var childs = i.childNodes;
		childs[0].innerHTML="";
	}
	for(i of celdas){
		i.style.backgroundColor = "rgba(128,128,128,0.5)";
	}

	posGanador = [];
	enJuego = false;
	turno = true;
	estado.innerHTML = "";
	tj1.style.backgroundColor ="white";
	tj2.style.backgroundColor ="white";
	document.getElementById("jug1").value = "";
	document.getElementById("jug2").value = "";
	document.getElementById("j1").innerHTML="Jugador 1: ";

	document.getElementById("j2").innerHTML="Jugador 2: ";
	checkBot.checked = false;
}

function jugadaBot(){
	let jugada;
	jugada = obtenerJugada("O");
	//console.log("Jugada Ganadora "+jugada);
	if(jugada == -1){
		jugada = obtenerJugada("X");
		if(jugada == -1){
			//console.log("jugada aleatoria");
			jugada = jugadaAleatoriaBot();
		}//else{console.log("jugada de salvacion");}
	}//else{console.log("jugada ganadora bot");}
	return jugada;
}

function obtenerJugada(signo){
	//console.log(signo);
	let jugada = jugadaHorizontalVerticalBot(signo, 3, 1, 0);
	if(jugada == -1){
		jugada = jugadaHorizontalVerticalBot(signo, 7, 3, 8);
		if(jugada == -1){
			jugada = jugadaDiagonalBot(signo);
			//if(jugada != -1){console.log("DIAGONAL");}
		}//else{console.log("VERTICAL");}
	}//else{console.log("HORIZONTAL");}

	return jugada;
}

function jugadaAleatoriaBot(){
	let sePudo = false;
	let jugada = -1;
	while(!sePudo){
		jugada = parseInt(Math.random()*9);
		if(celdas[jugada].childNodes[0].innerHTML == ""){
			sePudo = true;
		}
		
	}
	return jugada;
}

function jugadaHorizontalVerticalBot(signo, limite, incremento, decremento){
	//console.log(signo);
	let p=-1;
    let posicion = 0;
    let continuar = true;
    let cont = 0;
    for(let i=0;i<3;i++){
        let t=posicion;
        while(posicion<t+limite){
            if(celdas[posicion].childNodes[0].innerHTML=="" && continuar){
                if(p==-1){
                    p=posicion;
                }else{
                    p=-1;
                    continuar = false;
                }
            }else{
            	if(celdas[posicion].childNodes[0].innerHTML==signo){
            		cont++;
            	}
            }
            
            posicion+=incremento;
        }
        
        if(p!=-1 && cont == 2){
            return p;
        }
        p = -1;
        posicion -= decremento;
        continuar = true;
        cont = 0;
    }
    return -1;
}

function jugadaDiagonalBot(signo){
	//console.log(signo);
	let pos_jugada = jugadaDiagonalBot1(signo);
	if(pos_jugada == -1){
		pos_jugada = jugadaDiagonalBot2(signo);
	}
	return pos_jugada;
}

function jugadaDiagonalBot1(signo){
	let continuar = true;
	let p = -1;
	let cont = 0;
	for(let i=0; i<9; i+=4){
		if(celdas[i].childNodes[0].innerHTML=="" && continuar){
            if(p==-1){
                p=i;
            }else{
                p=-1;
                continuar = false;
            }
        }else{
            if(celdas[i].childNodes[0].innerHTML==signo){
            	cont++;
            }
        }
	}

	if(p!=-1 && cont == 2) return p;
	return -1;
}

function jugadaDiagonalBot2(signo){
	let continuar = true;
	let cont = 0;
	let p = -1;
	for(let i=2; i<8; i+=2){
		if(celdas[i].childNodes[0].innerHTML=="" && continuar){
            if(p==-1){
                p=i;
            }else{
                p=-1;
                continuar = false;
            }
        }else{
           	if(celdas[i].childNodes[0].innerHTML==signo){
           		cont++;
           	}
        }
	}

	if(p!=-1 && cont == 2){
	 return p;
	}
	return -1;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
window.addEventListener("load",init,false);
