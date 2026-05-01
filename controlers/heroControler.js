const Hero = require('../models/Hero');

const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHero = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = {
      heading: req.body.heading,
      description: req.body.description,
      typingTexts: req.body.typingTexts
        ? JSON.parse(req.body.typingTexts)
        : undefined,
    };

    // Only update portrait if a new image was actually uploaded
    if (imageUrl) {
      updateData.heroPortrait = imageUrl;
    }

    // Remove undefined keys so we don't wipe existing values
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const hero = await Hero.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getHero, updateHero };