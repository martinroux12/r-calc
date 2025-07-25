document.getElementById('calculator-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const ukSalary = parseFloat(document.getElementById('uk-salary').value);
  const ni = parseFloat(document.getElementById('ni-percentage').value) / 100;
  const pension = parseFloat(document.getElementById('pension-percentage').value) / 100;
  const benefits = parseFloat(document.getElementById('benefits').value);
  const overhead = parseFloat(document.getElementById('overhead').value);
  const hours = parseFloat(document.getElementById('hours').value);
  const saRate = parseFloat(document.getElementById('sa-rate').value);

  const totalUkCost = ukSalary + (ukSalary * ni) + (ukSalary * pension) + benefits + overhead;
  const ukHourlyRate = totalUkCost / hours;
  const totalSaCost = saRate * hours;
  const savings = totalUkCost - totalSaCost;

  const results = `
    <p><strong>UK all-in rate:</strong> £${ukHourlyRate.toFixed(2)} per hour</p>
    <p><strong>Annual UK cost:</strong> £${totalUkCost.toFixed(2)}</p>
    <p><strong>Annual SA cost:</strong> £${totalSaCost.toFixed(2)}</p>
    <p><strong>Estimated saving:</strong> £${savings.toFixed(2)}</p>
  `;

  document.getElementById('results').innerHTML = results;
});
