import React, {useContext, useCallback, FormEvent, useState} from 'react'
import {useMutation} from 'react-apollo'

import CommentsSection from 'components/sections/AquascapeDetails/CommentsSection'
import {LIKE, DISLIKE} from 'graphql/mutations'
import {LikeEntityType, CommentEntityType} from 'graphql/generated/types'
import {AuthContext} from 'providers/AuthenticationProvider'
import {ADD_COMMENT, REMOVE_COMMENT} from 'containers/AquascapeDetailsContainer/mutations'
import {
    updateAquascapeDetailsCache,
    AquascapeDetailsActions,
} from 'containers/AquascapeDetailsContainer/cache'
import {
    LikeMutation,
    DislikeMutation,
    AddCommentMutation,
    AddCommentMutationVariables,
    DislikeMutationVariables,
    LikeMutationVariables,
    RemoveCommentMutation,
    RemoveCommentMutationVariables,
} from 'graphql/generated/mutations'
import {CommentFieldsFragment} from 'graphql/generated/queries'
import logger from 'services/logger'
import useAuthGuard from 'hooks/useAuthGuard'

interface Props {
    aquascapeId: number
    comments: CommentFieldsFragment[]
}

const CommentsContainer: React.FunctionComponent<Props> = ({aquascapeId, comments}) => {
    const [comment, updateComment] = useState<string | null>(null)
    const [replies, setReply] = useState<{[key: number]: string | undefined}>({})
    const {user} = useContext(AuthContext)
    const authGuard = useAuthGuard()

    const handleCommentChange = (e: FormEvent<HTMLTextAreaElement>) => {
        const value = (e.target as HTMLTextAreaElement).value
        updateComment(value)
    }

    const handleReplyChange = (e: FormEvent<HTMLTextAreaElement>, commentId: number) => {
        const value = (e.target as HTMLTextAreaElement).value
        setReply({...replies, [commentId]: value})
    }

    const [like] = useMutation<LikeMutation, LikeMutationVariables>(LIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE_COMMENT, {
            aquascapeId,
        }),
    })

    const [dislike] = useMutation<DislikeMutation, DislikeMutationVariables>(DISLIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_DISLIKE_COMMENT, {
            aquascapeId,
        }),
    })

    const [addComment] = useMutation<AddCommentMutation, AddCommentMutationVariables>(ADD_COMMENT, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_ADD_COMMENT, {
            aquascapeId,
            user,
        }),
    })

    const [removeComment] = useMutation<RemoveCommentMutation, RemoveCommentMutationVariables>(
        REMOVE_COMMENT,
        {
            update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_REMOVE_COMMENT, {
                aquascapeId,
            }),
        }
    )

    const onSubmit = () => {
        if (!comment || comment.trim() === '') return

        updateComment(null)

        addComment({
            variables: {
                aquascapeId,
                entity: CommentEntityType.Aquascape,
                entityId: aquascapeId,
                content: comment.trim(),
            },
        }).catch(logger.error)
    }

    const onReply = (commentId: number) => {
        const reply = replies[commentId]

        if (!reply || reply.trim() === '') return

        addComment({
            variables: {
                aquascapeId,
                entity: CommentEntityType.Aquascape,
                entityId: aquascapeId,
                content: reply.trim(),
                parentCommentId: commentId,
            },
        })
            .catch(logger.error)
            .finally(() => setReply({...replies, [commentId]: ''}))
    }

    const toggleLike = (comment: CommentFieldsFragment) => {
        if (!user) return

        const alreadyLiked = comment.likes.some(like => like.userId === user.id)
        const variables = {
            aquascapeId,
            entity: LikeEntityType.Comment,
            entityId: comment.id,
        }

        alreadyLiked ? dislike({variables}) : like({variables})
    }

    const handleRemoveComment = useCallback((comment: CommentFieldsFragment) => {
        removeComment({variables: {id: comment.id}})
    }, [])

    return (
        <CommentsSection
            user={user}
            replies={replies}
            enteredComment={comment || ''}
            comments={comments}
            onCommentChange={handleCommentChange}
            onReplyChange={handleReplyChange}
            removeComment={handleRemoveComment}
            toggleLike={authGuard(toggleLike)}
            onReply={authGuard(onReply)}
            onSubmit={authGuard(onSubmit)}
        />
    )
}

export default CommentsContainer
