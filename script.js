createList();
var totalsJson = [];
var pseudoOrgan = 1; //0: false, 1: unset, 2: true
var nbt_content = "";

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
            const nbt_generation = document.getElementById("give-command");
            nbt_content = "";
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
                    nbt_content += ", ";
                }
            }
            document.getElementById("give-command-generator").style.width = sidebarScoreList.style.width;
            updateNBT();

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


function copyNBT() {
    const toCopyElement = document.getElementById("give-command");
    var copyText = toCopyElement.textContent;
    // Select the text field
    //toCopyElement.select();
    //toCopyElement.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);

    // Alert the copied text
    alert("Copied the text: " + copyText);
}

function openLink(arg) {
    window.open(arg, '_blank');
}

function openRandomLink() {
    let links = [
        //combine harvester
        'https://youtu.be/IgOcYyb8suU?si=6WXLN-iOU0Jz5Qmv',
        //MEDIC!
        'https://youtu.be/-6NQx4WRRg0?si=M7GABzaDouBfSsTk',
        //fish
        'https://youtu.be/YAgJ9XugGBo?si=_-E5uxFv74rD_wt9',
        //corn
        'https://youtu.be/j8qp3ITVqY0?si=rAu6o_2Y7zcNYDyX',
        //chonny jash mind electric
        'https://youtu.be/uIQbSzkXIsk?si=Y-U8pbSxD0bAcMyJ',
        //creator
        'https://youtu.be/Qtf8YFw8iZg?si=H0duiieO0FO92Gfe',
        //adrift cover
        'https://youtu.be/O_bdDtyow2Y?si=Zui4RHc5ix3bLfF3',
        //pretty in pink
        'https://youtu.be/eJUA0EYKFWI?si=gqCP9XMKRTjZWDY4',
        //drunk
        'https://youtu.be/T3hTwgDy_Ww?si=lXH-68Zae2MDux2Q',
        //echo
        'https://youtu.be/i92AZxL6Wl4?si=wfLUWXCZoPzX6DgM',
        //epoch
        'https://youtu.be/K3m3_7RoGZk?si=9hRwK_Gc9L3iDC_q',
        //escape velocity
        'https://youtu.be/csFnFkrLfRs?si=Yg5eilPj42LNdUA6',
        //never gonna give you up
        'https://youtu.be/dQw4w9WgXcQ?si=HbZf2yVj4-lGf6F-',
        //bad apple
        'https://youtu.be/FtutLA63Cp8?si=c-vcN-xoh7Aju6DR',
        //cosmo sheldrake the moss
        'https://youtu.be/62RvnXZgHwQ?si=IOekVjMe304PhjuY',
        //chonny jash the moss
        'https://youtu.be/_HU1ZwN2PQ0?si=1rB4JhjaF7rUOUQI',
        //stuck inside
        'https://youtu.be/AWPB2p1CEZQ?si=vaBKCzGvpNomcZJV',
        //terrible things
        'https://youtu.be/0tBY30TS190?si=oQa4tSgC9JDA9CQp',
        //hello world
        'https://youtu.be/Yw6u6YkTgQ4?si=LgZTZvVlFxrZ2IzI',
        //goodbye to a world
        'https://youtu.be/W2TE0DjdNqI?si=GQ2tvB0sPzvCzko2',
        //loser baby
        'https://youtu.be/9sVoglgJjRg?si=bySPh8cg67O05BjI',
        //don't be a fool
        'https://youtu.be/6V02y3q1tpo?si=xIiZxnAYH00RV-8V',
        //mindustry ost
        'https://youtube.com/playlist?list=PLKtSsQFPB7SugSqHCfFIXMFeI4sqq2iNE&si=sGQRFoyRTQ5J81li',
        //biggering
        'https://youtu.be/cpyuolKoeAY?si=D0RH6ipWljnZCBdy',
        //con lentitud poderosa
        'https://youtu.be/Nn9trJXUrp0?si=m-Nr9-uQnTIV8sq2',
        //here comes a savior
        'https://youtu.be/LNXjBnZfu3Q?si=-gRdKbKzi8xn4hls'
    ];
    let randIndex = Math.floor(Math.random() * (links.length + 1));
    window.open(links[randIndex], '_blank');
}

function updatePseudoOrgan() {
    pseudoOrgan = (pseudoOrgan + 1) % 3;
    document.getElementById("tooltip-cycle-text").textContent = pseudoOrgan == 0 ? "false" : pseudoOrgan == 1 ? "unset" : "true";
    updateNBT();
}

function updateNBT() {
    const nbt_generation = document.getElementById("give-command");
    var nbt_pseudo = "";
    if (pseudoOrgan == 1) {
        nbt_pseudo = "";
    }
    else {
        if (pseudoOrgan == 0) {
            nbt_pseudo = '"pseudoOrgan": 0b';
        } else {
            nbt_pseudo = '"pseudoOrgan": 1b';
        }
        if (nbt_content != "") {
            nbt_pseudo += ", ";
        }
    }
    nbt_generation.textContent = 'organData:{' + nbt_pseudo + nbt_content + '}';
}

//todo: json generator
