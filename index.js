const COHORT = "colby.lang.2408";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

//STATE
const state = {
    events:[],
};

async function getEvents(){
    try{
        const response = await fetch(API_URL);
        const respObj = await response.json();
        state.events = respObj.data;   
        //debugger;
    }
    catch (error) {
        console.error(error);
    }
};

async function addEvent(event){
    try{
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event),
        });
        const respObj = await response.json();
        if (!response.ok){
            throw new Error(respObj.error.message);
        }
    } catch(error) {
        console.error(Error);
    }
};

async function rmEvent(id){
    try {
        const response = await fetch(API_URL + id, {
            method: "DELETE",
        });
        if(!response.ok) {
            const respObj = await response.json();
            throw new Error(respObj.error.message);
        }
    } catch (error) {
        console.error(error);
    }
};


//RENDER

function renderEvents() {
    const eventList = document.querySelector("#events");

    if (!state.events.length) {
        eventList.innerHTML = `
        <li>No events near you</li>`;
        return;
    }

    const $events = state.events.map((event) => {
        const $li = document.createElement("li");
        $li.innerHTML = `
        <h2>${event.name}</h2>
        <time datetime="${event.date}">${event.date.slice(0, 10)}</time>
        <address>${event.location}</address>
        <p>${event.description}</p>
        <button id = "kill">Remove Event</button>
        `;

        const $remove = $li.querySelector("#kill");
        $remove.addEventListener("click", async () => {
            
            await rmEvent(event.id);
            await getEvents();
            renderEvents();
        });

        return $li;
    });
eventList.replaceChildren(...$events);    
};


//SCRIPT
async function render() {
    await getEvents();
    renderEvents();
};

render();

const $form = document.querySelector("form");
$form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const date = new Date($form.date.value).toISOString();

    const newEvent = {
        name: $form.name.value,
        date,
        location: $form.location.value,
        description: $form.description.value,
    };
    await addEvent(newEvent);
    await getEvents();
    renderEvents();
});