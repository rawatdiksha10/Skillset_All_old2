import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { search, searchByKeyWord } from "../../services/mainService";
import { getAllEngineer, deleteEngineer } from "../../services/skillService";
import LabelTagField from '../form/LabelTag';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../home/home.css';

const EngineerList = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit, reset} = useForm();  

  const onSubmit = async (data:any) => {
    if (data.searchKeyword) {
      const result:any = await searchByKeyWord(navigate, data);
      setData(result);
    } else {
      const result:any = await search(navigate, data);
      setData(result);
    }
    reset();
  }

  const getAll = async () => {
    const getAll: any = await getAllEngineer(navigate);
    setData(getAll);
  }

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const userid = event.currentTarget.id;
    const deleteData: any = await deleteEngineer(navigate,userid);
    setData(deleteData);
};  
  
 
  return (
    <>
    <div className='main-container'>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className = 'label-container'>
            <div>
              <Form.Label className = 'label-text'>日本語レベル :</Form.Label>
              <input {...register("jpLevel")} />
            </div>
            <div>
              <Form.Label className = 'label-text'>経験年数 :</Form.Label>
              <input className = "exp-textbox" {...register("expOver")} />
              <Form.Label className = 'label-text'>以上</Form.Label>
              <input className = "exp-textbox" {...register("expUnder")} />
              <Form.Label className = 'label-text'>以下</Form.Label>          
            </div>
            <div>
              <Form.Label className = 'label-text'>資格 :</Form.Label>
              <input {...register("certificate")} />
            </div>
          </div>
          <div>
            <Form.Label className = 'label-tag-text'>検索レベルタグ :</Form.Label>
            <LabelTagField
		            name="language"
                register={register}
	            />
            <Form.Label className = 'label-tag-text'>検索キーワード :</Form.Label>
            <input className = 'search-textbox' {...register("searchKeyword")} />
          </div>
          <div className= 'flex-submit'>
            <div>
              <Button type="reset" variant="primary">クリア</Button>
            </div>  
            <div>
              <Button type="submit" variant="primary">検索</Button>
            </div>
            <div>  
              <Button onClick = {getAll} variant="primary">全て検索</Button>
            </div>
          </div>
        </Form>
      </div>
      <div>
        <Table className='engi_table'>
          <thead className = 'engi_table_head'>
            <tr>
              <th>ITE番号</th>
              <th>名前</th>
              <th>ステータス</th>
              <th>時給</th>
              <th>日本語レベル</th>
              <th>経験年数</th>
              <th>得意とする分野</th>
              <th>スキル</th>
              <th>資格</th>
              <th>アクション</th>
            </tr>
          </thead>
          <tbody>
          {data.map((userData, index) => {
            return (
              <tr key={index}>
              <td>{userData['userid']}</td>
              <td>{userData['name']}</td>
              <td>{userData['status_name']}</td>
              <td>{userData['hourlywages']}</td>
              <td>{userData['jppassedlevel']}</td>
              <td>{userData['totalexp']}</td>
              <td>{(userData['content'] as string[]).join(',')}</td>
              <td>{userData['techskill']}</td>
              <td>{userData['certificate_name']}</td>
              <td>
                <span className = 'icon-grp'>
                <Button id = {userData['userid']} onClick = {handleDelete} variant="link" className='icon-link'>
                  <DeleteIcon />
                </Button>
                <Button variant="link" className='icon-link'>
                  <EditIcon />
                </Button>
                </span>
              </td>
            </tr>
            );
          })}
          </tbody>
        　</Table>
      </div>
    </div>
    </>
  );
};

export default EngineerList;