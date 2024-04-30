createList();

async function createList() {
    let x = await fetch("./data/organ_scores.json");
    let jsonArray = await x.json();
    jsonArray.forEach((item) => {
        var paragraph = document.createElement('p');
        paragraph.textContent = item.name;
        document.getElementById("score-list").appendChild(paragraph);
    });
}

//todo: take organ_scores.json, create a flex list with name : input score : * weight,
//todo: hoverable tooltip, final score calculator, verdict "translator"
//todo: give command, json generator