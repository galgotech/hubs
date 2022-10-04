import React, { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const noop = () => {};

export function StorybookAuthContextProvider({ children }) {
  const [context] = useState({
    initialized: true,
    isSignedIn: true,
    token: "abc123",
    email: "foo@bar.baz",
    userId: "00000000",
    signIn: noop,
    verify: noop,
    signOut: noop
  });
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}

StorybookAuthContextProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object.isRequired
};

export function AuthContextProvider({ children, store }) {
  const signOut = useCallback(
    async () => {
      store.update({ credentials: { token: null, email: null } });
      await store.resetToRandomDefaultAvatar();
    },
    [store]
  );

  const [context, setContext] = useState({
    initialized: false,
    isSignedIn: !!store.state.credentials && !!store.state.credentials.token,
    email: store.state.credentials && store.state.credentials.email,
    userId: store.credentialsAccountId,
    signOut
  });

  // Trigger re-renders when the store updates
  useEffect(
    () => {
      const onStoreChanged = () => {
        setContext(state => ({
          ...state,
          isSignedIn: !!store.state.credentials && !!store.state.credentials.token,
          email: store.state.credentials && store.state.credentials.email,
          userId: store.credentialsAccountId
        }));
      };

      store.addEventListener("statechanged", onStoreChanged);

      return () => {
        store.removeEventListener("statechanged", onStoreChanged);
      };
    },
    [store, setContext]
  );

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object.isRequired
};
