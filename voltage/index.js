const fetch = require("isomorphic-fetch");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

const stationsUrl = "http://localhost:5000/stations";
const eventUrl = "http://localhost:5000/events";
// console.log(getStations)


const getStationsIds = (allStations) => {
    return allStations.map(station => station.id)
}


class VoltageEvent {
  constructor({measure, stationId, value, timestamp}) {
    this.stationId = stationId;
    this.measure = measure;
    this.value = value;
    this.timestamp = timestamp || new Date();
  }
}

const stations = ["Station1", "Station2", "Station3"]; // Predefined station IDs

function generateVoltageData() {
  const voltageData = {};
  const frequencyData = {};

  const generateData = () => {
    const timestamp = new Date(); // Current timestamp

    for (const stationId of stations) {
      const epsilon = Math.random() * 10; // Random epsilon value

      // Generate voltage data
      const voltageEvent = new VoltageEvent("EventName", "voltage");
      voltageData[stationId] = {
        timestamp: timestamp.getTime(),
        mesure: voltageEvent.measure,
        value: 220 + epsilon,
        stationId: stationId,
      };

      // Generate frequency data
      const frequencyEvent = new VoltageEvent("EventName", "frequency");
      frequencyData[stationId] = {
        timestamp: timestamp.getTime(),
        mesure: frequencyEvent.measure,
        value: "60Hz" + epsilon,
        stationId: stationId,
      };
    }

    // Output the generated voltage and frequency data
    console.log("Voltage Data:", voltageData);
    console.log("Frequency Data:", frequencyData);
  };

  // Generate data every 60 milliseconds
  setInterval(generateData, 60);

  // Initial data generation
  generateData();
}

// Start generating voltage data
//   generateVoltageData();

console.log(process.env.API_BASE_URL);

const writeStation = function (station) {
  const event = new VoltageEvent();
  try {
    fetch(stationsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        city: "Cotonou",
      }),
    });
  } catch (error) {}
};

const getFrequencyValue = () => {
    return [...Array(6).fill(60), ...Array(2).fill(59), ...Array(2).fill(58)][getRandomInt(10)];
}

const getVoltageValue = () => {
   const volt = 220 - getRandomInt(19)

   return [...Array(6).fill(volt), ...Array(4).fill(0)][getRandomInt(10)];
}

const writeEvent = function (allStations) {
    const allIds = getStationsIds(allStations) 
    const mesure = ["frequency", "voltage"][getRandomInt(2)]
    const event = new VoltageEvent(
        {
            stationId: allIds[getRandomInt(allIds.length + 1)],
            measure: mesure,
            value: mesure === "frequency" ? getFrequencyValue() : getVoltageValue()
        }
    )
  try {
    fetch(eventUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
  } catch (error) {}
};


fetch(stationsUrl)
  .then((response) => {
    console.log("response count => ", response);
    return response.json();
  })
  .then((data) => {
    // console.log("data => ", data)
    allStations = data
    writeEvent(allStations)
  });


// writeStation();
