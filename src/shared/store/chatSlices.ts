// src/entities/chat/model/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Chat = {
  id: number;
  title: string;
  unreadCount: number;
  // другие нужные поля
};

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    updateUnreadCount: (
      state,
      action: PayloadAction<{ chatId: number; count: number }>
    ) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.unreadCount = action.payload.count;
      }
    },
    resetUnreadCount: (state, action: PayloadAction<number>) => {
      const chat = state.chats.find((c) => c.id === action.payload);
      if (chat) {
        chat.unreadCount = 0;
      }
    },
  },
});

export const { setChats, updateUnreadCount, resetUnreadCount } =
  chatSlice.actions;

export default chatSlice.reducer;
