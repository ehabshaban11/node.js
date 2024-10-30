const express = require('express');
const app = express();
const pointsRouter = require('./routes/points'); // تأكد من أن هذا هو المسار الصحيح
const visitsRouter = require('./routes/visits'); // تأكد من أن هذا هو المسار الصحيح
const db = require('./index'); // استيراد قاعدة البيانات

app.use(express.json()); // لإستقبال JSON

// إعداد مسارات API
app.use('/api/points', pointsRouter);
app.use('/api/visits', visitsRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
