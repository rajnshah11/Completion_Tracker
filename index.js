const loadData = require('./src/dataLoader');
const { countCompletedTrainings, participantsInFiscalYear, expiredOrSoonExpiring } = require('./src/trainingProcessor');
const writeJsonToFile = require('./src/jsonWriter');

// Load data
const data = loadData('./data/trainings.txt');
if (data.length === 0) {
    console.error('No data loaded. Exiting application.');
    process.exit(1); 
}

// Task 1
const trainingCounts = countCompletedTrainings(data);
writeJsonToFile('./output/task_1.json', trainingCounts);

// Task 2
const trainings = ["Electrical Safety for Labs", "X-Ray Safety", "Laboratory Safety Training"];
const fiscalYear = 2024;
const participants = participantsInFiscalYear(data, trainings, fiscalYear);
writeJsonToFile('./output/task_2.json', participants);

// Task 3
const specifiedDate = "Oct 1st, 2023";
const expiredOrSoon = expiredOrSoonExpiring(data, specifiedDate);
writeJsonToFile('./output/task_3.json', expiredOrSoon);
