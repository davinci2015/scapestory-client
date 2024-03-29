import React, {FormEvent} from 'react'
import {useIntl} from 'react-intl'

import {FormattedMessage, Headline} from 'components/atoms'
import {Grid} from 'components/core'
import {Comment} from 'components/molecules'
import {CommentFieldsFragment, User_ProfileQuery} from 'graphql/generated/queries'
import CommentsBlock from './CommentBlock/CommentBlock'
import CommentInput from 'components/sections/AquascapeDetails/CommentsSection/CommentInput'
import {spaces, media} from 'styles'

interface Props {
    user?: User_ProfileQuery['me']
    comments: CommentFieldsFragment[]
    enteredComment: string
    onCommentChange: (e: FormEvent<HTMLTextAreaElement>) => void
    onReplyChange: (e: FormEvent<HTMLTextAreaElement>, commentId: number) => void
    onReply: (commentId: number) => void
    replies: {[key: number]: string | undefined}
    removeComment: (comment: CommentFieldsFragment) => void
    toggleLike: (comment: CommentFieldsFragment) => void
    onSubmit: () => void
}

const CommentsSection: React.FunctionComponent<Props> = ({
    comments,
    enteredComment,
    onCommentChange,
    onReply,
    onReplyChange,
    onSubmit,
    removeComment,
    replies,
    toggleLike,
    user,
}) => {
    const intl = useIntl()

    return (
        <>
            <div className="section">
                <Headline as="h2" variant="h3">
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
                            username={user?.name}
                            userImage={user?.profileImage}
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
                                    userId={user?.id}
                                    username={user?.name}
                                    userImage={user?.profileImage}
                                    replies={replies}
                                    onReply={onReply}
                                    onReplyChange={onReplyChange}
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
                    padding-top: ${spaces.s60};
                    padding-bottom: ${spaces.s60};
                }

                .section :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s48};
                }

                .section .list {
                    margin-top: ${spaces.s30};
                }

                .section :global(.${Comment.classes.root}) {
                    margin: ${spaces.s16} 0;
                }

                @media ${media.up('medium')} {
                    .section {
                        padding-top: ${spaces.s90};
                        padding-bottom: ${spaces.s120};
                    }
                }
            `}</style>
        </>
    )
}

export default CommentsSection
