const searchPhone = () => {
    document.getElementById('no-result').style.display = 'none';
    document.getElementById('phone-details').textContent = '';
    document.getElementById('phone-details').style.display = 'none';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));

    searchField.value = '';
};

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phones');
    phoneContainer.textContent = '';

    if (phones.length === 0) {
        document.getElementById('no-result').style.display = 'block';
    }

    let count = 0;
    phones.forEach(phone => {
        if (count < 20) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto mt-3 p-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <a onclick ="getPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</a>
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
};

const getPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
};

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
                        <h5 class="card-title">${phone.name}</h5>
                        <p class="card-text">${checkReleaseDate(phone.releaseDate)}</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item ps-0">${phone.mainFeatures.storage}</li>
                            <li class="list-group-item ps-0">${phone.mainFeatures.displaySize}</li>
                            <li class="list-group-item ps-0">${phone.mainFeatures.chipSet}</li>
                            <li class="list-group-item ps-0">${phone.mainFeatures.memory}</li>
                        </ul>
                    </div>
                </div>
    `;
    phoneDetailsContainer.appendChild(div);
    phoneDetailsContainer.style.display = 'block';
};


const checkReleaseDate = releaseDate => {
    if (releaseDate === '') {
        const text = 'No date found';
        return text;
    }
    else {
        return releaseDate;
    }
}
