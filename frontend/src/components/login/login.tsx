import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { login, checkUserIdExist, resetPasswordRequest } from "../../services/accoutService";
import { setCookie } from "../../util/cookieService";
import { Role, RouterPath } from "../../util/enum/Enum";

interface IFormInput {
  userid: String;
  password: String;
}

function Login(props:any) {
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm<IFormInput>();   
  const navigate = useNavigate();


  const onSubmit: SubmitHandler<IFormInput> = async data => {
    if(data.userid === "" || data.password === ""){
      setError("userid", { type:"manual", message:"ユーザー ID、パスワードを入力してください。" });
    }else{
       
      let user:any = await login(navigate, data);

      if(user.role===Role.Admin){
        setCookie("sv", user.sessionId);
        navigate(RouterPath.EngineerList);

      }else if(user.role===Role.Engineer){
        setCookie("sv", user.sessionId);
        navigate(RouterPath.MyPage);  
      }else{
        setError("userid", { type:"manual", message:"ユーザー ID、パスワードが間違っています。" });
      } 
    }      
  }

  async function onResetPassword(): Promise<void> {
    let userid = watch("userid");
    if(userid===""){
      setError("userid", { type:"manual", message:"ユーザー IDを入力してください。" });
    }else{      
      
      let isITENoExist = await checkUserIdExist(navigate, userid);

      if(isITENoExist){
        let isRecordAdded:any = await resetPasswordRequest(navigate, userid);
        if(isRecordAdded){
          alert("パスワードのリセットを依頼しました。")
        }else{
          setError("userid", { type:"manual", message:"不明なエラーが発生しました。" });//Unknown error occured
        }           
      } else{
        setError("userid", { type:"manual", message:"新しいユーザー IDです。" });//invalid user id
      }
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <Container>        
        <Row style={{ marginTop: "10%" }}>
          <Col md="4"></Col>
          <Col md="4">  
            <center>
              <h2>スキル検索システム</h2>
              <br></br>
            </center>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                {/* <Form.Label size="sm">ユーザー ID:</Form.Label> */}
                <Form.Control placeholder="ユーザー ID" {...register("userid")} size="sm" type="text"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                {/* <Form.Label size="sm"></Form.Label> */}
                <div style={{position:"relative"}}>
                  <Form.Control placeholder="パスワード" {...register("password")} size="sm" type={showPassword ? 'text' : 'password'} />
                  {showPassword ? <button type="button" className="btn btn-link" onClick={toggleShowPassword} style={{position:"absolute", right:"-0.2rem", top:"53%", transform:"translateY(-50%)", cursor: "pointer", color:"black" }}><FaEye/></button>
                  : <button type="button" className="btn btn-link" onClick={toggleShowPassword} style={{position:"absolute", right:"-0.2rem", top:"53%", transform:"translateY(-50%)", cursor: "pointer", color:"black" }} ><FaEyeSlash/></button>}
                  
                </div>                

              </Form.Group>
              <Row>
                {errors.userid && <span style={{ color: "red", fontSize:"small" }}>{errors.userid.message}</span>}
              </Row>
              <Row>
                <Col xs="8">
                  <Button variant="link" type="button" onClick={onResetPassword} size="sm">パスワードがお忘れの方はこちら</Button>
                </Col>
                <Col xs="4">
                  <Button variant="primary" type="submit" size="sm" style={{ float: "right" }}>ログイン</Button>
                </Col>                  
              </Row>
            </Form>
          </Col>
          <Col md="4"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
