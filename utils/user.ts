import {User_ProfileQuery} from 'graphql/generated/queries'

export const isFollowedByMe = (currentUser: User_ProfileQuery['me'], userId: number) => {
    return currentUser.follows.following.rows.some(followed => followed.followedUserId === userId)
}
