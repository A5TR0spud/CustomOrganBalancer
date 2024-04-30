createList();

async function createList() {
    let x = await fetch("./data/organ_scores.json");
    let jsonArray = await x.json();
    jsonArray.forEach((item) => {
        var divider = document.createElement('div');
        divider.className = "tooltip";
        var paragraph = document.createElement('p');
        paragraph.textContent = item.name;
        paragraph.className = "tooltip-paragraph";
        divider.appendChild(paragraph);
        var tooltip = document.createElement('span');
        tooltip.textContent = item.tooltip;
        tooltip.className = "tooltip-text";
        paragraph.appendChild(tooltip);
        document.getElementById("score-list").appendChild(divider);
    });
}

/*function copyID() {
  navigator.clipboard.writeText(copyText.value);

  alert("Copied the text: " + copyText.value);
}*/

//todo: take organ_scores.json, create a flex list with name : input score : * weight,
//todo: hoverable tooltip, final score calculator, verdict "translator"
//todo: give command, json generator