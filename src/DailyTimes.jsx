import React from 'react';

function DailyTimes({ times, setTimes }) {
  // times es un array con 1 o 2 strings tipo "HH:mm"

  // Maneja el cambio de un horario
  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
  };

  // Añade un segundo horario si no existe
  const addSecondTime = () => {
    if (times.length < 2) {
      setTimes([...times, '']);
    }
  };

  // Quita el segundo horario si existe
  const removeSecondTime = () => {
    if (times.length === 2) {
      setTimes([times[0]]);
    }
  };

  return (
    <div>
      <label>
        Time 1:{' '}
        <input
          type="time"
          value={times[0] || ''}
          onChange={(e) => handleTimeChange(0, e.target.value)}
          required
        />
      </label>
      <br />
      {times.length === 2 && (
        <label>
          Time 2:{' '}
          <input
            type="time"
            value={times[1] || ''}
            onChange={(e) => handleTimeChange(1, e.target.value)}
            required
          />
        </label>
      )}
      <br />
      {times.length < 2 ? (
        <button type="button" onClick={addSecondTime}>
          Add second time
        </button>
      ) : (
        <button type="button" onClick={removeSecondTime}>
          Remove second time
        </button>
      )}
    </div>
  );
}

export default DailyTimes;
