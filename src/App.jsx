import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { HeaderMenu } from "./Components/Header";
import { Body } from "./Components/Body";
function App() {
  const taskData = [
    {
      label: "SUBSCRIBE_QUEUE",
      Inputs: [
        {
          Name: "Queue Name",
          type: "text",
        },
        {
          Name: "Binding Key",
          type: "text",
        },
        {
          Name: "Durability",
          type: "checkbox",
        },
      ],
    },
    {
      label: "UNSUBSCRIBE_QUEUE",
      Inputs: [
        {
          Name: "Queue Name",
          type: "text",
        },
      ],
    },
    {
      label: "PUBLISH_QUEUE",
      Inputs: [
        {
          Name: "Routing Key",
          type: "text",
        },
        {
          Name: "Durability",
          type: "checkbox",
        },
        {
          Name: "Message",
          type: "text",
        },
      ],
    },
    {
      label: "CONSUME_QUEUE",
      Inputs: [
        {
          Name: "Queue Name",
          type: "text",
        },
      ],
    },
  ];
  const exchangeList = [
    { label: "DIRECT" },
    { label: "FANOUT" },
    { label: "TOPIC" },
  ];
  return (
    <MantineProvider defaultColorScheme="dark">
      <HeaderMenu />
      <Body exchangeList={exchangeList} inputElements={taskData}/>
    </MantineProvider>
  );
}

export default App;
