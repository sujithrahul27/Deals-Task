console.log("Widget script initialized.");

ZOHO.embeddedApp.on("PageLoad", function(data) {
    document.getElementById("result").innerText = "Result : Loaded Successfully";

    ZOHO.CRM.API.getRecord({ Entity: data.Entity, RecordID: data.EntityId })
    .then(function(response) {
        const recordData = response.data[0];
        const container = document.getElementById("details-container");

        // Clear any previous content from the container
        container.innerHTML = '';

        // Loop through each key-value pair in the record object
        for (const [key, value] of Object.entries(recordData)) {

            // --- Skip complex objects and internal fields for a cleaner UI ---
            // You can customize this logic to display specific nested values if needed
            if (typeof value === 'object' && value !== null || key.startsWith('$')) {
                continue; // Skips the current iteration and moves to the next key
            }

            // 1. Create the main card container
            const card = document.createElement("div");
            card.className = "field-card";

            // 2. Create the label element (for the key)
            const label = document.createElement("span");
            label.className = "field-label";
            // Replace underscores with spaces for better readability
            label.textContent = key.replace(/_/g, ' '); 

            // 3. Create the value element
            const valueSpan = document.createElement("span");
            valueSpan.className = "field-value";
            // Use a dash for null or empty values for a cleaner look
            valueSpan.textContent = value || "N/A";

            // 4. Append the label and value to the card
            card.appendChild(label);
            card.appendChild(valueSpan);

            // 5. Append the completed card to the main container
            container.appendChild(card);
        }
    }).catch(function(error) {
        document.getElementById("err").innerText = "Error: " + JSON.stringify(error);
        const container = document.getElementById("details-container");
        container.innerHTML = '<p>Could not load record details. Please try again.</p>';
    });
});

ZOHO.embeddedApp.init();
