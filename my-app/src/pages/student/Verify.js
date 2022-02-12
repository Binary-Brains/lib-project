import React, { useEffect } from 'react'
import { StudentVerify } from '../../actions/student/auth';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';
import PropTypes from 'prop-types'


const Verify = ({id, userRegister}) => {
  //send the verification request to the backend 
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  console.log(location)
  useEffect(() => {
    dispatch(StudentVerify(id))
  }, [dispatch, id])
  
  const {loading,studentInfo} = userRegister
  if(studentInfo) setLocation("/student/signin")

  return (
    <div>
        {loading ? "Loading": ""}
    </div>
  )
}

Verify.propTypes = {
    userRegister: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    userRegister: state.userRegister,
  });
  
export default connect(mapStateToProps)(Verify);