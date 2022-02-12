import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { AdminVerify } from '../../actions/admin/auth';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';


const VerifyAdmin = ({id, adminRegister}) => {
  //send the verification request to the backend 
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    dispatch(AdminVerify(id))
  }, [])
  
  const {loading,adminInfo} = adminRegister
  if(adminInfo) setLocation("/admin/signin")

  return (
    <div>
        {loading ? "Loading": ""}
    </div>
  )
}

VerifyAdmin.propTypes = {
    adminRegister: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    adminRegister: state.adminRegister,
  });
  
export default connect(mapStateToProps)(VerifyAdmin);