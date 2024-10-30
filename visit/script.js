// منذ البداية، نستمع إلى حدث إرسال النموذج
document.getElementById("addVisitForm").addEventListener("submit", function (e) {
    e.preventDefault(); // منع تحديث الصفحة

    // الحصول على القيم من الحقول
    const visitId = document.getElementById("visitId").value;
    const guardName = document.getElementById("guardName").value;
    const comment = document.getElementById("comment").value;

    // تحقق من أن جميع الحقول مليئة
    if (guardName === "" || comment === "" || visitId === "") {
        alert("נא למלא את כל השדות");
        return;
    }

    // إنشاء صف جديد في الجدول
    const table = document.querySelector("table tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${visitId}</td> <!-- ID -->
        <td>${guardName}</td>
        <td>נקודת ביקור כלשהי</td>
        <td>${comment}</td>
        <td>${new Date().toLocaleString()}</td> <!-- זמן הביקור -->
    `;

    // إضافة الصف إلى الجدول
    table.appendChild(newRow);

    // مسح الحقول بعد الإضافة
    document.getElementById("addVisitForm").reset();
});

// معالجة تحديث الزيارة
document.getElementById("updateVisitForm").addEventListener("submit", function (e) {
    e.preventDefault(); // منع تحديث الصفحة

    // الحصول على القيم من الحقول
    const visitIdToUpdate = document.getElementById("visitIdToUpdate").value;
    const newGuardName = document.getElementById("newGuardName").value;
    const newComment = document.getElementById("newComment").value;

    // تحقق من أن جميع الحقول مليئة
    if (visitIdToUpdate === "" || newGuardName === "" || newComment === "") {
        alert("נא למלא את כל השדות");
        return;
    }

    // العثور على الصف الصحيح في الجدول وتحديثه
    const rows = document.querySelectorAll("table tbody tr");
    let found = false;

    rows.forEach(row => {
        const cells = row.getElementsByTagName("td");
        if (cells[0].textContent === visitIdToUpdate) { // إذا كان ID يطابق
            cells[1].textContent = newGuardName; // تحديث اسم الحارس
            cells[3].textContent = newComment; // تحديث التعليق
            found = true;
        }
    });

    if (!found) {
        alert("לא נמצאה ביקור עם ID זה");
    }

    // مسح الحقول بعد التحديث
    document.getElementById("updateVisitForm").reset();
});
