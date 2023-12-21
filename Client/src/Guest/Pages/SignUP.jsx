import React, { useState } from 'react';

const Form = () => {
 const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phoneNo: '',
    email: '',
    country: '',
    city: '',
    zipCode: '',
    streetAddress: '',
    joiningDate: '',
    password: '',
    confirmPasswrod: ''
 });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 };



 return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fname">First Name</label>
        <input type="text" className="form-control" id="fname" name="fname" value={formData.fname} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="lname">Last Name</label>
        <input type="text" className="form-control" id="lname" name="lname" value={formData.lname} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNo">Phone Number</label>
        <input type="text" className="form-control" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input type="text" className="form-control" id="country" name="country" value={formData.country} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="zipCode">Zip Code</label>
        <input type="text" className="form-control" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="streetAddress">Street Address</label>
        <input type="text" className="form-control" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="joiningDate">Joining Date</label>
        <input type="date" className="form-control" id="joiningDate" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPasswrod">Confirm Password</label>
        <input type="password" className="form-control" id="confirmPasswrod" name="confirmPasswrod" value={formData.confirmPasswrod} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
 );
}

export default Form;