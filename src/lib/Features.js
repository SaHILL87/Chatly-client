// import CryptoJs from "crypto-js";
import moment from "moment";

export const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop();

  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  )
    return "video";

  if (fileExtension === "mp3" || fileExtension === "wave") return "audio";

  if (
    fileExtension === "png" ||
    fileExtension === "jpeg" ||
    fileExtension === "jpg" ||
    fileExtension === "gif"
  )
    return "image";

  return "file";
};

export const getLast7Days = () => {
  const currentDate = moment();

  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }

  return last7Days;
};

export const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

export const getOrSaveFromLocalStorage = ({ key, value, get }) => {
  if (get) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  } else localStorage.setItem(key, JSON.stringify(value));
};

// export const encodeMessgaes = (messages = []) => {
//   //crypto js

//   const encryptedMessages = CryptoJs.AES.encrypt(
//     JSON.stringify(messages),
//     "secret"
//   ).toString();

//   return encryptedMessages;
// };
