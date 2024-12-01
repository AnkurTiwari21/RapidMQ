# RapidMQ: Messaging Queue Application
<img width="1499" alt="Screenshot 2024-12-01 at 8 02 26 PM" src="https://github.com/user-attachments/assets/17f14fc2-b1a9-45cb-abd9-187268e9d680">



A robust messaging queue application built with a **React** frontend and a **Go** backend, leveraging Go routines for concurrency. This application implements the **Pub-Sub Model** and supports three types of exchanges: `DIRECT`, `TOPIC`, and `FANOUT`. 

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
  - [Subscribing to an Exchange](#subscribing-to-an-exchange)
  - [Publishing Messages to a Queue](#publishing-messages-to-a-queue)
  - [Consuming Messages from a Queue](#consuming-messages-from-a-queue)
  - [Unsubscribing from an Exchange](#unsubscribing-from-an-exchange)
- [Exchange Types](#exchange-types)
  - [DIRECT](#direct)
  - [TOPIC](#topic)
  - [FANOUT](#fanout)
- [Concurrency](#concurrency)
- [Future Enhancements](#future-enhancements)

---

## Overview

This application implements a **messaging queue system** designed to handle high-throughput messaging with a focus on scalability and efficiency. It uses **Go routines** for concurrent processing, ensuring quick and reliable message delivery.

---

## Features

1. **Subscribe to an Exchange**: Clients can subscribe to specific exchanges to receive relevant messages.
2. **Publish Messages to a Queue**: Publishers can send messages to a queue via exchanges.
3. **Consume Messages from a Queue**: Subscribers can retrieve messages from their subscribed queues.
4. **Unsubscribe from an Exchange**: Clients can detach from an exchange when no longer needed.
5. **Support for Exchange Types**:
   - **DIRECT**: Sends messages to queues bound with a specific routing key.
   - **TOPIC**: Matches routing keys with pattern-based bindings.
   - **FANOUT**: Broadcasts messages to all queues bound to the exchange.

---

## Architecture

1. **React Frontend**: Provides a user interface for managing subscriptions, publishing messages, and viewing queues.
2. **Go Backend**:
   - Handles business logic for exchanges, queues, and routing.
   - Implements concurrency using **Go routines**.
3. **Exchange and Queue Model**:
   - Exchanges route messages to queues based on the exchange type.
   - Subscribers retrieve messages from their respective queues.

---

## Tech Stack

- **Frontend**: React (JavaScript/TypeScript)
- **Backend**: Go
  - Go routines for concurrency
  - REST API for frontend communication
- **Messaging Model**: Pub-Sub
- **Database**: Optional (for persistent storage of messages and subscriptions)

---

## USAGE
1. Subscribing to an Exchange

    - Navigate to the Subscriptions page.
    - Select an exchange type (DIRECT, TOPIC, or FANOUT).
    - Enter a queue name and routing key (if applicable).
    - Click Subscribe to start receiving messages.

2. Publishing Messages to a Queue

    - Go to the Publish page.
    - Select an exchange and provide the message payload.
    - Specify a routing key (if applicable).
    - Click Publish.

3. Consuming Messages from a Queue

    - Visit the Queues page.
    - Select a queue to view and consume messages.
    - Messages will be displayed in real time.

4. Unsubscribing from an Exchange

    - Open the Subscriptions page.
    - Locate the subscription to remove.
    - Click Unsubscribe.

## Exchange Types
1. DIRECT

    - Messages are routed to queues bound with a specific routing key.
    - Example: Send a message to a queue handling payment.

2. TOPIC

    - Messages are routed based on pattern matching.
    - Example: Routing keys like user.* or order.# for flexible bindings.

3. FANOUT

    - Messages are broadcast to all queues bound to the exchange.
    - Example: A notification system where all users get the same message
  
## Concurrency

The backend leverages Go routines to:
    - Handle multiple publishers and subscribers simultaneously.
    - Ensure high throughput with minimal latency.
    - Scale efficiently as the number of queues and messages grows.

## Future Enhancements
    - Implement persistent storage for message durability.
    - Add WebSocket support for real-time updates.
    - Provide message filtering and prioritization.
    - Integrate monitoring and analytics dashboards.
