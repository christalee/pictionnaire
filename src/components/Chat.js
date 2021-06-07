import React, { useState } from 'react';

const Chat = ({ socket }) => {
  const [msgs, setMsgs] = useState([]);
  // console.log(msgs);

  const formOnClick = (e) => {
    e.preventDefault();
    let input = document.getElementById('input');
    if (input.value) {
        socket.emit('chat', [socket.id, input.value]);
        input.value = '';
    }
};

  socket.on("chat", (data) => {
    console.log("chat", data);
    setMsgs([...msgs, <li>{data[0]}: {data[1]}</li>]);
    window.scrollTo(0, document.body.scrollHeight);
  })

  return (
    <>
    <ul id="messages">{msgs}</ul>
      <form id="form" action="" onSubmit={formOnClick}>
        <input id="input" autocomplete="off" /><button>Send</button>
      </form>
    </>
  )
}

export default Chat;
