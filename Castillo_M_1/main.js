let canvas =  document.querySelector('#mi_canvas');
let ctx = canvas.getContext('2d');
let obtenerFigura = document.querySelector('#figura');

//variables
let widthCanvas = canvas.width;
let heightCanvas = canvas.height;
let mover = false;
let usarTeclado = false;
let figura;
let figAux;
let puntoX = 0;
let puntoY = 0;

//constantes
const MAX_ANCHO = 50;
const MAX_ALTO = 60;
const MAX_RADIO = 50;
const CANT_MAX = 12;

// arrgelos
let figuras = []; //guardamos las figuras que creamos

//genera color random y su complementario para cuadrado y circulo
function obtenerColor(){
    const colores= [
        ['#FE2D00','#00D1FE'],
        ['#FEF300 ','#000BFE'],
        ['#DAFE00','#2400FE'],
        ['#93FE00', '#6B00FE'],
        ['#00FE28', '#FE00D6'],
        ['#EE82EE', '#FEC700'],
        ['#0037FE', '#30FE00'],
        ['#CE00FE', '#00FE87'],
        ['#FE0077', '#FE007D']];
        
        let colorRandom = Math.floor(Math.random() * colores.length);
        return colores[colorRandom];
}

function main(){
    crearFigura();
    dibujarFiguras();
}

function crearFigura(){
    if(figuras.length < CANT_MAX){
        agregarFiguras(); //funcion agrega si no hay la misma cantidad de figuras
        crearFigura();
    }
    return; //si ingresa es por que alcanzo el maximo y corta la ejecucion    
}

function dibujarFiguras(){
    for(let i = 0; i < figuras.length; i++){
        figuras[i].draw();
    }
}

//genera color random para rectangulo 
function colorRandom(){
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    let a = 255;
    return 'rgba('+r+','+g+','+b+','+a+')';
}


//crea la figura cumpliendo con determinadas condiciones y lo inserta al final del arreglo, puede crear figuras muy pequeñas
function agregarFiguras(){
    let posX = Math.floor( Math.random() * (widthCanvas - MAX_ANCHO) + 1); // Max_ANCHO Y MAX_ALTO al restarlos ajusta los rangos para dibujarlos dentro del canvas
    let posY = Math.floor( Math.random() * (heightCanvas - MAX_ALTO) + 1);
    let alto = Math.floor( Math.random() * MAX_ALTO);
    let ancho = Math.floor( Math.random() * MAX_ANCHO) + 20; //fue agregado el mas 20 para que se visualice a la vista un rectangulo de un cuadrado, ya que al pintar en el lienzo no se diferenciaba a la vista cuadrado de rectangulo
    let colorCuadrado = obtenerColor();
    if((figuras.length < (CANT_MAX/3))){
        let cuadra = new Square(posX, posY, alto, ctx, colorCuadrado[0]);
        figuras.push(cuadra);
    }
    else if(figuras.length > ((CANT_MAX/3)) && figuras.length < 9){ //establece, crea y agrega un rectangulo
        let colorRectangulo =  colorRandom();
        let rectangulo = new Rect(posX, posY, ancho, alto, ctx, colorRectangulo);
        figuras.push(rectangulo);
    }
    else{ //establece, crea y agrega un cuadrado
        let posX = Math.floor( Math.random() * (widthCanvas - 2 * MAX_RADIO) + MAX_RADIO) + 1;  // Ajustar posX y hace lo mismo en posYpara que el círculo esté completamente dentro del canvas
        let posY = Math.floor( Math.random() * (heightCanvas - 2 * MAX_RADIO) + MAX_RADIO) + 1;
        let radio = Math.floor(Math.random() * MAX_RADIO);
        let circu = new Cicle(posX, posY, radio, ctx, colorCuadrado[1]);
        figuras.push(circu);
    }
}

// evento que da alerta cuando estamos sobre una figura
canvas.addEventListener('click', (e) => { 
    puntoX = e.offsetX;
    puntoY = e.offsetY;
    figAux = recorrerFiguras(puntoX, puntoY);
    if(figAux != null){
        alert('Se encuentra sobre una figura');
    }
})

//Obtiene los puntos de la figura
function recorrerFiguras(puntoX, puntoY){
    for(let i = 0; i < figuras.length; i++){
        if(figuras[i].saberPunto(puntoX, puntoY)){
            return figuras[i];
        }
    }
    return null;
}

//Evento disparado al apretar el mouse
canvas.addEventListener('mousedown', e => {
    puntoX = e.offsetX;
    puntoY = e.offsetY;
    figAux = recorrerFiguras(puntoX, puntoY) //guardo la figura que trae para comprobar que sea distinta de null, ademas que si no la dejo en variable, NO se guarda y no puedo implementar abajo
    if(figAux != null){
        mover = true;
    }
})

//Evento para mover el objeto con mouse
canvas.addEventListener('mousemove', e => {
    if(mover){
        let puntoX = e.offsetX;
        let puntoY = e.offsetY;
        if(figAux != null){
            ctx.clearRect(0,0,canvas.width,canvas.height); //limpiar el canvas
            figAux.moveTo(puntoX, puntoY); //mueve figura
            dibujarFiguras(); //volver a dibujar todas las figuras
        }
    }
})

// quita el evento de mover la figura
canvas.addEventListener('mouseup', e =>{ 
    mover = false;
    canvas.removeEventListener('mousedown', recorrerFiguras);
})

//evento agregado al boton seleccionar figura para obtener coordenadas de la figura
obtenerFigura.addEventListener('click', e =>{
    alert('Haga click sobre una figura');
    usarTeclado = true;
})

//verifica que se haga click para poder mover con las teclas ya que toma las cordenadas.
canvas.addEventListener('click', e =>{ 
    puntoX = e.offsetX;
    puntoY = e.offsetY;
    figAux = recorrerFiguras(puntoX, puntoY);
    if(usarTeclado == true){
        document.addEventListener('keydown', e =>{
            if(e.code === "ArrowUp"){ //mover hacia arriba;
                puntoY = puntoY - 5; //signos invertidos entre ArrowUp y ArrowDown por que movia en sentido contrario.
                console.log(puntoY);
                figAux.moveY(puntoY);               
            }
            else if(e.code === "ArrowDown"){
                puntoY = puntoY + 5;
                figAux.moveY(puntoY);
            }
            else if(e.code === "ArrowLeft"){
                puntoX = puntoX - 5;
                figAux.moveX(puntoX);
            }
            else if(e.code === "ArrowRight"){
                puntoX = puntoX + 5;
                figAux.moveX(puntoX);  
            }
            ctx.clearRect(0,0,canvas.width,canvas.height); //limpiar el canvas
            dibujarFiguras();
        })
    }
}
)














