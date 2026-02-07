import { ElevatorProvider } from './context/ElevatorContext';
import { Building } from './components/Building';
import { useElevatorProcessor } from './core/useElevatorProcessor';

function Root() {
  useElevatorProcessor();
  return <Building />;
}

export default function App() {
  return (
    <ElevatorProvider>
      <Root />
    </ElevatorProvider>
  );
}
