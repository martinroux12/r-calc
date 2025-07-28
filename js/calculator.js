// Update salary display
document.getElementById('uk-salary').addEventListener('input', function () {
  const formattedValue = Number(this.value).toLocaleString('en-GB', { minimumFractionDigits: 0 });
  document.getElementById('salary-value').textContent = formattedValue;
});


// Update billable % label dynamically
document.getElementById('billable-slider').addEventListener('input', function () {
  document.getElementById('billable-label').textContent = this.value + '%';
});

function calculate() {
  const salary = parseFloat(document.getElementById('uk-salary').value);
  const ni = parseFloat(document.getElementById('ni').value);
  const pension = parseFloat(document.getElementById('pension').value);
  const billablePercent = parseFloat(document.getElementById('billable-slider').value) / 100;
  const level = document.getElementById('level').value;

  const saRate = level === 'senior' ? 40 : 34;
  const billableHours = 2080 * billablePercent;

  const hiddenOverhead = 8775;

  const ukBaseCost = salary * (1 + (ni + pension) / 100);
  const ukTotalCost = ukBaseCost + hiddenOverhead;

  const ukHourlyRate = ukTotalCost / billableHours;
  const saAnnualCost = saRate * billableHours;
  const saving = ukTotalCost - saAnnualCost;

  document.getElementById('result').innerHTML = `
    <strong>UK all-in rate:</strong> £${ukHourlyRate.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per hour<br />
    <strong>Annual UK cost:</strong> £${ukTotalCost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br />
    <strong>Annual SA cost:</strong> £${saAnnualCost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br />
    <strong>Estimated saving:</strong> £${saving.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br /><br />
    <small style="color: #555; font-style: italic;">
      Included in the UK all-in rate is an average overhead covering IT, software, HR, office space, training, and related costs.
    </small><br /><br />
    <a href="https://calendly.com/brendons-resourceplus/intro-meeting-with-brendon" target="_blank">
      <button style="background-color: #007bff; color: white; padding: 10px 18px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
        Book a Call
      </button>
    </a>
  `;
}



