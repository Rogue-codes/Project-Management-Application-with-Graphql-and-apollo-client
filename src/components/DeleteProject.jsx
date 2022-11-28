import { useMutation } from '@apollo/client'
import React from 'react'
import {FaTrash} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { DELETE_PROJECT } from '../mutations/GraphMutations'
import { GET_PROJECTS } from '../queries/GraphQueries'

function DeleteProject({id}) {
    const navigate = useNavigate()
    const [deleteMutation] = useMutation(DELETE_PROJECT,{
        variables:{id:id},
        onCompleted : () => {
            navigate('/')
        },
        refetchQueries:[{query:GET_PROJECTS}]
    })
  return (
    <div className='delete-btn' onClick={deleteMutation}>
        <FaTrash/> <span>Delete Project</span>
    </div>
  )
}

export default DeleteProject