const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
};

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phones');

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    });
}