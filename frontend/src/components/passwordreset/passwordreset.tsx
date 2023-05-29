import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm} from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import './passwordReset.css';
import { getResetPasswordRequest,resetPassword } from "../../services/accoutService";
import { useNavigate } from "react-router-dom";
import PasswordInputField from '../form/PasswordInputField2';
function PasswordReset() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllResetPassword() {
      const data:any = await getResetPasswordRequest(navigate);
      setData(data);
    }
    getAllResetPassword();
  }, []);

  const alertClicked = (event: any) => {
    const linkId = event.target.id;
    setValue("userid", linkId);
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  setShowPassword1(!showPassword1);
  setShowPassword2(!showPassword2);

  const handleButtonClick = () => {

    clearErrors("firstpassword");
    clearErrors("secondpassword");    
    setValue("firstpassword", 'human');
    setValue("secondpassword", 'human');

  };

  const formSchema = Yup.object().shape({
    firstpassword: Yup.string()
      .min(5, "パスワードを5文字以上8文字以内で入力してください。")
      .max(8, "パスワードを5文字以上8文字以内で入力してください。"),
    secondpassword: Yup.string()
      .oneOf([Yup.ref("firstpassword")], "パスワードが一致しません。")
  });

  const { register, formState: { errors },handleSubmit, setValue, clearErrors, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(formSchema),
    defaultValues: {
      userid: "",
      firstpassword: "",
      secondpassword: ""
    }
  });

  const onSubmit = async (data:any) => {
    await resetPassword(navigate, data);
      reset({
        userid: "",
        firstpassword: "",
        secondpassword: ""
      });
      window.location.reload();
  }

  return (
    <>
    <div className = "flex-container">

      <div className = "flex-child left">

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ユーザーID</th>
              <th>リセット依頼日付</th>
            </tr>
          </thead>
          <tbody>
          {data.map(user => {
            return (
              <tr>
              <td>{user['key']}</td>
              <td>
                <Nav>
                  <Nav.Link id = {user['userid']} onClick = {alertClicked}>{user['userid']}</Nav.Link>
                </Nav></td>
              <td>{user['resetreqdate']}</td>
            </tr>
            );
          })}
          </tbody>
      　</Table>
      </div>
      <div className = "flex-child right">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>ユーザーID:</Form.Label>
            <Form.Control type="text"
              {...register("userid")}
              disabled
            />
          </Form.Group>
          <PasswordInputField
		        name="firstpassword"
            label="新しいパスワード:"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.firstpassword}
	        />
          <p>{!errors.firstpassword ? 
            <span>※半角英数字記号5~8文字</span> : <span></span>
            }</p>
          <Form.Group className="mb-3">
            <Button variant="secondary" onClick = {handleButtonClick}>
              初期パスワード</Button>
          </Form.Group>
          <PasswordInputField
		        name="secondpassword"
            label="再入力パスワード:"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.secondpassword}
	        />
          <Button type="submit" variant="primary">登録</Button>
        </Form>
      </div>
    </div>
    </>
  );
}

export default PasswordReset;