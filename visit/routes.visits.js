const express = require('express');
const router = express.Router();
const db = require('../index'); // استيراد الاتصال بقاعدة البيانات

// الحصول على جميع الزيارات
router.get('/', (req, res) => {
    const query = `
        SELECT visits.id, visits.guard_name, visits.comments, visits.visit_time, points.name AS point_name
        FROM visits
        JOIN points ON visits.point_id = points.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// إضافة زيارة جديدة
router.post('/', (req, res) => {
    const { guardName, pointId, comments } = req.body;

    // تحقق من وجود نقطة
    const checkPointQuery = 'SELECT * FROM points WHERE id = ?';
    db.query(checkPointQuery, [pointId], (err, pointResults) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (pointResults.length === 0) return res.status(404).json({ error: 'Point not found' });

        // إضافة الزيارة
        const insertQuery = 'INSERT INTO visits (guard_name, point_id, comments) VALUES (?, ?, ?)';
        db.query(insertQuery, [guardName, pointId, comments], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(201).json({ id: result.insertId, guardName, pointId, comments });
        });
    });
});

// حذف زيارة
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM visits WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Visit deleted successfully' });
    });
});

module.exports = router;
