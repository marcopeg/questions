import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { useAuth } from "./with-auth";

export const TRACK_DEVICE = gql`
  mutation userTrackDevice($signature: json!) {
    track_device(args: { signature: $signature }) {
      id
    }
  }
`;

export const TRAIL = gql`
  mutation userTrail($data: jsonb!, $id: uuid!) {
    trail(args: { device_id: $id, data: $data }) {
      created_at
    }
  }
`;

const DeviceContext = createContext();

export const withDevice = (Component) => () => {
  const { logout } = useAuth();
  const [id, setId] = useState(null);
  const debounceTrailRef = useRef({});

  // Get the device id from the server:
  const [trackDevice] = useMutation(TRACK_DEVICE, {
    variables: {
      signature: {
        ua: navigator.userAgent,
        standalone: window.matchMedia("(display-mode: standalone)").matches
      }
    },
    ignoreResults: true,
    onCompleted: (data) => setId(data?.track_device[0].id),
    onError: () => logout(new Error("session.invalid"))
  });

  const [_trail] = useMutation(TRAIL, {
    variables: {
      id
    },
    ignoreResults: true,
    onError: () => logout(new Error("session.invalid"))
  });

  // Debounced trail for StrictMode compatibility
  const trail = (__evt, data = {}) => {
    clearTimeout(debounceTrailRef.current[__evt]);
    debounceTrailRef.current[__evt] = setTimeout(() => {
      _trail({ variables: { data: { ...data, __evt } } });
    }, 50);
  };

  useEffect(() => {
    trackDevice();

    return () => {
      Object.keys(debounceTrailRef.current).forEach((key) =>
        clearTimeout(debounceTrailRef.current[key])
      );
    };
  }, []);

  return id ? (
    <DeviceContext.Provider
      value={{
        id,
        trail
      }}
    >
      {<Component />}
    </DeviceContext.Provider>
  ) : null;
};

export const useDevice = () => useContext(DeviceContext);

export const useTrail = (context = {}) => {
  const { trail } = useDevice();
  return (msg, data = {}) =>
    trail(msg, {
      ...context,
      ...data
    });
};

export default withDevice;
