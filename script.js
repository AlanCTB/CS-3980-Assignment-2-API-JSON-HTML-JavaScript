document.addEventListener('DOMContentLoaded', function() {
    fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
    .then(response => response.json())
    .then(data => {
        const populationData = data.data;
        const table = document.createElement('table');
        table.setAttribute('border', '2');

        // Create and append the main Header
        const thead = table.createTHead();
        const mainHeaderRow = thead.insertRow();
        const mainHeader = mainHeaderRow.insertCell(0);
        mainHeader.innerText = "US Population";
        mainHeader.setAttribute('colspan', '3'); 
        mainHeader.style.textAlign = 'center';
        mainHeader.style.fontWeight = 'bold';

        // Create and append Variable Headers
        const variableHeader = thead.insertRow();
        const headerYear = variableHeader.insertCell(0);
        const headerPopulation = variableHeader.insertCell(1);
        const headerGrowth = variableHeader.insertCell(2);
        headerYear.innerText = "Year";
        headerPopulation.innerText = "Population";
        headerGrowth.innerText = " Population Growth %"
        
        // Create and append table body
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        // Sorting data by year
        populationData.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

        // Keeping track of population from previous year
        let prevYearPopulation = null;

        // Inserting cells for each of the variables 
        populationData.forEach(item => {
            const row = tbody.insertRow();
            const yearCell = row.insertCell(0);
            const populationCell = row.insertCell(1);
            const growthCell = row.insertCell(2);
            
            // Puting information into the cells
            yearCell.innerText = item.Year;
            populationCell.innerText = item.Population.toLocaleString(); 

            // Calcuating the population growth each year by comparing the pervious year with current year
            if (prevYearPopulation !== null) {
                const growth = ((item.Population - prevYearPopulation)/prevYearPopulation * 100)
                growthCell.innerText = growth.toFixed(3) + "%";
            }
            else {
                growthCell.innerText = "N/A";
            }
            prevYearPopulation = item.Population;
        });
        
        //append the table to population-data
        document.getElementById('population-data').appendChild(table);
    })
    // Catches errors while fetching data
    .catch(error => console.error('Error fetching data:', error));
});
