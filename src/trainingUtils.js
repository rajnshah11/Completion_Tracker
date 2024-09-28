function parseDate(dateStr) {
    dateStr = dateStr.replace(/(st|nd|rd|th)/g, "");
    const date = new Date(dateStr);
    
    if (isNaN(date.getTime())) {
        console.error(`Invalid date format: ${dateStr}`);
        return null;
    }
    return date;
}

function getMostRecentCompletions(completions) {
    const mostRecent = {};
    
    completions.forEach(completion => {
        const timestamp = parseDate(completion.timestamp);

        if (completion.name && timestamp) {
            if (!mostRecent[completion.name] || timestamp > parseDate(mostRecent[completion.name].timestamp)) {
                mostRecent[completion.name] = { ...completion , timestamp: completion.timestamp};
            }
        } else {
            console.log(`Skipping completion due to invalid data for training: ${trainingName}`);
        }
    });

    return mostRecent;
}

module.exports = { parseDate, getMostRecentCompletions };
