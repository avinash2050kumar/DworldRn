import { isEmpty } from "../helper/string";
// Input avinash kumar
// output Avinash Kumar
export const PascalCase = value => {
  const regex = /(\b[a-z](?!\s))/g;

  if (!isEmpty(value)) {
    value = value.replace(regex, function(x) {
      return x.toUpperCase();
    });
  }

  return value;
};
