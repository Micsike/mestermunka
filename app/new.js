document.addEventListener('DOMContentLoaded', function() {
    const newTrailerBtn = document.getElementById('newTrailerBtn');

    newTrailerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        $('#myModal').modal('show'); // Bootstrap modal megnyitása
    });
});