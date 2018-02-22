(function () {
    var current = window.location.pathname;
    var paths = ['/', '/index.html', '/somewhere', '/anywhere', '/over/here', '/over/there'];
    if (paths.indexOf(current) === -1) {
        content = '<p>404 Not Found</p>';
    } else {
            content = '<p>Welcome to the ' + current + ' page.<p>';
    }
    content = content + '<ul>';
    for (let s of paths) {
        content = content + '<li><a href="' + s + '">' + s + '</a></li>';
    }
    content = content + '</ul>';
    document.getElementById('content').innerHTML = content;

})();
