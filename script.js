const getBlock=(id)=>{
	return document.getElementById(id)
}

const cnvs = getBlock("cnvs")
const ctx = cnvs.getContext('2d')
let pillers = []
cnvs.height=450
let first=true
let over = false;
let highscore
cnvs.width= innerWidth
let score = 0
const plrht = 150
let bg, b1
const ids = ["clr1", "clr2", "clr3", "clr4"]
const colors = ["#DB3EB1", "#33FF00", "#099FFF", "#FFAD00"]

class Ball{
	constructor(){
		this.clr=0
		this.height=30
		this.width=30
		this.h = 180;
		this.position = {
			x:145,
			y:cnvs.height-plrht - this.height -50
		}
		this.velocity={
			y:-5
		}
	}
	draw(){
		ctx.fillStyle=colors[this.clr]
		ctx.beginPath()
		ctx.arc(this.position.x+this.width/2, this.position.y+this.height/2,this.width/2, 0, Math.PI*2)
		ctx.fill()
		//	ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
	update(){
		this.position.y+=this.velocity.y
		this.h+=this.velocity.y
		if(this.h>=180){
			if(pillers[1].clr==this.clr){
				score++;
				getBlock("scoreInt").innerText=score
			}else{
				over=true
				first=false
				sessionStorage.setItem("color-jump-highscore", score>highscore ? score : highscore)
				getBlock("scoreInt1").innerText=score
				getBlock("over").style.visibility="visible"
			}
		}
		if(this.h>=180 || this.h<=0){
			this.velocity.y*=-1
		}
		this.draw()
	}
}

class Pillar{
	constructor(x, clr){
		this.height=plrht
		this.width=40
		this.clr=clr
		this.position = {
			x:x,
			y:cnvs.height-this.height - 50
		}
		this.velocity={
			x:-140/72
		}

	}
	draw(){
		ctx.fillStyle=colors[this.clr]
		ctx.beginPath()
		ctx.roundRect(this.position.x, this.position.y, this.width, this.height, 5)
		ctx.fill()
		//	ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
	update(){
		this.position.x+=this.velocity.x
		this.draw()
	}

}

const animate = () => {
	ctx.fillStyle="#333"
	//	ctx.fillRect(0,0, cnvs.width, cnvs.height)
	ctx.drawImage(bg,0,0,cnvs.width, cnvs.height);   

	for(var p = 0;p<pillers.length;p++){
		if(pillers[0].position.x<= -40){
			pillers = [...pillers.slice(1), new Pillar(pillers[pillers.length-1].position.x + 140, (Math.floor(Math.random()*99999999)%colors.length))]
		}
		pillers[p].update()
	}
	pillers[0].position.y+=4
	b1.update()
	if(!over){
		setTimeout( requestAnimationFrame(animate), 1000/60)
	}else{
		getBlock("over").style.zIndex=5
	}
}

onload = () => {
	bg = new Image();
	bg.src = "https://static.vecteezy.com/system/resources/previews/007/357/531/non_2x/alien-planet-game-background-free-vector.jpg";
	if(first)
		for(let i=0;i<colors.length;i++){
			getBlock("clrs").innerHTML+= ` 
		<div class="clr" id="clr${i+1}" style="background:${colors[i]}"></div>` 
		}
	highlight(0)
	b1=new Ball()
	for(var i=0;i<10;i++){
		pillers.push(new Pillar(140*(i+1), i<3 ? 0 : (Math.floor(Math.random()*99999999)%colors.length)));
	}
	highscore=localStorage.getItem("color-jump-highscore") || 0;
	animate()
}

const highlight = (i) => {
	ids.map((clr)=>{
		getBlock(clr).classList.remove("activeClr")
	})
	getBlock(`clr${i+1}`).classList.add("activeClr")
}

getBlock("rightCtrl").addEventListener('click', ()=>{
	b1.clr+=1;
	b1.clr%=colors.length
	highlight(b1.clr)
})
getBlock("leftCtrl").addEventListener('click', ()=>{
	b1.clr= b1.clr > 0 ? b1.clr-1 : colors.length-1;
	b1.clr%=colors.length
	highlight(b1.clr)
})

const restart = () => {
	score=0
	getBlock("scoreInt").innerText=0
	getBlock("over").style.visibility="hidden"
	over=false
	pillers=[]
	onload()
}

