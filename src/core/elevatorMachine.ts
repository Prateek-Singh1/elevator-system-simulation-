import type { Elevator } from "./elevator.types";


const wait = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export async function moveElevator(
  elevator: Elevator,
  targetFloor: number,
  update: (e: Elevator) => void
) {
  //already at floor
  if (elevator.currentFloor === targetFloor) {
    return;
  }

  let currentFloor = elevator.currentFloor;
  const direction =
    targetFloor > currentFloor ? 'UP' : 'DOWN';

  // Start moving — doors locked
  update({
    ...elevator,
    currentFloor,
    direction,
    isMoving: true,
    door: 'CLOSED',
  });

  while (currentFloor !== targetFloor) {
    await wait(2000);
    currentFloor += direction === 'UP' ? 1 : -1;

    update({
      ...elevator,
      currentFloor,
      direction,
      isMoving: true,
      door: 'CLOSED',
    });
  }

  // Arrived → stop → open doors
  await openDoors(
    {
      ...elevator,
      currentFloor,
      direction,
      isMoving: false,
      door: 'CLOSED',
    },
    update
  );
}

async function openDoors(
  elevator: Elevator,
  update: (e: Elevator) => void
) {
  update({ ...elevator, isMoving: false, door: 'OPENING' });
  await wait(1500);

  update({ ...elevator, isMoving: false, door: 'OPEN' });
  await wait(3000);

  update({ ...elevator, isMoving: false, door: 'CLOSING' });
  await wait(1500);

  update({ ...elevator, isMoving: false, door: 'CLOSED' });
}
