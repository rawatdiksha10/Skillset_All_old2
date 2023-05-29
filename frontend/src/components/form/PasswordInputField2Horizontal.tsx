import { useState } from 'react';
import { Col, Form, Row } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface PasswordInputField2HorizontalProps {
    name: string,
    label?: string,
    labelLength?: number,
    itemLength?: number,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const PasswordInputField2Horizontal = ({ name, label, labelLength = 2, itemLength = 10, register, registerOptions, error, ...props }: PasswordInputField2HorizontalProps) => {

    const [isRevealPassword, setIsRevealPassword] = useState(false);

    return (
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Row>
                {
                    label && <Form.Label column style={{paddingRight: 0}} sm={labelLength}>{label}</Form.Label>
                }
                <Col sm={itemLength}>
                    <div style={{position:"relative"}}>
                        <Form.Control
                            style={{backgroundPosition:"right calc(0.375em + 1.6875rem) center"}}
                            type={isRevealPassword ? "text" : "password"}
                            {...props}
                            {...register(name, registerOptions)}
                            isInvalid={!!error}
                        />
                        {isRevealPassword ? 
                            <FaEye
                                onClick={() => setIsRevealPassword(!isRevealPassword)}
                                onMouseDown={ e => e.preventDefault()}
                                style={{position:"absolute", right:"0.6rem", top:"1.2rem", transform:"translateY(-50%)", cursor: "pointer" }} 
                            />
                            :
                            <FaEyeSlash
                                onClick={() => setIsRevealPassword(!isRevealPassword)}
                                onMouseDown={ e => e.preventDefault()}
                                style={{position:"absolute", right:"0.6rem", top:"1.2rem", transform:"translateY(-50%)", cursor: "pointer" }}
                            />
                        }
                        <Form.Control.Feedback type="invalid">
                            {error?.message}
                        </Form.Control.Feedback>
                    </div>
                </Col>
            </Row>
        </Form.Group>
    );
}

export default PasswordInputField2Horizontal;