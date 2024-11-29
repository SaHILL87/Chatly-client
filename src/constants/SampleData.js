export const sampleChats = [
  {
    avatar: [
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/0071485faa141f792daf6552561f2d7945d4671a.jpg",
    ],
    name: "catbipolar",
    _id: "69",
    groupchat: false,
    members: ["69", "619"],
  },
  {
    avatar: [
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/4f/4f9b89bb2a0f5c274b7761cc4c27f8656d6e736a.jpg",
    ],
    name: "doglovers",
    _id: "70",
    groupchat: true,
    members: ["70", "620"],
  },
];

export const sampleUsers = [
  {
    avatar: [
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/0071485faa141f792daf6552561f2d7945d4671a.jpg",
    ],
    name: "catbipolar",
    _id: "69",
  },
  {
    avatar: [
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/4f/4f9b89bb2a0f5c274b7761cc4c27f8656d6e736a.jpg",
    ],
    name: "doglovers",
    _id: "70",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: [
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/0071485faa141f792daf6552561f2d7945d4671a.jpg",
      ],
      name: "catbipolar",
    },
    _id: "69",
  },
  {
    sender: {
      avatar: [
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/4f/4f9b89bb2a0f5c274b7761cc4c27f8656d6e736a.jpg",
      ],
      name: "doglovers",
    },
    _id: "70",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "asdsad 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "L*uda ka Message hai",
    _id: "sfnsdjkfsdnfkjsbnd",
    sender: {
      _id: "user._id",
      name: "Chaman ",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },

  {
    attachments: [
      {
        public_id: "asdsad 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Heyyyy",
    _id: "sfnsdjkfsdnfkdddjsbnd",
    sender: {
      _id: "123",
      name: "Chaman  2",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "John Boi",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "john_boi",
      friends: 20,
      groups: 25,
    },
  ],

  chats: [
    {
      name: "LabadBass Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "L*Da Luston Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Boi",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [],
      content: "L*uda ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman ",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman  2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ],
};
