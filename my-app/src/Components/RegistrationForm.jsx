import React, {useState} from 'react';
import "./RegistrationForm.css";
import {Link,useNavigate} from "react-router-dom";
import userList from '../Components/userList';
import Axios from 'axios'

function RegistrationForm(){
    // Adding functionality for getting backend info to frontend
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    const[regularColor,setregularColor]=useState('#99C1FC');
    const[adminColor,setadminColor]=useState('#99C1FC');
    const[emailColor,setEmailColor]=useState('#c2c2c2');
    const[fNameColor,setFNameColor]=useState('#c2c2c2');
    const[lNameColor,setLNameColor]=useState('#c2c2c2');
    const[passwordColor,setPasswordColor]=useState('#c2c2c2');
    const[reEnterColor,setReEnterColor]=useState('#c2c2c2');
    const[BirthColor,setBirthColor]=useState('#c2c2c2');
    const[selectColor,setSelectColor] = useState('#c2c2c2');
    const[error,setError] =useState('');
    const[formData,setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        reEnterPassword: '',
        Birthday: '',
    });
    const[isregular,setIsregular] = useState(true);
    const clearError=()=>{
        setError('');
        setEmailColor('#c2c2c2');
        setFNameColor('#c2c2c2');
        setLNameColor('#c2c2c2');
        setPasswordColor('#c2c2c2');
        setReEnterColor('#c2c2c2');
        setBirthColor('#c2c2c2');
        setSelectColor('#c2c2c2');
    }
    const handleTextInput = (e)=>{
        clearError();
        const {name,value} =e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleregular=()=>{
        setIsregular(true);
        setregularColor('#120132');
        setadminColor('#99C1FC');
        clearError();
    }
    const handleadmin=()=>{
        setIsregular(false);
        setadminColor('#120132');
        setregularColor('#99C1FC');
        clearError();
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(formData.email.length ===0 || formData.firstName.length ===0 || formData.lastName.length ===0 || formData.password.length ===0 || formData.reEnterPassword.length ===0 || formData.Birthday.length ===0){
            
            setError('All fields must be filled');
            if(formData.email.length===0){
                setEmailColor('red');
            }
            if(formData.firstName.length===0){
                setFNameColor('red');
            }
            if(formData.lastName.length===0){
                setLNameColor('red');
            }
            if(formData.password.length===0){
                setPasswordColor('red');
            }
            if(formData.reEnterPassword.length===0){
                setReEnterColor('red');
            }
            if(formData.Birthday.length===0){
                setBirthColor('red');
            }
        }
        else if(formData.password !== formData.reEnterPassword){
            setError('Passwords need to match');
            setPasswordColor('red');
            setReEnterColor('red');
        }
        else if(!/^[\w-.]+@([\w-]+.)+[\w-]+$/.test(formData.email)){
            setError('Email is not in a valid format');
            setEmailColor('red');
        }   
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.Birthday)) {
            setError('Birthday is not in a valid format (YYYY-MM-DD)');
            setBirthColor('red');
        }
        else{
            const user = userList.find((u)=> u.email === formData.email);
            if(user){
                setError('Email is already registered');
                setEmailColor('red');
            }
            else{
                const userInfo ={
                    email:formData.email,
                    firstName:formData.firstName,
                    lastName:formData.lastName,
                    password:formData.password,
                    userType: isregular ? 'regular': 'admin',
                };
                userList.push(userInfo);
                setError('');
                navigate('../Login');
            }
        }
    }
    
const displayInfo = () => {
    console.log(formData.firstName + formData.lastName + formData.email + formData.password);
};

// function to add a user 
const addDeveloper = () => {
    Axios.post('http://localhost:3001/create', {fname: formData.firstName, lname: formData.lastName, email: formData.email, password: formData.password, Birth: formData.Birthday}).then(() => {
        console.log("Success!");
    });
};

// fucntion to get all users
// response contains whatever we get from our backend
const getUsers = () => {
    Axios.get('http://localhost:3001/users').then((response) => {
        setUserList(response.data);
        console.log("working");
    });

}


    return(
<div class="register" id="161:5477">
<Link to="../Login">
</Link>
<p class="register-gFU" id="161:5492">Register</p>
<div class="frame-49-a5x" id="161:5479">

<div class ="search-bar-reg-1" style={{borderColor: fNameColor}}>
<p class="inputfields">First Name</p>
<input class="email-input" id="161:5512" name="firstName" placeholder=" First Name"value={formData.firstName} onChange={handleTextInput}></input>
</div>
<div class ="search-bar-reg-2" style={{borderColor: lNameColor}}>
<p class="inputfields">Last Name</p>
<input class="email-input" id="30:2361" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleTextInput}></input>
</div>

<div class ="search-bar-reg-3" style={{borderColor: emailColor}}>
<p class="inputfields">Email Address</p>

<input class="email-input" id="161:5484" name="email" placeholder="xxx@email.com"value={formData.email} onChange={handleTextInput}></input>
</div>

<div class ="search-bar-reg-4" style={{borderColor: passwordColor}}>
<p class="inputfields">Password</p>
<input type="password" class="email-input" id="30:2348" name="password" placeholder="Enter Here" value={formData.password} onChange={handleTextInput}></input>
</div>

<div class ="search-bar-reg-5" style={{borderColor: reEnterColor}}>
<p class="inputfields">Confirm Password</p>
<input type="password" class="email-input" id="30:2357" name="reEnterPassword" placeholder= "Enter Here" value={formData.reEnterPassword} onChange={handleTextInput}></input>
</div>

<div class ="search-bar-reg-5" style={{borderColor: BirthColor}}>
<p class="inputfields">Birthday</p>
<input  class="email-input" id="30:2357" name="Birthday" placeholder= "YYYY-MM-DD" value={formData.Birthday} onChange={handleTextInput}></input>
</div>

</div>
<p class="select-account-type-9Xg" id="161:5490">Select Account Type</p>
<div class="frame-49-ejL" id="163:5557">

<button type ="submit"class="regular" id="30:2368" style={{backgroundColor:regularColor,borderColor:selectColor}}checked={isregular} onClick={handleregular}>Regular</button>

<p class="or" id="163:5556">or</p>

<button type ="submit"class="admin" id="30:2369"  style={{backgroundColor:adminColor,borderColor:selectColor}} checked={!isregular} onClick={handleadmin}>Admin</button>

</div>
<p class="already-have-account" id="161:5195">
<span class="already-have-account">Already Have an Account?&#160;</span>
<Link to="../Login">
<span class="loginlink">Log in.</span>
</Link>
</p>
<button type="submit" class="submit-cLi" id="30:2352" onClick={addDeveloper}>Create Account</button>
<span class="error-register">{error}</span>
<p>-------------------------------</p>

<button onClick={getUsers}>Show all Users</button>
{userList.map((val, key) => {
    return <div> {val.firstname}</div>
})}

</div>
    );


}
export default RegistrationForm;

// new getUsers button  