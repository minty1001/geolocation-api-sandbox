'use client';

import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

const WatchPage = () => {
  const [geoId, setGeoId] = useState<number | undefined>(undefined);
  const [positions, setPositions] = useState<GeolocationPosition[] | undefined>(
    undefined
  );
  const [enableHighAccuracy, setEnableHighAccuracy] = useState<
    boolean | undefined
  >(undefined);
  const [maximumAge, setMaximumAge] = useState<number | undefined>(undefined);
  const [timeout, setTimeout] = useState<number | undefined>(undefined);

  const [options, setOptions] = useState<PositionOptions>({});

  const startWatch = useCallback(() => {
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
        undefined,
        options
      );
      setGeoId(id);
    }
  }, [geoId, options]);

  const clearWatch = useCallback(() => {
    if (geoId !== undefined) {
      navigator.geolocation.clearWatch(geoId);
      setGeoId(undefined);
    }
  }, [geoId]);

  const onClear = useCallback((name: string) => {
    if (name === 'enableHighAccuracy') {
      setEnableHighAccuracy(undefined);
    } else if (name === 'maximumAge') {
      setMaximumAge(undefined);
    } else if (name === 'timeout') {
      setTimeout(undefined);
    }
  }, []);

  const onApply = useCallback(() => {
    setOptions({
      enableHighAccuracy,
      maximumAge,
      timeout,
    });
  }, [enableHighAccuracy, maximumAge, timeout]);

  return (
    <div className="h-full flex flex-col align-center space-y-4">
      <div>
        <div className="flex space-x-1">
          <label htmlFor="enableHighAccuracy">enableHighAccuracy: </label>
          <input
            id="enableHighAccuracy"
            className="border"
            type="checkbox"
            checked={enableHighAccuracy ?? false}
            onChange={(e) => setEnableHighAccuracy(e.target.checked)}
          ></input>
        </div>
        <div className="flex space-x-1">
          <label htmlFor="maximumAge">maximumAge(number):</label>
          <input
            id="maximumAge"
            className="border"
            value={maximumAge ?? ''}
            onChange={(e) => setMaximumAge(Number(e.target.value))}
          ></input>
          <button className="border" onClick={() => onClear('maximumAge')}>
            clear
          </button>
        </div>
        <div className="flex space-x-1">
          <label htmlFor="timeout">timeout(number): </label>
          <input
            id="timeout"
            className="border"
            value={timeout ?? ''}
            onChange={(e) => setTimeout(Number(e.target.value))}
          ></input>
          <button className="border" onClick={() => onClear('timeout')}>
            clear
          </button>
        </div>
        <button className="border" onClick={onApply}>
          apply
        </button>
      </div>
      <div>options: {JSON.stringify(options)}</div>
      <button className="border" onClick={startWatch}>
        startWatch
      </button>
      <button className="border" onClick={clearWatch}>
        clearWatch
      </button>
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
          {positions?.map((position) => (
            <tr key={position.timestamp}>
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

export default WatchPage;
