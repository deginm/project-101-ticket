import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTickets, reset } from '../features/tickets/ticketSlice';
import Backbtn from '../components/Backbtn';
import Loader from '../components/Loader';
import TicketItem from '../components/TicketItem';
function Tickets() {
    const dispatch = useDispatch();
    const { tickets, isSuccess, isLoading } = useSelector((state) => state.tickets);

    useEffect(() => {
        dispatch(getAllTickets())

        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])


    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Backbtn url='/' />
            <div className='tickets'>
                <div className='ticket-headings'>
                    <div>Date</div>
                    <div>Product</div>
                    <div>status</div>
                    <div>action</div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    )
}

export default Tickets