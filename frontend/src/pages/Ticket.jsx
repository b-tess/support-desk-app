import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote } from '../features/notes/noteSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

//Set the Modal to originate from index.html/index.js
//i.e. the root element that contains this app
Modal.setAppElement('#root')

function Ticket() {
    //Add local state to manage the Modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    )

    const { notes, isLoading: notesIsLoading } = useSelector(
        (state) => state.notes
    )
    // const params = useParams()
    const { ticketId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))

        if (isError) {
            toast.error(message)
        }

        //eslint-disable-next-line
    }, [ticketId, isError, message])

    //Open and close the modal
    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }

    //Create a note
    function onNoteSubmit(e) {
        e.preventDefault()
        dispatch(createNote({ ticketId, noteText }))
        closeModal()
    }

    function onTicketClose() {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate('/tickets')
    }

    if (isLoading || notesIsLoading) {
        return <Spinner />
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url={'/tickets'} />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date submitted:{' '}
                    {new Date(ticket.createdAt).toLocaleString()}
                </h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes:</h2>
            </header>

            {ticket.status !== 'closed' && (
                <button
                    onClick={openModal}
                    className='btn'
                >
                    <FaPlus />
                    Add Note
                </button>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Add Note'
            >
                <h2>Add Note</h2>
                <button
                    onClick={closeModal}
                    className='btn-close'
                >
                    X
                </button>
                <form onSubmit={onNoteSubmit}>
                    <div className='form-group'>
                        <textarea
                            name='noteText'
                            id='noteText'
                            className='form-control'
                            placeholder='Note text'
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <button
                            className='btn'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {notes.map((note) => (
                <NoteItem
                    key={note._id}
                    note={note}
                />
            ))}

            {ticket.status !== 'closed' && (
                <button
                    className='btn btn-block btn-danger'
                    onClick={onTicketClose}
                >
                    Close
                </button>
            )}
        </div>
    )
}

export default Ticket
