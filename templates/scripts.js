document.addEventListener('DOMContentLoaded', function () {
    const registerBtn = document.getElementById('registerBtn');
    const registrationOptions = document.getElementById('registrationOptions');
    const carOwnerBtn = document.getElementById('carOwnerBtn');
    const mechanicBtn = document.getElementById('mechanicBtn');

    registerBtn.addEventListener('click', function () {
        registrationOptions.style.display = 'flex';
    });

    carOwnerBtn.addEventListener('click', function () {
        // Add logic for car owner registration
        alert('Car Owner Registration Clicked!');
    });

    mechanicBtn.addEventListener('click', function () {
        // Add logic for mechanic registration
        alert('Mechanic Registration Clicked!');
    });
});
