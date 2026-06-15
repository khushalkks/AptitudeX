import express from 'express';
import Application from '../models/Application.js'; // ✅ Add this line

const router = express.Router();

// /stats route (working fine)
router.get('/stats', async (req, res) => {
  try {
    const stats = [
      {
        title: 'Total Applications',
        value: 47,
        icon: 'FileText',
        change: '+12 this month',
        changeType: 'positive',
        color: 'blue',
      },
      {
        title: 'Interviews Scheduled',
        value: 8,
        icon: 'Calendar',
        change: '+3 this week',
        changeType: 'positive',
        color: 'green',
      },
      {
        title: 'Response Rate',
        value: '23%',
        icon: 'TrendingUp',
        change: '+5% this month',
        changeType: 'positive',
        color: 'purple',
      },
      {
        title: 'Average ATS Score',
        value: '85%',
        icon: 'Target',
        change: '+7 points',
        changeType: 'positive',
        color: 'orange',
      },
    ];

    res.json(stats);
  } catch (error) {
    console.error('Error in /api/dashboard/stats:', error.message);
    res.status(500).json({ message: 'Server error in /stats route' });
  }
});

// /applications route (fixing model import)
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    console.error('Error in /applications route:', error.message);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

router.post('/add-application', async (req, res) => {
  try {
    const newApp = await Application.create(req.body);
    const io = req.app.get('io');

    // 🔥 Notify all connected clients
    if (io) {
      io.emit('new-application', newApp);
    }

    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: 'Error adding application' });
  }
});

// Update application status or details
router.put('/update-application/:id', async (req, res) => {
  try {
    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedApp) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const io = req.app.get('io');
    if (io) {
      io.emit('update-application', updatedApp);
    }

    res.json(updatedApp);
  } catch (err) {
    console.error('Error updating application:', err.message);
    res.status(500).json({ message: 'Error updating application' });
  }
});

// Delete an application
router.delete('/delete-application/:id', async (req, res) => {
  try {
    const deletedApp = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApp) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const io = req.app.get('io');
    if (io) {
      io.emit('delete-application', req.params.id);
    }

    res.json({ message: 'Application deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('Error deleting application:', err.message);
    res.status(500).json({ message: 'Error deleting application' });
  }
});

export default router;
