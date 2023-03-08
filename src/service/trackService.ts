import {Track, UserAuditionTrack, UserLikedTrack} from '../models/models.js';
import {Op} from "sequelize";


export class TrackService  {
    async getTracks(userId?: number) {
        const tracks = await Track.findAll({include: [{all: true}]})
        const tracksDto: any[] = []
        tracks.forEach(track => {
            const trackJSON = track.toJSON()
            let usersLiked = track.usersLiked.filter(el => el.toJSON().id === userId)
            let usersAudition = track.usersAuditions.filter(el => el.toJSON().id === userId)
            let isLiked = usersLiked.length !== 0;
            let isAudition = usersAudition.length !== 0;
            const trackDto = {
                ...trackJSON,
                usersLiked: track.usersLiked.length,
                usersAuditions: track.usersAuditions.length,
                isLiked: isLiked,
                isAudition: isAudition
            }
            tracksDto.push(trackDto)
        })
        return tracksDto
    };

    async getLikedTracks(userId?: number) {
        const tracks = await Track.findAll({include: [{all: true}]})
        const tracksDto: any[] = []
        tracks.forEach(track => {
            const trackJSON = track.toJSON()
            let usersLiked = track.usersLiked.filter(el => el.toJSON().id === userId)
            let usersAudition = track.usersAuditions.filter(el => el.toJSON().id === userId)
            let isLiked = usersLiked.length !== 0;
            let isAudition = usersAudition.length !== 0;
            const trackDto = {
                ...trackJSON,
                usersLiked: track.usersLiked.length,
                usersAuditions: track.usersAuditions.length,
                isLiked: isLiked,
                isAudition: isAudition
            }
            if (isLiked) {
                tracksDto.push(trackDto)
            }
        })
        return tracksDto
    };

    async getTrack(authorName: string, trackName: string, userId = -1) {
        const track = await Track.findOne({
            where: {
                trackName: trackName,
                authorName: authorName
            },
            include: [{all: true}]
        })
        let trackDto: any
        if (track) {
            const trackJSON = track.toJSON()
            const isLiked = track.usersLiked.filter(el => el.toJSON().id === userId)
            const isAudition = track.usersAuditions.filter(el => el.toJSON().id === userId)
            console.log(isLiked)
                trackDto = {
                    ...trackJSON,
                    usersLiked: track.usersLiked.length,
                    usersAuditions: track.usersAuditions.length,
                    isLiked: Boolean(isLiked.length),
                    isAudition: Boolean(isAudition.length)
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
