import React, { useState } from 'react'; // Import useState
import { fetchWeatherData } from '../../util/currentWeather';
import { Box, Button, Flex, FormControl, Heading, Input, Text } from '@chakra-ui/react';
import { ForecastWeather } from '@/components/forecastWeather/forecastWeather';
import { WeatherData } from '@/types/weatherData';




const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cityName, setCityName] = useState<string>('');

  const handleGetWeather = () => {
    fetchWeatherData(cityName) 
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  const isValidInput = () => {
    return (cityName !== '')
      
    
  }

  return (
    <><Flex alignContent={'center'} ml={'25px'} mt={'30px'}>

      <Box>
        <Heading mb={5}>Current Weather</Heading>
        <FormControl>
          <label>Enter your city name:</label>
          <Input
            type='text'
            name='cityName'
            placeholder='Enter city name'
            mt={1}
            borderRadius={'10px'}
            borderColor={'#FFFFF'}
            maxW={'250px'}
            value={cityName}
            onChange={(e) => setCityName(e.target.value)} />
        </FormControl>
        <Box mt={3}>
          <Button bg={'#4391F2'} onClick={handleGetWeather} isDisabled={!isValidInput()}>
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
