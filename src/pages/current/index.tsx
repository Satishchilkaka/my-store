


import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../../util/currentWeather';
import { Box, Button, Flex, FormControl, Heading , Text} from '@chakra-ui/react';
import { WeatherData } from '@/types/weatherData';
import { parse } from 'cookie';

import cityData from '../../assets/cityNames.json';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import withSession from '@/util/withSession';
interface ProfileProps {
  token: string; 
}

const Current: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Select');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // Redirect to login page if token is not present
    } else {
      setIsLoading(false); 
    }
  }, []);


  if (isLoading) {
    return <p>Loading...</p>;
  }




  const handleGetWeather = () => {
    fetchWeatherData(selectedCity)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  const isValidInput = () => {
    return selectedCity !== '';
  };



  return (
    <Layout>
     <h2> current page</h2>
      <Flex ml="25px" mt="30px">
        <Box flex="1">
          <Heading mb={5}>Current Weather</Heading>
          <FormControl>
            <label>Select a city name:</label>
            <select
              name="cityName"
              placeholder="Select city"
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
            <Button
              bg="#4391F2"
              onClick={handleGetWeather}
              isDisabled={!isValidInput()}
            >
              Get Weather Data
            </Button>
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
       </Box>
      </Flex> 
    </Layout>
  );
};

export default Current;


// export const getServerSideProps: GetServerSideProps<ProfileProps> = withSession(
//   async function (context) {
//     const cookies = parse(context.req.headers.cookie || '');
//     const token = cookies.token || '';

//     return {
//       props: { token },
//     };
//   }
// );