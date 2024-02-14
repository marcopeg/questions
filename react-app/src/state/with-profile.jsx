import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useAuth } from "./with-auth";
import { useResetCache } from "./with-apollo";
import { useEmitter } from "./with-emitter";
import { useDevice } from "./with-device";
import { useTranslation } from "./with-i18n";

const GET_PROFILE = gql`
  query userGetProfile {
    users: user_profile {
      full_name
      known_lang
      learn_lang
      level_id
      login: login_data {
        id: login_id
      }
    }
  }
`;

export const UPSERT_PROFILE = gql`
  mutation userUpsertProfile(
    $full_name: String!
    $known_lang: String!
    $learn_lang: String!
    $level_id: String!
  ) {
    insert_user_profile(
      objects: {
        known_lang: $known_lang
        learn_lang: $learn_lang
        full_name: $full_name
        level_id: $level_id
      }
      on_conflict: {
        constraint: user_profile_pkey
        update_columns: [learn_lang, known_lang, full_name, level_id]
      }
    ) {
      affected_rows
    }
  }
`;

const EMPTY_PROFILE = {
  full_name: null,
  known_lang: null,
  learn_lang: null,
  level_id: null,
  login: {
    id: null
  }
};

const ProfileContext = createContext();

export const withProfile = (Component, Onboarding) => () => {
  const emitter = useEmitter();
  const { i18n } = useTranslation();
  const resetCache = useResetCache();
  const { trail } = useDevice();
  const { logout } = useAuth();

  const { loading, error, data, refetch } = useQuery(GET_PROFILE, {
    fetchPolicy: "network-only"
  });
  const [updateProfile] = useMutation(UPSERT_PROFILE, {
    refetchQueries: [GET_PROFILE]
  });

  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [onboard, setOnboard] = useState(null);

  useEffect(() => {
    if (!data) return;

    // Set onboarding if no profile exists:
    if (!data?.users.length) {
      setOnboard(true);
      return;
    }

    const profile = data.users[0];
    setProfile(profile);

    // Change language to match the profile:
    i18n.changeLanguage(profile.known_lang);

    // Set onboard if profile is incomplete:
    if (onboard === null) {
      setOnboard(
        !profile.known_lang || !profile.learn_lang || !profile.level_id
      );
    }
  }, [data]);

  useEffect(() => {
    if (!error) return;
    logout(error);
  }, [error]);

  if (loading) return null;
  if (error) return error.message;

  const ctx = {
    ready: Boolean(data),
    fullName: profile.full_name,
    knownLang: profile.known_lang,
    learnLang: profile.learn_lang,
    levelId: profile.level_id,
    loginId: profile.login.id,
    refetch,
    closeOnboard: () => setOnboard(false),
    updateProfile: (data = {}, options = {}) => {
      const variables = {
        ...profile,
        ...data
      };

      return updateProfile({
        ...options,
        variables: {
          ...profile,
          ...variables
        },
        onCompleted: (data) => {
          resetCache();
          trail("profile.updated", { old: profile, new: variables });
          emitter.pub("profile.updated", { old: profile, new: variables });
          options.onCompleted && options.onCompleted(data);
        }
      });
    }
  };

  return loading ? null : (
    <ProfileContext.Provider value={ctx}>
      {onboard === true && <Onboarding {...ctx} />}
      {onboard === false && <Component {...ctx} />}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

export default withProfile;
