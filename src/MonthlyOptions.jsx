import React from 'react';

export default function MonthlyOptions({ monthDays, setMonthDays, monthlyTime, setMonthlyTime }) {
  // multiple days selection (1-31)
  const toggleDay = (day) => {
    if (monthDays.includes(day)) {
      setMonthDays(monthDays.filter(d => d !== day));
    } else {
      setMonthDays([...monthDays, day].sort((a,b) => a - b));
    }
  };

  const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="monthly-options">
      <div>
        <label>Select days of the month:</label><br />
        <div style={{ maxHeight: '100px', overflowY: 'auto', border: '1px solid #ccc', padding: '5px' }}>
          {daysArray.map(day => (
            <label key={day} style={{ marginRight: '8px', width: '30px', display: 'inline-block' }}>
              <input
                type="checkbox"
                value={day}
                checked={monthDays.includes(day)}
                onChange={() => toggleDay(day)}
              />
              {day}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Time:
          <input
            type="time"
            value={monthlyTime}
            onChange={e => setMonthlyTime(e.target.value)}
            style={{ marginLeft: '5px' }}
          />
        </label>
      </div>
    </div>
  );
}
