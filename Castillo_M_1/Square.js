class Square extends Figure{
    constructor(posX, posY, ancho, ctx, color){
        super(posX, posY, ctx, color);
        this.ancho = ancho;

    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX, this.posY, this.ancho, this.ancho);
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.posX, this.posY, this.ancho, this.ancho);
    }

    saberPunto(puntoX, puntoY){
        return (puntoX >= this.posX && puntoX <= this.posX + this.ancho) &&
               (puntoY >= this.posY && puntoY <= this.posY + this.ancho);
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