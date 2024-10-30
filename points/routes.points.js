const express = require('express');
const router = express.Router();
const db = require('../index'); // استيراد الاتصال بقاعدة البيانات

// الحصول على جميع النقاط
router.get('/', (req, res) => {
    db.query('SELECT * FROM points', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// إضافة نقطة جديدة
router.post('/', (req, res) => {
    const { name, location, description } = req.body;
    db.query('INSERT INTO points (name, location, description) VALUES (?, ?, ?)',
        [name, location, description],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ id: result.insertId, name, location, description });
        }
    );
});

// تحديث نقطة
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, description } = req.body;
    db.query(
        'UPDATE points SET name = ?, location = ?, description = ? WHERE id = ?',
        [name, location, description, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json({ message: 'Point updated successfully' });
        }
    );
});

// حذف نقطة
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM points WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Point deleted successfully' });
    });
});

module.exports = router;
