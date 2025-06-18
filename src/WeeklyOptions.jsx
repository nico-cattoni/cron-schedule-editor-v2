import React from 'react';

const weekdaysList = [
  { label: 'Monday', value: 'MON' },
  { label: 'Tuesday', value: 'TUE' },
  { label: 'Wednesday', value: 'WED' },
  { label: 'Thursday', value: 'THU' },
  { label: 'Friday', value: 'FRI' },
  { label: 'Saturday', value: 'SAT' },
  { label: 'Sunday', value: 'SUN' },
];

export default function WeeklyOptions({ weekdays, setWeekdays, weeklyTime, setWeeklyTime }) {
  const toggleWeekday = (day) => {
    if (weekdays.includes(day)) {
      setWeekdays(weekdays.filter(d => d !== day));
    } else {
      setWeekdays([...weekdays, day]);
    }
  };

  return (
    <div className="weekly-options">
      <div>
        <label>Pick days of the week:</label><br />
        {weekdaysList.map(day => (
          <label key={day.value} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={day.value}
              checked={weekdays.includes(day.value)}
              onChange={() => toggleWeekday(day.value)}
            />
            {day.label}
          </label>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Time:
          <input
            type="time"
            value={weeklyTime}
            onChange={e => setWeeklyTime(e.target.value)}
            style={{ marginLeft: '5px' }}
          />
        </label>
      </div>
    </div>
  );
}
