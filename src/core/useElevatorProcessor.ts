import { useEffect, useRef } from "react";
import { moveElevator } from "./elevatorMachine";
import { useElevator } from "../context/ElevatorContext";

interface ElevatorMap {
  id: string;
  queue: string[];
}

export function useElevatorProcessor() {
  const { state, dispatch } = useElevator();
  const processingRef = useRef<Record<string, boolean>>({});
  const elevatorsRef = useRef(state.elevators);

  // keep latest elevators
  useEffect(() => {
    elevatorsRef.current = state.elevators;
  }, [state.elevators]);

  useEffect(() => {
    state.elevators.forEach((e: ElevatorMap) => {
      if (processingRef.current[e.id]) return;
      if (e.queue.length === 0) return;

      processingRef.current[e.id] = true;
      processNextStop(e.id);
    });
  }, [state.elevators]);

  async function processNextStop(elevatorId: string) {
    const elevator = elevatorsRef.current.find(
      (e: ElevatorMap) => e.id === elevatorId
    );

    if (!elevator || elevator.queue.length === 0) {
      processingRef.current[elevatorId] = false;
      return;
    }

    const targetFloor = elevator.queue[0];

    await moveElevator(elevator, targetFloor, (updated) => {
      dispatch({
        type: "UPDATE_ELEVATOR",
        payload: updated,
      });
    });

    dispatch({
      type: "REMOVE_STOP",
      payload: { elevatorId, floor: targetFloor },
    });

    dispatch({
      type: "CLEAR_REQUEST",
      payload: targetFloor,
    });

    processingRef.current[elevatorId] = false;

    // CRITICAL FIX:
    // If queue still has items, schedule next run explicitly
    setTimeout(() => {
      const latest = elevatorsRef.current.find(
        (e: ElevatorMap) => e.id === elevatorId
      );
      if (latest && latest.queue.length > 0) {
        if (!processingRef.current[elevatorId]) {
          processingRef.current[elevatorId] = true;
          processNextStop(elevatorId);
        }
      }
    }, 0);
  }
}
