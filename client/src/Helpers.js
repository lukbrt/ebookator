
export async function callApi(path)
{
    const response = await fetch(`/${path}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};

export async function sendData(url, data, callback)
{
    // var formData = new FormData();

    // for (var name in data)
    // {
    //     formData.append(name, data[name]);
    // }

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
        // .then(callback);
        // .catch((error) => console.log(error));
}

export async function sendPost(url, data)
{
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    
    return body;
};