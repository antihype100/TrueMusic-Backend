import {Album} from "../models/models.js";

export class AlbumService {
    async getAlbum(authorName: string, albumName: string, userId = -1) {
        console.log(authorName, albumName)
        const album = await Album.findOne({
            where: {
                albumName: albumName,
                authorName: authorName
            },
            include: [{all: true}]
        })
        const isLiked = album?.usersLiked.filter(user => user.id === userId)

        return {...album?.toJSON(), isLiked: Boolean(isLiked), usersLiked: album?.usersLiked.length}
    }
}

export const albumService = new AlbumService()
