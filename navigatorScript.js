
function openTab(tab) {
    tabs.forEach(element => {
        element.style.display = "none";
    });

    tab.style.display = "flex";
}

let tabs = document.querySelectorAll("main div");

tabs.forEach(element => {
    element.style.display = "none";
});

// NAVIGATOR EVENTS
document.getElementById("preview-tab").style.display = "flex";

document.getElementById("preview-button").addEventListener("click", ()=>{
    const tab = document.getElementById("preview-tab");
    openTab(tab);
})

document.getElementById("cut-button").addEventListener("click", ()=>{
    const tab = document.getElementById("cut-tab");
    openTab(tab);
})

document.getElementById("resources-button").addEventListener("click", ()=>{
    const tab = document.getElementById("resources-tab");
    openTab(tab);
})

document.getElementById("export-button").addEventListener("click", ()=>{
    const tab = document.getElementById("export-tab");
    openTab(tab);
})

document.getElementById("settings-button").addEventListener("click", ()=>{
    const tab = document.getElementById("settings-tab");
    openTab(tab);
})