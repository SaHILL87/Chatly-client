import { createSlice } from "@reduxjs/toolkit";
import { newMessageAlert } from "../../constants/event";
import { getOrSaveFromLocalStorage } from "../../lib/Features";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: getOrSaveFromLocalStorage({
    key: newMessageAlert,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    setNewMessagesAlert: (state, action) => {
      const chat_id = action.payload.chat_id;

      const index = state.newMessagesAlert.findIndex(
        (item) => item.chat_id === chat_id
      );

      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chat_id,
          count: 1,
        });
      }
    },
    removeNewMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chat_id !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotificationCount,
  resetNotificationCount,
  setNewMessagesAlert,

  removeNewMessagesAlert,
} = chatSlice.actions;
