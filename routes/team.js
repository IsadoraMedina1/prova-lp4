const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// Rota para criar um time
router.post("/", async (req, res) => {
  const { name, isoCode, teamCoach, worldCupsWon, flagLink } = req.body;

  const teamData = Team({
    name,
    isoCode,
    teamCoach,
    worldCupsWon,
    flagLink,
  });

  try {
    const team = await teamData.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para visualizar todos os times
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para visualizar um time através do código iso
router.get("/:isoCode", async (req, res) => {
  try {
    const { isoCode } = req.params
    const team = await Team.findOne({isoCode: `${isoCode}`});

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para atualizar um time através do código iso
router.put("/:isoCode", async (req, res) => {
  try {
    const isoCode = req.params.isoCode;
    const updatedData = req.body;
    await Team.findOneAndUpdate({isoCode: `${isoCode}`}, updatedData);

    res.send({message: 'Time atualizado com sucesso!'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para deletar um time através do código iso
router.delete("/:isoCode", async (req, res) => {
  try {
    const isoCode = req.params.isoCode;
    await Team.findOneAndDelete({isoCode: `${isoCode}`});

    res.send({message: 'Time deletado com sucesso!'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
