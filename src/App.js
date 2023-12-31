import React, { Component } from 'react';
import './MyForm.css'; // Import your CSS file

class FormDataExample extends Component {
  constructor(props) {
    super(props);
    this.glimage = React.createRef();
    this.state = {
      glvoucherno: '',
      gldate: '',
      glexpensetype: '',
      glpaidto: '',
      glpaidamount: '',
      glimage: null,
      message:''
    };
  }

  handleglvouchernoChange = (e) => {
    this.setState({ glvoucherno: e.target.value });
  };
  handlegldateChange = (e) => {
    this.setState({ gldate: e.target.value });
  };
  handleglexpensetypeChange = (e) => {
    this.setState({ glexpensetype: e.target.value });
  };
  handleglpaidtoChange = (e) => {
    this.setState({ glpaidto: e.target.value });
  };
  handleglpaidamountChange = (e) => {
    this.setState({ glpaidamount: e.target.value });
  };
  handleImageChange = (e) => {
    this.setState({ selectedImage: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object and append the string and image to it.
    const formData = new FormData();
    formData.append('glvoucherno', this.state.glvoucherno);
    formData.append('gldate', this.state.gldate);
    formData.append('glexpensetype', this.state.glexpensetype);
    formData.append('glpaidto', this.state.glpaidto);
    formData.append('glpaidamount', this.state.glpaidamount);
    formData.append('glimage', this.state.selectedImage);

    // Make a POST request to your Spring Boot API.
    fetch('http://192.168.0.179:8082/AccountsPayable', {
        method: 'POST',
        body: formData
    })
            .then(response => { this.setState({ message: 'All Good-1!' });
                if (!response.ok) {this.setState({ message: 'All is not Good-1!' });
                    throw new Error('Response was not ok; please enter all fields');
        }
        return response.toString();
    })
            .then(data => {this.setState({  message: 'All Good - Inserted Account Payable!!' });
            })
            .catch(error => {console.error('Fetch error:', error);this.setState({ message: 'All is not Good-2!' + error});
                console.error('Fetch error:', error);
                this.setState({ message: 'All is not Good!' + error});
    });
  };
  handleClearSubmit= (e) => {
    this.setState({ glvoucherno:''});
    this.setState({ gldate: null});
    this.setState({ glexpensetype:''});
    this.setState({ glpaidto: ''});
    this.setState({ glpaidamount: ''});
//    this.setState({ glimage: null});
//    this.setState({ selectedImage: ''});
    this.setState({ message: ''});
    this.glimage.current.value='';
  };

  render() {

    return (
      <div className="accounts-payables">
      <div className="transaction-form">
       <div className="accounts-payables"><h2>GENERAL LEGER DEBITS-AP</h2></div>
         <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="glvoucherno"><b> Voucher No/Invoice No:</b></label>
            <input className="form-control"
              type="text"
              id="glvoucherno"
              value={this.state.glvoucherno}
              onChange={this.handleglvouchernoChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gldate"><b>Date:</b></label>
            <input className="form-control"
              type="date"
              id="gldate"
              value={this.state.gldate || ''}
              onChange={this.handlegldateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="glexpensetype"><b> Invoice/Paid For:</b></label>
            <input className="form-control"
              type="text"
              id="glexpensetype"
              value={this.state.glexpensetype}
              onChange={this.handleglexpensetypeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="glpaidto"><b>Invoice To/Paid To:</b></label>
            <input className="form-control"
              type="text"
              id="glpaidto"
              value={this.state.glpaidto}
              onChange={this.handleglpaidtoChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="glpaidamount"><b>Invoice/Paid Amount:</b></label>
            <input className="form-control"
              type="number"
              id="glpaidamount"
              value={this.state.glpaidamount}
              onChange={this.handleglpaidamountChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="glimage"><b>Invoice/Voucher Image:</b></label>
            <input className="form-control"
              type="file"
              id="glimage"
              accept="image/*"
              value={this.state.glimage}
              ref={this.glimage}
              onChange={this.handleImageChange}
            />
          </div>
          <button1 className="btn btn-sm btn-primary" onClick={this.handleSubmit}><b>Submit</b></button1>
          <button2 className="btn btn-sm btn-primary" onClick={this.handleClearSubmit}><b>Clear</b></button2>
          <div>{this.state.message}</div>
        </form>
      </div>
      </div>
    );
  }
}

export default FormDataExample;
