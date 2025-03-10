'use client';

import { useCallback, useState } from 'react';

const GetPage = () => {
  const [position, setPosition] = useState<GeolocationPosition | undefined>(
    undefined
  );

  const onClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position);
    });
  }, []);

  return (
    <div className="h-full flex flex-col align-center space-y-4">
      <button className="border" onClick={onClick}>
        getCurrentPosition
      </button>
      <div>{`緯度: ${position?.coords.latitude}`}</div>
      <div>{`経度: ${position?.coords.longitude}`}</div>
    </div>
  );
};

export default GetPage;
