const BlockQuiz = () => {
  //TODO: restrict page if introduction not finished
  //TODO: start a session in the backend
  //TODO: stop watch for fairly long time
  //TODO: lower or increase score for a word when answered
  //TODO: add inc/dec factor settings, stop-watch settings
  //TODO: complete a block -> emit event completion only if it was alreay completed! -> unblock other blocks -> unlock epiloque (if all blocks finished)
  //      if already completed only change the scores, if it gets through without mistake pass don't repeat questions, otherwise do it untill all are score 100
  //
  //TODO: make question wrongly answer more frequent than the others -> need to do a call to server to calculate that
  //TODO:
  return (
    <div>
      <div>question</div>
      <div>bad variant</div>
      <div>bad variant</div>
      <div>bad variant</div>
      <div>good variant</div>
    </div>
  );
};

export default BlockQuiz;
