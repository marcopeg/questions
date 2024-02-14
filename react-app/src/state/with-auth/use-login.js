import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuth, useEmitter } from "../";
import { isValidEmail } from "../../utils";

import {
  SIGNIN_WITH_CODE,
  INIT_SIGNING,
  CONFIRM_SIGNING,
  SIGNIN_FIRST_TIME
} from "./queries";

export const useLogin = () => {
  const { login } = useAuth();
  return {
    select: (account) => () => login(account.token),
    accounts: [
      {
        name: "john",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJiYWNrb2ZmaWNlIl0sIngtaGFzdXJhLXVzZXItaWQiOiJqb2huIn19.ET41ExcCTaSnTa8xBW7Qg5QLEyotOHqf5NcFKEf0CQs"
      },
      {
        name: "jane",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImphbmUifX0.JRnWCtrBGdyyg7KRCrows-oXYjTuq-08jvMFkqn_Fho"
      }
    ]
  };
};
