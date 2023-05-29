import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import './myPage.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { getAllTags, getUserProfileByITENo, saveEngineerProfileByEngineer } from "../../services/skillService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type SpecialExperiance = {
  _id:string;
  content: string;
  exptypeflg: number;
  specexp: string;
};

type TechnicalSkill = {
  _id:string;
  content: string;
  tech: string;
  roleandscale: string;
};

type Qualification = {
  _id:string;
  acqdate: string;
  source: string;
  name: string;
}

type Error = { 
  error_id: string; 
  error_message: string; 
}

function MyPage(props: any) {

  const navigate = useNavigate();
  
  let [_id, setId] = useState('');
  const [iteNo, setIteNo] = useState(undefined);
  const [eName, setEName] = useState(undefined);
  const [pwd, setPwd] = useState('');
  const [repwd, setRepwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [showRePassword, setShowRePassword] = useState(false);
  const toggleShowRePassword = () => setShowRePassword(!showRePassword);
  const workExperience = useRef<HTMLInputElement>(null);
  const japanCompanyWorkExperience = useRef<HTMLInputElement>(null);
  const recomondedPoints = useRef<HTMLTextAreaElement>(null);
  const technicalSkill = useRef<HTMLTextAreaElement>(null);
  const appealPoints = useRef<HTMLTextAreaElement>(null);

  const [errorMessages, setErrorMessages] = useState<Error[]>([]);
  const [labelTagList, setLabelTagList] = useState([{ lbltgid: '', lbltgname: '' }]);

  const [specExp, setSpecExp] = useState([
    { _id:'', content: '', exptypeflg: 0, specexp:'' },
    { _id:'', content: '', exptypeflg: 0, specexp:'' },
    { _id:'', content: '', exptypeflg: 0, specexp:'' },
    { _id:'', content: '', exptypeflg: 0, specexp:'' },
    { _id:'', content: '', exptypeflg: 0, specexp:'' },
    { _id:'', content: '', exptypeflg: 0, specexp:'' },
    { _id:'', content: '', exptypeflg: 0, specexp:'' }
  ]);

  const [langSkill, setLangSkillData] = useState({
    japanese: undefined,
    jpexamname: undefined,
    jppassedlevel:undefined,
    english: undefined,
    otherLanguageLevel: undefined,
  });

  const [ahTechnicalSkills, setAHTechnicalSkillsData] = useState([
    { _id:'', content: '', tech: '', roleandscale:'' },
    { _id:'', content: '', tech: '', roleandscale:'' },
    { _id:'', content: '', tech: '', roleandscale:'' },
    { _id:'', content: '', tech: '', roleandscale:'' },
    { _id:'', content: '', tech: '', roleandscale:'' }
  ]);

  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  //events
  const handleSpecExpChange = (event: any, rowIndex: number, field: keyof SpecialExperiance) => {
    const value = event.target.value;
    const updatedTableData = [...specExp];
    (updatedTableData[rowIndex] as any)[field] = field==="exptypeflg" ? parseInt(value, 10) : value;
    setSpecExp(updatedTableData);
  };

  const handleTechnicalSkillChange = (event: any, rowIndex: number, field: keyof TechnicalSkill) => {
    const value = event.target.value;
    const updatedTableData = [...ahTechnicalSkills];
    (updatedTableData[rowIndex] as any)[field] = value;
    setAHTechnicalSkillsData(updatedTableData);
  };

  const handleAddRow = () => {
    setQualifications([...qualifications, { _id:'', acqdate: '', source: '', name: '' }]);
  };

  const handleAddNewRowChange = (e:any, index: number) => {
    const { name, value } = e.target;
    const newRows = [...qualifications];
    (newRows[index] as any)[name as keyof Qualification] = value;
    setQualifications(newRows);
  };

  const handleButtonClick = async () => {    
    var profile = {
      _id: _id,
      pwd:pwd,
      repwd:repwd,
      technicalSkill: technicalSkill.current?.value,
      appealPoints: appealPoints.current?.value,
      qualifications: qualifications
    }

    let valid:boolean = validateProfile(profile);
 
    if(valid){
      var validProfile = getValidateProfile(profile);
      var x:any = await saveEngineerProfileByEngineer(navigate, validProfile);
      console.log(x);
      if(x.isSaved){
        alert("Saved successfully");
      } else {
        alert("Not Saved:"+x.errorMsg);
      }
    }
  };

  //onload
  useEffect(() => {
    async function getAllSkillTags() {
      const tags:any = await getAllTags(navigate);
      setLabelTagList(tags);   
    }
    getAllSkillTags();

    async function getUserProfileByUserId() {
      //getuserbyid    
      setIteNo(props.userid);            
      var userProfile:any = await getUserProfileByITENo(navigate, props.userid);
      //id
      setId(userProfile._id);

      //Name
      setEName(userProfile.eName);          
      
      //workExperience
      if(workExperience.current) {        
        workExperience.current.value = userProfile.workExperience;
      }

      //japanCompanyWorkExperience
      if(japanCompanyWorkExperience.current) {        
        japanCompanyWorkExperience.current.value = userProfile.japanCompanyWorkExperience;
      }

      //recomondedPoints
      if(recomondedPoints.current) {        
        recomondedPoints.current.value = userProfile.recomondedPoints;
      }

      //langSkill
      setLangSkillData(prevState => ({ ...prevState, japanese: userProfile.langSkill.japanese }));
      setLangSkillData(prevState => ({ ...prevState, jpexamname: userProfile.langSkill.jpexamname }));
      setLangSkillData(prevState => ({ ...prevState, jppassedlevel: userProfile.langSkill.jppassedlevel }));
      setLangSkillData(prevState => ({ ...prevState, english: userProfile.langSkill.english }));
      setLangSkillData(prevState => ({ ...prevState, otherLanguageLevel: userProfile.langSkill.otherLanguageLevel }));

      //technicalSkill
      if(technicalSkill.current) {        
        technicalSkill.current.value = userProfile.technicalSkill;
      }

      //appealPoints
      if(appealPoints.current) {        
        appealPoints.current.value = userProfile.appealPoints;
      }

      //specExp
      const updatedSpecExp = [...specExp];
      userProfile.specExp.forEach((se:any, index:number) => {        
        updatedSpecExp[index] = { _id:se._id, content: se.content, exptypeflg: se.exptypeflg, specexp: se.specexp };        
      });
      setSpecExp(updatedSpecExp);

      //selectedLabels
      const updatedSelectedLabels = [...selectedLabels];
      userProfile.selectedLabels.forEach(async (sl:any, index:number) => {       
        const checkbox:any = document.querySelector('input[type="checkbox"][name="language"][value=\''+sl.lbltgid+'\']');
        checkbox.checked = true;
        updatedSelectedLabels[index] = sl.lbltgid;        
      });
      setSelectedLabels(updatedSelectedLabels);
      
      //ahTechnicalSkills
      const updatedAHTechnicalSkills = [...ahTechnicalSkills];
      userProfile.ahTechnicalSkills.forEach((ah:any, index:number) => {        
        updatedAHTechnicalSkills[index] = { _id:ah._id, content: ah.content, tech: ah.tech, roleandscale:ah.roleandscale };        
      });
      setAHTechnicalSkillsData(updatedAHTechnicalSkills);

      //qualification
      const updatedQualifications = [...qualifications];
      userProfile.qualifications.forEach((q:any, index:number) => {        
        updatedQualifications[index] = { _id:q._id, name: q.name, acqdate: q.acqdate, source:q.source };        
      });
      setQualifications(updatedQualifications);

    }
    getUserProfileByUserId();   

  }, []);

  function getValidateProfile(profile:any){

    profile.qualifications = profile.qualifications.filter((x:any) => (x.name !== "" && x.source !== "" && x.acqdate !== "")
    || (x._id !== "" && x.name === "" && x.source === "" && x.acqdate === ""));
    return profile;
  }
  
  function validateProfile(profile:any) {
    let errors:Error[] = [];

    //pwd
    if(!(profile.pwd === '' && profile.repwd === '')){
      if(profile.pwd === '' && profile.repwd !== ''){
        if (!errors.some((error) => error.error_id === "er_pwd")) {
          errors.push({ error_id: "er_pwd", error_message: "バスワードを入力してください。" });
        } 
      }else if (!(profile.pwd.length >= 5 && profile.pwd.length <= 8)) {
        if (!errors.some((error) => error.error_id === "er_pwd")) {
          errors.push({ error_id: "er_pwd", error_message: "バスワードを5文字以上8文字以内で入力してください。" });
        }
      }else if(profile.pwd !== '' && profile.repwd === ''){
        if (!errors.some((error) => error.error_id === "er_repwd")) {
          errors.push({ error_id: "er_repwd", error_message: "再入力パスワードを入力してください。" });
        } 
      }else if(profile.pwd !== profile.repwd){
        if (!errors.some((error) => error.error_id === "er_repwd")) {
          errors.push({ error_id: "er_repwd", error_message: "バスワードが一致しません。" });
        } 
      }
    } 
    
    //Qualifications
    let partiallyFilledQualifications= profile.qualifications.filter((x:any) => ((x.acqdate !== "" && (x.source === "" || x.name === "")) 
    || (x.source !== "" && (x.name === "" || x.acqdate === "")) 
    || (x.name !== "" && (x.acqdate === "" || x.source === ""))));

    if(partiallyFilledQualifications.length>0){
      if (!errors.some((error) => error.error_id === "er_qlf")) {
        errors.push({ error_id: "er_qlf", error_message: "正しく入力してください。" });
      }
    }

    setErrorMessages(errors);
    return errors.length === 0;
  }

  function getErrorMessage(error_id:any){
    return errorMessages.find(x=>x.error_id === error_id)?.error_message;
  }

  async function handleFormControlChanged(event:any) {    
    
    if(event.target.id === "eName"){
      setEName(event.target.value);

      if(event.target.value){
        const filteredErrMsg = errorMessages.filter((error) => error.error_id !== "er_eName");
        setErrorMessages(filteredErrMsg); 
      }else{
        if (!errorMessages.some((error) => error.error_id === "er_eName")) {
          setErrorMessages([...errorMessages, { error_id: "er_eName", error_message: "名前を入力してください。" }]);
        }
      }
    }
    
    //pwd
    if(event.target.id === "pwd" || event.target.id === "repwd"){
      let pwd1, repwd1 = '';
      let errors = errorMessages;

      if(event.target.id === "pwd"){
        setPwd(event.target.value);
        pwd1 = event.target.value;
        repwd1 = repwd;
      }else{
        setRepwd(event.target.value);
        pwd1 = pwd;
        repwd1 = event.target.value
      }
      
      errors = errors.filter((error) => error.error_id !== "er_pwd");
      errors = errors.filter((error) => error.error_id !== "er_repwd");

      if(!(pwd1 === '' && repwd1 === '')){
        if(pwd1 === '' && repwd1 !== ''){
          errors.push({ error_id: "er_pwd", error_message: "バスワードを入力してください。" });
        }else if (!(pwd1.length >= 5 && pwd1.length <= 8)) {
          errors.push({ error_id: "er_pwd", error_message: "バスワードを5文字以上8文字以内で入力してください。" });
        }else if(pwd1 !== '' && repwd1 === ''){
          errors.push({ error_id: "er_repwd", error_message: "再入力パスワードを入力してください。" });
        }else if(pwd1 !== repwd1){
          errors.push({ error_id: "er_repwd", error_message: "バスワードが一致しません。" });
        }
      }
      setErrorMessages(errors);
    }

    if(event.target.id === "japanese" || event.target.id === "jpexamname" || event.target.id === "jppassedlevel" 
    || event.target.id === "english" || event.target.id === "otherLanguageLevel"){
      const { name, value } = event.target;
      setLangSkillData(prevState => ({ ...prevState, [name]: value }));

      if(((!event.target.value && event.target.id === "japanese") && (langSkill.jpexamname === undefined || langSkill.jpexamname === "") && (langSkill.jppassedlevel === undefined || langSkill.jppassedlevel === "") && (langSkill.english === undefined || langSkill.english === "") && (langSkill.otherLanguageLevel === undefined || langSkill.otherLanguageLevel === "") )
      || ((!event.target.value && event.target.id === "jpexamname") && (langSkill.japanese === undefined || langSkill.japanese === "") && (langSkill.jppassedlevel === undefined || langSkill.jppassedlevel === "") && (langSkill.english === undefined || langSkill.english === "") && (langSkill.otherLanguageLevel === undefined || langSkill.otherLanguageLevel === "") )
      || ((!event.target.value && event.target.id === "jppassedlevel") && (langSkill.jpexamname === undefined || langSkill.jpexamname === "") && (langSkill.japanese === undefined || langSkill.japanese === "") && (langSkill.english === undefined || langSkill.english === "") && (langSkill.otherLanguageLevel === undefined || langSkill.otherLanguageLevel === "") )
      || ((!event.target.value && event.target.id === "english") && (langSkill.jpexamname === undefined || langSkill.jpexamname === "") && (langSkill.jppassedlevel === undefined || langSkill.jppassedlevel === "") && (langSkill.japanese === undefined || langSkill.japanese === "") && (langSkill.otherLanguageLevel === undefined || langSkill.otherLanguageLevel === "") )
      || ((!event.target.value && event.target.id === "otherLanguageLevel") && (langSkill.jpexamname === undefined || langSkill.jpexamname === "") && (langSkill.jppassedlevel === undefined || langSkill.jppassedlevel === "") && (langSkill.english === undefined || langSkill.english === "") && (langSkill.japanese === undefined || langSkill.japanese === "") ) ){

        if (!errorMessages.some((error) => error.error_id === "er_langSkill")) {
          setErrorMessages([...errorMessages, { error_id: "er_langSkill", error_message: "実務経験を入力してください。" }]);
        }        

      }else{
        const filteredErrMsg = errorMessages.filter((error) => error.error_id !== "er_langSkill");
        setErrorMessages(filteredErrMsg);
      }
    }
  }

    return (
      <div>
        <Container>
          <Row style={{ marginTop: "3%" }}>
            <Col md="6">
              <Form.Group as={Row}>
                <Form.Label column md={2}>ITE番号:</Form.Label>
                <Col md={10}>
                  <Form.Control id="iteNo" size="sm" type="text" value={iteNo || ''} disabled/> 
                </Col>                                
              </Form.Group>
              <span style={{ color: 'blue', fontSize:'small' }}>&nbsp;</span> 
              <Form.Group as={Row}>
                <Form.Label column md={2}>名前:</Form.Label>
                <Col md={10}>
                  <Form.Control id="eName" size="sm" type="text" value={eName || ''} disabled/>
                </Col>                
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group as={Row}>
                <Form.Label column md={4}>新しいパスワード:</Form.Label>
                <Col md={8}>
                  <div style={{position:"relative"}}>
                    <Form.Control id="pwd" size="sm" type={showPassword ? 'text' : 'password'} value={pwd} onChange={handleFormControlChanged} />
                    {showPassword ? <button type="button" className="btn btn-link" onClick={toggleShowPassword} style={{position:"absolute", right:"-0.2rem", top:"46%", transform:"translateY(-50%)", cursor: "pointer", color:"black" }}><FaEye/></button>
                  : <button className="btn btn-link" onClick={toggleShowPassword} style={{position:"absolute", right:"-0.2rem", top:"46%", transform:"translateY(-50%)", cursor: "pointer", color:"black" }} ><FaEyeSlash/></button>}
                  </div>  
                  <span style={{ color: 'blue', fontSize:'small' }}>※5～8文字 </span>                  
                  { getErrorMessage('er_pwd') ? <div style={{ color: 'red', fontSize:'small' }} >{getErrorMessage('er_pwd')}</div> : null}  
                </Col>                                   
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column md={4}>再入力パスワード:</Form.Label>
                <Col md={8}>
                <div style={{position:"relative"}}>
                  <Form.Control id="repwd" size="sm" type={showRePassword ? 'text' : 'password'} value={repwd} onChange={handleFormControlChanged}/>
                  {showRePassword ? <button type="button" className="btn btn-link" onClick={toggleShowRePassword} style={{position:"absolute", right:"-0.2rem", top:"46%", transform:"translateY(-50%)", cursor: "pointer", color:"black" }}><FaEye/></button>
                : <button type="button" className="btn btn-link" onClick={toggleShowRePassword} style={{position:"absolute", right:"-0.2rem", top:"46%", transform:"translateY(-50%)", cursor: "pointer", color:"black" }} ><FaEyeSlash/></button>}
                </div>                    
                { getErrorMessage('er_repwd') ? <div style={{ color: 'red', fontSize:'small' }} >{getErrorMessage('er_repwd')}</div> : null}
                </Col>                
              </Form.Group>
            </Col>
          </Row>
          
          <Row style={{ marginTop: "3%" }}>
            <Form.Group>
              <Form.Label>おすすめポイント:</Form.Label>
              <Form.Control size="sm" as="textarea" ref={recomondedPoints} rows={5} disabled/>
            </Form.Group>
          </Row>

          <Row style={{ marginTop: "3%" }}>
            <Col md="6">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2}>実務経験:</Form.Label>
                <Col md={10}>
                  <Form.Control id="workExperience" size="sm" type="text" ref={workExperience} disabled/>
                </Col>                
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={4}>日本企業勤務経験:</Form.Label>
                <Col md={8}>
                  <Form.Control size="sm" type="text" ref={japanCompanyWorkExperience} disabled/>
                </Col>                
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ marginTop: "3%" }}>
            <Form.Group>
              <Form.Label>得意とする経験・分野・スキル:</Form.Label>                              
            </Form.Group>
            <Table bordered hover size="sm" responsive>
              <colgroup>
                <col style={{ width: '60%' }} /> 
                <col style={{ width: '20%' }} /> 
                <col style={{ width: '20%' }} /> 
              </colgroup>
              <thead>
                <tr>
                  <td>得意とする経験・分野・スキル</td>                    
                  <td>経験年数</td>
                  <td>経験の種類</td>
                </tr>
              </thead>
              <tbody>
                {specExp.map((rowData, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <Form.Control style={{ border: "none" }} size="sm" type="text" value={rowData.content} disabled/>
                    </td>
                    <td>
                      <Form.Control style={{ border: "none" }} size="sm" type="text" value={rowData.specexp} disabled/>
                    </td>
                    <td>
                      <Form.Select style={{ border: "none" }} size="sm" value={rowData.exptypeflg} disabled>
                        <option value={0}>選択</option>
                        <option value={1}>アカデミック・プロジェクト</option>
                        <option value={2}>インターンシップ</option>
                        <option value={3}>実務経験</option>
                      </Form.Select>
                    </td>                      
                  </tr>
                ))}
              </tbody>
            </Table> 
          </Row>

          <Row style={{ marginTop: "3%" }}>
            <Col md="8">
              <Form.Group>
                <Form.Label>語学スキル:</Form.Label>
              </Form.Group>
              <Table bordered hover size="sm" responsive>
                <colgroup>
                  <col style={{ width: '12%' }} /> 
                  <col style={{ width: '22%' }} /> 
                  <col style={{ width: '22%' }} /> 
                  <col style={{ width: '36%' }} /> 
                </colgroup>
                <tbody>
                  <tr>
                    <td>日本語</td>
                    <td>
                      <Form.Control
                        style={{ border: "none" }}
                        size="sm"
                        type="text"
                        placeholder="日本語レベル"
                        name="japanese"
                        id="japanese"
                        value={langSkill.japanese || ''} disabled
                      />
                    </td>
                    <td>
                      <Form.Control
                        style={{ border: "none" }}
                        size="sm"
                        type="text"
                        placeholder="日本語試験名"
                        name="jpexamname"
                        id="jpexamname"
                        value={langSkill.jpexamname || ''} disabled
                      />
                    </td>
                    <td>
                      <Form.Control
                        style={{ border: "none" }}
                        size="sm"
                        type="text"
                        placeholder="日本語試験の合格レベル"
                        name="jppassedlevel"
                        id="jppassedlevel"
                        value={langSkill.jppassedlevel || ''} disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>英語</td>
                    <td colSpan={3}>
                      <Form.Control
                        style={{ border: "none" }}
                        size="sm"
                        type="text"
                        name="english"
                        placeholder="英語レベル"
                        id="english"
                        value={langSkill.english || ''} disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>その他</td>
                    <td colSpan={3}>
                      <Form.Control
                        style={{ border: "none" }}
                        size="sm"
                        type="text"
                        placeholder="その他言語のレベル"
                        name="otherLanguageLevel"
                        id="otherLanguageLevel"
                        value={langSkill.otherLanguageLevel || ''} disabled
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row style={{ marginTop: "3%" }}>
            <Form.Group>
              <Form.Label>検索ラベルタグ:</Form.Label>
                <div id="id_language">
                  {labelTagList?.map(labelTag => {
                    return (              
                      <label key={labelTag.lbltgid}>
                        <input type="checkbox" name="language" value={labelTag.lbltgid} disabled/>
                        <span>{labelTag.lbltgname}</span>
                      </label>
                    );
                  })}
              </div>
            </Form.Group>
          </Row>

          <Row style={{ marginTop: "3%" }}>
            <Form.Group className="mb-3">
              <Form.Label>技術スキル:</Form.Label>
              <Form.Control size="sm" as="textarea" ref={technicalSkill} rows={5}/>
            </Form.Group>      
          </Row>

                  
          <Row style={{ marginTop: "3%" }}>
            <Form.Group>
              <Form.Label>技術スキル習得歴:</Form.Label>
            </Form.Group>
            <Table bordered hover size="sm" responsive>
              <colgroup>
                <col style={{ width: '55%' }} /> 
                <col style={{ width: '25%' }} /> 
                <col style={{ width: '20%' }} /> 
              </colgroup>
              <thead>
                <tr>
                  <td>内容</td>
                  <td>使用技術（システム環境・言語等）</td>
                  <td>役割・規模</td>
                </tr>
              </thead>
              <tbody>
                {ahTechnicalSkills.map((rowData, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <Form.Control style={{ border: "none" }} size="sm" type="text" value={rowData.content} disabled/>
                    </td>
                    <td>
                      <Form.Control style={{ border: "none" }} size="sm" type="text" value={rowData.tech} disabled/>
                    </td>
                    <td>
                      <Form.Control style={{ border: "none" }} size="sm" type="text" value={rowData.roleandscale} disabled/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>             
          </Row>   
          <Row style={{ marginTop: "3%" }}>
            <Form.Group className="mb-3">
              <Form.Label>アピールポイント:</Form.Label>
              <Form.Control size="sm" as="textarea" ref={appealPoints} rows={5}/>           
            </Form.Group>
          </Row>

          <Row style={{ position: 'relative' }}>
            <Form.Group>
              <Form.Label>保有資格:&nbsp;&nbsp;</Form.Label>              
              <div style={{ color: 'blue', fontSize:'small' }}>
                ※一行埋めるなら全部埋めてください。
                { getErrorMessage('er_qlf') ? <span style={{ color: 'red', fontSize:'small', float:'right' }} >{getErrorMessage('er_qlf')}</span> : null} 
              </div>
            </Form.Group>
            <Table bordered hover size="sm" responsive>
              <colgroup>
                <col style={{ width: '35%' }} /> 
                <col style={{ width: '15%' }} /> 
                <col style={{ width: '50%' }} /> 
              </colgroup>
              <thead>
                <tr>
                  <td>資格名</td>
                  <td>取得日付</td>
                  <td>勉強ソース</td>                    
                </tr>
              </thead>
              <tbody>
                {qualifications.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control style={{ border: "none" }} size="sm" type="text" name="name" value={row.name} onChange={(e) => handleAddNewRowChange(e, index)}/>
                    </td>
                    <td>
                      <Form.Control style={{ border: "none" }} size="sm" type="date" name="acqdate" value={row.acqdate} onChange={(e) => handleAddNewRowChange(e, index)}/>
                    </td>
                    <td>
                      <Form.Control style={{ border: "none" }} size="sm" type="text" name="source" value={row.source} onChange={(e) => handleAddNewRowChange(e, index)}/>
                    </td>                      
                  </tr>
                  
                ))}
              </tbody>                
            </Table>
            <BsFillPlusCircleFill onClick={handleAddRow} style={{ position: 'absolute', bottom: '12%', right: '-51%', cursor: 'pointer', color: 'green' }} />
          </Row>
          <hr></hr>   
          <Row>
            <Col md="6">             
            </Col>
            <Col md="6">             
              <Row>
                <Col md="9"></Col>
                <Col md="3">  
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="button" onClick={handleButtonClick} size="sm">Save</Button>
                  </div>      
                </Col>
              </Row>                
            </Col>                 
          </Row>
          <br></br>  
        </Container>
      
    </div>
    );
  }
  
  export default MyPage;