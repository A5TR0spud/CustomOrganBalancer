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

        //product input * weight, total, score list
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
                    totalsJson[i].value = parseFloat(score_input.value);
                    replacedID = true;
                }
                if (totalsJson[i].value == 0) {
                    totalsJson.splice(i, 1);
                    i--;
                    continue;
                }
                total += totalsJson[i].weight * totalsJson[i].value;
            }
            if (!replacedID & parseFloat(score_input.value) != 0) {
                totalsJson.push({"name": item.name, "id": item.id, "scoreDisplay": item.scoreDisplay, "value": parseFloat(score_input.value), "weight": item.weight});
                total += product;
            }
            document.getElementById("sidebar-text-total").textContent = "Total Organ Value: " + total;
            document.getElementById("sidebar-text-verdict").textContent = "Verdict: " +
            (total < 0.5 ? "Underpowered" :
            total < 0.75 ? "Poor - Rotten" :
            total < 1 ? "Average - Animal" :
            total == 1 ? "Balanced - Human" :
            total <= 1.0625 ? "Within error margin" :
            "Overpowered");

            const sidebarScoreList = document.getElementById("sidebar-score-list");
            while (sidebarScoreList.lastChild) {
                if (sidebarScoreList.lastChild.className == "sidebar-score") {
                    sidebarScoreList.removeChild(sidebarScoreList.lastChild);
                } else {
                    break;
                }
            }
            var nbt_generation = document.getElementById("give-command");
            var nbt_content = "";
            for (let i = 0; i < totalsJson.length; i++) {
                var totalItem = totalsJson[i];
                if (totalItem.value == 0) {
                    continue;
                }
                var scoreItem = document.createElement('p');
                scoreItem.textContent = determineScorePrefix(totalItem.scoreDisplay, totalItem.value, totalItem.name);
                scoreItem.className = "sidebar-score";
                sidebarScoreList.appendChild(scoreItem);
                nbt_content += '"' + totalItem.id + '": ' + totalItem.value + 'f'
                if (i < totalsJson.length - 1) {
                    nbt_content += ",";
                }
            }
            nbt_generation.textContent = 'organData:{' + nbt_content + '}';

            console.log(totalsJson);
        });
        product_input_weight.className = "product-input-weight";
        divider.appendChild(product_input_weight);

        //finalize
        document.getElementById("score-list").appendChild(divider);
    });
}

function determineScorePrefix(scoreDisplay, value, name) {
    value = parseFloat(value);
    if (scoreDisplay == "prefix") {
        if (value >= 1.5) {
            return "Supernatural " + name;
        } if (value >= 1.25) {
            return "Exceptional " + name;
        } if (value >= 1) {
            return "Good " + name;
        } if (value >= 0.75) {
            return "Average " + name;
        } if (value >= 0.5) {
            return "Poor " + name;
        } if (value >= 0) {
            return "Pathetic " + name;
        } if (value >= -0.25) {
            return "Slightly Reduces " + name;
        } if (value >= -0.5) {
            return "Reduces " + name;
        } if (value >= -0.75) {
            return "Greatly Reduces " + name;
        }
        return "Cripples " + name;
    }
    if (scoreDisplay == "severely" & value >= 2) {
        return "Severely " + name;
    }
    return name;
}

//todo: list of selected organ scores, delete value 0 items from the totalsJson. if totalsJson is empty, assume 0
//todo: give command, json generator
