
document.addEventListener("DOMContentLoaded", function () {
  const inputTask = document.getElementById("inputTask");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const taskCount = document.getElementById("taskCount");

  function updateTaskCount() {
      const count = taskList.querySelectorAll("li").length;
      taskCount.textContent = `(${count})`;
  }

  function addTask() {
      const taskText = inputTask.value.trim();

      if (taskText !== "") {
          const li = document.createElement("li");
          li.innerHTML = `
              <span>${taskText}</span>
              <button class="delete-button">Delete</button>
          `;
          taskList.appendChild(li);
          inputTask.value = "";

          li.addEventListener("click", function () {
              const taskSpan = li.querySelector("span");
              taskSpan.classList.toggle("completed");

              const deleteButton = li.querySelector(".delete-button");
              if (taskSpan.classList.contains("completed")) {
                  deleteButton.style.display = "inline-block";
              } else {
                  deleteButton.style.display = "none";
              }
              updateTaskCount();
          });

          const deleteButton = li.querySelector(".delete-button");
          deleteButton.addEventListener("click", function () {
              taskList.removeChild(li);
              updateTaskCount();
          });
          updateTaskCount();
      }
  }

  addTaskButton.addEventListener("click", addTask);

  inputTask.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
          addTask();
      }
  });

  // Fetch sales data from backend
  fetch('http://localhost:3000/sales/salesData')
      .then(response => response.json())
      .then(data => {
        // console.log('Fetched data:', data);
          const { ytd, mtd, years, values } = data.salesData;

          // Create the doughnut chart for YTD sales
          const ytdSalesctx = document.getElementById('ytdSalesChart').getContext('2d');
          const ytdSalesChart = new Chart(ytdSalesctx, {
              type: 'doughnut',
              data: {
                  datasets: [{
                      data: ytd,
                      backgroundColor: ['blue', 'lightgray'],
                  }]
              },
              options: {
                  cutoutPercentage: 70,
              }
          });

          // Create the doughnut chart for MTD sales
          const mtdSalesctx = document.getElementById('mtdSalesChart').getContext('2d');
          const mtdSalesChart = new Chart(mtdSalesctx, {
              type: 'doughnut',
              data: {
                  datasets: [{
                      data: mtd,
                      backgroundColor: ['green', 'lightgray'],
                  }]
              },
              options: {
                  cutoutPercentage: 70,
              }
          });

          // Create the bar chart
          const barChartCtx = document.getElementById('myChart').getContext('2d');
          new Chart(barChartCtx, {
              type: 'bar',
              data: {
                  labels: years,
                  datasets: [{
                      backgroundColor: ["red", "green", "blue", "orange", "brown"],
                      data: values,
                  }]
              },
              options: {
                  plugins: {
                      legend: { display: false },
                      title: {
                          display: true,
                          text: "Sales History per year since 2018",
                          color: 'white',
                          font: {
                              size: 20,
                              weight: 'bold'
                          },
                          padding: 20,
                      }
                  },
                  scales: {
                      x: {
                          ticks: {
                              font: {
                                  color: 'white',
                                  weight: 'bold'
                              }
                          }
                      },
                      y: {
                          ticks: {
                              font: {
                                  color: 'white',
                                  weight: 'bold'
                              }
                          }
                      }
                  }
              }
          });
      })
      .catch(error => console.error('Error fetching data:', error));
});

