const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : req.body.imageUrl || '';

    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      liveUrl: req.body.liveUrl || '',
      icon: req.body.icon || 'Code',
      imageUrl,
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      liveUrl: req.body.liveUrl || '',
      icon: req.body.icon || 'Code',
    };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    Object.keys(updateData).forEach(
      (k) => updateData[k] === undefined && delete updateData[k]
    );

    const updated = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
/**
 * if (!projects || projects.length === 0) {
            return res.json([
                {
                    _id: 'default1',
                    title: 'JohnTech Repairs',
                    description: 'John-Tech repairs is firm that does all sorts of electric appliances repairs. The system enables the staff at John-Tech to assign a note with information pertaining appliances to be repaired.',
                    imageUrl: 'JohnTech',
                    liveUrl: 'https://john-tech-repairs-t4sv.onrender.com',
                    icon: 'Wrench'
                },
                {
                    _id: 'default2',
                    title: "CoolN'Deadly",
                    description: "CoolN'Deadly is an Kenyan based company that deals with Automotive related activities such as Cars Sale, SpareParts sale and installation,Vehicle repairs and Garage services.",
                    imageUrl: 'CoolNdeadly',
                    liveUrl: 'https://coolndeadly.onrender.com',
                    icon: 'Car'
                },
                {
                    _id: 'default3',
                    title: 'Isosoft Softwares',
                    description: 'Isosoft Softwares is a company that deals with software develpment.They create products ranging from web application,business management systems,mobile aplications.',
                    imageUrl: 'Isosoft',
                    liveUrl: 'https://dev-macharia.onrender.com',
                    icon: 'Code'
                }
            ]);
        }
 */
