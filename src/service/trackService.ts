import { Track } from '../models/models.js';

interface IUserDto {
    email: string;
    userName: string;
    role: string;
}

export class TrackService {
    async getTracks() {
        const tracks = await Track.findAll()
        const tracksDto: any[] = []
        tracks.forEach(track => {
            track = track.toJSON()
            const authorName = track.trackPath.split('/')[1]
            const trackDto = {...track, authorName}
            tracksDto.push(trackDto)

        })
        return tracksDto
    };


}

export const trackService = new TrackService();
