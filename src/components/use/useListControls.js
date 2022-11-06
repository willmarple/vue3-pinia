// noinspection JSCheckFunctionSignatures,JSValidateTypes

import {useMovieStore} from "../../store/useMovieStore.js";
import {computed} from "vue";
import {nanoid} from "nanoid";

export function useListControls(movie) {
    const movieStore = useMovieStore();

    function addMovieToCurrentList(movie) {
        movieStore.currentList.push(movie)
    }

    function removeMovieFromCurrentList(movie) {
        movieStore.currentList = movieStore.currentList.filter(listItem => listItem.imdbID !== movie.imdbID)
    }

    function setCurrentList(list) {
        movieStore.currentList = list
    }

    function clearCurrentList() {
        movieStore.currentList = []
    }

    const isInCurrentList = computed(() => {
        return movieStore.currentList.some(listItem => listItem.imdbID === movie.imdbID)
    })

    function updateOrAddCurrentListToPlaylists(name) {
        if (movieStore.currentList.length && movieStore.currentList[0].hasOwnProperty('playlist')) {
            const playlistIndex = movieStore.playlists.findIndex(playlist => playlist.id === movieStore.currentList[0].playlist.id)
            const updatedPlaylist = {
                ...movieStore.playlists[playlistIndex],
                list: movieStore.currentList
            }
            updatedPlaylist.name = name
            updatedPlaylist.list = updatedPlaylist.list.map(movie => {
                return {
                    ...movie,
                    playlist: updatedPlaylist
                }
            })
            movieStore.playlists[playlistIndex] = updatedPlaylist
            movieStore.currentList = []
        } else {
            addCurrentListToPlaylists(name)
        }
    }

    function addCurrentListToPlaylists(name) {
        const playlistId = nanoid();
        const playlist = {
            id: playlistId,
            name,
            list: movieStore.currentList,
        }
        playlist.list = playlist.list.map(movie => ({
            ...movie,
            playlist,
        }))
        movieStore.playlists.push(playlist)
        movieStore.currentList = []
    }

    function removeListFromPlaylist(playlistId) {
        movieStore.playlists = movieStore.playlists.filter(list => list.id !== playlistId)
        if (movieStore.currentList[0]?.playlist?.id === playlistId) {
            movieStore.currentList = []
        }
    }

    return {
        addMovieToCurrentList,
        removeMovieFromCurrentList,
        updateOrAddCurrentListToPlaylists,
        removeListFromPlaylist,
        clearCurrentList,
        setCurrentList,
        isInCurrentList,
    }
}