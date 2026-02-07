import { ElevatorShaft } from './ElevatorShaft';
import { Floor } from './Floor';
import { RequestQueue } from './RequestQueue';

export function Building() {
    return (
        <div className="building">
            <div className="floors">
                {[5, 4, 3, 2, 1, 0].map((floor) => (
                    <Floor key={floor} floor={floor} />
                ))}
            </div>

            <div className="elevators">
                <ElevatorShaft elevatorId="A" />
                <ElevatorShaft elevatorId="B" />
            </div>
               {/* Pending requests UI Start */}
            <RequestQueue />
            {/* Pending requests UI End */}

        </div>
    );
}
