import { useState } from 'react';
import { Button, Form, InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface PasswordInputFieldProps {
    name: string,
    label?: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const PasswordInputField = ({ name, label, register, registerOptions, error, ...props }: PasswordInputFieldProps) => {

    const [isRevealPassword, setIsRevealPassword] = useState(false);

    return (
        <Form.Group className="mb-3" controlId={name + "-input"}>
            {
                label && <Form.Label>{label}</Form.Label>
            }
            <InputGroup>
                <Form.Control
                    type={isRevealPassword ? "text" : "password"}
                    {...props}
                    {...register(name, registerOptions)}
                    isInvalid={!!error}
                />
                <Button
                    style={{ borderTopRightRadius: '7px', borderBottomRightRadius: '7px', border: '1px solid #ced4da' }}
                    variant="outline-secondary"
                    onClick={() => setIsRevealPassword(!isRevealPassword)}>
                    {isRevealPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </Button>
                <Form.Control.Feedback type="invalid">
                    {error?.message}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    );
}

export default PasswordInputField;