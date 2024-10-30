const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// إعداد الاتصال بقاعدة البيانات
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'visits' // استخدم اسم قاعدة البيانات هنا
});

// الاتصال بالقاعدة
connection.connect((err) => {
    if (err) {
        return console.error('فشل الاتصال: ' + err.stack);
    }
    console.log('تم الاتصال بنجاح كـ ' + connection.threadId);
});

// وسطاء
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // تأكد من أن ملفات HTML و CSS و JS موجودة هنا

// نقطة النهاية لجلب النقاط
app.get('/api/points', (req, res) => {
    const sql = 'SELECT * FROM points';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'خطأ في جلب النقاط' });
        }
        res.json(results);
    });
});

// نقطة النهاية لإضافة نقطة
app.post('/api/points', (req, res) => {
    const { name, location, description } = req.body;

    const sql = 'INSERT INTO points (name, location, description) VALUES (?, ?, ?)';
    connection.query(sql, [name, location, description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'خطأ في إدخال البيانات' });
        }
        res.status(201).json({ id: results.insertId, name, location, description });
    });
});

// تنفيذ استعلام لإدخال زيارة
const insertVisit = (guardName, pointId, comments) => {
    const sql = 'INSERT INTO visits (guard_name, point_id, comments) VALUES (?, ?, ?)';
    connection.query(sql, [guardName, pointId, comments], (err, results) => {
        if (err) {
            return console.error('خطأ في الإدخال: ' + err.message);
        }
        console.log('تم إدخال البيانات بنجاح، ID الزيارة: ' + results.insertId);
    });
};

// استدعاء الدالة مع بيانات الاختبار (يمكنك تعديلها حسب الحاجة)
insertVisit('John Doe', 1, 'Routine check');

// نقطة النهاية للمسار الجذر
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // تأكد من أن لديك ملف index.html في مجلد public
});

// بدء الخادم
app.listen(port, () => {
    console.log(`الخادم يعمل على http://localhost:${port}`);
});
