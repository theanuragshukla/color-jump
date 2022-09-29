class Ball{
	constructor(){
		this.clr=0
		this.height=unit
		this.width=unit
		this.h = 3*unit;
		this.position = {
			x:3*unit,
			y:cnvs.height - plrht - this.height - bottomPad
		}
		this.velocity={
			y:-1*(unit/8) 
		}
	}
	scoreAndOver(){
		if(this.h>=3*unit){
			if(pillers[1].clr==this.clr){
				score++;
				highscore=score>highscore ? score : highscore
				getBlock("hscoreInt").innerText=highscore
				getBlock("scoreInt").innerText=score
			}else{
				over=true
				first=false
				getBlock("scoreInt1").innerText=score
				localStorage.setItem("color-jump-highscore", highscore)
				getBlock("over").style.visibility="visible"
			}
		}
	}
	draw(){
		ctx.fillStyle=colors[this.clr]
		ctx.beginPath()
		ctx.arc(this.position.x+this.width/2, this.position.y+this.height/2,this.width/2, 0, Math.PI*2)
		ctx.fill()
	}
	update(){
		this.position.y+=this.velocity.y
		this.h+=this.velocity.y
		this.scoreAndOver()
		if(this.h>=3*unit || this.h<=0){
			this.velocity.y*=-1
		}
		this.draw()
	}
}

class Pillar{
	constructor(x, clr){
		this.height=plrht
		this.width=unit
		this.clr=clr
		this.position = {
			x:x,
			y:cnvs.height-this.height - bottomPad
		}
		this.velocity={
			x:-1*(unit/16)
		}
	}
	draw(){
		ctx.fillStyle=colors[this.clr]
		ctx.beginPath()
		ctx.roundRect(this.position.x, this.position.y, this.width, this.height, 10)
		ctx.fill()
	}
	update(){
		this.position.x+=this.velocity.x
		this.draw()
	}
}

class Sprite{
	constructor({src, position, width, height}){
		this.img = new Image()
		this.position=position
		this.width=width
		this.height=height
		this.loaded=false
		this.img.src=src
		this.img.onload=()=>{
			this.loaded=true
			this.update()
		}
	}
	draw(){
		ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
	}
	update(){
		if(!this.loaded){
			ctx.fillStyle="#333"
			ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
			return
		}
		this.draw()
	}
}
