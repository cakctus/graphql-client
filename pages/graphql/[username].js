import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../../query/users"

const ProfileDetail = () => {
  const router = useRouter()

  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id: 2,
    },
    notifyOnNetworkStatusChange: true,
  })

  const { username, age } = data.getUser

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      {username} Profile {age} age
    </div>
  )
}

export default ProfileDetail
