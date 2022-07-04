import React, {useState, useEffect} from 'react'

function Chat({socket, username, room}) {

    const [currMessage, setCurrMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(currMessage !== ""){
          const messageData = {
            room,
            username,
            message: currMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
          };

          await socket.emit("send_message", messageData);
          setCurrMessage("");
        }
    }

    useEffect(() => {
      socket.on("receive_message", (data) => {
        console.log(data);
        console.log("running");
        setMessageList((list) => [...list, data]);
      });
    }, [socket]);

    return (
        <div className="chat-window">
          <div className="chat-header">
            <p>Live Chat</p>
          </div>
          <div className="chat-body">
            {messageList.map((messageObj, index) => {
              return <p key={index}>{messageObj.message}</p>
            })}
          </div>
          <div className="chat-footer">
            <input type="text" placeholder="Type here..." onChange={(e) => {
              setCurrMessage(e.target.value);
            }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
    )
}

export default Chat;
