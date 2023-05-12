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
document.getElementById("preview-button").classList.add("active");

addNavigatorEvent("preview-button", "preview-tab");
addNavigatorEvent("cut-button", "cut-tab");
addNavigatorEvent("resources-button", "resources-tab");
addNavigatorEvent("export-button", "export-tab");
addNavigatorEvent("settings-button", "settings-tab");