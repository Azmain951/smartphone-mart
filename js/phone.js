// search button event
const searchPhone = () => {
    document.getElementById('no-result').style.display = 'none';
    document.getElementById('phone-details').textContent = '';
    document.getElementById('phone-details').style.display = 'none';

    // getting input data
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // spinner displayed
    toggleSpinner('block');

    // fetching data from API
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));

    searchField.value = '';

};

// spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};

// displaying the search results on UI
const displayPhone = phones => {
    const phoneContainer = document.getElementById('phones');
    phoneContainer.textContent = '';

    // error handling
    if (phones.length === 0) {
        document.getElementById('no-result').style.display = 'block';
    }

    // showing 20 search results only
    let count = 0;
    phones.forEach(phone => {
        if (count < 20) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card phone-div">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto mt-3 p-3" alt="...">
                <div class="card-body p-4">
                    <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <a onclick ="getPhoneDetails('${phone.slug}')" href="#" class="btn details-btn">Show Details</a>
                </div>
            </div>
        `;
            phoneContainer.appendChild(div);
            count++;
        }
        else {
            return 0;
        }
    });
    // spinner hide
    toggleSpinner('none');

    // if (phones.length > 20) {
    //     const div = document.createElement('div');
    //     div.innerHTML = `
    //     <button onclick = "displayAll('${phones}')" type="button" class="btn btn-outline-primary">SEE ALL</button>
    //     `;
    //     phoneContainer.appendChild(div);
    // }
};

// fetching phone details data using phone id from API
const getPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
};

// displaying phone details on UI
const displayPhoneDetails = phone => {
    const phoneDetailsContainer = document.getElementById('phone-details');
    phoneDetailsContainer.textContent = '';

    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
                <div class="col-md-4 d-flex justify-content-center align-items-center">
                    <img src="${phone.image}" class="img-fluid w-100 p-4" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body p-4">
                        <h4 class="card-title fw-bold">${phone.name}</h4>
                        <p class="card-text"><small>${checkReleaseDate(phone.releaseDate)}</small></p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item ps-0"><span class='phone-properties'>Storage:</span> ${phone.mainFeatures.storage}</li>
                            <li class="list-group-item ps-0"><span class='phone-properties'>Display:</span> ${phone.mainFeatures.displaySize}</li>
                            <li class="list-group-item ps-0"><span class='phone-properties'>Chipset:</span> ${phone.mainFeatures.chipSet}</li>
                            <li class="list-group-item ps-0"><span class='phone-properties'>Memory:</span> ${phone.mainFeatures.memory}</li>
                            <li class="list-group-item ps-0"><span class='phone-properties'>Sensors:</span> ${displaySensors(phone.mainFeatures.sensors)}</li>
                            <li class="list-group-item ps-0"><span class='phone-properties'>Others:<br></span> ${displayOthers(phone.others)}</li>
                        </ul>
                    </div>
                </div>
    `;
    phoneDetailsContainer.appendChild(div);
    phoneDetailsContainer.style.display = 'block';
};

// release date error handling
const checkReleaseDate = releaseDate => {
    if (releaseDate === '') {
        const text = 'No date found';
        return text;
    }
    else {
        return releaseDate;
    }
}

// extracting sensors data
const displaySensors = sensors => {
    let sensorList = [];
    sensors.forEach(sensor => {
        sensorList.push(sensor);
    });
    sensorList = sensorList.join(', ');
    return sensorList;
};

// extracting others properties
const displayOthers = others => {
    let othersList = [];
    for (const prop in others) {
        othersList.push(prop + ': ' + others[prop]);
    }
    othersList = othersList.join('<br>');
    return othersList;
};
