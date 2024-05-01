createList();
var totalsJson = [];

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

        //product input * weight
        var product_input_weight = document.createElement('p');
        product_input_weight.textContent = "= 0";
        score_input.addEventListener('input', () => {
            const product = parseFloat(score_input.value) * item.weight;
            const productText = document.createElement('p');
            product_input_weight.textContent = "= " + product;
            var total = 0;
            var replacedID = false;
            for (let i = 0; i < totalsJson.length; i++) {
                if (totalsJson[i].id == item.id) {
                    totalsJson[i].value = product;
                    replacedID = true;
                }
                total += totalsJson[i].value;
            }
            if (!replacedID) {
                totalsJson.push({"id": item.id, "value": product});
                total += product;
            }
            document.getElementById("sidebar-text-total").textContent = "Total Organ Value: " + total;
            document.getElementById("sidebar-text-verdict").textContent = "Verdict: " + (total < 0.5 ? "Underpowered" : total < 0.75 ? "Poor" : total < 1 ? "Average" : total == 1 ? "Balanced" : total < 1.25 ? "Exceptional" : "Overpowered");
            console.log(totalsJson);
        });
        product_input_weight.className = "product-input-weight";
        divider.appendChild(product_input_weight);

        //finalize
        document.getElementById("score-list").appendChild(divider);
    });
}

//todo: take organ_scores.json, create a flex list with name : input score : * weight,
//todo: hoverable tooltip, final score calculator, verdict "translator"
//todo: give command, json generator