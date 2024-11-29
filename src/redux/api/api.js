import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1`,
  }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: `/chat/my`,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/sendrequest",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: "/user/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/acceptrequest",
        method: "put",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    getChatDetails: builder.query({
      query: ({ chat_id, populate = false }) => {
        let url = `/chat/${chat_id}`;

        if (populate) {
          url = `${url}?populate=true`;
        }
        return {
          url: url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMyMessages: builder.query({
      query: ({ chat_id, page }) => {
        return {
          url: `/chat/message/${chat_id}?page=${page}`,
          credentials: "include",
        };
      },
      keepUnusedDataFor: 0,
    }),
    myGroups: builder.query({
      query: () => ({
        url: `/chat/my/groups`,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "/chat/message",
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),
    availableFriends: builder.query({
      query: (chat_id) => {
        let url = `/user/friends`;
        if (chat_id) url += `?chat_id=${chat_id}`;

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["User"],
    }),
    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "/chat/new",
        method: "POST",
        body: { name, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `/chat/${chatId}`,
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    removeGroupMember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: "/chat/removemember",
        method: "PUT",
        body: { chatId, userId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    addGroupMember: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `/chat/addmembers`,
        method: "PUT",
        body: { chatId, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `/chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useGetChatDetailsQuery,
  useGetMyMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMemberMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
} = api;
