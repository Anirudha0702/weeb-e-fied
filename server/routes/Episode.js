const router = require("express").Router();
const axios = require("axios");

router.get("/:episode", async (req, res) => {
  const { episode } = req.params;
  const strikeURL = `${process.env.BASE_URI}anime/watch/${episode}`;
  const { data } = await axios.get(strikeURL, {
    params: { server: "gogocdn" },
  });
  res.status(data.statusCode||500).json(data);
});
module.exports = router;
