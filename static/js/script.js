document.addEventListener('DOMContentLoaded', function () {
    // Function to handle button click event
    function handleButtonClick() {
        alert('Button clicked!');
        // You can add more functionality here
    }

    // Get the button element by its ID
    const findMechanicButton = document.getElementById('findMechanicButton');

    // Add a click event listener to the button
    findMechanicButton.addEventListener('click', handleButtonClick);
});
