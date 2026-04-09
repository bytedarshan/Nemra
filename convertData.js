const fs = require('fs');

// 1. Automatically find the CSV file in your folder
const files = fs.readdirSync('./');
const csvFile = files.find(file => file.endsWith('.csv'));

if (!csvFile) {
  console.error('❌ ERROR: No .csv file found in the Nemra folder! Please ensure your downloaded CSV is in the main folder.');
  process.exit(1);
}

console.log(`Processing file: ${csvFile}...`);

// 2. Read and parse the CSV
const csvText = fs.readFileSync(csvFile, 'utf8');
const lines = csvText.split('\n').filter(line => line.trim() !== '');

const headers = lines[0].split(',').map(h => {
  let s = h.trim().replace(/(_|-|\s)+/g, ' ').replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).replace(/\s/g, '');
  return s.charAt(0).toLowerCase() + s.slice(1);
});

const result = [];
for (let i = 1; i < lines.length; i++) {
  // Advanced split to handle commas properly
  const currentline = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
  if (currentline.length < 2) continue;
  
  const obj = { id: i };
  for (let j = 0; j < headers.length; j++) {
    let val = currentline[j] ? currentline[j].replace(/(^"|"$)/g, '').trim() : "N/A";
    if (!val || val === "NaN") val = "N/A";
    obj[headers[j]] = val;
  }
  result.push(obj);
}

// 3. Write it directly to your React app
const fileContent = `export const contactsData = ${JSON.stringify(result, null, 2)};\n`;
fs.writeFileSync('./src/data/contactsData.js', fileContent);

console.log('✅ SUCCESS! All data has been successfully written to src/data/contactsData.js');