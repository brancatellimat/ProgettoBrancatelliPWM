async function searchPlaylist(categoryID){
    const list = document.getElementById('container');
    document.querySelector('select option[value="'+categoryID+'"]').setAttribute('selected', true);

    await fetch('/searchPlaylists/'+categoryID).then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        list.innerHTML = ''; //clear element
        data.items.forEach(playlist => {
            let cols = document.createElement('div');
            let card = document.createElement('div');
            let cover = document.createElement('img');
            let cardBody = document.createElement('div');
            let title = document.createElement('h5');
            let description = document.createElement('p');
            let btn = document.createElement('a');

            cols.setAttribute('class', 'col-sm-12 col-lg-4 col-md-6 my-3');
            card.setAttribute('class', 'card h-100 mx-auto hs');
            card.setAttribute('style', 'max-width: 16rem;');
            cover.setAttribute('src', playlist.images[0].url);
            cover.setAttribute('alt', 'Playlist cover');
            cover.setAttribute('class', 'card-img-top px-3 py-3');
            cardBody.setAttribute('class', 'card-body pt-0');
            title.setAttribute('class', 'card-text fw-500');
            description.setAttribute('class', 'text-truncate fw-300');
            btn.setAttribute('href', '/more/'+playlist.id);
            btn.setAttribute('class', 'btn btn-primary');

            title.innerText = playlist.name;
            description.innerText = playlist.description;
            btn.innerText = 'More';

            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(btn);
            card.appendChild(cover);
            card.appendChild(cardBody);
            cols.appendChild(card);
            list.appendChild(cols);
        });
    });
}

//Save playlist in user library
async function savePlaylist(id){
    await fetch('/savePlaylist/'+id).then(response => {
        return response.json();
    }).then(data => {
        let icon = document.getElementById('addIcon');
        let text = document.getElementById('addText');
        icon.classList.remove('bx-heart');
        icon.classList.add('bxs-heart');

        text.innerText = 'Salvata!';
        render('login');

    });
}
