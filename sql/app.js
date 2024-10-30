const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // اسم المستخدم الافتراضي في XAMPP
    password: '', // كلمة المرور الافتراضية (غالبًا ما تكون فارغة)
    database: 'اسم_قاعدة_البيانات' // استبدل باسم قاعدة البيانات الخاصة بك
});

// الاتصال بالقاعدة
connection.connect((err) => {
    if (err) {
        return console.error('فشل الاتصال: ' + err.stack);
    }
    console.log('تم الاتصال بنجاح كـ ' + connection.threadId);
});

module.exports = connection; // تصدير الاتصال لاستخدامه في ملفات أخرى
