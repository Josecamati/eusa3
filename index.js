const express = require("express");
const dotenv = require("dotenv");
const { StreamChat } = require("stream-chat");

dotenv.config();

const client = StreamChat.getInstance(
  "uregwa5p2pc2",
  "wddxxz7scr7vytfvkbn8fpnwu3mhkna625h2m93vp34enbzvkcujm2dk9jwp2ghe"
);

const app = express();
app.use(express.json());

// Register user
app.post("/register", async (req, res) => {
  const { email, id, name, image } = req.body;

  try {
    // Create user in Stream Chat
    await client.upsertUser({
      id,
      email,
      name,
      image,
      role: "user",
    });

    // Create token for user
    const token = client.createToken(id);

    return res.json({
      token,
      user: {
        id,
        email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: "Error registering user.",
    });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { email, id } = req.body;

  try {
    // Create token for user
    const token = client.createToken(id);

    return res.json({
      token,
      user: {
        id,
        email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      message: "Error logging in user.",
    });
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
