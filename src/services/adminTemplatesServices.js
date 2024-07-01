const { Template } = require('../db');


const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.status(200).json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findByPk(id);
    if (!template) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }
    await template.destroy(); 
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllTemplates,
  deleteTemplate
};
