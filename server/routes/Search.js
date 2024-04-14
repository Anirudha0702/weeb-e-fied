const router = require("express").Router();
const axios = require("axios");
router.get("/:anime", async (req, res) => {
  const anime = req.params.anime.toLowerCase();
  const { data } = await axios.get(
    `${process.env.BASE_URI}anime/search?keyword=${anime}&page=1`
  );

  const anime_ = data.success?data.data[0]:data.data;
  console.log({ ...data, data: anime_ });
  res.status(data.statusCode || 500).json({ ...data, data: anime_ });
});
module.exports = router;
