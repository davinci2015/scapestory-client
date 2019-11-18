import gql from 'graphql-tag'
import {Like} from 'generated/graphql'

export interface LikeMutationResult {
    like: Like
}

export interface DislikeMutationResult {
    dislike: Like
}

export const LIKE = gql`
    mutation like($entity: LikeEntityType!, $entityId: Int!) {
        like(entity: $entity, entityId: $entityId) {
            id
            aquascapeId
            aquascapeImageId
            userId
            commentId
        }
    }
`

export const DISLIKE = gql`
    mutation dislike($entity: LikeEntityType!, $entityId: Int!) {
        dislike(entity: $entity, entityId: $entityId) {
            id
            aquascapeId
            aquascapeImageId
            userId
            commentId
        } 
    }
`

export const FOLLOW = gql`
    mutation followUser($userId: Int!) {
        followUser(userId: $userId) {
            id
        }
    }
`

export const UNFOLLOW = gql`
    mutation unfollowUser($userId: Int!) {
        unfollowUser(userId: $userId) {
            id
        }
    }
`