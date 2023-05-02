import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    )

    // const params = useParams()
    const { ticketId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTicket(ticketId))

        if (isError) {
            toast.error(message)
        }

        //eslint-disable-next-line
    }, [ticketId, isError, message])

    function onTicketClose() {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate('/tickets')
    }

    if (isLoading) {
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
            </header>
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
