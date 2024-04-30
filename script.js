createList();

async function createList() {
    let x = await fetch("./data/organ_scores.json");
    let jsonArray = await x.json();
    jsonArray.forEach((item) => {
        //main div
        var divider = document.createElement('div');
        divider.className = "tooltip";
        //main name
        var name = document.createElement('p');
        name.textContent = item.name;
        name.className = "tooltip-paragraph";
        divider.appendChild(name);
        //tooltip main
        var tooltip = document.createElement('div');
        tooltip.className = "tooltip-container";
        //name
        var tooltip_name = document.createElement('p');
        tooltip_name.textContent = item.name;
        tooltip_name.className = "tooltip-name";
        tooltip.appendChild(tooltip_name);
        //description
        var description = document.createElement('p');
        description.textContent = item.tooltip;
        description.className = "tooltip-description";
        tooltip.appendChild(description);
        //id
        var description = document.createElement('p');
        description.textContent = item.id;
        description.className = "tooltip-id";
        tooltip.appendChild(description);
        //finalize
        name.appendChild(tooltip);
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