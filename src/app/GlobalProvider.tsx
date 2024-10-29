'use client';
import { createContext, useContext } from "react";

export const NavbarContext = createContext('');

export function useNavbarContext() {
  return useContext(NavbarContext);
}

export default function GlobalProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return <NavbarContext.Provider value={'Batman'}>{children}</NavbarContext.Provider>;
}
