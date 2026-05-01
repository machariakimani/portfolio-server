const Service = require('../models/Service');

const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : req.body.imageUrl || '';

    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const newService = new Service({
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon || 'Monitor',
      imageUrl,
      tags
    });

    const saved = await newService.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon || 'Monitor',
    };

    if (req.file) {
      updateData.imageUrl = req.file.path; // new Cloudinary URL
    }

    if (req.body.tags) {
      updateData.tags = JSON.parse(req.body.tags);
    }

    // Strip undefined so existing values aren't wiped
    Object.keys(updateData).forEach(
      (k) => updateData[k] === undefined && delete updateData[k]
    );

    const updated = await Service.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getServices, createService, updateService, deleteService };
/**
 * if (!services || services.length === 0) {
            return res.json([
                {
                    _id: 'default1',
                    title: 'Web & Software Development',
                    description: 'Create stunning, responsive websites and robust software solutions using modern technologies like React, Node.js, and cloud platforms.',
                    imageUrl: 'Webdev',
                    icon: 'Monitor',
                    tags: [{ name: 'Responsive', icon: 'Globe', color: 'bg-blue-500' }, { name: 'Fast', icon: 'Zap', color: 'bg-purple-500' }]
                },
                {
                    _id: 'default2',
                    title: 'Mobile Application Development',
                    description: 'Build powerful native and cross-platform mobile apps for iOS and Android using React Native, Flutter, and native development.',
                    imageUrl: 'Mobile',
                    icon: 'Smartphone',
                    tags: [{ name: 'Cross-Platform', icon: 'Smartphone', color: 'bg-green-400' }, { name: 'Native Feel', icon: 'Palette', color: 'bg-blue-500' }]
                },
                {
                    _id: 'default3',
                    title: 'Payment Gateway Integration',
                    description: 'Seamlessly integrate secure payment solutions including M-Pesa, PayPal, Stripe with PCI compliance.',
                    imageUrl: 'payment',
                    icon: 'CreditCard',
                    tags: [{ name: 'Secure', icon: 'Shield', color: 'bg-purple-500' }, { name: 'M-Pesa', icon: 'CreditCard', color: 'bg-green-500' }]
                },
                {
                    _id: 'default4',
                    title: 'Bulk SMS Integration',
                    description: 'Implement powerful bulk SMS solutions for marketing campaigns and notifications.',
                    imageUrl: 'sms',
                    icon: 'MessageSquare',
                    tags: [{ name: 'Bulk SMS', icon: 'MessageSquare', color: 'bg-orange-500' }, { name: 'Analytics', icon: 'Zap', color: 'bg-blue-500' }]
                }
            ]);
        }
 */
