import React, { useState } from "react"
import { useQuery, useMutation, gql } from "@apollo/client"
import { GET_ALL_USERS } from "../../query/users"
import { CREATE_USER } from "../../mutation/users"
import { client } from "../_app"

const Graph = ({ data }) => {
  const [username, setUsername] = useState("")
  const [age, setAge] = useState(0)
  // const { loading, error, data, refetch } = useQuery(GET_ALL_USERS)
  const [newUser] = useMutation(CREATE_USER)

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error : {error.message}</p>

  const addUser = async (e) => {
    e.preventDefault()
    await newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    })
    refetch()
    setUsername("")
    setAge(0)
  }

  console.log(data)

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Создать</button>
          <button onClick={(e) => getAll(e)}>Получить</button>
        </div>
      </form>
      <div>
        {data?.getAllUsers.map((user, index) => (
          <div className="user" key={index}>
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_ALL_USERS,
  })

  return {
    props: {
      data: data,
    },
  }
}

export default Graph
