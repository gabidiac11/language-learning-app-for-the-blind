import { randomUUID } from "crypto";

export const getMessageFromUnkError = (error: unknown) => {
  if ((error as Error) != undefined) return (error as Error).message;

  return "Error has occrured" + error;
};

export const getShuffledArray = <T>(array: T[]):T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Math.random() returns a float from [0, 1) -> 
    /*
     Basically by multipling a number with Math.Random(), is like getting a random percentage from that number. 
     Basically if Math.Random() returns number "n", n*(m+1) is n% of (m+1). 
     By appliying n%(m+1) we always optain a number less than m+1, and never equal m+1 because n is always less than 1
      so => j is an integer \in [0, i+1)
     */ 
    const j = Math.floor(Math.random() * (i + 1));
    // this is a swap using deconstructing: very interesting
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const genUid = () => randomUUID();
