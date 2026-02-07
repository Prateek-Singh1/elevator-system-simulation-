import type { Elevator } from '../core/elevator.types';
import { assignElevator } from '../core/elevatorDispatcher';


test('assigns idle closest elevator', () => {
  const elevators: Elevator[] = [
    { id: 'A', currentFloor: 5, direction: 'IDLE', queue: [], door: 'CLOSED', isMoving: false },
    { id: 'B', currentFloor: 1, direction: 'IDLE', queue: [], door: 'CLOSED', isMoving: false },
  ];

  const result = assignElevator(elevators, {
    floor: 2,
    direction: 'UP',
  });

  expect(result).toBe('B');
});
