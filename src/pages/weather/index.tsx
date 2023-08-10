import React, { useState } from 'react'; // Import useState
import { fetchWeatherData } from '../../util/currentWeather';
import { Box, Button, Flex, FormControl, Heading, Input, Text } from '@chakra-ui/react';

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
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
  const [cityName, setCityName] = useState<string>(''); // State to store the entered city name

  const handleGetWeather = () => {
    fetchWeatherData(cityName) 
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  const isValidInput = () => {
    return (cityName !== '')
      
    
  }

  return (
    <Flex alignContent={'center'} ml={'100px'} mt={'70px'}>
      
      <Box>
      <Heading mb={5}>current Weather</Heading>
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
            onChange={(e) => setCityName(e.target.value)} 
            
          />
        </FormControl>
        <Box mt={3} >
          <Button bg={'#4391F2'} onClick={handleGetWeather}  isDisabled = {!isValidInput()}>
            Get Weather Data
          </Button>
        </Box>
      </Box>

      {/* Display weather data if available */}
      {weatherData && (
        <Box mt={4}>
          <Heading as="h2" size="md">
            Current Weather in {weatherData.location.name}, {weatherData.location.country}
          </Heading>
          <Text fontSize="md">Temperature: {weatherData.current.temp_c}°C</Text>
          <Text fontSize="md">Condition: {weatherData.current.condition.text}</Text>
          <Text fontSize="md">Local time: {weatherData.location.localtime}</Text>
        </Box>
      )}
    </Flex>
   
  );
};

export default WeatherPage;
