# Training Completion Tracker

This application is designed to manage and analyze training completion data. It reads training data from a JSON file, processes it to extract insights such as counts of completed trainings, participants in a fiscal year, and expired or soon-expiring trainings, and then writes the results to output JSON files.

## Functions Overview

### 1. `loadData(filePath)`
- **Purpose**: Loads training data from a specified JSON file.
- **Parameters**: 
  - `filePath` (string): The path to the JSON data file.
- **Returns**: An array of training data objects or an empty array in case of an error.

### 2. `countCompletedTrainings(data)`
- **Purpose**: Counts the number of participants who have completed each training.
- **Parameters**: 
  - `data` (array): An array of training data objects.
- **Returns**: An array of objects, each containing a training name and the corresponding count of participants.

### 3. `participantsInFiscalYear(data, trainings, n)`
- **Purpose**: Retrieves participants who completed specified trainings within a given fiscal year.
- **Parameters**:
  - `data` (array): An array of training data objects.
  - `trainings` (array): An array of training names to check.
  - `n` (number): The fiscal year to analyze.
- **Returns**: An array of objects, each containing a training name and an array of participants.

### 4. `expiredOrSoonExpiring(data, referenceDateStr)`
- **Purpose**: Checks for trainings that are expired or will expire soon based on a reference date.
- **Parameters**: 
  - `data` (array): An array of training data objects.
  - `referenceDateStr` (string): The date to check against (in human-readable format).
- **Returns**: An array of objects containing participant names and their trainings, along with expiration status.

### 5. `writeJsonToFile(filePath, data)`
- **Purpose**: Writes the provided data to a specified JSON file.
- **Parameters**:
  - `filePath` (string): The path where the JSON data should be written.
  - `data` (object): The data to write to the file.
- **Returns**: None.

## Requirements

- Node.js (v12 or higher)

# How to Run the Code
## Clone the Repository
```bash
   git clone
   cd Completion_Tracker
```

## Install Dependencies
Ensure you have Node.js installed, then install the necessary packages:
```bash
npm install
```

## Prepare Input Data:

Place your input data in data/trainings.txt in JSON format. Ensure it follows the structure expected by the application. An example of the expected format can be found in the included trainings.txt file.

## Run the Application
Execute the following command to run the application:

```bash
npm start
```

## View Output Data
After execution, you can find the output files in the output directory:

task1.json: Contains counts of completed trainings.
task2.json: Lists participants in the specified fiscal year.
task3.json: Lists trainings that are expired or soon to expire.
