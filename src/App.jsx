import MonthlyOptions from './MonthlyOptions';
import DailyOptions from './DailyOptions';
import WeeklyOptions from './WeeklyOptions';
import { useState } from 'react';
import './App.css';

function App() {
  const [cron, setCron] = useState('');
  const [scheduleType, setScheduleType] = useState('');
  const [weekdays, setWeekdays] = useState([]);
  const [weeklyTime, setWeeklyTime] = useState('');
  const [dailyMode, setDailyMode] = useState('interval'); // 'interval' o 'specificTimes'
  const [interval, setInterval] = useState(15);
  const [specificTimes, setSpecificTimes] = useState(['']);
  const [monthDays, setMonthDays] = useState([]);
  const [monthlyTime, setMonthlyTime] = useState('');

  const handleSave = () => {
    let cronExpression = '';

    if (scheduleType === 'weekly') {
      if (!weeklyTime || weekdays.length === 0) {
        alert('Please select at least one weekday and a time.');
        return;
      }
      const [hour, minute] = weeklyTime.split(':');
      const daysStr = weekdays.join(',');
      cronExpression = `${minute} ${hour} ? * ${daysStr}`;
    } else if (scheduleType === 'daily') {
      if (dailyMode === 'interval') {
        if (!interval || isNaN(interval) || interval < 1) {
          alert('Please enter a valid interval.');
          return;
        }
        cronExpression = `*/${interval} * * * *`;
      } else if (dailyMode === 'specificTimes') {
        if (specificTimes.length === 0 || specificTimes.some(t => !t)) {
          alert('Please enter valid time(s).');
          return;
        }
        const hours = specificTimes
          .map(t => t.split(':')[0].padStart(2, '0'))
          .join(',');
        cronExpression = `0 ${hours} * * *`;
      }
    } else if (scheduleType === 'monthly') {
      if (!monthlyTime || monthDays.length === 0) {
        alert('Please select at least one day of the month and a time.');
        return;
      }
      const [hour, minute] = monthlyTime.split(':');
      const daysStr = monthDays.join(',');
      cronExpression = `${minute} ${hour} ${daysStr} * ?`;
    } else {
      alert('Unsupported schedule type or not implemented yet.');
      return;
    }

    setCron(cronExpression);
  };

  const handleLoad = () => {
    const input = cron.trim();

    const dailyRegex = /^\*\/(\d+)\s+\*\s+\*\s+\*\s+\*$/;
    const weeklyRegex = /^(\d{1,2}) (\d{1,2}) \? \* ([A-Z]{3}(?:,[A-Z]{3})*)$/;
    const specificTimesRegex = /^0 (\d{1,2}(?:,\d{1,2})*) \* \* \*$/;
    const monthlyRegex = /^(\d{1,2}) (\d{1,2}) ([\d,]+) \* \?$/;

    const dailyMatch = input.match(dailyRegex);
    if (dailyMatch) {
      setScheduleType('daily');
      setDailyMode('interval');
      setInterval(dailyMatch[1]);
      setSpecificTimes(['']);
      return;
    }

    const weeklyMatch = input.match(weeklyRegex);
    if (weeklyMatch) {
      const [_, minute, hour, days] = weeklyMatch;
      setScheduleType('weekly');
      setWeeklyTime(`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`);
      setWeekdays(days.split(','));
      return;
    }

    const specificTimesMatch = input.match(specificTimesRegex);
    if (specificTimesMatch) {
      setScheduleType('daily');
      setDailyMode('specificTimes');
      const hoursStr = specificTimesMatch[1];
      const hoursArr = hoursStr.split(',').map(h => h.padStart(2, '0') + ':00');
      setSpecificTimes(hoursArr);
      setInterval('');
      return;
    }

    const monthlyMatch = input.match(monthlyRegex);
    if (monthlyMatch) {
      const [_, minute, hour, days] = monthlyMatch;
      setScheduleType('monthly');
      setMonthlyTime(`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`);
      setMonthDays(days.split(',').map(d => parseInt(d)));
      return;
    }

    alert('Unsupported or invalid CRON expression.');
  };

  return (
    <div className="app">
      <h1>Cron Schedule Editor</h1>
      <form>
        <fieldset>
          <legend>Schedule</legend>

          <label>
            <input
              type="radio"
              name="type"
              value="weekly"
              onChange={() => setScheduleType('weekly')}
              checked={scheduleType === 'weekly'}
            />
            Weekly
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="daily"
              onChange={() => setScheduleType('daily')}
              checked={scheduleType === 'daily'}
            />
            Daily
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="monthly"
              onChange={() => setScheduleType('monthly')}
              checked={scheduleType === 'monthly'}
            />
            Monthly
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="custom"
              onChange={() => setScheduleType('custom')}
              checked={scheduleType === 'custom'}
            />
            Custom
          </label>
          <br />
        </fieldset>

        {scheduleType === 'weekly' && (
          <WeeklyOptions
            weekdays={weekdays}
            setWeekdays={setWeekdays}
            weeklyTime={weeklyTime}
            setWeeklyTime={setWeeklyTime}
          />
        )}

        {scheduleType === 'daily' && (
          <DailyOptions
            dailyMode={dailyMode}
            setDailyMode={setDailyMode}
            interval={interval}
            setInterval={setInterval}
            specificTimes={specificTimes}
            setSpecificTimes={setSpecificTimes}
          />
        )}

        {scheduleType === 'monthly' && (
          <MonthlyOptions
            monthDays={monthDays}
            setMonthDays={setMonthDays}
            monthlyTime={monthlyTime}
            setMonthlyTime={setMonthlyTime}
          />
        )}

        <button type="button" onClick={handleLoad}>Load</button>
        <button type="button" onClick={handleSave}>Save</button>
      </form>

      <textarea
        rows="2"
        cols="40"
        placeholder="0 23 ? * MON-FRI"
        value={cron}
        onChange={(e) => setCron(e.target.value)}
      />
    </div>
  );
}

export default App;
