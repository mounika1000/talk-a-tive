import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const getDateLabel = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const messageDate = new Date(date);
    const isToday =
      messageDate.toDateString() === today.toDateString();
    const isYesterday =
      messageDate.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return messageDate.toLocaleDateString();
  };

  let lastMessageDate = null;

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          const messageDate = new Date(m.createdAt);
          const time = messageDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const showDate =
            !lastMessageDate ||
            new Date(lastMessageDate).toDateString() !==
              messageDate.toDateString();

          if (showDate) lastMessageDate = m.createdAt;

          return (
            <div key={m._id}>
              {/* 🧾 Date Separator */}
              {showDate && (
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px 0",
                    fontSize: "12px",
                    color: "gray",
                  }}
                >
                  — {getDateLabel(m.createdAt)} —
                </div>
              )}

              <div style={{ display: "flex" }}>
                {(isSameSender(messages, m, i, user._id) ||
                  isLastMessage(messages, i, user._id)) && (
                  <Tooltip
                    label={m.sender.name}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={m.sender.name}
                      src={m.sender.pic}
                    />
                  </Tooltip>
                )}

                <div
                  style={{
                    backgroundColor:
                      m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                    marginLeft: isSameSenderMargin(
                      messages,
                      m,
                      i,
                      user._id
                    ),
                    marginTop: isSameUser(messages, m, i, user._id)
                      ? 3
                      : 10,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    wordBreak: "break-word",
                    position: "relative",
                  }}
                >
                  {m.content.match(/\.(jpeg|jpg|png|gif|webp)$/i) ||
                  m.content.includes("/uploads/") ? (
                    <img
                      src={m.content}
                      alt="sent-img"
                      style={{
                        maxWidth: "100%",
                        borderRadius: "10px",
                        marginBottom: "5px",
                      }}
                    />
                  ) : (
                    m.content
                  )}

                  <div
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginTop: "4px",
                      textAlign: "right",
                    }}
                  >
                    {time}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;


