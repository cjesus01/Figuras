class Rect extends Figure{
    constructor(posX, posY, ancho, alto, ctx, color){
        super(posX, posY, ctx, color);
        this.ancho = ancho;
        this.alto = alto;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX, this.posY, this.ancho, this.alto);
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.posX, this.posY, this.ancho, this.alto);
    }    

    saberPunto(puntoX, puntoY){
        return puntoX >= this.posX && puntoX <= this.posX + this.ancho && puntoY >= this.posY && puntoY <= this.posY + this.alto;
    }

    moveTo(posX, posY){
        ctx.clearRect(this.posX, this.posY, this.ancho,this.alto);
        this.posX = posX;
        this.posY = posY;
        this.draw();
    }

    moveY(posY){
        ctx.clearRect(this.posX, this.posY, this.ancho,this.alto);
        this.posY = posY;
        this.draw();
    }

    moveX(posX){
        ctx.clearRect(this.posX, this.posY, this.ancho,this.alto);
        this.posX = posX;
        this.draw();
    }
}