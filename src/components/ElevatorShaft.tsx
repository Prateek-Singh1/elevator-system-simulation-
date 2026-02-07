import { useElevator } from '../context/ElevatorContext';

interface Props {
    elevatorId: string;
}

interface elevatorMap {
    id: string;
}

export function ElevatorShaft({ elevatorId }: Props) {
    const { state } = useElevator();
    const elevator = state.elevators.find((e: elevatorMap) => e.id === elevatorId);

    if (!elevator) return null;

    const translateY = (5 - elevator.currentFloor) * 80;
    const doorClass = elevator.door === 'OPEN' ? 'open' : 'closed';

    return (
        <div className="elevator-column">
            <div className="shaft-label">Elevator {elevator.id}</div>

            <div className="shaft">
                <div
                    className="elevator"
                    style={{ transform: `translateY(${translateY}px)` }}
                >
                    <div className="display">
                        {elevator.currentFloor === 0 ? 'G' : elevator.currentFloor}
                    </div>

                    <div className={`doors ${doorClass}`} />
                </div>
            </div>
        </div>
    );
}
