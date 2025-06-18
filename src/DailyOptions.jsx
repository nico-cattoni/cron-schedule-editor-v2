import React from 'react';

export default function DailyOptions({
  dailyMode,
  setDailyMode,
  interval,
  setInterval,
  specificTimes,
  setSpecificTimes
}) {
  // add or remove specific times
  const updateSpecificTime = (index, value) => {
    const newTimes = [...specificTimes];
    newTimes[index] = value;
    setSpecificTimes(newTimes);
  };

  const addSpecificTime = () => {
    if (specificTimes.length < 2) {
      setSpecificTimes([...specificTimes, '']);
    }
  };

  const removeSpecificTime = (index) => {
    const newTimes = specificTimes.filter((_, i) => i !== index);
    setSpecificTimes(newTimes.length ? newTimes : ['']);
  };

  return (
    <div className="daily-options">
      <div>
        <label>
          <input
            type="radio"
            name="dailyMode"
            value="interval"
            checked={dailyMode === 'interval'}
            onChange={() => setDailyMode('interval')}
          />
          Run every X minutes
        </label>
        {dailyMode === 'interval' && (
          <input
            type="number"
            min="1"
            value={interval}
            onChange={e => setInterval(e.target.value)}
            style={{ marginLeft: '10px', width: '60px' }}
          />
        )}
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>
          <input
            type="radio"
            name="dailyMode"
            value="specificTimes"
            checked={dailyMode === 'specificTimes'}
            onChange={() => setDailyMode('specificTimes')}
          />
          Run at specific time(s) every day (up to 2)
        </label>
        {dailyMode === 'specificTimes' && (
          <div style={{ marginTop: '5px' }}>
            {specificTimes.map((time, i) => (
              <div key={i} style={{ marginBottom: '5px' }}>
                <input
                  type="time"
                  value={time}
                  onChange={e => updateSpecificTime(i, e.target.value)}
                />
                {specificTimes.length > 1 && (
                  <button type="button" onClick={() => removeSpecificTime(i)} style={{ marginLeft: '5px' }}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            {specificTimes.length < 2 && (
              <button type="button" onClick={addSpecificTime}>
                Add Time
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
