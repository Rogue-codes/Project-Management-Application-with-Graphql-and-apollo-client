import React from 'react'
import { useState } from 'react'
import EditProject from './EditProject'
import {FaEdit} from "react-icons/fa"
function EditProjectBtn({initValues}) {
    const [showEditModal, setShowEditModal] = useState(false)

    const handleShowEditModal = () => setShowEditModal(true);
  return (
    <>
    <div className='update-btn' onClick={handleShowEditModal}>
    <FaEdit/> <span>Update Project</span>
    </div>
    <EditProject show={showEditModal} setShow={setShowEditModal} initValues={initValues} />
    </>
  )
}

export default EditProjectBtn