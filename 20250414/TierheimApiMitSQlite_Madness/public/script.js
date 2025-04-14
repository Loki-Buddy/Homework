const buttonShowAnimals = document.getElementById("button_show_animals");
const buttonCreateNewAnimal = document.getElementById("button_create_new_animal");
const showAnimals = document.getElementById("show_animals");

const inputTierart = document.getElementById("inputTierart");
const inputName = document.getElementById("inputName");
const inputKrankheit = document.getElementById("inputKrankheit");
const inputAge = document.getElementById("inputAge");
const inputGewicht = document.getElementById("inputGewicht");
const buttonSubmit = document.getElementById("buttonSubmit");

// buttonShowAnimals.addEventListener("click", () => {
//     fetch("http://127.0.0.1:3000/tiere", )
//     .then(res => res.json())
//     .then(data => displayData(data))

//     function displayData(data) {
//         console.log(data)
//     }
// });

function displayData(data) {
    console.log(data);
    showAnimals.innerHTML = "";
    data.forEach(tier => {
        console.log(tier);
        const li = document.createElement("li");
        li.textContent = tier.name;
        showAnimals.appendChild(li);
    });
}

buttonShowAnimals.addEventListener("click", async () => {
    const res = await fetch("http://127.0.0.1:3000/tiere");
    displayData(await res.json());
});

buttonSubmit.addEventListener("click", async () => {
    const response = await fetch("http://127.0.0.1:3000/newAnimal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tierart: inputTierart.value,
            name: inputName.value,
            krankheit: inputKrankheit.value,
            age: inputAge.value,
            gewicht: inputGewicht.value
        })
    });
    
    const data = await response.json();
    console.log(data);
    if (!response.ok){
        console.log('Alles gut!');
    }
});

