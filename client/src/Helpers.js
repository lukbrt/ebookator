
export async function callApi(path)
{
    const response = await fetch(`/${path}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};

export async function sendData(url, data, callback)
{
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
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

export async function sendFormData(url, data)
{
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    });
    const body = await response.json();

    return body;
};

export function sendDelete(url) {
    return fetch(url, {
      method: 'delete'
    })
    .then(response => response.json());
}

export function getCookie(name)
{
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2)
        return parts.pop().split(";").shift();
}

export function deleteCookie(name)
{
    document.cookie = name + '=; Max-Age=-99999999;';
}