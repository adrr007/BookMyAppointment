const FIRST_NAMES = [
	"Aadiv",
	"Aahva",
	"Aaradhya",
	"Aarav",
	"Adah",
	"Adhira",
	"Akanksh",
	"Alex",
	"Alisha",
	"Amoli",
	"Anaisha",
	"Anant",
	"Ananya",
	"Anika",
	"Anushka",
	"Asmee",
	"Atiksh",
	"Avni",
	"Ayaan",
	"Bhuv",
	"Carina",
	"Dasya",
	"Drishti",
	"Gian",
	"Hem",
	"Hiya",
	"Idhant",
	"Ira",
	"Ishana",
	"Ishank",
	"Ishita",
	"Jash",
	"Jay",
	"Joseph",
	"Kabir",
	"Kahaan",
	"Kaia",
	"Kairav",
	"Kashvi",
	"Kevin",
	"Keya",
	"Kimaya",
	"Krisha",
	"Laksh",
	"Larisa",
	"Luv",
	"Mahika",
	"Manan",
	"Mayra",
	"Mehar",
	"Mirai",
	"Mishka",
	"Mohammad",
	"Naitee",
	"Naksh",
	"Navya",
	"Nehrika",
	"Neysa",
	"Nimit",
	"Nirav",
	"Pahal",
	"Parv",
	"Pavati",
	"Pranay",
	"Prisha",
	"Rachit",
	"Raj",
	"Ranbir",
	"Raunak",
	"Rebecca",
	"Reyansh",
	"Rishaan",
	"Rishit",
	"Rohan",
	"Rudra",
	"Rushil",
	"Ryka",
	"Saanvi",
	"Sadhil",
	"Sahana",
	"Sai",
	"Saisha",
	"Saloni",
	"Sarthak",
	"Shanaya",
	"Shrishti",
	"Sneha",
	"Taahira",
	"Taara",
	"Taarush",
	"Taksh",
	"Tanvi",
	"Ved",
	"Vihaan",
	"Viti",
	"Vivaan",
	"Yash",
	"Yug",
	"Zara",
	"Zuber"
];

const LAST_NAMES = [
	"Acharya",
	"Agarwal",
	"Ahluwalia",
	"Ahuja",
	"Amin",
	"Anand",
	"Anthony",
	"Apte",
	"Arya",
	"Babu",
	"Bajwa",
	"Bakshi",
	"Balakrishnan",
	"Banerjee",
	"Basu",
	"Batra",
	"Bawa",
	"Bedi",
	"Bhasin",
	"Bhatt",
	"Biswas",
	"Burman",
	"Chabra",
	"Chadha",
	"Chakrabarti",
	"Chandra",
	"Chauhan",
	"Chawla",
	"Chopra",
	"Chowdhury",
	"Dalal",
	"Dara",
	"Das",
	"Datta",
	"Dayal",
	"Deol",
	"Deshmukh",
	"Deshpande",
	"Dewan",
	"Dhar",
	"Dhawan",
	"Dhillon",
	"Dixit",
	"Dubey",
	"Gandhi",
	"Ganguly",
	"Garg",
	"Ghosh",
	"Gill",
	"Goel",
	"Gokhale",
	"Goswami",
	"Grover",
	"Gupta",
	"Haldar",
	"Iyer",
	"Jain",
	"Jha",
	"Joshi",
	"Kapadia",
	"Kapoor",
	"Kashyap",
	"Kaur",
	"Khanna",
	"Khatri",
	"Khurana",
	"Kohli",
	"Kulkarni",
	"Kumar",
	"Laghari",
	"Lal",
	"Madan",
	"Mahajan",
	"Malhotra",
	"Mallick",
	"Mangal",
	"Mani",
	"Mannan",
	"Mehta",
	"Modi",
	"Mukherjee",
	"Naidu",
	"Pandey",
	"Parekh",
	"Patel",
	"Puri",
	"Purohit",
	"Ranganathan",
	"Rao",
	"Ray",
	"Reddy",
	"Sachdev",
	"Saxena",
	"Seth",
	"Shah",
	"Sharma",
	"Singh",
	"Thakur",
	"Varma",
	"Zacharia"
];

const SPECIALIZATIONS = [
	"Cardiologist",
	"Dermatologist",
	"General Practitioner",
	"Gynaecologist",
	"Ophthalmologist",
	"Orthopaedist"
];

const HOSPITALS = [
	"Asian Heart Institute, Bandra-Kurla Complex",
	"Bhabha Hospital, Bandra",
	"Bhaktivedanta Hospital, Mira Road",
	"Bombay Hospital, Marine Lines",
	"Breach Candy Hospital, Mahalaxmi",
	"Cloudnine Hospitals, Link Road, Malad West",
	"Cooper Hospital, Vile Parle",
	"D Y Patil Hospital, Nerul",
	"Gokuldas Tejpal Hospital, Fort",
	"Grant Medical College and Sir Jamshedjee Jeejebhoy Group of Hospitals, Sandhurst Road",
	"Hinduja Hospital, Mumbai",
	"Holy Family Hospital, Bandra",
	"Hurkisondas Hospital, Girgaon",
	"Jaslok Hospital, Pedar Road",
	"KEM Hospital, Parel",
	"Lilavati Hospital, Bandra",
	"Lokmanya Tilak Hospital, Sion",
	"Mahatma Gandhi Memorial Hospital, Parel",
	"Nanavati Hospital, Vile Parle",
	"Prince Aly Khan Hospital, Byculla",
	"Rajawadi Hospital, Ghatkopar",
	"Saifee Hospital, Charni Road",
	"Shushrusha Citizens' Co-operative Hospital, Shivaji Park, Mumbai",
	"Sunrise Hospital, Bhandup",
	"Tata Memorial Hospital, Parel"
];

function createDoctors(n){
	let a = [];
	for(let i = 0; i < n; i++)
		a[i] = createDoctor();
	
	return a;
}

function createDoctor(){
	return {
		name: getRandomElement(FIRST_NAMES) + " " + getRandomElement(LAST_NAMES),
		specialization: getRandomElement(SPECIALIZATIONS),
		hospital: getRandomElement(HOSPITALS)
	};
}

function getRandomElement(a){
	return a[Math.floor((a.length) * Math.random())];
}