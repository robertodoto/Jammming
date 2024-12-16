let accessToken;
const clientID = "26eed97b27fa43ecbda391b3b6fb342a";
const redirectUrl = "http://localhost:3000";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
        // setting access token and expiry time variables    
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime(1));

        //  setting the access token to expire at the value for expiration time
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        //  clearing the url after the access token expires
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }

        //  third check for the access token if the first and second check are both false
            const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            window.location = redirect;
    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: {Authorization: `bearer ${accessToken}`}
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if (!jsonResponse) {
                console.error("Response error");
            }

            return jsonResponse.tracks.items.map(t => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri
            }))
        })
    }, 
} 

export {Spotify};