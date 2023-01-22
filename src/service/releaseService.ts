import { Album, User } from '../models/models.js';

export interface ICreateAlbum {
    albumName: string,
    descriptionAlbum: string,
    genre: string,
    formatRelease: string,
}

class ReleaseService {
    async createAlbum(albumName: string, authorName: string, descriptionAlbum: string, genre: string, formatRelease: string) {
        const author = await User.findOne({
            where: {
                userName: authorName
            }
        })
        const coverPath = `/${authorName}/${albumName}`;
        const album = await Album.create({
            albumName: albumName,
            descriptionAlbum: descriptionAlbum,
            genre: genre,
            formatRelease: formatRelease,
            coverPath: coverPath,
        });

        return album;
    }

    // async addTrackToAlbum(
    //     albumId: string,
    //     trackName: string,
    //     trackDescription: string,
    //     trackText: string,
    //     trackDescription: string) {
    //
    //
    // }
}

export const releaseService = new ReleaseService();