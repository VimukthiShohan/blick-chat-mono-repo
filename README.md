# Blink Chat App

Blink Chat App is a real-time chat application using WebSockets built with Next.js for the frontend and NestJS for the backend. It utilizes PostgreSQL as its database.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)

## Introduction

Blink Chat App is designed to provide a seamless and efficient communication platform. It offers real-time messaging capabilities using WebSockets with a user-friendly interface.

## Features

- Real-time messaging
- User authentication
- Customizable user profile
- Fetch the profile of another user

## Getting Started

To get started with Blink Chat App, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 20.9.0)
- npm (version 10.1.0)

### Installation

1. Clone the repository:

> git clone https://github.com/VimukthiShohan/blink-chat-mono-repo.git

2. Navigate to the root directory:

> cd blink-chat-mono-repo

3. Install dependencies for both the frontend and backend:

>> cd blink-chat-web
> 
>> yarn
> 
>> cd ../blink-chat-api
> 
>> yarn

4. Set up your PostgreSQL database.

5. Configure environment variables. You can find sample environment file in `blink-chat-api/.env.example`. Rename them to `.env` and update the values accordingly.

## Usage

1. Start the backend server:

>> cd blink-chat-api
>
>> yarn start:dev

2. Start the frontend application:

>> cd blink-chat-web
>
>> yarn dev

3. Open your browser and navigate to `http://localhost:3000` to access the Blink Chat App.
