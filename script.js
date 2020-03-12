const RANDOM_IMAGE_URL = "https://source.unsplash.com/random/?Sunset";

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
	searchInput.addEventListener("keydown", handleSearch);
});

function handleSearch(e){
	let value = searchInput.value;
	let searchValue = value.replace(/[^A-Za-z]/g, "");

	console.log(value, searchValue);

	if(searchValue.length > 0)
		dropdown.classList.add("show");
	else
		dropdown.classList.remove("show");

	let searchProperties = [
		"data-doctor-name",
		"data-doctor-specialization",
		"data-doctor-hospital"
	];
	for(let element of dropdownElements)
		if(searchProperties.some(e => element.getAttribute(e).includes(searchValue)))
			element.classList.remove("hide");
		else
			element.classList.add("hide");
}

function createDropdownElement(doctor, parent = null){
	let e = createElement("div.dropdown-item", parent, {innerText: "Dr. " + doctor.name});
	e.setAttribute("data-doctor-name", doctor.name);
	e.setAttribute("data-doctor-specialization", doctor.specialization);
	e.setAttribute("data-doctor-hospital", doctor.hospital);

	return e;
}

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