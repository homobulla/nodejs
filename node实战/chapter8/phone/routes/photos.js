let photos = [];
photos.push({ name: "Node.js logo", path: "https://cdn.pixabay.com/photo/2015/10/12/15/46/fallow-deer-984573__340.jpg" });
photos.push({ name: "python3.7", path: "https://cdn.pixabay.com/photo/2015/05/29/19/17/street-789626__340.jpg" });

exports.list = function(req, res) {
    res.render("photos", {
        title: "Photos",
        photos: photos
    });
};
