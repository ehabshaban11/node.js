// تابع الاتصال بالقاعدة هنا (كما هو موضح في الكود السابق)

// دالة إدخال الزيارة
const insertVisit = (guardName, pointId, comments) => {
    const sql = 'INSERT INTO visits (guard_name, point_id, comments) VALUES (?, ?, ?)';
    connection.query(sql, [guardName, pointId, comments], (err, results) => {
        if (err) {
            return console.error('خطأ في الإدخال: ' + err.message);
        }
        console.log('تم إدخال البيانات بنجاح، ID الزيارة: ' + results.insertId);

        // استرجاع البيانات بعد الإدخال
        getVisits();

        // إنهاء الاتصال بعد الإدخال
        connection.end((err) => {
            if (err) {
                return console.error('خطأ في إنهاء الاتصال: ' + err.message);
            }
            console.log('تم إنهاء الاتصال بقاعدة البيانات.');
        });
    });
};

// دالة استرجاع البيانات
const getVisits = () => {
    const sql = 'SELECT * FROM visits';
    connection.query(sql, (err, results) => {
        if (err) {
            return console.error('خطأ في الاسترجاع: ' + err.message);
        }
        console.log('الزيارات:', results);
    });
};

// استدعاء الدالة مع بيانات الاختبار
insertVisit('John Doe', 1, 'Routine check');
