let tabs = document.querySelectorAll("main .tab");
let navButtons = document.querySelectorAll("nav .nav-button");

function openTab(tab) {
    tabs.forEach(element => {
        element.style.display = "none";
    });

    tab.style.display = "flex";
}

function addNavigatorEvent(buttonName, tabName) {

    document.getElementById(buttonName).addEventListener("click", ()=>{
        const tab = document.getElementById(tabName);
        const button = document.getElementById(buttonName);
        navButtons.forEach(element => {
            element.classList.remove("active");
        });
        button.classList.add("active");
        openTab(tab);
    })
}



// NAVIGATOR EVENTS

openTab(document.getElementById("preview-tab"));
document.getElementById("preview-nav-button").classList.add("active");

addNavigatorEvent("preview-nav-button", "preview-tab");
addNavigatorEvent("cut-nav-button", "cut-tab");
addNavigatorEvent("resources-nav-button", "resources-tab");
addNavigatorEvent("export-nav-button", "export-tab");
addNavigatorEvent("settings-nav-button", "settings-tab");


// PLAYER CHANGE
document.getElementById("preview-nav-button").addEventListener("click", () => {
    activePlayer = previewPlayer;
    timeline.displayFrame();
});

document.getElementById("cut-nav-button").addEventListener("click", () => {
    activePlayer = cutPlayer;
    timeline.displayFrame();
});