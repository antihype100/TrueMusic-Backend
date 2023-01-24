import { Track } from '../models/models.js';

interface IUserDto {
    email: string;
    userName: string;
    role: string;
}

export class TrackService {
    async getTracks() {
        const tracks = Track.findAll()
        return tracks
    };


}

export const trackService = new TrackService();
