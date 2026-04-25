async function fetchWeatherAlerts(state) {
  try {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    //Get the response after fetching
    const response = await fetch(url);

    //Extract the data from the response
    const data = await response.json();

    console.log(data); // for testing

    return data;

  } catch (error) {
    console.log(error.message);
    throw error;
  }

}

function displayAlerts(data) {
  const container = document.querySelector('#alerts-display');
  container.innerHTML = '';

  const alerts = data.features || [];

  const summary = document.createElement('h2');
  summary.textContent = `Weather Alerts: ${alerts.length}`;
  container.appendChild(summary);

  const ul = document.createElement('ul');

  alerts.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  container.appendChild(ul);
}


function showError(message) {
  const errorDiv = document.querySelector('#error-message');

  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

document.querySelector('#fetch-alerts').addEventListener('click', async () => {

  const input = document.querySelector('#state-input');
  const state = input.value.trim();

  const errorDiv = document.querySelector('#error-message');
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');

  try {
    // Safety check => check if the input has no value
    if (!state) {
      throw new Error('Please enter a state abbreviation');
    }

    const data = await fetchWeatherAlerts(state);

    displayAlerts(data);

    // clear input
    input.value = '';

  } catch (error) {
    showError(error.message);
  }
});