import { Container } from "@mantine/core";

import classes from "./HeaderMenu.module.css";

export function HeaderMenu() {
  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <h1>Rapid MQ</h1>
        </div>
      </Container>
    </header>
  );
}
