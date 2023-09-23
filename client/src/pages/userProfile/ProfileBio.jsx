import React from 'react'
import './UserProfile.css'

function ProfileBio({currentUserProfile}) {
    // console.log(currentUserProfile)
  return (
    <div>
        <div>
        {
            currentUserProfile?.tags.length !== 0 ?(
                <>
                <h4>Tags watched</h4>
                {
                    currentUserProfile?.tags.map((tag)=>(
                        <p key={tag}>{tag}</p>
                    ))
                }
                </>
            ) : (
                <h4>0 Tags watched</h4>
            )
        }
        </div>

        <div>
            {
                currentUserProfile?.about ? (
                    <>
                    <h4>About</h4>
                    <p>{currentUserProfile?.about}</p>
                    </>
                ) : (
                    <p>No Bio Found</p>
                )
            }
        </div>
    </div>
  )
}

export default ProfileBio