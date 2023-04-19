
export const initId = () => {
  if (!localStorage.getItem("idCounter")) {
    localStorage.setItem("idCounter", "1");
  }
};

export const genId = () => Number(localStorage.getItem("idCounter")) ?? 1;
