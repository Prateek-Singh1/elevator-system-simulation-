export type Direction = 'UP' | 'DOWN' | 'IDLE';

export type DoorState =
    | 'OPEN'
    | 'CLOSED'
    | 'OPENING'
    | 'CLOSING';

export interface Elevator {
    id: string;
    currentFloor: number;
    direction: Direction;
    queue: number[];
    door: DoorState;
    isMoving: boolean;
}

export interface HallRequest {
    floor: number;
    direction: 'UP' | 'DOWN';
}
