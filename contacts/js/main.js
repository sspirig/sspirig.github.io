"use strict";

if (navigator?.contacts && navigator.contacts.select) {
    const contactButton = document.getElementById('pickContacts');
    
    contactButton.addEventListener('click', async () => {
        const fields = ["name", "email", "tel", "address"];
        const options = { multiple: true };

        try {
            const selectedContacts = await navigator.contacts.select(fields, options);
            
            for (const contact of selectedContacts) {
                console.log("Contact sélectionné:", contact);
            }
        } catch (err) {
            console.error("Erreur lors de la sélection des contacts:", err);
        }
    });
} else {
    console.warn("Sélecteur de contacts non supporté");
}