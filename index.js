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
        debugger;
    }
    catch (error) {
        console.error(error);
    }
}


//RENDER



//SCRIPT
