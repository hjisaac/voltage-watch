function fetchStations() {
    return fetch('https://jsonplaceholder.typicode.com/posts') // Replace with your JSON server endpoint
      .then(response => response.json())
      .then(data => data.map(station => station.title));
  }






class VoltageEvent {
    constructor(name, measure) {
      this.name = name;
      this.measure = measure;
    }
  }
  
  const stations = ['Station1', 'Station2', 'Station3']; // Predefined station IDs
  
  function generateVoltageData() {
    const voltageData = {};
    const frequencyData = {};
  
    const generateData = () => {
      const timestamp = new Date(); // Current timestamp
  
      for (const stationId of stations) {
        const epsilon = Math.random() * 10; // Random epsilon value
  
        // Generate voltage data
        const voltageEvent = new VoltageEvent('EventName', 'voltage');
        voltageData[stationId] = {
          timestamp: timestamp.getTime(),
          mesure: voltageEvent.measure,
          value: 220 + epsilon,
          stationId: stationId
        };
  
        // Generate frequency data
        const frequencyEvent = new VoltageEvent('EventName', 'frequency');
        frequencyData[stationId] = {
          timestamp: timestamp.getTime(),
          mesure: frequencyEvent.measure,
          value: '60Hz' + epsilon,
          stationId: stationId
        };
      }
  
      // Output the generated voltage and frequency data
      console.log('Voltage Data:', voltageData);
      console.log('Frequency Data:', frequencyData);
    };
  
    // Generate data every 60 milliseconds
    setInterval(generateData, 60);
  
    // Initial data generation
    generateData();
  }
  
  // Start generating voltage data
  generateVoltageData();
  

