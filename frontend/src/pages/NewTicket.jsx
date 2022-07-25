import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { reset, createTicket } from '../features/tickets/ticketSlice';
import Backbtn from '../components/Backbtn';

function NewTicket() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState();
  const [discription, setDescription] = useState();

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      dispatch(reset())
      navigate('/ticket')
    }
    dispatch(reset())
  }, [dispatch, navigate, isLoading, isSuccess, isError, message])


  // handle form submisson
  const handleSubmit = (e) => {
    e.preventDefault()
    if (product === '' || product === undefined) {
      toast.error('Please select a product')
    } else if (discription === '' || discription === undefined) {
      toast.error('Please a discription')
    } else {
      dispatch(createTicket({ product, discription }))
    }
  }

  return (
    <>
    <Backbtn url="/"/>
      <section className='heading'>
        <h1>Create Tickets</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor="name">Customer name</label>
          <input type="text" value={name} id='name' disabled />
        </div>
        <div className='form-group'>
          <label htmlFor="name">Customer email</label>
          <input type="email" value={email} id='name' disabled />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Select Product</label>
            <select className='' id='product' value={product} onChange={(e) => { setProduct(e.target.value) }}>
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description of the product</label>
            <textarea name="description" id="desc" placeholder='Description' value={discription} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block" disabled={isLoading}>Save</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket