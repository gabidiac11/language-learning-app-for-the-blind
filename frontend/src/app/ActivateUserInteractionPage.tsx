
export const ActivateUserInteractionPage = () => {
  const message =
    "Please interact with the 'audio player' by focusing on the audio player and then press enter/click to activate user interactions.";
  return (
    <div className="view dashboard-page-wrapper" aria-label={message}>
      <div className="view-content">{message}</div>
    </div>
  );
};
