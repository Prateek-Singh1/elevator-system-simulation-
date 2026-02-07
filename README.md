# Elevator System Simulation

A visual elevator system simulation built with React and TypeScript.  
The application simulates a building with 6 floors and 2 elevators, handling hall and cabin requests with a deterministic dispatch algorithm and smooth animations.

---

## Tech Stack
- React + TypeScript
- Context API for state management
- Vitest for unit testing
- CSS for layout and animations
- Vite for development and build tooling

---

## Architecture Overview
The application is structured around a clear separation of concerns:

- UI Components  
  Pure, declarative components responsible only for rendering and user input.

- Core Logic (State Machine)  
  Elevator movement, door sequencing, and timing logic are isolated from the UI.

- Dispatch Algorithm  
  A pure function that assigns hall requests to the most suitable elevator.

This approach ensures:
- Predictable behavior
- Easier debugging
- Testable business logic
- Minimal UI–logic coupling

---

## State Management Choice
I used the Context API with a reducer instead of Redux because:

- The state is local to the elevator simulation
- There is no server-side or async data fetching
- Context provides sufficient structure with less boilerplate
- It keeps the solution simple and focused on the problem

This keeps the codebase readable while still being scalable.

---

## Elevator Dispatch Algorithm
Hall requests are assigned using a scoring based approach:

Factors considered:
- Distance from the requesting floor
- Current direction of the elevator
- Number of pending stops in the elevator queue

Each elevator receives a score, and the elevator with the lowest score is selected.

Tie breaker:
If two elevators have equal scores, the elevator with the lower ID is chosen to keep behavior deterministic.

---

## Scenario Handling
The system correctly handles all required scenarios:

- A. Optimal Elevator Assignment  
  Chooses the elevator that can reach the request fastest based on distance, direction, and queue.

- B. Same Direction Pickup
  Elevators pick up requests in the same direction without reversing.

- Conflicting Requests
  A deterministic tie breaker ensures predictable behavior.

- D. Request Cancellation by Fulfillment
  Hall requests are cleared only after the elevator stops and opens its doors at the requested floor.

- E. Full Queue Management
  New stops are inserted into the queue in a direction-aware manner.

- F. Rapid Sequential Requests  
  Duplicate floor-direction requests are ignored to prevent spam.

- G. Already at Floor 
  If an elevator is already at the requested floor, doors open without movement.

---

## Elevator State Machine
The elevator behavior is modeled as a state machine with strict invariants:

- Doors can only open when the elevator is stopped
- Doors remain closed during movement
- Movement and door sequencing are handled in one place

Door animation states:
- CLOSED → OPENING → OPEN → CLOSING → CLOSED

To prevent race conditions, the UI also defensively enforces that doors never visually open while the elevator is moving.

---

## Animations & Timing
- Floor-to-floor travel: 2 seconds per floor
- Door opening: 1.5 seconds
- Door open wait: 3 seconds
- Door closing: 1.5 seconds

CSS transitions are used to ensure smooth animations.

---

## Testing

- Unit tests are written using Vitest
- Tests focus on the elevator dispatch algorithm
- Core logic is tested independently of the UI

Example tested cases:
- Closest idle elevator selection
- Direction-aware assignment
- Tie breaker behavior

---

## Future Improvements
If extended further, the system could include:
- Elevator capacity and weight limits
- Maintenance mode for elevators
- More advanced scheduling heuristics
- State persistence across refreshes
- Keyboard accessibility controls

---

## Setup Instructions

```bash
npm install
npm run dev
