const RANDOM_IMAGE_URL = "https://source.unsplash.com/random/{resolution}/?Sunset";

let backgroundImageUrl;

let
	doctors,
	searchInput,
	dropdown,
	dropdownElements;

window.addEventListener("load", e => {
	setRandomBackgroundImage();

	doctors = createDoctors(25).sort((a, b) => a.name.localeCompare(b.name));
	
	dropdown = document.querySelector("#dropdown");
	dropdownElements = doctors.map(e => createDropdownElement(e, dropdown));
	
	searchInput = document.querySelector("#searchInput");
	searchInput.addEventListener("keyup", handleSearch);
});

function handleSearch(e){
	let value = searchInput.value;
	if(value.length > 0)
		dropdown.classList.add("show");
	else
		dropdown.classList.remove("show");
	
	const MAX_HITS = 5;
	let n = 0;
	for(let element of dropdownElements)
		if(n >= MAX_HITS)
			element.hide();
		else if(element.filter(value))
			n++;
	
	dropdownElements.sort((a, b) => {
		let p = b.matchScore - a.matchScore;
		if(p != 0)
			return p;
		
		return a.data.name.localeCompare(b.data.name);
	});
	for(let element of dropdownElements)
		dropdown.appendChild(element);
}

function createDropdownElement(doctor, parent = null){
	let element = createElement("div.dropdown-item", parent);
	element.data = doctor;
	
	element.show = function(){
		this.classList.remove("hide");
	};
	element.hide = function(){
		this.classList.add("hide");
	};
	
	element.filter = function(text){
		let searchValues = text.replace(/[^A-Za-z ]/g, "").split(" ");
		
		this.matchScore = 0;
		
		const INDEX_PROPERTIES = ["name", "specialization", "hospital"];
		for(let i = 0; i < INDEX_PROPERTIES.length; i++)
			for(let token of searchValues)
				if(this.data[INDEX_PROPERTIES[i]].replace(/[^A-Za-z ]/g, "").match(new RegExp(token, "i"))){
					this.show();
					this.matchScore = INDEX_PROPERTIES.length - i;
					return true;
				}
		
		this.hide();
		return false;
	};
	
	createElement("span.name", element, {innerText: doctor.name});
	createElement("span.specialization", element, {innerText: doctor.specialization});
	createElement("span.hospital", element, {innerText: doctor.hospital});

	return element;
}

async function setRandomBackgroundImage(){
	let resolution = screen.availWidth + "x" + screen.availHeight;
	let image = await fetch(RANDOM_IMAGE_URL.replace("{resolution}", resolution));
	backgroundImageUrl = image.url;

	document.body.style.setProperty("--background-image", "url('" + backgroundImageUrl + "')");
	let dark = await isImageDark(backgroundImageUrl)
	if(dark)
		document.body.classList.add("dark");
	else
		document.body.classList.remove("dark");
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

function createElement(name, parent, options = {}){
	let classList = name.split(".");
	let tagName = classList.shift();
	
	let id = tagName.split("#");
	if(id.length > 1){
		tagName = id[0];
		id = id[1];
	}
	else
		id = undefined;
	
	let element = document.createElement(tagName);
	
	if(id)
		element.id = id;
	
	if(classList.length > 0)
		for(c of classList)
			element.classList.add(c);
	
	for(o in options)
		if(o in element)
			element[o] = options[o];
		else
			element.setAttribute(o, options[o]);
	
	if(parent)
		parent.appendChild(element);
	
	return element;
}