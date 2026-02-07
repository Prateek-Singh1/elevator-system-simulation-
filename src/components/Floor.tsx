import { useElevator } from '../context/ElevatorContext';
import { assignElevator } from '../core/elevatorDispatcher';

interface Props {
  floor: number;
  direction?: string;
  id?: string;
}

export function Floor({ floor }: Props) {
  const { state, dispatch } = useElevator();
  const isPendingUp = state.requests.some(
    (r: Props) => r.floor === floor && r.direction === 'UP'
  );

  const isPendingDown = state.requests.some(
    (r: Props) => r.floor === floor && r.direction === 'DOWN'
  );



  const handleRequest = (direction: 'UP' | 'DOWN') => {
    // Decide elevator FIRST
    const assignedElevatorId = assignElevator(state.elevators, {
      floor,
      direction,
    });

    if (!assignedElevatorId) return;

    const elevator = state.elevators.find(
      (e: Props) => e.id === assignedElevatorId
    );
    if (!elevator) return;

    // Lets keep queue as where th elift has to go
    if (elevator.queue.includes(floor)) return;

    dispatch({
      type: 'ADD_STOP',
      payload: {
        elevatorId: assignedElevatorId,
        floor,
      },
    });

    dispatch({
      type: 'HALL_REQUEST',
      payload: { floor, direction },
    });
  };



  return (
    <div className="floor">
      <div className="floor-number">{floor === 0 ? 'G' : floor}</div>

      <div className="buttons">
        {floor < 5 && (
          <button
            disabled={isPendingUp}
            onClick={() => handleRequest('UP')}
          >
            ▲
          </button>
        )}

        {floor > 0 && (
          <button
            disabled={isPendingDown}
            onClick={() => handleRequest('DOWN')}
          >
            ▼
          </button>
        )}

      </div>
    </div>
  );
}
