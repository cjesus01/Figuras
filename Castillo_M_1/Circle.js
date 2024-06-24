class Cicle extends Figure{
    constructor(posX, posY, radio, ctx, color){
        super(posX, posY, ctx, color);
        this.radio = radio;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    saberPunto(puntoX, puntoY){
        let distanciaAlCentro = Math.sqrt(Math.pow(puntoX - this.posX, 2) + Math.pow(puntoY - this.posY, 2));
        return distanciaAlCentro <= this.radio;
    }

    moveTo(posX, posY){
        ctx.clearRect(this.posX, this.posY, this.radio, 0, Math.PI*2);
        this.posX = posX;
        this.posY = posY;
        this.draw();
    }

    moveY(posY){
        this.posY = posY;
        this.draw();
    }

    moveX(posX){
        this.posX = posX;
        this.draw();
    }
}