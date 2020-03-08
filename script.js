const RANDOM_IMAGE_URL = "https://source.unsplash.com/random/?Sunset";

let backgroundImageUrl;

window.addEventListener("load", async(e) => {
	setRandomBackgroundImage();
	
	getLocation()
		.then(console.log);
		.catch(console.error);
});

async function setRandomBackgroundImage(){
	let image = await fetch(RANDOM_IMAGE_URL);
	backgroundImageUrl = image.url;

	document.body.style.setProperty("--background", "url('" + backgroundImageUrl + "')");
	isImageDark(backgroundImageUrl)
		.then(e => {
			if(e)
				document.body.classList.add("dark");
			else
				document.body.classList.remove("dark");
		});
}

async function isImageDark(imageSrc){
	const THRESHOLD = 0.1;
	
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.crossOrigin = "anonymous";
		image.addEventListener("load", e => {
			const canvas = new OffscreenCanvas(image.width, image.height);
			
			const g = canvas.getContext("2d");
			g.drawImage(image, 0, 0);
			
			const data = g.getImageData(0, 0, canvas.width, canvas.height).data;
			
			let light = 0, dark = 0;
			for(let x = 0; x < data.length; x += 4)
				if(Math.max(data[x], data[x + 1], data[x + 2]) < 128)
					dark++;
				else
					light++;
			
			let delta = (light - dark)/(canvas.width * canvas.height);
			if(delta + THRESHOLD < 0)
				resolve(true);	//Dark
			else
				resolve(false);	//Light
		});
		image.src = imageSrc;
	});
}

async function getLocation(){
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}