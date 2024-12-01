/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Group, Menu, UnstyledButton } from "@mantine/core";
import classes from "./Body.module.css";

export function Body({ inputElements, exchangeList }) {
  const [openedExchange, setopenedExchange] = useState(false);
  const [selectedExchange, setselectedExchange] = useState(exchangeList[0]);
  const items = exchangeList.map((item) => (
    <Menu.Item onClick={() => setselectedExchange(item)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  const [openedTask, setopenedTask] = useState(false);
  const [selectedTask, setselectedTask] = useState(inputElements[0].label);
  const taskItems = inputElements.map((item) => (
    <Menu.Item onClick={() => setselectedTask(item.label)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  ///states for fields///
  const [bindingKey, setBindingKey] = useState("");
  const [routingKey, setRoutingKey] = useState("");
  const [message, setMessage] = useState("");
  const [durability, setDurability] = useState(false);
  const [queueName, setQueueName] = useState("");
  const [lastTask, setLastTask] = useState("");
  //starting a websocket connection///
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const [dataReceived, setDataReceived] = useState();

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5672");
    socketRef.current = newSocket; // Store in ref
    newSocket.onopen = () => {
      console.log("Connection established!");
    };
    newSocket.onmessage = (message) => {
      let receive = JSON.parse(message.data);
      console.log("received item:");
      console.log(receive);
      setLastTask(receive.task);
      setDataReceived(receive);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  ///-------------------------------///
  useEffect(() => {
    if (lastTask === "PUBLISH_QUEUE" || lastTask === "CONSUME_QUEUE") {
      //make a call to get all the data of queues
      console.log("making call..");
      const request = {
        task: "LIST_DATA",
        exchange_type: selectedExchange.label,
      };
      console.log(JSON.stringify(request));
      if (socketRef.current.readyState === 1) {
        socketRef.current.send(JSON.stringify(request));
      }
    }
  }, [lastTask]);

  const handleClick = () => {
    //create a message
    const request = {};

    request.task = selectedTask;
    request.exchange_type = selectedExchange.label;
    request.durability = durability;
    if (bindingKey !== "") {
      request.binding_key = bindingKey;
    }
    if (routingKey !== "") {
      request.routing_key = bindingKey;
    }
    if (message !== "") {
      request.message = message;
    }

    if (queueName !== "") {
      request.queue_name = queueName;
    }
    socket.send(JSON.stringify(request));
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <Menu
          onOpen={() => setopenedExchange(true)}
          onClose={() => setopenedExchange(false)}
          radius="md"
          width="target"
          withinPortal
        >
          <h3
            style={{
              marginLeft: "30px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Exchange:
          </h3>
          <Menu.Target>
            <UnstyledButton
              className={classes.control}
              data-expanded={openedExchange || undefined}
            >
              <Group gap="xs">
                {/* <Image src={selected.image} width={22} height={22} /> */}
                <span className={classes.label}>{selectedExchange.label}</span>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>

        <Menu
          onOpen={() => setopenedTask(true)}
          onClose={() => setopenedTask(false)}
          radius="md"
          width="target"
          withinPortal
        >
          <h3
            style={{
              marginLeft: "30px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Task:
          </h3>
          <Menu.Target>
            <UnstyledButton
              className={classes.control}
              data-expanded={openedTask || undefined}
            >
              <Group gap="xs">
                {/* <Image src={selected.image} width={22} height={22} /> */}
                <span className={classes.label}>{selectedTask}</span>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{taskItems}</Menu.Dropdown>
        </Menu>

        {(selectedTask === "SUBSCRIBE_QUEUE" ||
          selectedTask === "UNSUBSCRIBE_QUEUE" ||
          selectedTask === "CONSUME_QUEUE") && (
          <>
            <h3
              style={{
                marginLeft: "30px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Queue Name:
            </h3>
            <input
              placeholder="Enter Queue Name.."
              value={queueName}
              onChange={(event) => setQueueName(event.currentTarget.value)}
              style={{ marginLeft: "30px", marginBottom: "20px" }}
            />
          </>
        )}
        {selectedTask === "SUBSCRIBE_QUEUE" && (
          <>
            <h3
              style={{
                marginLeft: "30px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Binding Key:
            </h3>
            <input
              placeholder="Enter Binding Key..."
              value={bindingKey}
              onChange={(event) => setBindingKey(event.currentTarget.value)}
              style={{ marginLeft: "30px", marginBottom: "20px" }}
            />
          </>
        )}

        {selectedTask === "PUBLISH_QUEUE" && (
          <>
            <h3
              style={{
                marginLeft: "30px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Routing Key:
            </h3>
            <input
              placeholder="Enter Routing Key..."
              value={routingKey}
              onChange={(event) => setRoutingKey(event.currentTarget.value)}
              style={{ marginLeft: "30px", marginBottom: "20px" }}
            />
          </>
        )}

        {selectedTask === "PUBLISH_QUEUE" && (
          <>
            <h3
              style={{
                marginLeft: "30px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Message:
            </h3>
            <input
              placeholder="Enter Message..."
              value={message}
              onChange={(event) => setMessage(event.currentTarget.value)}
              style={{ marginLeft: "30px", marginBottom: "20px" }}
            />
          </>
        )}

        {(selectedTask === "SUBSCRIBE_QUEUE" ||
          selectedTask === "PUBLISH_QUEUE") && (
          <>
            <input
              type="checkbox"
              id="durability"
              onChange={() => {
                setDurability(!durability);
              }}
              style={{
                marginLeft: "20px",
                marginBottom: "20px",
                marginTop: "0px",
              }}
            />
            <label htmlFor="durability" style={{ marginTop: "10px" }}>
              Durable
            </label>
          </>
        )}
      </div>
      <button
        style={{ marginLeft: "30px", backgroundColor: "white", color: "black" }}
        onClick={() => {
          handleClick();
        }}
      >
        Send!
      </button>
      {dataReceived && (
        <div>
          {dataReceived?.queues?.map((queue, ind) => (
            <div
              key={ind}
              style={{ border: "3px solid white", borderRadius: "10px",marginBottom:"10px" }}
            >
              <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                Queue Name: {queue.queue_name}
              </h4>
              <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                Content:{" "}
                {queue.message.map((msg, index) => (
                  <span key={index}>{msg}{"<--"}</span>
                ))}
              </h4>
            </div>
          ))}
        </div>
      )}

      {/* {dataReceived && dataReceived.task} */}
    </>
  );
}
