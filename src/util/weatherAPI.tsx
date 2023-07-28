
const API_KEY = process.env.WEATHER_API_KEY;

console.log('api key: ' + JSON.stringify(API_KEY))

export async function fetchWeatherData(city: string) {
  if (!API_KEY) {
    throw new Error('Weather API key not found. Please set the WEATHER_API_KEY environment variable.');
  }

  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
  );
  const data = await response.json();
  return data;
}
