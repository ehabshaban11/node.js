// מאזין ללחיצה על טופס ההוספה
document.getElementById("addVisitForm").addEventListener("submit", function (e) {
    e.preventDefault(); // מונע את הרענון של הדף

    // מקבל את הערכים מהשדות
    const guardName = document.getElementById("guardName").value;
    const comment = document.getElementById("comment").value;

    // בודק אם כל השדות מלאים
    if (guardName === "" || comment === "") {
        alert("נא למלא את כל השדות");
        return;
    }

    // יוצר שורה חדשה לטבלה
    const table = document.querySelector("table tbody");
    const newRow = document.createElement("tr");

    // יוצר תאים לשורה החדשה ומוסיף את הערכים
    newRow.innerHTML = `
        <td>--</td> <!-- ID יכול להתעדכן אוטומטית על ידי השרת -->
        <td>${guardName}</td>
        <td>נקודת ביקור כלשהי</td> <!-- כאן ניתן להוסיף נתונים נוספים -->
        <td>${comment}</td>
        <td>זמן הביקור הנוכחי</td>
    `;

    // מוסיף את השורה לטבלה
    table.appendChild(newRow);

    // מנקה את השדות לאחר ההוספה
    document.getElementById("addVisitForm").reset();
});
