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

buttonShowAnimals.addEventListener("click", async () => {
    const res = await fetch("http://127.0.0.1:3000/tiere");
    displayData(await res.json());

    function displayData(data) {
        console.log(data);
        showAnimals.innerHTML = "";
        data.forEach(tier => {
            console.log(tier);
            const li = document.createElement("li");
            const buttonDeleteAnimal = document.createElement("button");
            li.textContent = tier.name;
            buttonDeleteAnimal.textContent = "Delete";
            buttonDeleteAnimal.style.marginLeft = "10px";
            buttonDeleteAnimal.addEventListener("click", async () => {
                await deleteAnimal(tier.id);
                buttonShowAnimals.click();
            });

            li.appendChild(buttonDeleteAnimal);
            showAnimals.appendChild(li);
        });
    }
});

async function deleteAnimal(id) {
    await fetch(`http://127.0.0.1:3000/tiere/${id}`, {
        method: "DELETE"
    });
}

buttonSubmit.addEventListener("click", async () => {
    const tierart = inputTierart.value;
    const name = inputName.value;
    const krankheit = inputKrankheit.value;
    const age = inputAge.value;
    const gewicht = inputGewicht.value;

    inputTierart.value = "";
    inputName.value = "";
    inputKrankheit.value = "";
    inputAge.value = "";
    inputGewicht.value = "";

    await fetch("http://127.0.0.1:3000/newAnimal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tierart,
            name,
            krankheit,
            age,
            gewicht
        })
    });
});
