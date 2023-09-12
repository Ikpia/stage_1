const controller = async (req, res) => {
    try{
    const {slack_name, track} = req.query;

    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[currentDate.getDay()];
    const currentUtcTime = new Date().toUTCString();
    // Create date objects for +/-2 hours from now
    const twoHoursAgo = new Date();
    twoHoursAgo.setUTCHours(twoHoursAgo.getUTCHours() - 2);

    const twoHoursFromNow = new Date();
    twoHoursFromNow.setUTCHours(twoHoursFromNow.getUTCHours() + 2);

    // Validate if the current UTC time is within the range
    if (currentUtcTime >= twoHoursAgo.toUTCString() && currentUtcTime <= twoHoursFromNow.toUTCString()) {
        const year = currentDate.getUTCFullYear();
        const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getUTCDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
  
        const currentTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        console.log("Current UTC time is within the range of +/-2 hours.");
        console.log("Current UTC time:", currentUtcTime, currentDate);

        const  response = {
            "slack_name": slack_name,
            "current_day": currentDay,
            "utc_time": currentTime,
            "track": track,
            "github_file_url": "https://github.com/Ikpia/stage_1/blob/main/server.js",
            "github_repo_url": "https://github.com/Ikpia/stage_1",
            "status_code": 200,
        }
        res.status(200).json(response);
    } else {
    console.log("Current UTC time is outside the range of +/-2 hours.");
    }
   
 
} catch (error) {
    res.status(500).send(error.message);
    }
}

module.exports = controller;