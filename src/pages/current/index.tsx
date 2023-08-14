import React, { useState } from 'react';
import { fetchWeatherData } from '../../util/currentWeather';
import { Box, Button, Flex, FormControl,  Heading, Text } from '@chakra-ui/react';
import { ForecastWeather } from '@/components/forecastWeather/forecastWeather';
import { WeatherData } from '@/types/weatherData';

import cityData from '../../assets/cityNames.json'
import {  SubscribeForm } from '@/components/forms/SubscribeForm';


const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const [selectedCity, setSelectedCity] = useState<string>('Select');

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
    <Flex alignContent={'center'} ml={'25px'} mt={'30px'}>

      <Box>
        <Heading mb={5}>Current Weather</Heading>
        <FormControl>
          <label>Select a city name:</label>
          <select
            name='cityName'
            placeholder='Select city'
            style={{
              borderRadius: '10px',
              width: '70%',
              minHeight: '40px',
            }}


            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cityData.map((cityNames) => (
              <option key={cityNames.iata_code} value={cityNames.city}>
                {cityNames.city}
              </option>
            ))}
          </select>
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


    {/* <Box >
    <ForecastWeather />
      </Box>

      <Box >
    <SubscribeForm />
      </Box>
      </VStack> */}
    </Flex>
    
    
    
    
    
  );
};

export default WeatherPage;
