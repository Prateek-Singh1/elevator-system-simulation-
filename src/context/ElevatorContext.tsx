import React, { createContext, useContext, useReducer } from 'react';
import type { Elevator, HallRequest } from '../core/elevator.types';

interface State {
    elevators: Elevator[];
    requests: HallRequest[];
}

type Action =
    | { type: 'HALL_REQUEST'; payload: HallRequest }
    | { type: 'UPDATE_ELEVATOR'; payload: Elevator }
    | { type: 'REMOVE_STOP'; payload: { elevatorId: string; floor: number } }
    | { type: 'CLEAR_REQUEST'; payload: number }
    | { type: 'SET_MAINTENANCE'; payload: { elevatorId: string; active: boolean } };


const initialState: State = {
    elevators: [
        {
            id: 'A',
            currentFloor: 0,
            direction: 'IDLE',
            queue: [],
            door: 'CLOSED',
            isMoving: false,
        },
        {
            id: 'B',
            currentFloor: 0,
            direction: 'IDLE',
            queue: [],
            door: 'CLOSED',
            isMoving: false,
        },
    ],
    requests: [],
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'HALL_REQUEST':
            return {
                ...state,
                requests: [...state.requests, action.payload],
            };

        case 'UPDATE_ELEVATOR':
            return {
                ...state,
                elevators: state.elevators.map((e) =>
                    e.id === action.payload.id ? action.payload : e
                ),
            };

        case 'REMOVE_STOP':
            return {
                ...state,
                elevators: state.elevators.map((e) =>
                    e.id === action.payload.elevatorId
                        ? {
                            ...e,
                            queue: e.queue.filter(
                                (f) => f !== action.payload.floor
                            ),
                            direction:
                                e.queue.length > 1 ? e.direction : 'IDLE',
                        }
                        : e
                ),
            };

        case 'CLEAR_REQUEST':
            return {
                ...state,
                requests: state.requests.filter(
                    (r) => r.floor !== action.payload
                ),
            };

        default:
            return state;
    }
}

const ElevatorContext = createContext<any>(null);

export const ElevatorProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ElevatorContext.Provider value={{ state, dispatch }}>
            {children}
        </ElevatorContext.Provider>
    );
};

export const useElevator = () => useContext(ElevatorContext);
