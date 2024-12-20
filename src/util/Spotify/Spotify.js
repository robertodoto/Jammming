import { use } from "react";

let accessToken;
const clientID = "26eed97b27fa43ecbda391b3b6fb342a";
const redirectUrl = "http://localhost:3001";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
        // setting access token and expiry time variables    
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

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
            headers: {Authorization: `Bearer ${accessToken}`}
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            return response.json();
        })
        .then(jsonResponse => {
            if (!jsonResponse) {
                return []
            }

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
        .catch(error => {
            console.error('Error searching track', error);
            return [];
        });
    }, 

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            console.error("Playlist name or track URIs missing.");
            return Promise.reject("Invalid playlist name or Track URIs.");
        }

        const aToken = Spotify.getAccessToken();
        const header = {Authorization: `Bearer ${aToken}`, 'Content-Type': 'application/json' };
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, {headers: header})
        .then(response => response.json())
        .then((jsonResponse) =>{
            userId = jsonResponse.id;
            console.log("User ID:", userId);
            
            let playlistId;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header,
                method: "post",
                body: JSON.stringify({ name })
            })

            .then((response) => response.json())
            .then((jsonResponse) => {
                playlistId =jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                     headers: header,
                     method: "post",
                     body: JSON.stringify({ uris: trackURIs })
                })

            })

        })

    }
} 

export {Spotify};