// Update salary display
const salarySlider = document.getElementById('uk-salary');
const salaryValue = document.getElementById('salary-value');

salarySlider.addEventListener('input', () => {
  const formatted = Number(salarySlider.value).toLocaleString('en-GB', { minimumFractionDigits: 0 });
  salaryValue.textContent = formatted;
});

// Update bonus display
const bonusSlider = document.getElementById('bonus-slider');
const bonusLabel = document.getElementById('bonus-label');

bonusSlider.addEventListener('input', () => {
  bonusLabel.textContent = bonusSlider.value;
});

function calculate() {
  const salary = parseFloat(salarySlider.value);
  const ni = parseFloat(document.getElementById('ni').value);
  const pension = parseFloat(document.getElementById('pension').value);
  const bonusMultiplier = parseFloat(bonusSlider.value);
  const billablePercent = 0.7;  // fixed at 70%
  const level = document.getElementById('level').value;

  const saRate = level === 'senior' ? 40 : 34;
  const billableHours = 2080 * billablePercent;
  const hiddenOverhead = 8775;

  const monthlySalary = salary / 12;
  const bonusAmount = monthlySalary * bonusMultiplier;

  const ukBaseCost = (salary + bonusAmount) * (1 + (ni + pension) / 100);
  const ukTotalCost = ukBaseCost + hiddenOverhead;

  const saAnnualCost = saRate * billableHours;
  const saving = ukTotalCost - saAnnualCost;

  // Format the Estimated saving text
  let savingHtml = '';
  if (saving > 0) {
    savingHtml = `<div style="font-size: 1.5rem; font-weight: bold; color: #2c7a2c; margin-top: 10px;">
      Estimated saving: £${saving.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>`;
  } else {
    savingHtml = `<div style="font-size: 1rem; color: #000; margin-top: 10px;">
      Estimated saving: £${saving.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>`;
  }

  document.getElementById('result').innerHTML = `
    <strong>Annual UK cost:</strong> £${ukTotalCost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br />
    <strong>Annual SA cost:</strong> £${saAnnualCost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br />
    ${savingHtml}
    <br />
    <div style="text-align: center;">
      <a href="https://calendly.com/brendons-resourceplus/intro-meeting-with-brendon" target="_blank" style="text-decoration: none;">
        <button style="background-color: #007bff; color: white; padding: 10px 18px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
          Book a call to make your savings a reality
        </button>
      </a>
    </div>
  `;
}
