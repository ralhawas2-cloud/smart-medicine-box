let medicines = [];

// Add Medicine
document
    .getElementById("medicineForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();
        const name =
            document.getElementById("medicineName").value;
        const dose =
            document.getElementById("medicineDose").value;
        const time =
            document.getElementById("medicineTime").value;

        const medicine = {
            id: Date.now(),
            name: name,
            dose: dose,
            time: time,
            taken: false
        };

        medicines.push(medicine);
        document
            .getElementById("medicineForm")
            .reset();
        displayMedicines();
    });

// Display Medicines
function displayMedicines() {
    const list =
        document.getElementById("medicineList");
    const empty =
        document.getElementById("empty");

    list.innerHTML = "";

    if (medicines.length === 0) {
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
    }

    medicines.forEach(function(medicine) {
        const item =
            document.createElement("div");
        item.className = "medicine";

        item.innerHTML = `
            <div>
                <h3>
                    💊 ${medicine.name}
                </h3>
                <p>
                    ${medicine.dose}
                    • ⏰ ${formatTime(medicine.time)}
                </p>
            </div>

            <div>
                <button
                    class="${medicine.taken ? "taken" : ""}"
                    onclick="takeMedicine(${medicine.id})">
                    ${medicine.taken ? "✓ Taken" : "Take"}
                </button>

                <button
                    class="delete"
                    onclick="deleteMedicine(${medicine.id})">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(item);
    });

    updateStats();
}

// Take Medicine
function takeMedicine(id) {
    const medicine =
        medicines.find(
            item => item.id === id
        );

    if (medicine) {
        medicine.taken = true;
        displayMedicines();
    }
}

// Delete Medicine
function deleteMedicine(id) {
    medicines =
        medicines.filter(
            item => item.id !== id
        );

    displayMedicines();
}

// Format Time
function formatTime(time) {
    const parts = time.split(":");
    let hours =
        parseInt(parts[0]);
    const minutes =
        parts[1];

    const period =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
}

// Statistics
function updateStats() {
    const total =
        medicines.length;

    const taken =
        medicines.filter(
            item => item.taken
        ).length;

    const now =
        new Date();

    const currentTime =
        now.getHours() * 60 +
        now.getMinutes();

    const upcoming =
        medicines.filter(function(item) {
            if (item.taken) {
                return false;
            }

            const parts =
                item.time.split(":");

            const time =
                parseInt(parts[0]) * 60 +
                parseInt(parts[1]);

            return time >= currentTime;
        }).length;

    const missed =
        total - taken - upcoming;

    document.getElementById("total").textContent =
        total;
    document.getElementById("taken").textContent =
        taken;
    document.getElementById("upcoming").textContent =
        upcoming;
    document.getElementById("missed").textContent =
        missed;
}

// Start
displayMedicines();
