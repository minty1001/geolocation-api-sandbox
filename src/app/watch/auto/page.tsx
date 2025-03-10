'use client';

import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

const AutoWatchPage = () => {
  const [geoId, setGeoId] = useState<number | undefined>(undefined);
  const [positions, setPositions] = useState<GeolocationPosition[] | undefined>(
    undefined
  );
  const [isError, setIsError] = useState<boolean>(false);

  const startWatch = useCallback(() => {
    setIsError(false);
    if (geoId === undefined) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          console.log('position:', position);
          setPositions((prev) => {
            if (prev === undefined) {
              return [position];
            }
            return [...prev, position];
          });
        },
        () => {
          setIsError(true);
        }
      );
      setGeoId(id);
    }
  }, [geoId]);

  const clearWatch = useCallback(() => {
    if (geoId !== undefined) {
      navigator.geolocation.clearWatch(geoId);
    }
  }, [geoId]);

  useEffect(() => {
    startWatch();
    return () => {
      clearWatch();
    };
  }, [clearWatch, startWatch]);

  return (
    <div className="h-full flex flex-col align-center space-y-4">
      {isError && <div>{'error'}</div>}
      {geoId !== undefined && <div>{'watching...'}</div>}
      <table className="border">
        <thead>
          <tr>
            <th className="border">タイムスタンプ</th>
            <th className="border">緯度</th>
            <th className="border">経度</th>
          </tr>
        </thead>
        <tbody>
          {positions?.map((position, index) => (
            <tr key={index}>
              <td className="border">
                {dayjs(position.timestamp).toISOString()}
              </td>
              <td className="border">{position.coords.latitude}</td>
              <td className="border">{position.coords.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutoWatchPage;
