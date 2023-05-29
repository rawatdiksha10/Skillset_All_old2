import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAllTags, search, searchByKeyWord } from "../../services/mainService";
import { getEngineerProfileByUserId,getAllEngineerInfo} from "../../services/skillService"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Home() {
  const [data, setData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [allenggData, setAllEnggData] = useState({});
  const [enggData, setEnggData] = useState<any>({});

  useEffect(() => {
    async function getAllLabelTags() {
      const data:any = await getAllTags(navigate);
      setTagData(data);
    }
    getAllLabelTags();
  }, []);

  // const [modalVisible, setModalVisible] = useState(false);

  // const handleClick = (event: any) => {
  //   setModalVisible(true);
  //   const linkId = event.target.id;
  //   setUserId(linkId);
  // };


  ////////diksha

  const handleClick = (id: any) => {

    console.log("id"+id);
      fetchEnggInfoByID(id);
  };


  const fetchEnggInfoByID = async (userid:any) => {
      
      const res:any =await getEngineerProfileByUserId(navigate,JSON.parse(JSON.stringify(userid)));

      if(res.success === false){
          console.log(res.message);
          return null
      }
      else{
          setShow(true);
          setEnggData(res);
      }
  };

  ////////end

  const { register, handleSubmit, reset } = useForm();  

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
            <div id="id_language">
              {tagData.map(labelTagList => {
                return (              
                  <Form.Label>
                    <input type="checkbox" multiple {...register("language")} value={labelTagList['label_tag_name']} />
                    <span>{labelTagList['label_tag_name']}</span>
                  </Form.Label>
                );
              })}
            </div>
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
            </tr>
          </thead>
          <tbody>
          {data.map(userData => {
            return (
              <tr>
              <td>
                <Nav>
                  <Nav.Link id = {userData['userid']} onClick={() => handleClick(userData['userid'])} style={{ textDecoration: 'underline' }}>{userData['userid']}</Nav.Link>
                </Nav>
                <Modal scrollable={true} size="lg" show={show} onHide={() => setShow(false)} dialogClassName="modal-100w" aria-labelledby="example-custom-modal-styling-title">
                  <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        インジニア情報
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body >
                      <Container>
                          <Row className="mb-3">
                              <Col sm={3}>
                                  <Form.Label>
                                      ステータス
                                  </Form.Label>
                              </Col>
                              <Col sm={2}>
                                  <Form.Control type="text"  name="status" id="status" readOnly  value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.statusname}/>
                              </Col>
                              <Col sm={2}></Col>
                              <Col sm={3}>
                                  <Form.Label>
                                      時給
                                  </Form.Label>
                              </Col>
                              <Col sm={2}>
                                  <Form.Control type="text" placeholder=""  name="wage" id="wage" readOnly value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.hourlywage}  />
                              </Col>
                          </Row>
                          <Row className="mb-3"></Row>
                          <Row className="mb-3">
                              <Col sm={3}>
                                  <Form.Label>
                                      実務経験
                                  </Form.Label>
                              </Col>
                              <Col sm={2}>
                                  <Form.Control type="text" placeholder=""  name="exp1" id="exp1" readOnly value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.totalexp} />
                              </Col>
                              <Col sm={2}></Col>
                              <Col sm={3}>
                                  <Form.Label>
                                      日本企業勤務経験
                                  </Form.Label>
                              </Col>
                              <Col sm={2}>
                                  <Form.Control type="text" placeholder=""  name="exp2" id="exp2" readOnly value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.jpexp} />
                              </Col>
                          </Row>
                          
                          <Row className="mb-3"></Row>
                          <hr/>
                          <Row className="mb-1"></Row>
                          <Row>
                              <Col>
                                  <Form.Label>
                                      得意とする経験・分野・スキル
                                  </Form.Label>
                              </Col>
                          </Row>
                          <Row className="mb-3">
                              <Col>
                                  <Table striped bordered hover size="sm">
                                      <thead>
                                      </thead>
                                      <tbody>
                                          {
                                              enggData && enggData.specExp && Array.isArray(enggData.specExp) && enggData.specExp.length > 0?
                                                  enggData.specExp.map((engg: any, index: any) => {
                                                      return (
                                                      <tr key={index}>
                                                          {
                                                          Object.keys(engg).map((cell: any, key) => {
                                                              return(
                                                                  (cell === "content" || cell === "specexp" || cell === "exptypeflg") &&
                                                              <td key={key}
                                                                  className='tableData'
                                                                  >
                                                                  {
                                                                    engg[cell] === 1 ? "アカデミック・プロジェクト" 
                                                                    :
                                                                    engg[cell] === 2 ? "インターンシップ"
                                                                    :
                                                                    engg[cell] === 3 ? "実務経験"
                                                                    :
                                                                    engg[cell]
                                                                  }
                                                                  </td>
                                                              )
                                                          })
                                                          }
                                                      </tr>
                                                  )}
                                              ):
                                              <tr className='text-center text-white'>
                                                  <td colSpan={6}>表示する情報がありません</td>
                                              </tr>
                                          }
                                      </tbody>
                                  </Table>
                              </Col>
                          </Row>
                          <Row className="mb-3"></Row>
                          <hr/>
                          <Row className="mb-1"></Row>
                          <Row>
                              <Col>
                                  <Form.Label>
                                      語学スキル
                                  </Form.Label>
                              </Col>
                          </Row>
                          <Row className="mb-3">
                              <Col>
                                  <Table striped bordered hover size="sm">
                                      <tbody>
                                          <tr>
                                              <td>日本語</td>
                                              <td colSpan={3}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.jppassedlevel}</td>
                                              <td >{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.jpexamname}</td>
                                              <td >{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.japanese}</td>
                                          </tr>
                                          <tr>
                                              <td>英語</td>
                                              <td colSpan={6}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.english}</td>
                                          </tr>
                                          <tr>
                                              <td>その他</td>
                                              <td colSpan={6}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.otherlang}</td>
                                          </tr>
                                      </tbody>
                                  </Table>
                              </Col>
                          </Row>
                          <Row className="mb-3"></Row>
                          <hr/>
                          <Row className="mb-1"></Row>
                          <Row>
                              <Col>
                                  <Form.Label>
                                      技術スキル
                                  </Form.Label>
                              </Col>
                          </Row>
                          <Row className='mb-3'>
                              <Col>
                                  <Form.Control as="textarea" rows={4} name="itskill" id="itskill" readOnly value={typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.techskill}/>
                              </Col>
                          </Row>
                          <Row className="mb-3"></Row>
                          <hr/>
                          <Row className="mb-1"></Row>
                          <Row>
                              <Col>
                                  <Form.Label>
                                      技術スキル習得歴
                                  </Form.Label>
                              </Col>
                          </Row>
                          <Row className='mb-3'>
                              <Col>
                                  <Table striped bordered hover size="lg">
                                      <thead>
                                          <tr>
                                          <th>内容</th>
                                          <th>使用技術（システム環境・言語等）</th>
                                          <th>役割・規模</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {/* <tr>
                                          <td colSpan={2}>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.jobcontent}</td>
                                          <td>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.tech}</td>
                                          <td>{typeof enggData === 'object' && Object.keys(enggData).length > 0 && enggData?.roleandscale}</td>
                                          </tr> */}
                                          {
                                              enggData && enggData.techSkill && Array.isArray(enggData.techSkill) && enggData.techSkill.length > 0?
                                                  enggData.techSkill.map((engg: any, index: any) => {
                                                      return (
                                                      <tr key={index}>
                                                          {
                                                          Object.keys(engg).map((cell: any, key) => {
                                                              return(
                                                                  (cell === "content" || cell === "tech" || cell === "roleandscale") &&
                                                              <td key={key}
                                                                  className='tableData'
                                                                  >
                                                                  {
                                                                      engg[cell]
                                                                  }
                                                                  </td>
                                                              )
                                                          })
                                                          }
                                                      </tr>
                                                  )}
                                              ):
                                              <tr className='text-center text-white'>
                                                  <td colSpan={6}>表示する情報がありません</td>
                                              </tr>
                                          }
                                      
                                      </tbody>
                                  </Table>
                              </Col>
                          </Row>
                          <Row className="mb-3"></Row>
                          <Row>
                              <Col sm={9} lg={10}></Col>
                              <Col sm={3} lg={2}>
                                  <Button variant="primary" onClick={handleClose}>
                                      閉じる
                                  </Button>
                              </Col>
                          </Row>
                      </Container>
                  </Modal.Body>
                </Modal>
              </td>
              <td>{userData['name']}</td>
              <td>{userData['status_name']}</td>
              <td>{userData['hourlywages']}</td>
              <td>{userData['jppassedlevel']}</td>
              <td>{userData['totalexp']}</td>
              <td>{(userData['content'] as string[]).join(',')}</td>
              <td>{userData['techskill']}</td>
              <td>{userData['certificate_name']}</td>
            </tr>
            );
          })}
          </tbody>
        　</Table>
      </div>
    </div>
    </>
  );
  }
  
  export default Home;