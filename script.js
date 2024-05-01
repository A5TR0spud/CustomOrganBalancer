createList();

async function createList() {
    let x = await fetch("./data/organ_scores.json");
    let jsonArray = await x.json();
    jsonArray.forEach((item) => {
        //main div
        var divider = document.createElement('div');
        divider.className = "score-list-item";
        //main name
        var name = document.createElement('p');
        name.textContent = item.name;
        name.className = "score-title-paragraph";
        divider.appendChild(name);

        //tooltip hover able
        var tooltip_info_box = document.createElement('p');
        tooltip_info_box.textContent = "i";
        tooltip_info_box.className = "info-box";
        //tooltip container
        var tooltip = document.createElement('div');
        tooltip.className = "tooltip-container";
        //tooltip name
        var tooltip_name = document.createElement('p');
        tooltip_name.textContent = item.name;
        tooltip_name.className = "tooltip-name";
        tooltip.appendChild(tooltip_name);
        //tooltip description
        var description = document.createElement('p');
        description.textContent = item.tooltip;
        description.className = "tooltip-description";
        tooltip.appendChild(description);
        //tooltip id
        var description = document.createElement('p');
        description.textContent = item.id;
        description.className = "tooltip-id";
        tooltip.appendChild(description);
        tooltip_info_box.appendChild(tooltip);
        divider.appendChild(tooltip_info_box);

        //input y the fool
        var score_input = document.createElement('input');
        score_input.value = "0.00";
        score_input.className = "score-input";
        score_input.step = "any";
        divider.appendChild(score_input);

        //weight multiplier
        var weight_multiplier = document.createElement('p');
        weight_multiplier.textContent = "* " + item.weight;
        weight_multiplier.className = "weight-multiplier";
        divider.appendChild(weight_multiplier);

        //finalize
        document.getElementById("score-list").appendChild(divider);
    });
}

//todo: take organ_scores.json, create a flex list with name : input score : * weight,
//todo: hoverable tooltip, final score calculator, verdict "translator"
//todo: give command, json generator