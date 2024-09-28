const { getMostRecentCompletions } = require('./trainingUtils');
const { parseDate } = require('./trainingUtils');

function countCompletedTrainings(data) {
    const trainingCounts = {};

    data.forEach(person => {
        if (person.completions) {
            const mostRecentCompletions = getMostRecentCompletions(person.completions);
            for (const trainingName in mostRecentCompletions) {
                trainingCounts[trainingName] = (trainingCounts[trainingName] || 0) + 1;
            }
        }
    });

    return Object.keys(trainingCounts).map(trainingName => ({
        training: trainingName,
        count: trainingCounts[trainingName]
    }));
}

function participantsInFiscalYear(data, trainings, n) {
    const fiscalYearStart = new Date(`07/01/${n - 1}`);
    const fiscalYearEnd =new Date(`06/30/${n}`);
    const results = [];

    trainings.forEach(training => {
        const trainingResult = { training: training, participants: [] };

        data.forEach(person => {
            if (person.completions) {
                const mostRecentCompletions = getMostRecentCompletions(person.completions);
                for (const trainingName in mostRecentCompletions) {
                    const completion = mostRecentCompletions[trainingName];
                    if (trainingName === training && parseDate(completion.timestamp) >= fiscalYearStart && parseDate(completion.timestamp) <= fiscalYearEnd) {
                        trainingResult.participants.push(person.name); 
                    }
                }
            }
        });

        if (trainingResult.participants.length > 0) {
            results.push(trainingResult);
        }
    });

    return results; 
}

function expiredOrSoonExpiring(data, referenceDateStr) {
    const results = [];
    const referenceDate = parseDate(referenceDateStr);

    if (!referenceDate) {
        console.error(`Invalid reference date: ${referenceDateStr}`);
        return results;
    }

    const expirationDate = new Date(referenceDate);
    const soonExpirationDate = new Date(expirationDate);
    soonExpirationDate.setMonth(expirationDate.getMonth() + 1);

    data.forEach(person => {
        if (person.completions) {
            const mostRecentCompletions = getMostRecentCompletions(person.completions);
            const personResults = { name: person.name, completions: [] };
            for (const trainingName in mostRecentCompletions) {
                const completion = mostRecentCompletions[trainingName];
                if (completion.expires) {
                    const expireDate = parseDate(completion.expires);
                    if (expireDate) {
                        if (expireDate < expirationDate) {
                            personResults.completions.push({ ...completion, status: "expired" });
                        } else if (expireDate <= soonExpirationDate) {
                            personResults.completions.push({ ...completion, status: "expires soon" });
                        }
                    }
                }
            }
            if (personResults.completions.length > 0) {
                results.push(personResults);
            }
        }
    });

    return results;
}

module.exports = { countCompletedTrainings, participantsInFiscalYear, expiredOrSoonExpiring };
