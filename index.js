const COHORT = "lang.2408";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

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
}

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
}


//RENDER

function renderEvents() {
    const eventList = document.querySelector("#events");
    const $events = state.events.map((event) => {
        const $li = document.createElement("li");
        $li.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
        <button>Remove Event</button>
        `;
        return $li;
    });
eventList.replaceChildren(...$events);    
}


async function render() {
    await getEvents();
    renderEvents();
}

//SCRIPT
render();