import React from 'react'

import {spaces, media, colors} from 'styles'
import UsernameInput from './UsernameInput'

interface Props {
    userImage: React.ReactNode
    username: React.ReactNode
    stats: React.ReactNode
    about: React.ReactNode
}

const UserSection: React.FunctionComponent<Props> = ({about, stats, userImage, username}) => (
    <>
        <div className="section">
            <div className="user-image">{userImage}</div>
            <div className="user">
                <div className="username">{username}</div>
                <div className="user-info">
                    {stats}
                    <div className="user-info__about">{about}</div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .section {
                position: relative;
                margin-top: -60px;
            }

            .user-image {
                display: flex;
                justify-content: center;
            }

            .username {
                display: flex;
                justify-content: center;
                color: ${colors.BLACK};
                padding-top: 14px;
                padding-bottom: 24px;
            }

            .user-info {
                margin-top: ${spaces.s20};
            }

            .section :global(.${UsernameInput.classes.root}) {
                color: ${colors.BLACK};
            }

            .user-info__about {
                margin: ${spaces.s60} 0;
            }

            @media ${media.up('medium')} {
                .section {
                    position: relative;
                    margin-top: -100px;
                }
            }

            @media ${media.up('large')} {
                .section {
                    position: relative;
                    margin-top: -74px;
                }

                .section .username {
                    color: ${colors.WHITE};
                    justify-content: flex-start;
                }

                .section .user-image {
                    position: absolute;
                    left: -190px;
                }

                .section .user-info {
                    margin-top: ${spaces.s36};
                }

                .section :global(.${UsernameInput.classes.root}) {
                    color: ${colors.WHITE};
                }
            }
        `}</style>
    </>
)

export default UserSection
