import {
    Table,
    Column,
    Model,
    AutoIncrement,
    PrimaryKey,
    Unique,
    HasMany,
    BelongsTo,
    ForeignKey,
    BelongsToMany,
} from 'sequelize-typescript';
import {Optional} from 'sequelize';

// Interfaces

export interface UserAttributes {
    id: number;
    role: string;
    userName: string;
    email: string;
    password: string;
    // token: string;
    // activateLink: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}

export interface TrackAttributes {
    id: number;
    trackName: string;
    trackDescription: string;
    trackProduction: string;
    trackText: string;
    trackPath: string;
    trackDuration: number
    authorName: string,
    albumName: string
}

interface TrackCreationAttributes extends Optional<TrackAttributes, 'id'> {
}

export interface AlbumAttributes {
    id: number;
    albumName: string;
    albumDescription: string;
    albumGenre: string;
    albumFormatRelease: string;
    albumCoverPath: string;
    authorName: string;
}

interface AlbumCreationAttributes extends Optional<AlbumAttributes, 'id'> {
}

export interface UserBackgroundAttributes {
    id: number;
    backgroundPath: string;
}

interface UserBackgroundCreationAttributes extends Optional<UserBackgroundAttributes, 'id'> {
}

// Models

@Table({modelName: 'users'})
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Unique
    @Column
    id: number;

    @Column
    role: string;


    @Column
    userName: string;


    @Column
    email: string;

    @Column
    password: string;

    // @Column
    // token: string;
    //
    // @Column
    // activateLink: string;

    @BelongsToMany(() => Track, () => UserLikedTrack)
    likedTracks: Array<Track & {UserLikedTrack: UserLikedTrack}>

    @BelongsToMany(() => Album, () => UserLikedAlbum)
    likedAlbums: Album[];

    @BelongsToMany(() => Track, () => UserAuditionTrack)
    auditionsTracks: Track[];

    @BelongsToMany(() => Album, () => UserAlbums)
    addAlbums: Album[];

    @BelongsToMany(() => User, () => UserSubscriptions, 'subscribedUserId')
    subscribedUsers: User[];

    @BelongsToMany(() => User, () => UserSubscriptions, 'toUserId')
    toUsers: User[];

    @BelongsToMany(() => Track, () => UserPlaylist)
    tracksPlaylist: Track[];

    @HasMany(() => Album)
    releasedAlbums: Album[]

}

@Table({modelName: 'albums'})
export class Album extends Model<AlbumAttributes, AlbumCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Unique
    @Column
    id: number;

    @Column
    albumName: string;

    @ForeignKey(() => User)
    @Column
    authorId: number

    @Column
    albumDescription: string;
    @Column
    albumGenre: string;

    @Column
    albumFormatRelease: string;

    @Column
    albumCoverPath: string;
    @Column
    authorName: string;

    @HasMany(() => Track)
    tracks: Track[];

    @BelongsToMany(() => User, () => UserAlbums)
    addUsers: User[];

    @BelongsToMany(() => User, () => UserLikedAlbum)
    usersLiked: User[];


}

@Table({modelName: 'tracks'})
export class Track extends Model<TrackAttributes, TrackCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Unique
    @Column
    id: number;

    @Column
    trackName: string;

    @Column
    trackDescription: string;

    @Column
    trackProduction: string;

    @Column
    trackText: string;

    @Column
    trackPath: string;

    @Column
    trackDuration: number;
    @Column
    authorName: string;
    @Column
    albumName: string

    @ForeignKey(() => Album)
    @Column
    albumId: number;

    @BelongsTo(() => Album)
    album: Album;


    @BelongsToMany(() => User, () => UserLikedTrack)
    usersLiked: Array<User & {UserLikedTrack: UserLikedTrack}>;

    @BelongsToMany(() => User, () => UserAuditionTrack)
    usersAuditions: User[];

    @BelongsToMany(() => User, () => UserPlaylist)
    usersPlaylist: User[];
}

@Table({modelName: 'user_background'})
export class UserBackground extends Model<UserBackgroundAttributes, UserBackgroundCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Unique
    @Column
    id: number;

    @Column
    backgroundPath: string;
}

@Table({modelName: 'user_liked_tracks'})
export class UserLikedTrack extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Track)
    @Column
    trackId: number;
}

@Table({modelName: 'user_liked_album'})
export class UserLikedAlbum extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Album)
    @Column
    albumId: number;
}

@Table({modelName: 'user_audition_track'})
export class UserAuditionTrack extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Track)
    @Column
    trackId: number;
}

@Table({modelName: 'user_albums'})
export class UserAlbums extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Album)
    @Column
    albumId: number;
}

@Table({modelName: 'user_subscriptions'})
export class UserSubscriptions extends Model {
    @ForeignKey(() => User)
    @Column
    subscribedUserId: number;

    @ForeignKey(() => User)
    @Column
    toUserId: number;
}

@Table({modelName: 'user_playlist'})
export class UserPlaylist extends Model {
    @Column
    playlistName: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Track)
    @Column
    trackId: number;
}
