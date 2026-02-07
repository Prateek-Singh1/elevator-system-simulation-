import type { Elevator, HallRequest } from "./elevator.types";


/**
 * Assigns the best elevator based on ETA-style scoring
 */
export function assignElevator(
    elevators: Elevator[],
    request: HallRequest
): string {
    let bestId = elevators[0].id;
    let bestScore = Infinity;

    for (const elevator of elevators) {
        const score = calculateScore(elevator, request);

        if (score < bestScore) {
            bestScore = score;
            bestId = elevator.id;
        }

        // Tie-breaker (lowest ID wins)
        if (score === bestScore && elevator.id < bestId) {
            bestId = elevator.id;
        }
    }

    return bestId;
}

function calculateScore(
    elevator: Elevator,
    request: HallRequest
): number {
    const distance = Math.abs(elevator.currentFloor - request.floor);
    let directionPenalty = 0;

    // Same direction pickup
    if (elevator.direction !== 'IDLE') {
        const movingTowards =
            (elevator.direction === 'UP' &&
                request.floor >= elevator.currentFloor &&
                request.direction === 'UP') ||
            (elevator.direction === 'DOWN' &&
                request.floor <= elevator.currentFloor &&
                request.direction === 'DOWN');

        directionPenalty = movingTowards ? 0 : 10;
    }

    return distance * 2 + elevator.queue.length * 3 + directionPenalty;
}
