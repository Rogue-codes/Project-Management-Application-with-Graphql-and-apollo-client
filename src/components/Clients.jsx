import { useMutation } from '@apollo/client'
import React from 'react'
import {FaTrash} from "react-icons/fa"
import { DELETE_CLIENT } from '../mutations/GraphMutations'
import { GET_CLIENTS, GET_PROJECTS } from '../queries/GraphQueries'
function Clients({client}) {
    const[deleteMutation] = useMutation(DELETE_CLIENT,{
        variables:{id:client.id},
        refetchQueries:[{query:GET_CLIENTS},{ query: GET_PROJECTS }]
    })
  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td><FaTrash className='delete' size='1rem' onClick={deleteMutation}/></td>
    </tr>
  )
}

export default Clients