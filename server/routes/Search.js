const router = require("express").Router();
const axios = require("axios");
router.get("/:anime", async (req, res) => {
  let anime_ = null;
  const anime = req.params.anime.toLowerCase();
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URI}anime/search?keyword=${anime}&page=1`
    );

    anime_ = data.success ? data.data[0] : data.data;
    console.log({ ...data, data: anime_ });
    res.status(data.statusCode).json({ ...data, data: anime_ });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        statusCode: 500,
        error: error.message + anime_,
        error,
        data: null,
      });
  }
});
module.exports = router;
