const cnvs = getBlock("cnvs")
const ctx = cnvs.getContext('2d')
let pillers = []
let unit =(innerWidth-(innerWidth%16))/16
cnvs.height=9*unit
cnvs.width= 16*unit
let plrht = 3*unit
let bottomPad=unit
let first=true
let over = false
let score = 0
let bg, b1, highscore

const ids = ["clr1", "clr2", "clr3", "clr4"]
const colors = ["#DB3EB1", "#FFAD00", "#33FF00", "#099FFF"]
//const bgSrc = "https://static.vecteezy.com/system/resources/previews/007/357/531/non_2x/alien-planet-game-background-free-vector.jpg"
const bgSrc='https://c4.wallpaperflare.com/wallpaper/531/951/621/digital-digital-art-artwork-illustration-minimalism-hd-wallpaper-preview.jpg'

const animate = () => {
	bg.update()
	for(var p = 0;p<pillers.length;p++){
		if(pillers[0].position.x<= -unit){
			pillers = [...pillers.slice(1), new Pillar(pillers[pillers.length-1].position.x + 3*unit, (Math.random() * colors.length) | 0)]
		}
		pillers[p].update()
	}
	pillers[0].height-=unit/20
	pillers[0].position.y+=unit/20
	b1.update()

	if(!over){
		setTimeout( window.requestAnimationFrame(animate), 1000/60)
	}else{
		getBlock("over").style.zIndex=5
	}
}

const highlight = (i) => {
	ids.map((clr)=>{
		getBlock(clr).classList.remove("activeClr")
	})
	getBlock(`clr${i+1}`).classList.add("activeClr")
}
const restart = () => {
	score=0
	getBlock("scoreInt").innerText=0
	getBlock("over").style.visibility="hidden"
	over=false
	pillers=new Array()
	setupCnvs()
	startGame()
}

const setupCnvs = () => {
	document.documentElement.style.setProperty('--unit', unit+'px')
	bg=new Sprite({
		src:bgSrc,
		position:{
			x:0,
			y:0
		},
		width:cnvs.width,
		height:cnvs.height
	})
	if(first){
		for(let i=0;i<colors.length;i++){
	//		getBlock("clrs").innerHTML+= `<div class="clr" id="clr${i+1}" style="background:${colors[i]}"></div>` 
		}

	}
//	highlight(0)
	b1=new Ball()
	for(var i=0;i<10;i++){
		pillers[i]=(new Pillar(3*unit+ (i*3*unit), i<3 ? 0 : (Math.random() * colors.length) | 0));
	}
	highscore=localStorage.getItem("color-jump-highscore");
	getBlock("hscoreInt").innerText=highscore
}

const updateScreenDimensions = () => {
	unit =(innerWidth-(innerWidth%16))/16
	cnvs.height=9*unit
	cnvs.width= 16*unit
	plrht = 3*unit
	bottomPad=unit
	document.documentElement.style.setProperty('--unit', unit+'px')
}

const startGame=async ()=>{
	getBlock("ctrls").style.zIndex=2
	getBlock('help').style.display="none"
//	await requestFullScreen(getBlock("cnvsWrapper"))
//	updateScreenDimensions()
	setupCnvs()
	animate()
}

window.onload = () => {
//	startGame()
}
/*
 *UTILS
 */

function getBlock(id){
	return document.getElementById(id)
}

const switchColor = (dir) => {
	b1.clr=(b1.clr+colors.length + dir)%colors.length
}
async function requestFullScreen(element) {

	var requestMethod = await element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

	if (requestMethod) { // Native full screen.
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
	await screen.orientation.lock("landscape-primary")
}

