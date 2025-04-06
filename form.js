
document.getElementById('csvFile').addEventListener('change', handleFile);
   

function handleFile(e) {
  const file = e.target.files[0];
  
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = function(event) {
    const csvData = event.target.result;
    console.log("raw data: "+typeof(csvData));
    const parsedData = parseCSV(csvData);
    console.log("parsed data: "+typeof(parsedData));

    localStorage.setItem('csvData', JSON.stringify(parsedData));
    parsedData.foreach((e)=>{
        
    })
    displayData(parsedData);
    
    console.log(parsedData);
  };

  reader.readAsText(file);
}

// Parse CSV into an array of objects
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index]?.trim() || '';
      return obj;
    }, {});
  });
}

// Display parsed data (example)
function displayData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
}


