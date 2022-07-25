import { useEffect } from 'react';
import Backbtn from '../components/Backbtn';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { toast } from 'react-toastify';

function Ticket() {
    const dispatch = useDispatch();
    const { ticket, isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets);
    const params = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(params.ticketid))
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isError, params])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <Backbtn url='/ticket' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Description of Issue</h3>
                    <p>{ticket.discription}</p>
                </div>
            </header>
        </div>
    )
}

export default Ticket