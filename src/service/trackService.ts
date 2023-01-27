import {Track} from '../models/models.js';



export class TrackService {
    async getTracks() {
        const tracks = await Track.findAll({include: [{all: true}]})
        const tracksDto: any[] = []
        tracks.forEach(track => {
            track = track.toJSON()
            const authorName = track.trackPath.split('/')[1]
            const trackDto = {...track, authorName, usersLiked: track.usersLiked.length}
            tracksDto.push(trackDto)

        })
        return tracksDto
    };

    async likeTrack(trackId: number, userId: number) {

        const track = await Track.findOne({
            where: {
                id: trackId
            }
        })

        track?.$add('usersLiked', [userId])
    }


}

export const trackService = new TrackService();
