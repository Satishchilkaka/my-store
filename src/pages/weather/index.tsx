
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../../util/weatherAPI';
import { Flex, Heading, Text } from '@chakra-ui/react';

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Replace 'Toronto' with the desired city name
    fetchWeatherData('Toronto')
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Heading as="h1" size="xl" mb={4}>
        Current Weather in {weatherData.location.name}, {weatherData.location.country}
      </Heading>
      <Text fontSize="xl">Temperature: {weatherData.current.temp_c}°C</Text>
      <Text fontSize="xl">Condition: {weatherData.current.condition.text}</Text>
    </Flex>
  );
};

export default WeatherPage;
