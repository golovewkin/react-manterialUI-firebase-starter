import React, { useState } from "react";
import { LogService } from "../../services/LogService";
import { useShowError } from "../../providers/ShowErrorProvider";
import { useSnack } from "../../providers/SnackProvider";

const useSubmit = ({ sendRequest, successMessage = "Success!", onSuccess }) => {
  const showError = useShowError();
  const showShack = useSnack();
  const [loading, setLoading] = useState(false);

  const submit = React.useCallback(
    async (email) => {
      try {
        setLoading(true);
        await sendRequest();
        showShack(successMessage);
        onSuccess && onSuccess();
      } catch (e) {
        const error = "Send request error";
        showError(error, e);
        LogService.log(error, e);
      } finally {
        setLoading(false);
      }
    },
    [showShack, showError, setLoading, sendRequest, successMessage, onSuccess],
  );

  return { loading, submit };
};

export default useSubmit;
