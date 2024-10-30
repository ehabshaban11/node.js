document.addEventListener("DOMContentLoaded", async () => {
  const pointsList = document.getElementById("points-list");

  try {
      const response = await fetch('/api/points');
      const points = await response.json();

      points.forEach(point => {
          const li = document.createElement("li");
          li.textContent = `${point.name} - ${point.location}`;
          pointsList.appendChild(li);
      });
  } catch (error) {
      console.error("خطأ في جلب النقاط:", error);
      alert("حدث خطأ في تحميل النقاط، يرجى المحاولة مرة أخرى.");
  }
});

document.getElementById("add-point-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("point-name").value;
  const location = document.getElementById("point-location").value;
  const description = document.getElementById("point-description").value;

  try {
      const response = await fetch('/api/points', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, location, description }),
      });

      if (!response.ok) throw new Error('حدث خطأ في إضافة النقطة');

      const newPoint = await response.json();
      const li = document.createElement("li");
      li.textContent = `${newPoint.name} - ${newPoint.location}`;
      pointsList.appendChild(li);
  } catch (error) {
      console.error(error);
      alert(error.message);
  }
});
