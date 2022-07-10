import { useRef, useState } from "react";
import API_CLIENT from "../api/axios_client";

function AddExpenseModal(props) {
  const closeRef = useRef();
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const addExpense = async () => {
    await API_CLIENT.post('/add-expense', {
      name: name,
      amount: amount,
      date: getDate()
    });
    props.getUserDetails();
    closeRef.current.click();
  }

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }

  return (
    <div class="modal fade" id="AddExpenseModal" tabindex="-1" role="dialog" aria-labelledby="AddExpenseModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddExpenseModal">Add new expense</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input onChange={(e) => setName(e.target.value)} className="form-control mt-2" type={'text'} placeholder="Add name"></input>
            <input onChange={e => setAmount(e.target.value)} className="form-control mt-2" type={'number'} placeholder="Add amount"></input>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" ref={closeRef} data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onClick={addExpense}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddExpenseModal;