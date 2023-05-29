import React from 'react';
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEyeSlash, FaEye} from 'react-icons/fa';
import './newregistrationform.css'
import { newengineerregistration} from "../../services/skillService"; 
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../../util/enum/Enum";


function NewRegistrationForm() {
    
    // const options = [
    //     { value: "1", label: "GIT" },
    //     { value: "2", label: "JM ADMIN" },
    // ];

    // const handleSelect = (selectedOption: any) => {
    //     setFormValues({ ...formValues, "role": selectedOption.value });
    //     console.log(`Option selected:`, selectedOption);
    // };

    const [formValues, setFormValues] = useState({ userid:"", name: "", role: "2", password: "", cpassword: "" });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [cpasswordType, setCPasswordType] = useState("password");

    const handleSelect = (selectedOption: any) => {

        setFormValues({ ...formValues, "role": selectedOption.target.value });
        if(formValues.userid !==""){
            if(selectedOption.target.value==="2")
            {
                const isValid = /^ite\d{6}$/.test(formValues.userid);
                !isValid && setError('入力したユーザーIDが間違っています')
                isValid && setError('')
            }else if(selectedOption.target.value==="1"){
                const isValid = /^[a-zA-Z0-9]+$/.test(formValues.userid);
                !isValid && setError('入力したJM課ーIDが間違っています')
                isValid && setError('')
            }

        }
        if(formValues.userid ==="")
        {
            setError('ユーザーIDを入力してください')
            
        }
    };
    

    const togglePassword =()=>{
        if(passwordType==="password")
        {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const toggleCPassword =()=>{
        if(cpasswordType==="password")
        {
            setCPasswordType("text")
            return;
        }
        setCPasswordType("password")
    }

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        if(value !== "" && name==="userid"){
            if(formValues.role==="2")
            {
                const isValid = /^ite\d{6}$/.test(value);
                !isValid && setError('入力したユーザーIDが間違っています')
                isValid && setError('')
            }else if(formValues.role==="1"){
                const isValid = /^[a-zA-Z0-9]+$/.test(value);
                !isValid && setError('入力したJM課ーIDが間違っています')
                isValid && setError('')
            }
        }
    };

    const handleSubmit = (e: any) => {
        const { password, cpassword, name, role, userid } = formValues;
        const form = e.currentTarget;
        
        if ((form.checkValidity() === false) ||  (password !== cpassword)) 
        {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);

            if(userid !== ""){
                if(role==="2")
                {
                    const isValid = /^ite\d{6}$/.test(userid);
                    !isValid && setError('入力したユーザーIDが間違っています')
                    isValid && setError('')
                }else if(role==="1"){
                    const isValid = /^[a-zA-Z0-9]+$/.test(userid);
                    !isValid && setError('入力したJM課ーIDが間違っています')
                    isValid && setError('')
                }
            }
            
            // if((password !== cpassword ))
            // {
            //     // toast.error("パスワードが一致しません！");
            //     setError('パスワードが一致しません！');
            //     return;
            // } 
            // setError('');
        }
        else{
            // setError('');
            createUser(e);
        }
    };

    const defaultPassword = () => {
        setFormValues({ ...formValues, "password": "human" , "cpassword":"human"});
    };

    const createUser = async (e:any) => {
        e.preventDefault();
        const { userid, name, role, password, cpassword } = formValues;
        console.log(formValues);

        const res:any = await newengineerregistration(navigate, JSON.parse(JSON.stringify(formValues)));

        if(res.message==="User already registered")
        {
            toast.error("ユーザーはすでに登録されています！");
            // navigate(RouterPath.EngineerList);
        }
        else{
            // toast.success("ユーザー登録完了しました！");
            navigate(RouterPath.EngineerList);
        }
    };
  
    return (
        <Container style={{width:'60%',marginTop:'5%'}} fluid="md">
            <Row>
                {/* <Col></Col> */}
                <Col>
                    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event)}>
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm={3}>
                                    ユーザーID
                                    </Form.Label>
                                    <Col sm={9}>
                                        
                                    <Form.Control type="text" placeholder="" required pattern={formValues.userid!==''?formValues.role==="2"?"^ite[0-9]{6}$":"^[a-zA-Z0-9]+$":""} name="userid" id="userid" value={formValues.userid} onChange={(e) => handleChange(e)}isInvalid={error !== ''} />
                                    <Form.Control.Feedback type="invalid">{formValues.userid===""?"ユーザーIDを入力してください":formValues.role==="2"? "入力したユーザーIDが間違っています": "入力したJM課ーIDが間違っています"}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm={3}>
                                    名前
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" placeholder="" required pattern="^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Alpha}\s]+$" name="name" id="name" value={formValues.name} onChange={(e) => handleChange(e)}/>
                                    <Form.Control.Feedback type="invalid">名前を入力してください</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm={3}>
                                    ユーザー区分
                                    </Form.Label>
                                    <Col sm={9}>
                                    <Form.Select value={formValues.role}  onChange={handleSelect}>
                                        <option value="1">JM課</option>
                                        <option value="2">GIT</option>
                                    </Form.Select>

                                    {/* <Form.Control as="select" value={formValues.role} onChange={handleSelect}>
                                        <option value="1">GIT</option>
                                        <option value="2">JM Admin</option>
                                    </Form.Control> */}
                                    
                                    {/* <Select  className="mb-3" defaultValue={options[0]}
                                        options={options} onChange={handleSelect} /> */}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm={3}>
                                    新しいパスワード
                                    </Form.Label>
                                    <Col sm={9}>
                                    <InputGroup>
                                        <Form.Control type={passwordType} placeholder="" required maxLength={8} minLength={5} name="password" id="password" value={formValues.password} onChange={(e) => handleChange(e)} />
                                        <Button variant="outline-secondary"  style={{ borderTopRightRadius: '7px', borderBottomRightRadius: '7px', border: '1px solid #ced4da' }} onClick={togglePassword} >
                                        { passwordType==="password"? <span className="mb-3" id="basic-addon1"><FaEyeSlash/></span>:<FaEye/> }
                                        </Button>
                                        <Form.Control.Feedback type="invalid">パスワードを5文字以上8文字以内で入力してください</Form.Control.Feedback>
                                    </InputGroup>
                                    
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-1" >
                                    <Form.Label column sm={3}>
                                    再入力パスワード
                                    </Form.Label>
                                    <Col sm={9}>
                                    <InputGroup>
                                        {/* <Form.Control type={cpasswordType}  placeholder="" required maxLength={8} minLength={5} name="cpassword" id="cpassword" value={formValues.cpassword} onChange={(e) => handleChange(e)}isInvalid={error !== ''} />
                                        <Button variant="outline-secondary" onClick={toggleCPassword} id="button-addon2">
                                            { cpasswordType==="password"? <FaEyeSlash/>:<FaEye/> }
                                        </Button>
                                        <Form.Control.Feedback type="invalid" >{error !== '' ? error : "パスワードもう一度確認してください"}</Form.Control.Feedback> */}
                                         <Form.Control type={cpasswordType}  placeholder="" required pattern={formValues.cpassword!==''?(formValues.cpassword!==formValues.password)?"":"^[a-zA-Z0-9 ]{5,8}$":""} name="cpassword" id="cpassword" value={formValues.cpassword} onChange={(e) => handleChange(e)} />
                                        <Button variant="outline-secondary"  style={{ borderTopRightRadius: '7px', borderBottomRightRadius: '7px', border: '1px solid #ced4da' }} onClick={toggleCPassword} id="button-addon2">
                                            { cpasswordType==="password"? <FaEyeSlash/>:<FaEye/> }
                                        </Button>
                                        <Form.Control.Feedback type="invalid" >{formValues.cpassword===""?"パスワードもう一度確認してください":(formValues.cpassword!==formValues.password)? "パスワードが一致しません" : "パスワードもう一度確認してください"}</Form.Control.Feedback>
                                    </InputGroup>
                                    
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    {/* <Col sm={9}></Col>
                                    <Col sm={3}> */}
                                    <Col md={{ span: 4, offset: 9 }}>
                                        <Button onClick={defaultPassword} variant="link">既定値パスワード</Button>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3"></Form.Group>

                                <Form.Group as={Row}>
                                    {/* <Col sm={10}></Col>
                                    <Col sm={2}> */}
                                    <Col  md={{ span: 4, offset: 10 }}>
                                        <Button type="submit" variant="primary" size="lg" >登録</Button>
                                    </Col>
                                    {/* <Col sm={{ span: 6, offset: 2 }}>
                                    <Button type="submit" variant="danger">Cancel</Button>
                                    </Col> */}
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col></Col> */}
            </Row>

        <ToastContainer />
        </Container>
    
    );
}

export default NewRegistrationForm;