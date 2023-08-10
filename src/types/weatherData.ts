export interface WeatherData {
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
  export interface ForecastWeatherData { 
    location: {
        name: string;
        country: string;
        localtime: string;
      };
      forecast: {
        forecastday: [
            {

                date: string;
            day: {
                
                maxtemp_c: number;
                avgtemp_c: number;
                avghumidity: number;
                daily_chance_of_rain: number;
    
                condition: {
                    text: string;
                }
            }
        }
            
        ]
        
      }
  }