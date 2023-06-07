# Manual tests

## 1. Login page
- greeting should play
- if error occurs "something wrong" should play
- login button should be accessible by tab
- header should only have the audio interaction

## 2. Languages page
- greeting should play
- loaded success with instructions should play
- on enter should access language
- header should have the whole authenticated widgets (i, home, username, logout btn)

## 3. Stories overview
- greeting should play- loaded success with instructions should play 

- on enter on disable item should only play "not allowed enter on locked item"
- pressing arrows should navigate on each card properties

## 4. Story page
- ... basically the same as 3.)

## 5. Building block menu
- ... same greetings, instuction, loading
- should play quiz not allowed

## 6. Building block words summary
- ... same greetings, instuction, loading
- should inform if word practice is completed or not
- should inform if quiz is locked/available,but not completed/completed ... and why is locked
- shloud redirect to quiz if it's available
- each thing should give proper explanation about them
- when entering the page the word should AUTO-play only after the greeting
- when the greeting is playing and click on next button -> greeting stops, next word is AUTO playing, play button focused
- pausing on enter or on click should work
- on click next -> next word is AUTO playing, play button focused

## 7. Building block words summary completed
- should not let a blocked block to be 'summary-completed'
- should inform if block was marked as 'summary-completed', and should inform that quiz is available because of it

## 8.1. Block quiz
- button should pause/start on click
- button should pause/start on enter

## 8. Block quiz
- should play greeting
- on-request-question 
    - should inform loading action, 
    - loadED action:
        - should play the question and variants
        - should inform tab actions (to replay)
- on-answer-question
    - should inform "sending option #n"
    - should inform result:
        - correct or incorect, and which is the correct one
        - should play the next question and variants
    - on tab should play the word in the foreign language

## 9. Block quiz completed
- should play greeting
- should play loaded result 
    - inform current block is completed
    - inform how can verify other achievements (navigate with tabs)

## 10. Epilogue overview
- should play greeting (say in there: "the short story will play")
- should play the short story in the foreign language
- should be able to replay story when asked (by tab on the text or by play button)

## 11. Epilogue quiz
- should play gretting
- should ...


## while navigating through pages in the quiz, sometimes error screen appears (maybe is cors???) -> see