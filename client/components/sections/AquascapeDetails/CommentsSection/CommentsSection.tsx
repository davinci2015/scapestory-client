import React, {FormEvent} from 'react'
import {useIntl} from 'react-intl'

import {FormattedMessage, Headline} from 'components/atoms'
import {Grid} from 'components/core'
import {Comment} from 'components/molecules'
import {spaces} from 'styles'
import {CommentFieldsFragment} from 'graphql/generated/queries'
import CommentsBlock from './CommentBlock/CommentBlock'
import CommentInput from 'components/sections/AquascapeDetails/CommentsSection/CommentInput'

interface Props {
    comments: CommentFieldsFragment[]
    userImage?: string | null
    userId?: number
    enteredComment: string
    onCommentChange: (e: FormEvent<HTMLTextAreaElement>) => void
    onReply: (comment: CommentFieldsFragment) => void
    removeComment: (comment: CommentFieldsFragment) => void
    toggleLike: (comment: CommentFieldsFragment) => void
    onSubmit: () => void
}

const CommentsSection: React.FunctionComponent<Props> = ({
    comments,
    enteredComment,
    onCommentChange,
    onReply,
    onSubmit,
    removeComment,
    toggleLike,
    userId,
    userImage,
}) => {
    const intl = useIntl()

    return (
        <>
            <div className="section">
                <Headline as="h4">
                    <FormattedMessage
                        id="aquascape.comments.title"
                        defaultMessage="Aqua comments ({count})"
                        values={{count: comments.length.toString()}}
                    />
                </Headline>
                <Grid.Row>
                    <Grid.Item extraSmall={12} medium={6}>
                        <CommentInput
                            value={enteredComment}
                            onChange={onCommentChange}
                            onSubmit={onSubmit}
                            userImage={userImage}
                            submitText={
                                <FormattedMessage
                                    id="aquascape.comments.input.submit"
                                    defaultMessage="Post comment"
                                />
                            }
                            placeholder={intl.formatMessage({
                                id: 'aquascape.comments.input.placeholder',
                                defaultMessage: 'Write your comment here',
                            })}
                        />
                    </Grid.Item>
                </Grid.Row>
                <div className="list">
                    <Grid.Row>
                        {comments
                            .filter(comment => !comment.parentCommentId)
                            .map(comment => (
                                <CommentsBlock
                                    key={comment.id}
                                    userId={userId}
                                    userImage={userImage}
                                    reply={onReply}
                                    removeComment={removeComment}
                                    toggleLike={toggleLike}
                                    comment={comment}
                                    childComments={comments.filter(
                                        childComment => childComment.parentCommentId === comment.id
                                    )}
                                />
                            ))}
                    </Grid.Row>
                </div>
            </div>
            <style jsx>{`
                .section {
                    padding: ${spaces.s120} 0;
                }

                .section :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s48};
                }

                .section .list {
                    margin-top: ${spaces.s30};
                }

                .section :global(.${Comment.classes.root}) {
                    margin: ${spaces.s30} 0;
                }
            `}</style>
        </>
    )
}

export default CommentsSection
