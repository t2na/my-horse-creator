// Function to handle the increment and decrement buttons
function handleStatChange(event) {
    // Get the stat name from the 'data-stat' attribute
    const statName = event.target.getAttribute('data-stat');

    // Get the corresponding hidden input and span elements
    const input = document.getElementById(statName);
    const span = document.querySelector(`span[data-stat='${statName}']`);

    // Get the current value and convert it to a number
    let value = parseInt(input.value, 10);

    // Increment or decrement the value based on the button's class
    if (event.target.classList.contains('increment')) {
        value += 1;
    } else if (event.target.classList.contains('decrement')) {
        value -= 1;
    }

    // Update the input and span with the new value
    input.value = value;
    span.textContent = value;
}

// Add event listeners to all the increment and decrement buttons
const buttons = document.querySelectorAll('.increment, .decrement');
buttons.forEach(button => {
    button.addEventListener('click', handleStatChange);
});


document.getElementById('horseStatsForm').addEventListener('submit', async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values from the hidden input fields
    const horse_name = document.getElementById('horse_name').value;
    const horse_breed = document.getElementById('horse_breed').value;
    const horse_power = document.getElementById('horse_power').value;
    const horse_speed = document.getElementById('horse_speed').value;
    const horse_smarts = document.getElementById('horse_smarts').value;
    const horse_weight = document.getElementById('horse_weight').value;
    const horse_description = document.getElementById('horse_description').value;

    // Construct the object to send to the server
    const horseCharacterData = {
        horse_name,
        horse_breed,
        horse_power,
        horse_speed,
        horse_smarts,
        horse_weight,
        horse_description
    };

    try {
        // Send a POST request to the server
        const response = await fetch('/api/horses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(horseCharacterData)
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect to the homepage if the response is OK
            alert("You created a horse") //this shit is sloppy and lazy
        } else {
            const data = await response.json();
            console.log('Error:', data);
            alert(response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
