const TruckerJobConfig = require("./TruckerJobConfig")
const random = require('random')

//var MaxLevel = parseInt(TruckerJobConfig.MaxLevel);

var amountOfJobsPerLevel = new Array(6).fill(0);
var currentJobs = [];



function TruckerJobIntialise()
{
    CountCurrentJobs();
}

function CountCurrentJobs()
{
    currentJobs.forEach(element => {
        var level = parseInt(element.LevelRequired);
        amountOfJobsPerLevel[level - 1]++;
    });
}

function CreateJobs()
{
    var currentLevel = 1;
    amountOfJobsPerLevel.forEach(element => {
        if(amountOfJobsPerLevel <= 5)
        {
            CreateLevelJob(currentLevel);
        }
        currentLevel++;
    });
}

function CreateLevelJob(level)
{
    var jobType = TruckerJobConfig[`Level-${level}`].JobType;
    
    var randomJobValue = random.int(0, TruckerJobConfig[`Level-${level}`.length - 1]);
    var randomJob = TruckerJobConfig[`Level-${level}`].JobsAvailable[randomJobValue]; 

    var vehicleToSpawn = null;
    var trailerToSpawn = null;

    if(jobType == "Goods")
    {
        if(TruckerJobConfig[`Level-${level}`][`${randomJob}`] == undefined)
        {
            var randomVehicleValue = random.int(0, TruckerJobConfig[`Level-${level}`].AllVehicles.length - 1);
            vehicleToSpawn = TruckerJobConfig[`Level-${level}`].AllVehicles[randomVehicleValue];
        }
        else
        {
            var randomVehicleValue = random.int(0, TruckerJobConfig[`Level-${level}`][`${randomJob}`].length - 1);
            vehicleToSpawn = TruckerJobConfig[`Level-${level}`].AllVehicles[randomVehicleValue];
        }

        var jobCreated =
        {
            LevelRequired: level,
            JobType: jobType,
            Cargo: randomJob,
            Trailer: false,
            TrailerType: null,
            Location: "TEST",
            Reward: 1000
        }
    }
    else
    {
        /*
        if(TruckerJobConfig[`Level-${level}`][`${randomJob}-Trailer`] == undefined)
        {
            var randomVehicleValue = random.int(0, TruckerJobConfig[`Level-${level}`].AllVehicles.length - 1);
            vehicleToSpawn = TruckerJobConfig[`Level-${level}`].AllVehicles[randomVehicleValue];
        }
        else
        {
            var randomVehicleValue = random.int(0, TruckerJobConfig[`Level-${level}`][`${randomJob}`].length - 1);
            vehicleToSpawn = TruckerJobConfig[`Level-${level}`].AllVehicles[randomVehicleValue];
        }

        var jobCreated =
        {
            LevelRequired: level,
            JobType: jobType,
            Cargo: randomJob,
            Trailer: true,
            TrailerType: null,
            Location: "TEST",
            Reward: 5000
        }
        */
    }
}

