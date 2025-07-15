import {
  useCheckPhoneVerificationMutation,
  useSendPhoneVerificationMutation,
} from "../api/verifyApi";

export const usePhoneVerification = () => {
  const [sendVerification, { isLoading: isLoadingSend }] =
    useSendPhoneVerificationMutation();
  const [checkVerification, { isLoading: isLoadingCheck }] =
    useCheckPhoneVerificationMutation();

  return {
    sendVerification,
    isLoadingSend,
    checkVerification,
    isLoadingCheck,
  };
};
