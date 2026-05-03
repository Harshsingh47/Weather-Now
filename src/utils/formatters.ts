export const formatTemperature = (temp: number, unit: 'CELSIUS' | 'FAHRENHEIT'): string => {
  if (unit === 'FAHRENHEIT') {
    return `${Math.round((temp * 9) / 5 + 32)}°`;
  }
  return `${Math.round(temp)}°`;
};

export const getWeatherIconUrl = (iconId: string) => {
  return `https://openweathermap.org/img/wn/${iconId}@4x.png`;
};
