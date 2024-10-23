import { Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const NextCountryCountComponent = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentDate = new Date();
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);

      const difference = nextDay.getTime() - currentDate.getTime();
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft(null);
      }
    };

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  if (!timeLeft) {
    return <div className="text-center mt-3 time-count">Next country in:</div>;
  }

  return (
    <Box mt={5} textAlign={"center"}>
      <Text fontSize={"xl"} fontWeight={"medium"}>
        Next country in:
      </Text>
      <Text fontSize={"3xl"}>
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </Text>
    </Box>
  );
};

export default NextCountryCountComponent;
