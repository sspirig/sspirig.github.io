    ///////////// PARTIE MAP
    var map = L.map('map').setView([46.204391, 6.143158], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

    const marker1 = L.marker([46.201311, 6.143000]).addTo(map);
    