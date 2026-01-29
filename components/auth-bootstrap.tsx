import { useEffect, useRef } from "react";
import * as Sentry from "@sentry/react-native";
import { useCurrentUser } from "@/hooks/useAuth";

const AuthBootstrap = () => {
  const { data: user, isSuccess, isError } = useCurrentUser();
  const hasLogged = useRef(false);

  useEffect(() => {
    if (isSuccess && user && !hasLogged.current) {
      hasLogged.current = true;

      console.log("✅ Auth session ready:", user.name);

      Sentry.logger.info(
        Sentry.logger.fmt`Auth session ready for user ${user.name}`,
        {
          userId: user.id,
          userName: user.name,
        },
      );
    }

    if (isError) {
      hasLogged.current = false;
    }
  }, [isSuccess, isError, user]);

  return null;
};

export default AuthBootstrap;
