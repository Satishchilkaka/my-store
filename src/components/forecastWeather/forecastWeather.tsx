import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react"

export const ForecastWeather = () => {

   const isInputValid  = () => {
   
   }

    return (
        <Flex ml={'100px'} mt={'70px'}>
            <Box>
                <Heading mb={5}>Forecast 1 day Weather</Heading>
                <label>Enter you city name</label>
                <Input type="text"
                name='cityName'
                placeholder='Enter you city name'


                />

                <Box>
                    <Button>
                        Get Forecast Weather
                    </Button>
                    </Box>

            </Box>
        </Flex>
    )
}

