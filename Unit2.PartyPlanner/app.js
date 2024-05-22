document.addEventListener("DOMContentLoaded", function () {
    const partyList = document.getElementById("party-list");
    const partyForm = document.getElementById("party-form");
  
    // Function to create a new list item
    function createListItem(party) {
      const li = document.createElement("li");
      li.innerHTML = `
                  <strong>${party.name}</strong> (${party.date}, ${party.time}) - ${party.location}<br>
                  ${party.description}
                  <button class="delete-btn">Delete</button>
              `;
      return li;
    }
  
    // Function to display parties
    function displayParties(parties) {
      partyList.innerHTML = "";
      parties.forEach((party) => {
        const li = createListItem(party);
        partyList.appendChild(li);
      });
    }
  
    // Dummy data for initial parties
    let parties = [
      {
        name: "Party 1",
        date: "2024-04-30",
        time: "18:00",
        location: "Venue 1",
        description: "Description 1",
      },
      {
        name: "Party 2",
        date: "2024-05-05",
        time: "20:00",
        location: "Venue 2",
        description: "Description 2",
      },
    ];
  
    // Display initial parties
    displayParties(parties);
  
    // Event listener for delete buttons
    partyList.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-btn")) {
        const listItem = event.target.closest("li");
        const index = Array.from(partyList.children).indexOf(listItem);
        parties.splice(index, 1);
        displayParties(parties);
      }
    });
  
    // Event listener for party form submission
    partyForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(partyForm);
      const newParty = {};
      formData.forEach((value, key) => {
        newParty[key] = value;
      });
      parties.push(newParty);
      displayParties(parties);
      partyForm.reset();
    });
  });
  
  // Using async function to fetch API
  
  async function fetchEventData() {
    const apiUrl =
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2404-FTB-ET-WEB-FT/events";
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const eventData = await response.json();
      console.log(eventData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }
  
  fetchEventData();