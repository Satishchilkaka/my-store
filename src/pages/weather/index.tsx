import React, { useState } from 'react'; // Import useState
import { fetchWeatherData } from '../../util/currentWeather';
import { Box, Button, Flex, FormControl, Heading, Input, Select, Text } from '@chakra-ui/react';
import { ForecastWeather } from '@/components/forecastWeather/forecastWeather';
import { WeatherData } from '@/types/weatherData';

import cityData from '../../assets/cityNames.json'


const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const [selectedCity, setSelectedCity] = useState<string>('');

  const handleGetWeather = () => {
    fetchWeatherData(selectedCity) 
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  const isValidInput = () => {
    return (selectedCity !== '')
      
    
  }

  console.log('selectedCity',selectedCity)
  return (
    <><Flex alignContent={'center'} ml={'25px'} mt={'30px'}>

      <Box>
        <Heading mb={5}>Current Weather</Heading>
        <FormControl>
          <label>Select a city name:</label>
          <Select
            name='cityName'
            placeholder='Select city'
            mt={1}
            borderRadius={'10px'}
            borderColor={'#FFFFF'}
            maxW={'250px'}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cityData.map((cityNames) => (
              <option key={cityNames.iata_code} value={cityNames.city}>
                {cityNames.city}
              </option>
            ))}
          </Select>
        </FormControl>
        <Box mt={3}>
          <Button bg={'#4391F2'} onClick={handleGetWeather}>
            Get Weather Data
          </Button>
        </Box>
      </Box>

      
      {weatherData && (
        <Box mt={5} ml={5}>
          <Heading as="h2" size="md">
            Current Weather in {weatherData.location.name}, {weatherData.location.country}
          </Heading>
          <Text fontSize="md">Temperature: {weatherData.current.temp_c}°C</Text>
          <Text fontSize="md">Condition: {weatherData.current.condition.text}</Text>
          <Text fontSize="md">Local time: {weatherData.location.localtime}</Text>
        </Box>
      )}
    </Flex><ForecastWeather /></>
   
  );
};

export default WeatherPage;
