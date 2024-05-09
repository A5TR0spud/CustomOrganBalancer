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