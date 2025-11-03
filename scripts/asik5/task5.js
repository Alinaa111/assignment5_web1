function displayCurrentDateTime() {
    const datetimeDisplayElement = document.getElementById("datetime-display");
    const now = new Date();

    const formattedDateTime = now.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

    datetimeDisplayElement.textContent = formattedDateTime;
}

displayCurrentDateTime();

setInterval(displayCurrentDateTime, 1000);