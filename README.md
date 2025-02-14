
# LeetClone: A LeetCode Parody Project

Welcome to **LeetClone**, a tongue-in-cheek, fun project that playfully mocks the intensity of traditional coding challenge platforms. This isn’t your go-to spot for grinding out algorithm problems—it's a lighthearted homage to LeetCode, built for laughs, experimentation, and creative tinkering.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

**LeetClone** is our playful parody of LeetCode—a project that embraces the absurdity of high-stakes coding challenges while celebrating the fun side of programming. Crafted with modern tools like **Next.js 15**, **MongoDB Atlas**, and **nextauth**, this project is built not for serious problem-solving, but for creative exploration and a few good laughs.

Whether you're here to poke fun at the over-serious world of competitive coding or to use our open API for your own quirky projects, welcome aboard!

---

## Features

- **Playful Parody:** Not for intense coding practice, but for a fun twist on the classic LeetCode experience.
- **User Authentication:** Secure logins powered by nextauth—protecting your session like your prized mixtapes from the '90s.
- **Open API:** A fully functional RESTful API so you can effortlessly build on top of LeetClone.
- **Modern Meets Classic:** Built with Next.js 15 and MongoDB Atlas, blending cutting-edge tech with a nod to the golden days of coding.

---

## Tech Stack

- **Next.js 15:** A modern framework with retro vibes.
- **MongoDB Atlas:** Cloud-hosted database magic to store all our whimsical “problems.”
- **nextauth:** Streamlined authentication that’s as secure as it is stylish.
- **RESTful API:** Open endpoints ready for your next innovative (or absurd) project.

---

## Getting Started

### Prerequisites

Before you dive in, make sure you have:
- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- A **MongoDB Atlas** account
- Basic familiarity with **Next.js**

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/leetclone.git
   cd leetclone
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root directory with:
   ```env
   MONGODB_URI=your-mongodb-atlas-connection-string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to kick off the fun!

---

## API Documentation

Our open API is here for all you developers who want to build projects on top of LeetClone. While our “problems” might be more about playful parody than actual practice, our API is fully functional and ready for integration.

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### 1. GET `/api/problems`

- **Description:** Retrieve all our quirky parody problems.
- **Response Example:**
  ```json
  [
    {
      "id": "unique-problem-id",
      "title": "The Great Parody Problem",
      "description": "A whimsical challenge designed to tickle your coding fancy.",
      "difficulty": "Humorous"
    }
    // Additional problems...
  ]
  ```

#### 2. POST `/api/problems`

- **Description:** Create a new parody problem.
- **Request Body:**
  ```json
  {
    "title": "Your Problem Title",
    "description": "A fun, offbeat description of your parody problem.",
    "difficulty": "Optional: Humorous, Silly, or Witty"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Parody problem created successfully!",
    "problem": {
      "id": "generated-id",
      "title": "Your Problem Title",
      "description": "A fun, offbeat description of your parody problem.",
      "difficulty": "Humorous"
    }
  }
  ```

#### 3. GET `/api/problems/[id]`

- **Description:** Retrieve a specific parody problem by its unique ID.
- **Response Example:**
  ```json
  {
    "id": "unique-problem-id",
    "title": "The Great Parody Problem",
    "description": "A whimsical challenge designed to tickle your coding fancy.",
    "difficulty": "Humorous"
  }
  ```

#### 4. Additional Endpoints

More endpoints may be added as we expand our parody universe. Keep an eye on the repository for updates!

---

## Contributing

Got a quirky idea or a bug fix? We welcome contributions with open arms (and lots of humor)! Follow these steps to contribute:

1. **Fork** the repository.
2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add your feature or fix"
   ```
4. **Push** your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** and let us all revel in your genius.

---

## Roadmap

Here’s what’s in the pipeline for our parody playground:
- **More Parody Content:** Additional pages and features to keep the humor flowing.
- **Expanded API:** More endpoints and richer responses for your creative projects.
- **User Profiles & Leaderboards:** For those who take their parody a bit too seriously.
- **Real-time Collaboration:** Because coding is way more fun when you're laughing together.

---

## License

Distributed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

A huge shoutout to the coding legends and the vibrant open-source community who inspire us to blend retro charm with modern innovation. Thank you for keeping the spirit of fun and creativity alive in the world of code.

---

Happy coding, stay quirky, and remember: this is all just for fun!