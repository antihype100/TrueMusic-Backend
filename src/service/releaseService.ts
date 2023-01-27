import { Album, Track, User } from '../models/models.js';

class ReleaseService {
    async createAlbum(albumName: string, authorName: string, albumDescription: string, albumGenre: string, albumFormatRelease: string) {
        const author = await User.findOne({
            where: {
                userName: authorName,
            },
        });
        const albumCoverPath = `/${authorName}/${albumName}`;
        const album = await Album.create({
            albumName: albumName,
            albumDescription: albumDescription,
            albumGenre: albumGenre,
            albumFormatRelease: albumFormatRelease,
            albumCoverPath: albumCoverPath,
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
        trackProduction: string,
        trackDuration: string,
        authorName: string) {
        const trackPath = `/${authorName}/${albumName}/${trackName}.mp3`;
        const track = await Track.create({
            trackName: trackName,
            trackDescription: trackDescription,
            trackText: trackText,
            trackProduction: trackProduction,
            trackPath: trackPath,
            trackDuration: Math.floor(Number(trackDuration))
        });
        album?.$add('tracks', [track.id]);
        return track;
    }
}

export const releaseService = new ReleaseService();