import { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAllTags} from "../../services/mainService";

interface TextInputFieldProps {
    name: string,
    register: UseFormRegister<any>,
    [x: string]: any,
}

const LabelTagField = ({ name, label, register, registerOptions, error, ...props }: TextInputFieldProps) => {

    const [tagData, setTagData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function getAllLabelTags() {
          const data:any = await getAllTags(navigate);
          setTagData(data);
        }
        getAllLabelTags();
      }, []);

 
        return ( 
            <Form.Group>
                <div id="id_language">
                    {tagData.map(labelTagList => {
                        return (              
                        <Form.Label>
                            <input type="checkbox" multiple {...register(name)} value={labelTagList['label_tag_name']} />
                            <span>{labelTagList['label_tag_name']}</span>
                        </Form.Label>
                        );
                    })}
            </div>
            </Form.Group>             
        );
}

export default LabelTagField;