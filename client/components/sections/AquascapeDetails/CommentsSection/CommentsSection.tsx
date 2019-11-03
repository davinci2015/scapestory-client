import React from 'react'
import {useIntl} from 'react-intl'

import {FormattedMessage, Headline, Textarea, InputAdornment, Button, UserImage} from 'components/atoms'
import {Grid} from 'components/core'
import {spaces} from 'styles'
import {AquascapeComment} from 'containers/AquascapeDetails/query'
import Comment from 'components/molecules/Comment/Comment';

interface Props {
    comments: AquascapeComment[]
    userImage?: string
}

const CommentsSection: React.FunctionComponent<Props> = ({comments}) => {
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
                        <div className="textarea">
                            <UserImage size="large" />
                            <Textarea
                                rows={1}
                                placeholder={intl.formatMessage({
                                    id: 'aquascape.comments.input.placeholder',
                                    defaultMessage: 'Write your comment here'
                                })}
                                endAdornment={
                                    <InputAdornment>
                                        <Button dimensions="small">
                                            <FormattedMessage
                                                id="aquascape.comments.input.submit"
                                                defaultMessage="Post comment"
                                            />
                                        </Button>
                                    </InputAdornment>
                                }
                            />
                        </div>
                    </Grid.Item>
                </Grid.Row>
                <div className="list">
                    <Grid.Row>
                        {comments.map((comment) => (
                            <Grid.Item key={comment.id} extraSmall={12} medium={6}>
                                <Comment 
                                    id={comment.id}
                                    username={comment.user.name || comment.user.username}
                                    userImage={comment.user.profileImage}
                                    createdAt={comment.createdAt}
                                    content={comment.content}
                                    onLike={() => {}}
                                />
                            </Grid.Item>
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

                .section .textarea {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .section .list {
                    margin-top: ${spaces.s30};
                }

                .section :global(.${Comment.classes.root}) {
                    margin: ${spaces.s30} 0;
                }

                .section .textarea :global(.${UserImage.classes.root}) {
                    margin-right: ${spaces.s24};
                    flex-shrink: 0;
                }
            `}</style>
        </>
    )
}

export default CommentsSection