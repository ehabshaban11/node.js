document.addEventListener("DOMContentLoaded", () => {
  const pointSelect = document.getElementById("point-select");
  const visitsList = document.getElementById("visits-list");
  const addVisitForm = document.getElementById("add-visit-form");

  // טוען נקודות לבחירה מהשרת
  const fetchPointsForDropdown = async () => {
    try {
      const response = await fetch("/api/points");
      const points = await response.json();
      pointSelect.innerHTML = points
        .map(point => `<option value="${point.id}">${point.name}</option>`)
        .join("");
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  // טוען ביקורים מהשרת ומציג בטבלה
  const loadVisits = async () => {
    try {
      const response = await fetch("/api/visits");
      const visits = await response.json();
      visitsList.innerHTML = '';

      visits.forEach(visit => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${visit.guard_name}</td>
          <td>${visit.point_name}</td>
          <td>${visit.comments || 'אין הערות'}</td>
          <td>${new Date(visit.visit_time).toLocaleString()}</td>
          <td>
            <button onclick="editVisit(${visit.id})">ערוך</button>
            <button onclick="deleteVisit(${visit.id})">מחק</button>
          </td>
        `;
        visitsList.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  // הוספת ביקור חדש
  addVisitForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const guardName = document.getElementById("guard-name").value;
    const pointId = pointSelect.value;
    const comments = document.getElementById("comments").value;

    try {
      await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardName, pointId, comments })
      });
      addVisitForm.reset();
      loadVisits(); // רענון רשימת הביקורים
    } catch (error) {
      console.error("Error adding visit:", error);
    }
  });

  // מחיקת ביקור
  window.deleteVisit = async (id) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את הביקור?')) {
      try {
        await fetch(`/api/visits/${id}`, { method: 'DELETE' });
        loadVisits();
      } catch (error) {
        console.error('Error deleting visit:', error);
      }
    }
  };

  // עריכת ביקור
  window.editVisit = async (id) => {
    try {
      const response = await fetch(`/api/visits/${id}`);
      const visit = await response.json();
      document.getElementById('guard-name').value = visit.guard_name;
      pointSelect.value = visit.point_id;
      document.getElementById('comments').value = visit.comments;

      addVisitForm.onsubmit = async function(e) {
        e.preventDefault();
        updateVisit(id);
      };
    } catch (error) {
      console.error('Error loading visit:', error);
    }
  };

  // עדכון ביקור
  const updateVisit = async (id) => {
    const guardName = document.getElementById("guard-name").value;
    const pointId = pointSelect.value;
    const comments = document.getElementById("comments").value;

    try {
      await fetch(`/api/visits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardName, pointId, comments })
      });
      addVisitForm.reset();
      loadVisits();
      addVisitForm.onsubmit = addVisitFormSubmitHandler; // החזרה לפעולה רגילה לאחר עריכה
    } catch (error) {
      console.error("Error updating visit:", error);
    }
  };

  // קריאה ראשונית של פונקציות
  fetchPointsForDropdown();
  loadVisits();
});
