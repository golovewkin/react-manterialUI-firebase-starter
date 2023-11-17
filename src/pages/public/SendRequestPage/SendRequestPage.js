import React, { useState } from "react";
import "./style.scss";
import ButtonComponent from "../../../components/library-based-components/ButtonComponent/ButtonComponent";
import TextFieldComponent from "../../../components/library-based-components/TextFieldComponent";
import LinkComponent from "../../../components/library-based-components/Link/LinkComponent";
import { URLS } from "../../../constants/URLS";
import { validEmail } from "../../../helpers/validator.helper";
import { InquiryModel } from "../../../models/InquiryModel";
import useSubmit from "../../../components/hooks/useSubmit";
import { BrowserStorageService } from "../../../services/BrowserStorageService";
import { COMMON } from "../../../constants/COMMON";

const SendRequestPage = () => {
  const [email, setEmail] = useState("");
  const { loading, submit } = useSubmit({
    sendRequest: async () => {
      const previousRequest = BrowserStorageService.getData(
        COMMON.REQUEST_SENT,
      );
      if (previousRequest) {
        throw new Error("Request was already sent!");
      }
      await InquiryModel.create({ email });
      BrowserStorageService.setData(COMMON.REQUEST_SENT, "sent");
    },
    successMessage: "Request was sent! Please wait till admin accepts 🤗",
  });

  const isDisabled = React.useCallback((email) => {
    if (!validEmail(email)) return true;
    return false;
  }, []);

  return (
    <div className="SendRequestPage">
      <div className="SendRequestPage__title">
        Send a request to get the access
      </div>
      <div className="SendRequestPage__wrapper">
        <TextFieldComponent
          onChange={setEmail}
          value={email}
          type="email"
          label="email"
          error={!validEmail(email)}
        />
        <ButtonComponent
          loading={loading}
          disabled={isDisabled(email)}
          onClick={submit}
        >
          Send
        </ButtonComponent>
        <div className="SendRequestPage__links">
          <LinkComponent to={URLS.HOME} children="Return to home" />
        </div>
      </div>
    </div>
  );
};

export default SendRequestPage;
