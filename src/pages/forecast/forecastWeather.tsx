import { ForecastWeatherData } from "@/types/weatherData";
import { getForecastWeather } from "@/util/currentWeather";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const ForecastWeather = () => {
  const [cityName, setCityName] = useState<string>("");
  const [forecastWeatherData, setForecastWeatherData] = useState<ForecastWeatherData | null>(null);


  const isInputValid = () => {
    return cityName !== null && cityName !== '';
  };
  const forecastWeather = () => {
  
    getForecastWeather(cityName).then((forecastData) => {
        setForecastWeatherData(forecastData)
        console.log('Forecast weather', forecastData)
    })
  };

  return (
    <Flex ml={"25px"} mt={"70px"}>
      <Box>
        <Heading mb={5}>Forecast 1 day Weather</Heading>
        <label>Enter you city name</label>
        <Input
          type="text"
          name="cityName"
          placeholder="Enter you city name"
          mt={1}
          mb={3}
          borderRadius={"10px"}
          borderColor={"#FFFFF"}
          maxW={"250px"}
          width='70%'
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />

        <Box>
          <Button bg={"#4391F2"} isDisabled={!isInputValid()}
          onClick={forecastWeather}>
            Get Forecast Weather
          </Button>
        </Box>
        </Box>
        {forecastWeatherData && (
        <Box mt={3} ml={5}>
          <Heading as="h2" size="md">
            Forecast Weather in {forecastWeatherData?.location.name}, {forecastWeatherData?.location.country}
          </Heading>
          
          <Box>
            <Text fontSize='md'>Today {forecastWeatherData?.forecast.forecastday[0].date} will be:</Text>
            <Text fontSize="md">Average Temperature: {forecastWeatherData.forecast.forecastday[0].day.avgtemp_c}°C</Text>
          <Text fontSize="md">Max Temperature: {forecastWeatherData.forecast.forecastday[0].day.maxtemp_c}</Text>
          <Text fontSize="md">Chance of rain: {forecastWeatherData.forecast.forecastday[0].day.daily_chance_of_rain}</Text>
          {/* <Text fontSize="md">Todays condition: {forecastWeatherData.forecast.forecastday[0].condition.text}</Text> */}
          </Box>
          
        </Box>
        )}
    
    </Flex>
  );
};

export default ForecastWeather