// apply form values to report
document.getElementById('applyBtn').addEventListener('click', applyValues);
document.getElementById('printBtn').addEventListener('click', () => window.print());
document.getElementById('resetBtn').addEventListener('click', () => location.reload());
document.getElementById('verifyBtn').addEventListener('click', verifyReport);
document.getElementById('pdfBtn').addEventListener('click', savePdf);

function applyValues(){
  const map = [
    ['field_leaveId','r_leaveId'],
    ['field_duration','r_duration'],
    ['field_admission','r_admission'],
    ['field_dicharge','r_discharge'],
    ['field_issue','r_issue'],
    ['field_name','r_name'],
    ['field_nid','r_nid'],
    ['field_nationality','r_nationality'],
    ['field_employer','r_employer'],
    ['field_physician','r_physician'],
    ['field_position','r_position']
  ];
  map.forEach(([f,t])=>{
    const val = document.getElementById(f).value || document.getElementById(t).textContent;
    document.getElementById(t).textContent = val;
  });
  document.getElementById('verifyResult').textContent = '';
}

// Save as PDF using html2pdf (client-side)
function savePdf(){
  const element = document.getElementById('reportArea');
  const opt = {
    margin:       0.4,
    filename:     'sick-leave-report.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

// Verify by calling backend endpoint
async function verifyReport(){
  const reportId = document.getElementById('r_leaveId').textContent || '';
  try {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ reportId })
    });
    const data = await res.json();
    const el = document.getElementById('verifyResult');
    if (data.ok) {
      el.style.color = 'green';
      el.textContent = '✔ تم التحقق — Valid';
    } else {
      el.style.color = 'crimson';
      el.textContent = '✖ غير معتمد';
    }
  } catch (err) {
    const el = document.getElementById('verifyResult');
    el.style.color = 'crimson';
    el.textContent = 'خطأ في الاتصال';
    console.error(err);
  }
}