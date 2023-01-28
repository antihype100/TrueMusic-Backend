import {Track, UserAuditionTrack, UserLikedTrack} from '../models/models.js';
import {Op} from "sequelize";


export class TrackService  {
    async getTracks(userId?: number) {
        const tracks = await Track.findAll({include: [{all: true}]})
        const tracksDto: any[] = []
        tracks.forEach(track => {
            const trackJSON = track.toJSON()
            const authorName = trackJSON.trackPath.split('/')[1]
            let usersLiked = track.usersLiked.filter(el => el.toJSON().id === userId)
            let usersAudition = track.usersAuditions.filter(el => el.toJSON().id === userId)
            let isLiked = usersLiked.length !== 0;
            let isAudition = usersAudition.length !== 0;
            const trackDto = {
                ...trackJSON,
                authorName,
                usersLiked: track.usersLiked.length,
                usersAuditions: track.usersAuditions.length,
                isLiked: isLiked,
                isAudition: isAudition
            }
            tracksDto.push(trackDto)
        })
        return tracksDto
    };

    async getTrack(trackId: number, userId?: number) {
        const track = await Track.findOne({
            where: {
                id: trackId
            },
            include: [{all: true}]
        })
        let trackDto: any
        if (track) {
            const trackJSON = track.toJSON()
            const authorName = track.trackPath.split('/')[1]
            const isLiked = track.usersLiked.filter(el => el.toJSON().id === userId)
            if (isLiked.length === 0) {
                trackDto = {...trackJSON, authorName, usersLiked: track.usersLiked.length, isLiked: false}
            } else {
                trackDto = {...trackJSON, authorName, usersLiked: track.usersLiked.length, isLiked: true}
            }
        }
        return trackDto
    };

    async likeTrack(trackId: number, userId: number) {
        const track = await Track.findOne({
            where: {
                id: trackId
            }
        })
        const isLiked = await UserLikedTrack.findOne({
            where: {
                [Op.and]: [{userId: userId, trackId: trackId}]
            }
        })
        if (isLiked) {
            await UserLikedTrack.destroy({
                where: {
                    [Op.and]: [{userId: userId, trackId: trackId}]
                }
            })
            return 'dislike'
        } else {
            track?.$add('usersLiked', [userId])
            return 'like'
        }
    }

    async addAudition(trackId: number, userId: number) {
        console.log(10)
        const track = await Track.findOne({
            where: {
                id: trackId
            }
        })
        const isAuditions = await UserAuditionTrack.findOne({
            where: {
                [Op.and]: [{userId: userId, trackId: trackId}]
            }
        })
        if (isAuditions) {
            return 'Already listened'
        } else {
            track?.$add('usersAuditions', [userId])
            return 'Audition added'
        }
    }


}

export const trackService = new TrackService();
