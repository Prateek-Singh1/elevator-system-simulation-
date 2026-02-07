import { useElevator } from '../context/ElevatorContext';

interface RequestMap {
  floor: number;
  direction: string;
}

export function RequestQueue() {
  const { state } = useElevator();

  if (state.requests.length === 0) return null;

  return (
    <div className="requests">
      <h4>Pending Requests</h4>
      <ul>
        {state.requests.map((r: RequestMap, i: number) => (
          <li key={i}>
            Floor {r.floor === 0 ? 'G' : r.floor} → {r.direction}
          </li>
        ))}
      </ul>
    </div>
  );
}
