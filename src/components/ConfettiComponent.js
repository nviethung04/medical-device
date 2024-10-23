import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = ({ open }) => {
  const [hasReady, setHasReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasReady(true);
    }, 100);
  }, []);

  if (!hasReady) return null;
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={open ? 500 : 0}
        style={{ zIndex: 1000 }}
        recycle={false}
      />
    </>
  );
};

export default ConfettiComponent;
