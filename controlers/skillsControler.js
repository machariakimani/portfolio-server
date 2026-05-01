const TechStack = require('../models/TechStack');

const getSkills = async (req, res) => {
  try {
    const skills = await TechStack.find().sort({ createdAt: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : '';
    const technologies = req.body.technologies
      ? JSON.parse(req.body.technologies)
      : [];

    const newSkill = new TechStack({
      category: req.body.category,
      imageUrl,
      technologies,
    });

    const saved = await newSkill.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      category: req.body.category,
    };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    if (req.body.technologies) {
      updateData.technologies = JSON.parse(req.body.technologies);
    }

    Object.keys(updateData).forEach(
      (k) => updateData[k] === undefined && delete updateData[k]
    );

    const updated = await TechStack.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Skill not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const deleted = await TechStack.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
/**
        if (!skills || skills.length === 0) {
            return res.json([
                {
                    _id: 'default1',
                    category: 'Frontend Development',
                    imageUrl: 'FrontEnd',
                    technologies: [
                        { name: 'React JS', icon: 'FaReact', color: 'text-blue-500' },
                        { name: 'Angular JS', icon: 'SiAngular', color: 'text-red-500' },
                        { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: 'text-teal-400' }
                    ]
                },
                {
                    _id: 'default2',
                    category: 'Backend Development',
                    imageUrl: 'BackEnd',
                    technologies: [
                        { name: 'Node JS', icon: 'FaNodeJs', color: 'text-green-500' },
                        { name: 'Express JS', icon: 'SiExpress', color: 'text-gray-500' },
                        { name: 'RESTful API', icon: 'Settings', color: 'text-slate-500' }
                    ]
                },
                {
                    _id: 'default3',
                    category: 'Mobile Development',
                    imageUrl: 'MobileApp',
                    technologies: [
                        { name: 'React Native', icon: 'FaReact', color: 'text-blue-500' },
                        { name: 'Capacitor', icon: 'SiCapacitor', color: 'text-blue-400' }
                    ]
                },
                {
                    _id: 'default4',
                    category: 'Databases',
                    imageUrl: 'DataBase',
                    technologies: [
                        { name: 'MySQL', icon: 'SiMysql', color: 'text-blue-600' },
                        { name: 'PostgreSQL', icon: 'SiPostgresql', color: 'text-blue-700' },
                        { name: 'MongoDB', icon: 'SiMongodb', color: 'text-green-600' }
                    ]
                },
                {
                    _id: 'default5',
                    category: 'DevOps & Tools',
                    imageUrl: 'Github',
                    technologies: [
                        { name: 'Git & GitHub', icon: 'FaGitAlt', color: 'text-orange-500' },
                        { name: 'Render Teams', icon: 'SiRender', color: 'text-purple-600' },
                        { name: 'Bitbucket', icon: 'FaGithub', color: 'text-blue-500' }
                    ]
                }
            ]);
        }  */