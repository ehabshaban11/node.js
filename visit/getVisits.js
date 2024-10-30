const getVisits = () => {
    const sql = 'SELECT * FROM visits';
    connection.query(sql, (err, results) => {
        if (err) {
            return console.error('خطأ في الاسترجاع: ' + err.message);
        }
        console.log('الزيارات:', results);
    });
};

// استدعاء الدالة
getVisits();
