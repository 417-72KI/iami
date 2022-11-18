function getParameter(key) {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    return decodeURIComponent(params.get(key));
}

window.onload = () => {
    const url = getParameter('url');
    console.log(url);
    document.getElementById('url').innerText = url;
}

