import { Album, Track, User } from '../models/models.js';
import type { UserAttributes, AlbumAttributes, TrackAttributes } from '../models/models.js';

export const createUser = async (user: UserAttributes) => {
  await User.create(user);
};

const createAlbum = async (album: AlbumAttributes) => {
  await Album.create(album);
};

const createTrack = async (track: TrackAttributes) => {
  await Track.create(track);
};

const likeTrack = async (username: string, trackId: number) => {
  const likedUser = await User.findOne({
    where: {
      userName: username,
    },
  });
  likedUser?.$set('likedTracks', [trackId]);
};

const auditionTrack = async (username: string, trackId: number) => {
  const auditionUser = await User.findOne({
    where: {
      userName: username,
    },
  });
  auditionUser?.$set('auditionsTracks', [trackId]);
};
