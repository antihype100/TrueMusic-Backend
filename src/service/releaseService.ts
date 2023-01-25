import { Album, Track, User } from '../models/models.js';

class ReleaseService {
    async createAlbum(albumName: string, authorName: string, descriptionAlbum: string, genre: string, formatRelease: string) {
        const author = await User.findOne({
            where: {
                userName: authorName,
            },
        });
        const coverPath = `/${authorName}/${albumName}`;
        const album = await Album.create({
            albumName: albumName,
            descriptionAlbum: descriptionAlbum,
            genre: genre,
            formatRelease: formatRelease,
            coverPath: coverPath,
        });
        author?.$add('releasedAlbums', [album.id]);
        return album;
    }

    async addTrackToAlbum(
        album: any,
        albumName: string,
        trackName: string,
        trackDescription: string,
        trackText: string,
        authorName: string,
        trackProduction: string) {
        const trackPath = `/${authorName}/${albumName}/${trackName}.mp3`;
        const track = await Track.create({
            trackName: trackName,
            descriptionTrack: trackDescription,
            trackText: trackText,
            production: trackProduction,
            trackPath: trackPath,
        });
        album?.$add('tracks', [track.id]);
        return track;
    }
}

export const releaseService = new ReleaseService();