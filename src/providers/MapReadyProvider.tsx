import { ReactNode, createContext, useContext } from 'react';

const MapReadyContext = createContext(false);

export function MapReadyProvider({ ready, children }: { ready: boolean; children: ReactNode }) {
  return <MapReadyContext.Provider value={ready}>{children}</MapReadyContext.Provider>;
}

export function useMapReady() {
  const context = useContext(MapReadyContext);
  if (!context) throw new Error('useMapReady must be used within MapReadyProvider');
  return context;
}
